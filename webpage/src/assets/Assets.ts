import TileResource from './resources/TileResource';
import ImageResource from './resources/ImageResource';
import ReflectableImageResource from './resources/ReflectedImageResource';
import FontResource from './resources/FontResource';
import Resource from './resources/Resource';
import AudioResourceGroup from './resources/AudioResourceGroup';
import P5 from 'p5';
import AudioResource from './resources/AudioResource';

interface AssetGroup {
    [name: string]:
    | {
        [name: string]: Resource | AssetGroup | AudioResourceGroup | AudioResource | ImageResource[];
    }
    | Resource | AssetGroup | AudioResourceGroup | AudioResource | ImageResource[];
}

// Ui related assets
const UiAssets = {
    ui_slot_selected: new ImageResource(
        'assets/textures/ui/uislot_selected.png'
    ),
    ui_slot: new ImageResource('assets/textures/ui/uislot.png'),
    ui_frame: new ImageResource('assets/textures/ui/uiframe.png'),
    button_unselected: new ImageResource('assets/textures/ui/button0.png'),
    button_selected: new ImageResource('assets/textures/ui/button1.png'),
    slider_bar: new ImageResource('assets/textures/ui/sliderBar.png'),
    slider_handle: new ImageResource('assets/textures/ui/sliderHandle.png'),
    title_image: new ImageResource('assets/textures/ui/snowedinBUMP.png'),
    vignette: new ImageResource('assets/textures/ui/vignette-export.png'),
};

// Item related assets
const ItemsAssets = {
    resources: {
        ice_shard: new ImageResource(
            'assets/textures/items/resource_ice_shards.png'
        ),
        snowball: new ImageResource(
            'assets/textures/items/resource_snowball.png'
        ),
    },
    consumables: {
        snow_berries: new ImageResource(
            'assets/textures/items/consumable_snow_berries.png'
        ),
    },
    blocks: {
        ice: new ImageResource('assets/textures/items/block_ice.png'),
        snow: new ImageResource('assets/textures/items/block_snow.png'),
    },
    tools: {},
};

// World related assets
const WorldAssets = {
    shaderResources: {
        skyImage: new ImageResource(
            'assets/textures/shader_resources/poissonsnow.png'
        ),
    },
    middleground: {
        tileset_ice: new TileResource(
            'assets/textures/world/middleground/tileset_ice.png',
            16,
            1,
            8,
            8
        ),
        tileset_snow: new TileResource(
            'assets/textures/world/middleground/tileset_snow.png',
            16,
            1,
            8,
            8
        ),
        tileset_dirt: new TileResource(
            'assets/textures/world/middleground/tileset_dirt0.png',
            16,
            1,
            8,
            8
        ),
        tileset_stone0: new TileResource(
            'assets/textures/world/middleground/tileset_stone0.png',
            16,
            1,
            8,
            8
        ),
        tileset_stone1: new TileResource(
            'assets/textures/world/middleground/tileset_stone1.png',
            16,
            1,
            8,
            8
        ),
        tileset_stone2: new TileResource(
            'assets/textures/world/middleground/tileset_stone2.png',
            16,
            1,
            8,
            8
        ),
        tileset_stone3: new TileResource(
            'assets/textures/world/middleground/tileset_stone3.png',
            16,
            1,
            8,
            8
        ),
        tileset_stone4: new TileResource(
            'assets/textures/world/middleground/tileset_stone4.png',
            16,
            1,
            8,
            8
        ),
        tileset_stone5: new TileResource(
            'assets/textures/world/middleground/tileset_stone5.png',
            16,
            1,
            8,
            8
        ),
        tileset_stone6: new TileResource(
            'assets/textures/world/middleground/tileset_stone6.png',
            16,
            1,
            8,
            8
        ),
        tileset_stone7: new TileResource(
            'assets/textures/world/middleground/tileset_stone7.png',
            16,
            1,
            8,
            8
        ),
        tileset_stone8: new TileResource(
            'assets/textures/world/middleground/tileset_stone8.png',
            16,
            1,
            8,
            8
        ),
        tileset_stone9: new TileResource(
            'assets/textures/world/middleground/tileset_stone9.png',
            16,
            1,
            8,
            8
        ),
    },
    foreground: {
        tileset_pipe: new TileResource(
            'assets/textures/world/foreground/tileset_pipe.png',
            16,
            1,
            8,
            8
        ),
    },
    tileEntities: {
        entity_t1drill: [
            new ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill1.png'),
            new ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill2.png'),
            new ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill3.png'),
            new ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill4.png'),
            new ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill5.png'),
            new ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill6.png'),
            new ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill7.png'),
            new ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill8.png'),
            new ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill9.png'),
            new ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill10.png'),
            new ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill11.png'),
            new ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill12.png'),
            new ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill13.png')
        ],
        entity_t1drone: [
            new ImageResource('assets/textures/world/entities/Small Drone/SmallDrone01.png'),
            new ImageResource('assets/textures/world/entities/Small Drone/SmallDrone02.png'),
            new ImageResource('assets/textures/world/entities/Small Drone/SmallDrone03.png'),
            new ImageResource('assets/textures/world/entities/Small Drone/SmallDrone04.png'),
            new ImageResource('assets/textures/world/entities/Small Drone/SmallDrone05.png'),
            new ImageResource('assets/textures/world/entities/Small Drone/SmallDrone06.png'),
            new ImageResource('assets/textures/world/entities/Small Drone/SmallDrone07.png'),
            new ImageResource('assets/textures/world/entities/Small Drone/SmallDrone08.png'),
            new ImageResource('assets/textures/world/entities/Small Drone/SmallDrone09.png'),
            new ImageResource('assets/textures/world/entities/Small Drone/SmallDrone10.png'),
            new ImageResource('assets/textures/world/entities/Small Drone/SmallDrone11.png'),
            new ImageResource('assets/textures/world/entities/Small Drone/SmallDrone12.png'),
            new ImageResource('assets/textures/world/entities/Small Drone/SmallDrone13.png'),
            new ImageResource('assets/textures/world/entities/Small Drone/SmallDrone14.png'),
            new ImageResource('assets/textures/world/entities/Small Drone/SmallDrone15.png'),
            new ImageResource('assets/textures/world/entities/Small Drone/SmallDrone16.png'),
            new ImageResource('assets/textures/world/entities/Small Drone/SmallDrone17.png'),
            new ImageResource('assets/textures/world/entities/Small Drone/SmallDrone18.png'),
            new ImageResource('assets/textures/world/entities/Small Drone/SmallDrone19.png'),
            new ImageResource('assets/textures/world/entities/Small Drone/SmallDrone20.png')
        ]
    }
};

