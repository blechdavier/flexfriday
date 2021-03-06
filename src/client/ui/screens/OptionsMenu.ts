import { UiScreen } from '../UiScreen';
import p5 from 'p5';
import { UiFrame } from '../UiFrame';
import { Button } from '../Button';
import { FontResource } from '../../assets/resources/FontResource';
import { MainMenu } from './MainMenu';
import { VideoSettingsMenu } from './VideoSettingsMenu';
import { ControlsMenu } from './ControlsMenu';
import { game } from '../../Game';
import { PauseMenu } from './PauseMenu';

export class OptionsMenu extends UiScreen {

    constructor(font: FontResource, titleFont: FontResource, previousMenu: string) {
        super();
        // make the frame with some default values.  These will later be changed to fit the screen size.
        this.frame = new UiFrame(0, 0, 0, 0);
        this.titleFont = titleFont;
        // make some buttons with default positions
        this.buttons = [
            new Button(font, "Video Settings", "Change the balance between performance and fidelity.", 0, 0, 0, 0, () => {
                console.log("video settings");
                game.currentUi = new VideoSettingsMenu(font, titleFont, previousMenu);
            }),
            new Button(font, "Controls", "Change your keybinds.", 0, 0, 0, 0, () => {
                console.log("control menu");
                game.currentUi = new ControlsMenu(font, titleFont, previousMenu);
            }),
            // new Button(font, "Audio Settings", "Change the volume of different sounds.", 0, 0, 0, 0, () => {
            //     console.log("audio menu");
            //     game.currentUi = new AudioSettingsMenu(font, titleFont);
            // }),
            new Button(font, "Back", "Return to the "+previousMenu+".", 0, 0, 0, 0, () => {
                if(previousMenu==="main menu")game.currentUi = new MainMenu(font, titleFont);
                else game.currentUi = new PauseMenu(font, titleFont)
            })
        ];
        // update the size of the elements based on the initial screen size
        this.windowUpdate();
    }

    render(target: p5, upscaleSize: number): void {

        // render the rectangular image that the whole menu is on
        this.frame.render(target, upscaleSize);

        // loop through the buttons array and render each one.
        this.buttons.forEach(button => {
            button.render(target, upscaleSize);
        });

        this.titleFont.drawText(target, "Options", this.frame.x + 54*game.upscaleSize, this.frame.y + 16*game.upscaleSize)
    }

    windowUpdate() {
        // set the position of the frame
        this.frame.x = game.width/2-200/2*game.upscaleSize;// center the frame in the center of the screen
        this.frame.y = game.height/2-56*game.upscaleSize;
        this.frame.w = 200*game.upscaleSize;
        this.frame.h = 48*game.upscaleSize;

        // set the positions of all the buttons
        for(let i = 0; i<this.buttons.length; i++) {
            this.buttons[i].x = game.width/2-192/2*game.upscaleSize;
            this.buttons[i].y = game.height/2+20*i*game.upscaleSize;
            this.buttons[i].w = 192*game.upscaleSize;
            this.buttons[i].h = 16*game.upscaleSize;
            this.buttons[i].updateMouseOver(game.mouseX, game.mouseY);
        }
    }

}