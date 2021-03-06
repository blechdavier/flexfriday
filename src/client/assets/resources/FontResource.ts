import { ImageResource } from './ImageResource';
import p5 from 'p5';
import { game } from '../../Game';

export class FontResource extends ImageResource {

    alphabet_soup: {[letter: string]: {x: number, y: number, w: number, h: number}} = {}

    constructor(path: string, characterData: {[letter: string]: number}, characterOrder: string, fontHeight: number) {
        super(path);
        let runningTotal = 0
        for(let i = 0; i<characterOrder.length; i++) {
            this.alphabet_soup[characterOrder[i]] = {x: runningTotal, y: 0, w: characterData[characterOrder[i]], h: fontHeight}
            runningTotal += characterData[characterOrder[i]] + 1
            // console.log(characterOrder[i]+": "+characterData[characterOrder[i]]);
        }
    }

    drawText(target: p5, str: string, x: number, y: number) {
        //console.log(this.alphabet_soup);
        let xOffset: number = 0;
        for(let i = 0; i<str.length; i++) {
            if(this.alphabet_soup[str[i]]!=undefined){
            this.renderPartial(target, x+xOffset*game.upscaleSize, y, this.alphabet_soup[str[i]].w*game.upscaleSize, this.alphabet_soup[str[i]].h*game.upscaleSize, this.alphabet_soup[str[i]].x, this.alphabet_soup[str[i]].y, this.alphabet_soup[str[i]].w, this.alphabet_soup[str[i]].h);
            xOffset += this.alphabet_soup[str[i]].w+1;
            }
            else {
                console.warn("unknown letter: '"+str[i]+"'");
            }
        }
    }
}