const Fonts = {
    title: new FontResource('assets/textures/ui/font.png', {
        "0": 7,
        "1": 7,
        "2": 7,
        "3": 6,
        "4": 6,
        "5": 6,
        "6": 6,
        "7": 7,
        "8": 7,
        "9": 6,
        "A": 6,
        "B": 7,
        "C": 7,
        "D": 6,
        "E": 7,
        "F": 6,
        "G": 7,
        "H": 7,
        "I": 7,
        "J": 8,
        "K": 6,
        "L": 6,
        "M": 8,
        "N": 8,
        "O": 8,
        "P": 9,
        "Q": 8,
        "R": 7,
        "S": 7,
        "T": 8,
        "U": 8,
        "V": 8,
        "W": 10,
        "X": 8,
        "Y": 8,
        "Z": 9,
        "a": 7,
        "b": 7,
        "c": 6,
        "d": 7,
        "e": 6,
        "f": 6,
        "g": 6,
        "h": 6,
        "i": 5,
        "j": 6,
        "k": 5,
        "l": 5,
        "m": 8,
        "n": 5,
        "o": 5,
        "p": 5,
        "q": 7,
        "r": 5,
        "s": 4,
        "t": 5,
        "u": 5,
        "v": 5,
        "w": 7,
        "x": 6,
        "y": 5,
        "z": 5,
        "!": 4,
        ".": 2,
        ",": 2,
        "?": 6,
        "_": 6,
        "-": 4,
        ":": 2,
        " ": 2
    }, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!.,?_-: "),

    big: new FontResource('assets/textures/ui/fontBig.png', {
        "0": 14,
        "1": 14,
        "2": 14,
        "3": 12,
        "4": 12,
        "5": 12,
        "6": 12,
        "7": 14,
        "8": 14,
        "9": 12,
        "A": 12,
        "B": 14,
        "C": 14,
        "D": 12,
        "E": 14,
        "F": 12,
        "G": 14,
        "H": 14,
        "I": 14,
        "J": 16,
        "K": 12,
        "L": 12,
        "M": 16,
        "N": 16,
        "O": 16,
        "P": 18,
        "Q": 16,
        "R": 14,
        "S": 14,
        "T": 16,
        "U": 16,
        "V": 16,
        "W": 20,
        "X": 16,
        "Y": 16,
        "Z": 18,
        "a": 14,
        "b": 14,
        "c": 12,
        "d": 14,
        "e": 12,
        "f": 12,
        "g": 12,
        "h": 12,
        "i": 10,
        "j": 12,
        "k": 10,
        "l": 10,
        "m": 16,
        "n": 10,
        "o": 10,
        "p": 10,
        "q": 14,
        "r": 10,
        "s": 8,
        "t": 10,
        "u": 10,
        "v": 10,
        "w": 14,
        "x": 12,
        "y": 10,
        "z": 10,
        "!": 8,
        ".": 4,
        ",": 4,
        "?": 12,
        "_": 12,
        "-": 8,
        ":": 4,
        " ": 4
    }, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!.,?_-: "),

};

const Keys = {
    keyboardMap: [
        "", // [0]
        "", // [1]
        "", // [2]
        "CANCEL", // [3]
        "", // [4]
        "", // [5]
        "HELP", // [6]
        "", // [7]
        "BACKSPACE", // [8]
        "TAB", // [9]
        "", // [10]
        "", // [11]
        "CLEAR", // [12]
        "ENTER", // [13]
        "ENTER SPECIAL", // [14]
        "", // [15]
        "SHIFT", // [16]
        "CONTROL", // [17]
        "ALT", // [18]
        "PAUSE", // [19]
        "CAPS LOCK", // [20]
        "KANA", // [21]
        "EISU", // [22]
        "JUNJA", // [23]
        "FINAL", // [24]
        "HANJA", // [25]
        "", // [26]
        "ESCAPE", // [27]
        "CONVERT", // [28]
        "NONCONVERT", // [29]
        "ACCEPT", // [30]
        "MODECHANGE", // [31]
        "SPACE", // [32]
        "PAGE UP", // [33]
        "PAGE DOWN", // [34]
        "END", // [35]
        "HOME", // [36]
        "LEFT", // [37]
        "UP", // [38]
        "RIGHT", // [39]
        "DOWN", // [40]
        "SELECT", // [41]
        "PRINT", // [42]
        "EXECUTE", // [43]
        "PRINT SCREEN", // [44]
        "INSERT", // [45]
        "DELETE", // [46]
        "", // [47]
        "0", // [48]
        "1", // [49]
        "2", // [50]
        "3", // [51]
        "4", // [52]
        "5", // [53]
        "6", // [54]
        "7", // [55]
        "8", // [56]
        "9", // [57]
        "COLON", // [58]
        "SEMICOLON", // [59]
        "LESS THAN", // [60]
        "EQUALS", // [61]
        "GREATER THAN", // [62]
        "QUESTION MARK", // [63]
        "AT", // [64]
        "A", // [65]
        "B", // [66]
        "C", // [67]
        "D", // [68]
        "E", // [69]
        "F", // [70]
        "G", // [71]
        "H", // [72]
        "I", // [73]
        "J", // [74]
        "K", // [75]
        "L", // [76]
        "M", // [77]
        "N", // [78]
        "O", // [79]
        "P", // [80]
        "Q", // [81]
        "R", // [82]
        "S", // [83]
        "T", // [84]
        "U", // [85]
        "V", // [86]
        "W", // [87]
        "X", // [88]
        "Y", // [89]
        "Z", // [90]
        "OS KEY", // [91] Windows Key (Windows) or Command Key (Mac)
        "", // [92]
        "CONTEXT MENU", // [93]
        "", // [94]
        "SLEEP", // [95]
        "NUMPAD0", // [96]
        "NUMPAD1", // [97]
        "NUMPAD2", // [98]
        "NUMPAD3", // [99]
        "NUMPAD4", // [100]
        "NUMPAD5", // [101]
        "NUMPAD6", // [102]
        "NUMPAD7", // [103]
        "NUMPAD8", // [104]
        "NUMPAD9", // [105]
        "MULTIPLY", // [106]
        "ADD", // [107]
        "SEPARATOR", // [108]
        "SUBTRACT", // [109]
        "DECIMAL", // [110]
        "DIVIDE", // [111]
        "F1", // [112]
        "F2", // [113]
        "F3", // [114]
        "F4", // [115]
        "F5", // [116]
        "F6", // [117]
        "F7", // [118]
        "F8", // [119]
        "F9", // [120]
        "F10", // [121]
        "F11", // [122]
        "F12", // [123]
        "F13", // [124]
        "F14", // [125]
        "F15", // [126]
        "F16", // [127]
        "F17", // [128]
        "F18", // [129]
        "F19", // [130]
        "F20", // [131]
        "F21", // [132]
        "F22", // [133]
        "F23", // [134]
        "F24", // [135]
        "", // [136]
        "", // [137]
        "", // [138]
        "", // [139]
        "", // [140]
        "", // [141]
        "", // [142]
        "", // [143]
        "NUM LOCK", // [144]
        "SCROLL LOCK", // [145]
        "WIN OEM FJ JISHO", // [146]
        "WIN OEM FJ MASSHOU", // [147]
        "WIN OEM FJ TOUROKU", // [148]
        "WIN OEM FJ LOYA", // [149]
        "WIN OEM FJ ROYA", // [150]
        "", // [151]
        "", // [152]
        "", // [153]
        "", // [154]
        "", // [155]
        "", // [156]
        "", // [157]
        "", // [158]
        "", // [159]
        "CIRCUMFLEX", // [160]
        "EXCLAMATION", // [161]
        "DOUBLE_QUOTE", // [162]
        "HASH", // [163]
        "DOLLAR", // [164]
        "PERCENT", // [165]
        "AMPERSAND", // [166]
        "UNDERSCORE", // [167]
        "OPEN PARENTHESIS", // [168]
        "CLOSE PARENTHESIS", // [169]
        "ASTERISK", // [170]
        "PLUS", // [171]
        "PIPE", // [172]
        "HYPHEN", // [173]
        "OPEN CURLY BRACKET", // [174]
        "CLOSE CURLY BRACKET", // [175]
        "TILDE", // [176]
        "", // [177]
        "", // [178]
        "", // [179]
        "", // [180]
        "VOLUME MUTE", // [181]
        "VOLUME DOWN", // [182]
        "VOLUME UP", // [183]
        "", // [184]
        "", // [185]
        "SEMICOLON", // [186]
        "EQUALS", // [187]
        "COMMA", // [188]
        "MINUS", // [189]
        "PERIOD", // [190]
        "SLASH", // [191]
        "BACK QUOTE", // [192]
        "", // [193]
        "", // [194]
        "", // [195]
        "", // [196]
        "", // [197]
        "", // [198]
        "", // [199]
        "", // [200]
        "", // [201]
        "", // [202]
        "", // [203]
        "", // [204]
        "", // [205]
        "", // [206]
        "", // [207]
        "", // [208]
        "", // [209]
        "", // [210]
        "", // [211]
        "", // [212]
        "", // [213]
        "", // [214]
        "", // [215]
        "", // [216]
        "", // [217]
        "", // [218]
        "OPEN BRACKET", // [219]
        "BACK SLASH", // [220]
        "CLOSE BRACKET", // [221]
        "QUOTE", // [222]
        "", // [223]
        "META", // [224]
        "ALT GRAPH", // [225]
        "", // [226]
        "WIN ICO HELP", // [227]
        "WIN ICO 00", // [228]
        "", // [229]
        "WIN ICO CLEAR", // [230]
        "", // [231]
        "", // [232]
        "WIN OEM RESET", // [233]
        "WIN OEM JUMP", // [234]
        "WIN OEM PA1", // [235]
        "WIN OEM PA2", // [236]
        "WIN OEM PA3", // [237]
        "WIN OEM WSCTRL", // [238]
        "WIN OEM CUSEL", // [239]
        "WIN OEM ATTN", // [240]
        "WIN OEM FINISH", // [241]
        "WIN OEM COPY", // [242]
        "WIN OEM AUTO", // [243]
        "WIN OEM ENLW", // [244]
        "WIN OEM BACKTAB", // [245]
        "ATTN", // [246]
        "CRSEL", // [247]
        "EXSEL", // [248]
        "EREOF", // [249]
        "PLAY", // [250]
        "ZOOM", // [251]
        "", // [252]
        "PA1", // [253]
        "WIN OEM CLEAR", // [254]
        "TOGGLE TOUCHPAD" // [255]
    ]// https://stackoverflow.com/questions/1772179/get-character-value-from-keycode-in-javascript-then-trim
}

const AudioAssets = {
    ui: {
        inventoryClack: new AudioResourceGroup([new AudioResource('assets/sounds/sfx/ui/clack1.mp3'), new AudioResource('assets/sounds/sfx/ui/clack2.mp3'), new AudioResource('assets/sounds/sfx/ui/clack3.mp3')])
    },
    music: {
        titleScreen: new AudioResource('assets/sounds/music/TitleScreen.mp3')
    },
    ambient: {
        winter1: new AudioResource('assets/sounds/sfx/ambient/65813__pcaeldries__countrysidewinterevening02.wav')
    }
}

type AnimationFrame<T extends Record<string, ImageResource[]>> = keyof T

// const animations = <T extends Record<string, ImageResource[]>>(data: T): T => data

const PlayerAnimations = {
    idle: [
        new ReflectableImageResource('assets/textures/player/character.png'),
    ]
}


const loadAssets = (sketch: P5, ...assets: AssetGroup[]) => {
    assets.forEach((assetGroup) => {
        searchGroup(assetGroup, sketch);
    });

};

function searchGroup(assetGroup: AssetGroup | Resource | AudioResource | AudioResourceGroup | ImageResource[], sketch: P5) {
    if (assetGroup instanceof Resource) {
        console.log(`Loading asset ${assetGroup.path}`);
        assetGroup.loadResource(sketch);
        return;
    }
    Object.entries(assetGroup).forEach((asset) => {
        searchGroup(asset[1], sketch);
    });
}

export { AudioAssets, UiAssets, ItemsAssets, WorldAssets, Fonts, Keys, PlayerAnimations, AnimationFrame, loadAssets };
