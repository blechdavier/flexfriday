import ImageResource from '../assets/resources/ImageResource';
import { WorldAssets } from '../assets/Assets';
import TileResource from '../assets/resources/TileResource';
import { TileType } from '../../../api/Tile';

export interface Tile {
    name: string;
    texture: ImageResource | TileResource;
    connected?: boolean;
    anyConnection?: boolean;
}

<<<<<<< Updated upstream:webpage/src/world/WorldTiles.ts
export const WorldTiles: Record<TileType, Tile | undefined> = {
    [TileType.Air]: undefined,
    [TileType.Snow]: {
=======


const Blocks = {//used for readability in other scripts
    air: 0,
    snow: 1,
    ice: 2, 
    dirt: 3,
    stone: 4,
    metal_ore: 5
}



const Tiles: Tile[] = [
    undefined, // Air
    {
>>>>>>> Stashed changes:webpage/src/world/Tiles.ts
        name: 'snow',
        texture: WorldAssets.middleground.tileset_snow,
<<<<<<< Updated upstream:webpage/src/world/WorldTiles.ts
        connected: true,
        anyConnection: true,
=======
        connected: true
>>>>>>> Stashed changes:webpage/src/world/Tiles.ts
    },
    [TileType.Ice]: {
        name: 'ice',
        texture: WorldAssets.middleground.tileset_ice,
<<<<<<< Updated upstream:webpage/src/world/WorldTiles.ts
        connected: true,
        anyConnection: true,
    },
};
=======
        connected: true
    },
    {
        name: 'dirt',
        itemDrop: Items.ice_shards,
        itemDropMin: 100,
        itemDropMax: 500,
        texture: WorldAssets.middleground.tileset_dirt,
        connected: false
    },
    {
        name: 'stone',
        itemDrop: Items.ice_shards,
        itemDropMin: 300,
        itemDropMax: 500,
        texture: WorldAssets.middleground.tileset_stone,
        connected: false
    },
];

export { Tiles, Tile, Blocks };
>>>>>>> Stashed changes:webpage/src/world/Tiles.ts