import { SnapshotInterpolation } from '@geckos.io/snapshot-interpolation';
import { State } from '@geckos.io/snapshot-interpolation/lib/types';
import { BroadcastOperator } from 'socket.io/dist/broadcast-operator';
import { Socket } from 'socket.io';
import { ClientEvents, ServerEvents } from '../../global/Events';
import { io, UserData } from '../Main';
import { Player } from './entity/Player';
import { World } from './World';
import { WorldTiles } from './WorldTiles';
import { TileEntities, TileEntityPayload } from '../../global/TileEntity';
import { EntityPayload } from '../../global/Entity';
import { TileType } from '../../global/Tile';
import { v4 as uuidv4 } from 'uuid';
import { ItemCategories, Items, ItemType } from '../../global/Inventory';
import { Drone } from './entity/Drone';
import { Tree } from './entity/TileEntity';
import { Inventory } from './inventory/Inventory';

export class GameServer {
	id: string;
	name: string;
	maxPlayers: number;
	listed: boolean;

	// Players
	hostId: string;
	players: { [playerId: string]: Player } = {};

	// World
	world: World | undefined;

	// Update related
	snapshotInterpolation: SnapshotInterpolation;

	room: BroadcastOperator<ServerEvents, UserData>;

	constructor(
		name: string,
		maxPlayers: number,
		listed: boolean,
		id: string,
		hostId: string,
	) {
		this.name = name;
		this.maxPlayers = maxPlayers;
		this.listed = listed;
		this.id = id;
		this.room = io.to(id);
		this.hostId = hostId;

		this.snapshotInterpolation = new SnapshotInterpolation();
	}

	async start() {
		// Generate world
		this.world = new World(512, 256);
		await this.world.generate();

		// Server ticks per second
		let tps = 30;
		setInterval(async () => {
			// Get the state of all the players
			const entitiesState: State = [];
			Object.entries(this.players).forEach(([, player]) => {
				if (player.socketId !== undefined)
					entitiesState.push(player.getSnapshot());
			});

			if (this.world?.entities != undefined)
				Object.entries(this.world?.entities).forEach(([, entity]) => {
					if (entity instanceof Drone) {
						if (this.world !== undefined) entity.tick(this.world);
						this.room.emit('entityUpdate', entity.getPayload());
						entitiesState.push(entity.getSnapshot());
					}
				});

			// Create a snapshot with that state
			if (entitiesState.length > 0) {
				const snapshot =
					this.snapshotInterpolation.snapshot.create(entitiesState);
				this.room.emit('entitySnapshot', snapshot);
			}
		}, 1000 / tps);
	}

