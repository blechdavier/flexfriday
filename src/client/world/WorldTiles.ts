import { ImageResource } from '../assets/resources/ImageResource';
import { AudioAssets, WorldAssets } from '../assets/Assets';
import { TileResource } from '../assets/resources/TileResource';
import { TileType } from '../../global/Tile';
import { TileEntities } from '../../global/TileEntity';
import { ItemType } from '../../global/Inventory';
import { AudioResourceGroup } from '../assets/resources/AudioResourceGroup';
import { AudioResource } from '../assets/resources/AudioResource';

export type Tile = {
    name: string;
    texture: ImageResource | TileResource;
    connected?: boolean;
    anyConnection?: boolean;
    color: string;
    friction: number;
    reflectivity: number;
    breakSound?: AudioResource | AudioResourceGroup
    placeSound?: AudioResource | AudioResourceGroup
    jumpSound?: AudioResource | AudioResourceGroup
    landSound?: AudioResource | AudioResourceGroup
}

export type TileEntityRenderData = {
    texture: ImageResource | TileResource;
}

export const WorldTiles: Record<TileType, Tile | undefined> = {
    [TileType.Air]: undefined,
    [TileType.Snow]: {
        name: 'snow',
        texture: WorldAssets.middleground.tileset_snow,
        connected: true,
        anyConnection: true,
        color: "#cafafc",
        friction: 2,
        reflectivity: 60,//this reflectivity actually does nothing and instead reflectivity can be changed inside ReflectedImageResource.ts
        breakSound: AudioAssets.world.softplosive
    },
    [TileType.Ice]: {
        name: 'ice',
        texture: WorldAssets.middleground.tileset_ice,
        connected: true,
        anyConnection: true,
        color: "#76adc4",
        friction: 1.5,
        reflectivity: 150,
        breakSound: AudioAssets.world.hightonalnoise
    },
    [TileType.Dirt]: {
        name: 'dirt',
        texture: WorldAssets.middleground.tileset_dirt,
        connected: true,
        anyConnection: true,
        color: "#4a2e1e",
        friction: 4,
        reflectivity: 0,
        breakSound: AudioAssets.world.texturedplosive
    },
    [TileType.Stone0]: {
        name: 'raw stone',
        texture: WorldAssets.middleground.tileset_stone0,
        connected: true,
        anyConnection: true,
        color: "#414245",
        friction: 3,
        reflectivity: 10,
        breakSound: AudioAssets.world.stone
    },
    [TileType.Stone1]: {
        name: 'stone tier 1',
        texture: WorldAssets.middleground.tileset_stone1,
        connected: true,
        anyConnection: true,
        color: "#31323b",
        friction: 3,
        reflectivity: 15,
        breakSound: AudioAssets.world.stone
    },
    [TileType.Stone2]: {
        name: 'stone tier 2',
        texture: WorldAssets.middleground.tileset_stone2,
        connected: true,
        anyConnection: true,
        color: "#31323b",//TODO change these colors to be more accurate
        friction: 3,
        reflectivity: 17,
        breakSound: AudioAssets.world.stone
    },
    [TileType.Stone3]: {
        name: 'stone tier 3',
        texture: WorldAssets.middleground.tileset_stone3,
        connected: true,
        anyConnection: true,
        color: "#31323b",
        friction: 3,
        reflectivity: 19,
        breakSound: AudioAssets.world.stone
    },
    [TileType.Stone4]: {
        name: 'stone tier 4',
        texture: WorldAssets.middleground.tileset_stone4,
        connected: true,
        anyConnection: true,
        color: "#31323b",
        friction: 3,
        reflectivity: 21,
        breakSound: AudioAssets.world.stone
    },
    [TileType.Stone5]: {
        name: 'stone tier 5',
        texture: WorldAssets.middleground.tileset_stone5,
        connected: true,
        anyConnection: true,
        color: "#31323b",
        friction: 3,
        reflectivity: 23,
        breakSound: AudioAssets.world.stone
    },
    [TileType.Stone6]: {
        name: 'stone tier 6',
        texture: WorldAssets.middleground.tileset_stone6,
        connected: true,
        anyConnection: true,
        color: "#31323b",
        friction: 3,
        reflectivity: 25,
        breakSound: AudioAssets.world.stone
    },
    [TileType.Stone7]: {
        name: 'stone tier 7',
        texture: WorldAssets.middleground.tileset_stone7,
        connected: true,
        anyConnection: true,
        color: "#31323b",
        friction: 3,
        reflectivity: 27,
        breakSound: AudioAssets.world.stone
    },
    [TileType.Stone8]: {
        name: 'stone tier 8',
        texture: WorldAssets.middleground.tileset_stone8,
        connected: true,
        anyConnection: true,
        color: "#31323b",
        friction: 3,
        reflectivity: 29,
        breakSound: AudioAssets.world.stone
    },
    [TileType.Stone9]: {
        name: 'stone tier 9',
        texture: WorldAssets.middleground.tileset_stone9,
        connected: true,
        anyConnection: true,
        color: "#31323b",
        friction: 3,
        reflectivity: 31,
        breakSound: AudioAssets.world.stone
    },
    [TileType.Tin]: {
        name: 'tin ore',
        texture: WorldAssets.middleground.tileset_tin,
        connected: true,
        anyConnection: false,
        color: "#31323b",
        friction: 3,
        reflectivity: 10,
        breakSound: AudioAssets.world.metalplosive
    },
    [TileType.Aluminum]: {
        name: 'aluminum ore',
        texture: WorldAssets.middleground.tileset_aluminum,
        connected: true,
        anyConnection: false,
        color: "#31323b",
        friction: 3,
        reflectivity: 17,
        breakSound: AudioAssets.world.metalplosive
    },
    [TileType.Gold]: {
        name: 'gold ore',
        texture: WorldAssets.middleground.tileset_gold,
        connected: true,
        anyConnection: false,
        color: "#31323b",
        friction: 3,
        reflectivity: 21,
        breakSound: AudioAssets.world.metalplosive
    },
    [TileType.Titanium]: {
        name: 'titanium ore',
        texture: WorldAssets.middleground.tileset_titanium,
        connected: true,
        anyConnection: false,
        color: "#31323b",
        friction: 3,
        reflectivity: 25,
        breakSound: AudioAssets.world.metalplosive
    },
    [TileType.Grape]: {
        name: 'grape ore',
        texture: WorldAssets.middleground.tileset_grape,
        connected: true,
        anyConnection: false,
        color: "#31323b",
        friction: 3,
        reflectivity: 29,
        breakSound: AudioAssets.world.metalplosive
    },
    [TileType.Wood0]: {
        name: 'raw wood',
        texture: WorldAssets.middleground.tileset_wood0,
        connected: true,
        anyConnection: true,
        color: "#a77145",
        friction: 3,
        reflectivity: 5,
        breakSound: AudioAssets.world.wood
    },
    [TileType.Wood1]: {
        name: 'wood tier 1',
        texture: WorldAssets.middleground.tileset_wood1,
        connected: true,
        anyConnection: true,
        color: "#a77145",
        friction: 3,
        reflectivity: 5,
        breakSound: AudioAssets.world.wood
    },
    [TileType.Wood2]: {
        name: 'wood tier 2',
        texture: WorldAssets.middleground.tileset_wood2,
        connected: true,
        anyConnection: true,
        color: "#a77145",
        friction: 3,
        reflectivity: 5,
        breakSound: AudioAssets.world.wood
    },
    [TileType.Wood3]: {
        name: 'wood tier 3',
        texture: WorldAssets.middleground.tileset_wood3,
        connected: true,
        anyConnection: true,
        color: "#a77145",
        friction: 3,
        reflectivity: 5,
        breakSound: AudioAssets.world.wood
    },
    [TileType.Wood4]: {
        name: 'wood tier 4',
        texture: WorldAssets.middleground.tileset_wood4,
        connected: true,
        anyConnection: true,
        color: "#a77145",
        friction: 3,
        reflectivity: 5,
        breakSound: AudioAssets.world.wood
    },
    [TileType.Wood5]: {
        name: 'wood tier 5',
        texture: WorldAssets.middleground.tileset_wood5,
        connected: true,
        anyConnection: true,
        color: "#a77145",
        friction: 3,
        reflectivity: 5,
        breakSound: AudioAssets.world.wood
    },
    [TileType.Wood6]: {
        name: 'wood tier 6',
        texture: WorldAssets.middleground.tileset_wood6,
        connected: true,
        anyConnection: true,
        color: "#a77145",
        friction: 3,
        reflectivity: 5,
        breakSound: AudioAssets.world.wood
    },
    [TileType.Wood7]: {
        name: 'wood tier 7',
        texture: WorldAssets.middleground.tileset_wood7,
        connected: true,
        anyConnection: true,
        color: "#a77145",
        friction: 3,
        reflectivity: 5,
        breakSound: AudioAssets.world.wood
    },
    [TileType.Wood8]: {
        name: 'wood tier 8',
        texture: WorldAssets.middleground.tileset_wood8,
        connected: true,
        anyConnection: true,
        color: "#a77145",
        friction: 3,
        reflectivity: 5,
        breakSound: AudioAssets.world.wood
    },
    [TileType.Wood9]: {
        name: 'wood tier 9',
        texture: WorldAssets.middleground.tileset_wood9,
        connected: true,
        anyConnection: true,
        color: "#a77145",
        friction: 3,
        reflectivity: 5,
        breakSound: AudioAssets.world.wood
    },
};

// export const TileEntitiesRenderData: Record<TileEntities, TileEntityRenderData> = {
    // [TileEntities.Tier1Drill]: {
        // texture: undefined
    // },
    // [TileEntities.Tier2Drill]: {
        // texture: undefined
    // }
// }