	async join(
		socket: Socket<ClientEvents, ServerEvents, {}, UserData>,
		name: string,
	) {
		console.log('got to anync function');
		const sockets = await this.room.allSockets();

		// If the server is full
		if (sockets.size >= this.maxPlayers) return;
		if (socket.data.userId === undefined) return;
		if (this.world === undefined) return;

		if (this.players[socket.data.userId] === undefined) {
			console.log(`Player ${name} joined for the first time!`);
			this.players[socket.data.userId] = new Player(
				name,
				socket.data.userId,
				uuidv4(),
				this.world.spawnPosition.x,
				this.world.spawnPosition.y,
			);
		}

		const user = this.players[socket.data.userId];

		try {
			user.inventory.mainInventory[0] = {
				item: ItemType.SnowBlock,
				quantity: 12,
			};
			user.inventory.mainInventory[1] = {
				item: ItemType.IceBlock,
				quantity: 98,
			};

			// User is already connected
			if (user.socketId !== undefined) return;

			user.socketId = socket.id;
			user.name = name;

			// Join the room
			socket.join(this.id);

			// Initialize the client with all the entities
			const entities: EntityPayload[] = [];
			Object.entries(this.players).forEach(([id, player]) => {
				if (player.socketId !== undefined && id !== user.userId)
					entities.push(player.getPayload());
			});
			Object.entries(this.world.entities).forEach(([id, entity]) => {
				entities.push(entity.getPayload());
			});

			const tileEntities: TileEntityPayload[] = Object.entries(
				this.world.tileEntities,
			).map(tileEntityEntry => {
				return tileEntityEntry[1].getPayload();
			});

			// Send the world to the client
			socket.emit(
				'worldLoad',
				this.world.width,
				this.world.height,
				this.world.tiles,
				tileEntities,
				entities,
				user.getLocal(),
				user.inventory.getPayload(),
			);

			socket.broadcast.emit('entityCreate', user.getPayload());

			console.log('created user with name ' + user.name);

			// Update player
			{
				socket.on('playerUpdate', (x: number, y: number) => {
					user.x = x;
					user.y = y;
				});
				socket.on(
					'playerAnimation',
					(animation: string, playerId: string) => {
						socket.broadcast.emit(
							'onPlayerAnimation',
							animation,
							playerId,
						);
					},
				);
			}

			// Inventory
			{
				socket.on(
					'worldPlace',
					(inventoryIndex: number, x: number, y: number) => {
						if (
							this.world === undefined ||
							y < 0 ||
							x < 0 ||
							x > this.world?.width ||
							y > this.world?.height
						)
							return;
						// Index verification
						if (
							inventoryIndex >= user.inventory.width ||
							inventoryIndex < 0
						) {
							console.error(
								`Player: ${user.name}, attempted to place an item not in hot bar, slot: ${inventoryIndex}`,
							);
							return;
						}

						// Item verification

						const placedItem =
							user.inventory.mainInventory[inventoryIndex];
						if (placedItem === undefined) {
							console.error(
								`Player ${user.name} attempted to place a non-existent item`,
							);
							return;
						}

						let itemData = Items[placedItem.item as ItemType];

						if (
							itemData === undefined ||
							itemData.type !== ItemCategories.Tile
						) {
							console.error(
								`Player ${user.name}, attempted to place a non-tile item`,
							);
							return;
						}

						const updates =
							user.inventory.removeItems(inventoryIndex);
						if (
							this.world.tiles.getTileAt(x, y) === TileType.Air &&
							updates
						) {
							const index = this.world.tiles.getTileIndexAt(x, y);
							this.world.tiles[index] = itemData.placedTile;
							this.room.emit('worldUpdate', [
								{ tileIndex: index, tile: itemData.placedTile },
							]);
							socket.emit('inventoryUpdate', updates);
						}
					},
				);

				socket.on(
					'inventorySwap',
					(sourceSlot: number, destinationSlot: number) => {
						if (this.world === undefined) return;

						const swapped = user.inventory.swapSlots(
							sourceSlot,
							destinationSlot,
						);

						if (!swapped) return;

						socket.emit('inventoryUpdate', swapped);
					},
				);
			}

			// World interact
			{
				socket.on('worldBreakStart', tileIndex => {
					user.breakingTile = {
						tileIndex,
						start: Date.now(),
					};
				});

				socket.on('worldBreakCancel', () => {
					user.breakingTile = undefined;
				});

				socket.on('worldBreakFinish', () => {
					if (this.world === undefined) return;
					const brokenTile = user.breakingTile;

					// If the user did not have a breaking target
					if (brokenTile === undefined) {
						console.error(
							`Player ${user.name} attempted to break a non-existent tile`,
						);
						return;
					}

					// Tile Entity
					if (
						typeof this.world.tiles[brokenTile.tileIndex] ===
						'string'
					) {
						let brokenTileEntity =
							this.world.tileEntities[
							this.world.tiles[brokenTile.tileIndex]
							];

						console.log(this.world.tiles[brokenTile.tileIndex]);

						const STEVE: string =
							'this line of code is useless but you better not delete it!!!! -Xavier';

						if (brokenTileEntity === undefined) {
							console.warn('UNDEFINED BOZO GameServer.ts');
							return;
						}
						if (brokenTileEntity instanceof Tree) {//console.log("yay moment")
							socket.emit(
								'inventoryUpdate',
								brokenTileEntity.interact(user.inventory, 0),
							);
							this.room.emit('worldUpdate', brokenTileEntity.getDeletePacket());//remove references to tile entity in the client side and server side tile arrays
							this.room.emit('tileEntityDelete', brokenTileEntity.id);//remove the tile entity from the client side tile entities object
							let w  = this.world;
							if(w!=undefined) {
							brokenTileEntity.coveredTiles.forEach(index => {
								w.tiles[index] = TileType.Air;
								console.log(w.tiles[index])
							});}
							// this.world.tileEntities[//remove server side tile entity
							// 	this.world.tiles[brokenTile.tileIndex]
							// ].removeWithoutDeleting();
							delete this.world.tileEntities[brokenTileEntity.id];//remove the tile entity from the server side tile entities object
						}

						else {
							console.error("non-tree tile entity exists which is very sad")
							socket.emit(
								'inventoryUpdate',
								brokenTileEntity.interact(user.inventory),
							);
						}
						return;
					}

					// Air tile
					if (
						this.world.tiles[brokenTile.tileIndex] === TileType.Air
					) {
						console.error(
							`Player ${user.name} attempted to break an air tile`,
						);
						return;
					}

					let brokenTileInstance =
						this.world.tiles[brokenTile.tileIndex];

					//if ore, regenerate
					if (
						this.world.regeneratingTiles[brokenTile.tileIndex] ===
						brokenTileInstance &&
						[
							TileType.Tin,
							TileType.Aluminum,
							TileType.Gold,
							TileType.Titanium,
							TileType.Grape,
						].includes(brokenTileInstance)
					) {
						setTimeout(() => {
							if (this.world === undefined) return;
							this.world.tiles[brokenTile.tileIndex] =
								brokenTileInstance;
							this.room.emit('worldUpdate', [
								{
									tileIndex: brokenTile.tileIndex,
									tile: brokenTileInstance,
								},
							]);
						}, 10000);
					}
					if (typeof brokenTileInstance === 'number') {
						let update = user.inventory.attemptPickUp(
							WorldTiles[brokenTileInstance]?.itemDrop ||
							ItemType.SnowBlock,
						); //if it's undefined, give them snow (it gets rid of the error, there's a better way probably)
						socket.emit('inventoryUpdate', update);
					}

					this.world.tiles[brokenTile.tileIndex] = TileType.Air;
					const { x, y } = this.world.tiles.getCoordinates(
						brokenTile.tileIndex,
					);
					//this.world.spawnItem(x, y);
					this.room.emit('worldUpdate', [
						{
							tileIndex: brokenTile.tileIndex,
							tile: this.world.tiles[brokenTile.tileIndex],
						},
					]);
				});
			}

			// Handle disconnect
			socket.on('disconnect', (reason: string) => {
				console.log(
					`Player ${name} disconnect from ${this.name} reason: ${reason}`,
				);

				this.room.emit('entityDelete', user.id.toString());

				user.socketId = undefined;
			});
		} catch (err) {
			this.room.emit('entityDelete', user.id.toString());
			socket.disconnect();
			user.socketId = undefined;

			console.log(err);

			console.log(
				`Player ${name} was kicked from ${this.name} reason: ${err}`,
			);
		}
	}
}
