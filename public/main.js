/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/Game.ts":
/*!****************************!*\
  !*** ./src/client/Game.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Game": () => (/* binding */ Game),
/* harmony export */   "game": () => (/* binding */ game)
/* harmony export */ });
/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! p5 */ "./node_modules/p5/lib/p5.min.js");
/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(p5__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_Assets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/Assets */ "./src/client/assets/Assets.ts");
/* harmony import */ var _ui_screens_MainMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui/screens/MainMenu */ "./src/client/ui/screens/MainMenu.ts");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/build/esm/index.js");
/* harmony import */ var _ui_screens_PauseMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui/screens/PauseMenu */ "./src/client/ui/screens/PauseMenu.ts");
/* harmony import */ var _NetManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NetManager */ "./src/client/NetManager.ts");
/* harmony import */ var _world_WorldTiles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./world/WorldTiles */ "./src/client/world/WorldTiles.ts");
/* harmony import */ var _input_Control__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./input/Control */ "./src/client/input/Control.ts");
/* harmony import */ var _world_particles_ColorParticle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./world/particles/ColorParticle */ "./src/client/world/particles/ColorParticle.ts");
/* harmony import */ var _global_TileEntity__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../global/TileEntity */ "./src/global/TileEntity.ts");










class Game extends (p5__WEBPACK_IMPORTED_MODULE_0___default()) {
    constructor(connection) {
        super(() => { }); // To create a new instance of p5 it will call back with the instance. We don't need this since we are extending the class
        this.worldWidth = 512; // width of the world in tiles   <!> MAKE SURE THIS IS NEVER LESS THAN 64!!! <!>
        this.worldHeight = 256; // height of the world in tiles  <!> MAKE SURE THIS IS NEVER LESS THAN 64!!! <!>
        this.TILE_WIDTH = 8; // width of a tiles in pixels
        this.TILE_HEIGHT = 8; // height of a tiles in pixels
        this.upscaleSize = 6; // number of screen pixels per texture pixels (think of this as hud scale in Minecraft)
        this.camX = 0; // position of the top left corner of the screen in un-up-scaled pixels (0 is left of world) (worldWidth*TILE_WIDTH is bottom of world)
        this.camY = 0; // position of the top left corner of the screen in un-up-scaled pixels (0 is top of world) (worldHeight*TILE_HEIGHT is bottom of world)
        this.pCamX = 0; // last frame's x of the camera
        this.pCamY = 0; // last frame's y of the camera
        this.interpolatedCamX = 0; // interpolated position of the camera
        this.interpolatedCamY = 0; // interpolated position of the camera
        this.desiredCamX = 0; // desired position of the camera
        this.desiredCamY = 0; // desired position of the camera
        this.screenshakeAmount = 0; // amount of screenshake happening at the current moment
        // tick management
        this.msSinceTick = 0; // this is the running counter of how many milliseconds it has been since the last tick.  The game can then
        this.msPerTick = 20; // the number of milliseconds per game tick.  1000/msPerTick = ticks per second
        this.amountSinceLastTick = 0; // this is a variable calculated every frame used for interpolation - domain[0,1)
        this.forgivenessCount = 50; // if the computer needs to do more than 50 ticks in a single frame, then it could be running behind, probably because of a freeze or the user being on a different tab.  In these cases, it's probably best to just ignore that any time has passed to avoid further freezing
        // physics constants
        this.GRAVITY_SPEED = 0.04; // in units per second tick, positive means downward gravity, negative means upward gravity
        this.DRAG_COEFFICIENT = 0.21; // arbitrary number, 0 means no drag
        // CHARACTER SHOULD BE ROUGHLY 12 PIXELS BY 20 PIXELS
        this.pickedUpSlot = -1;
        this.worldMouseX = 0; // the mouse position in world coordinates
        this.worldMouseY = 0; // the mouse position in world coordinates
        this.lastCursorMove = Date.now();
        this.mouseOn = true; // is the mouse on the window?
        this.keys = [];
        // the keycode for the key that does the action
        this.controls = [
            new _input_Control__WEBPACK_IMPORTED_MODULE_7__.Control('Walk Right', true, 68, () => {
                if (this.currentUi !== undefined)
                    return;
                this.world.player.rightButton = true;
            }, () => {
                if (this.currentUi !== undefined)
                    return;
                this.world.player.rightButton = false;
            }),
            new _input_Control__WEBPACK_IMPORTED_MODULE_7__.Control('Walk Left', true, 65, () => {
                if (this.currentUi !== undefined)
                    return;
                this.world.player.leftButton = true;
            }, () => {
                if (this.currentUi !== undefined)
                    return;
                this.world.player.leftButton = false;
            }),
            new _input_Control__WEBPACK_IMPORTED_MODULE_7__.Control('Jump', true, 87, () => {
                if (this.currentUi !== undefined)
                    return;
                this.world.player.jumpButton = true;
            }, () => {
                if (this.currentUi !== undefined)
                    return;
                this.world.player.jumpButton = false;
            }),
            new _input_Control__WEBPACK_IMPORTED_MODULE_7__.Control('Pause', true, 27, () => {
                //if inventory open{
                //close inventory
                //return;}
                if (this.currentUi === undefined)
                    this.currentUi = new _ui_screens_PauseMenu__WEBPACK_IMPORTED_MODULE_4__.PauseMenu(_assets_Assets__WEBPACK_IMPORTED_MODULE_1__.Fonts.title, _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.Fonts.big);
                else
                    this.currentUi = undefined;
            }),
            new _input_Control__WEBPACK_IMPORTED_MODULE_7__.Control('Inventory', true, 69, () => {
                //if ui open return;
                //if inventory closed open inventory
                //else close inventory
                console.log('inventory has not been implemented yet');
            }),
            new _input_Control__WEBPACK_IMPORTED_MODULE_7__.Control('Hotbar 1', true, 49, () => {
                this.world.inventory.selectedSlot = 0;
            }),
            new _input_Control__WEBPACK_IMPORTED_MODULE_7__.Control('Hotbar 2', true, 50, () => {
                this.world.inventory.selectedSlot = 1;
            }),
            new _input_Control__WEBPACK_IMPORTED_MODULE_7__.Control('Hotbar 3', true, 51, () => {
                this.world.inventory.selectedSlot = 2;
            }),
            new _input_Control__WEBPACK_IMPORTED_MODULE_7__.Control('Hotbar 4', true, 52, () => {
                this.world.inventory.selectedSlot = 3;
            }),
            new _input_Control__WEBPACK_IMPORTED_MODULE_7__.Control('Hotbar 5', true, 53, () => {
                this.world.inventory.selectedSlot = 4;
            }),
            new _input_Control__WEBPACK_IMPORTED_MODULE_7__.Control('Hotbar 6', true, 54, () => {
                this.world.inventory.selectedSlot = 5;
            }),
            new _input_Control__WEBPACK_IMPORTED_MODULE_7__.Control('Hotbar 7', true, 55, () => {
                this.world.inventory.selectedSlot = 6;
            }),
            new _input_Control__WEBPACK_IMPORTED_MODULE_7__.Control('Hotbar 8', true, 56, () => {
                this.world.inventory.selectedSlot = 7;
            }),
            new _input_Control__WEBPACK_IMPORTED_MODULE_7__.Control('Hotbar 9', true, 57, () => {
                this.world.inventory.selectedSlot = 8;
            }),
            new _input_Control__WEBPACK_IMPORTED_MODULE_7__.Control('Hotbar 10', true, 48, () => {
                this.world.inventory.selectedSlot = 9;
            }),
            new _input_Control__WEBPACK_IMPORTED_MODULE_7__.Control('Hotbar 11', true, 189, () => {
                this.world.inventory.selectedSlot = 10;
            }),
            new _input_Control__WEBPACK_IMPORTED_MODULE_7__.Control('Hotbar 12', true, 187, () => {
                this.world.inventory.selectedSlot = 11;
            }), // hot bar 12
        ];
        this.breaking = true;
        this.connection = connection;
        // Initialise the network manager
        this.netManager = new _NetManager__WEBPACK_IMPORTED_MODULE_5__.NetManager(this);
    }
    preload() {
        console.log('Loading assets');
        (0,_assets_Assets__WEBPACK_IMPORTED_MODULE_1__.loadAssets)(this, _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.UiAssets, _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.ItemAssets, _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.WorldAssets, _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.Fonts, _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.PlayerAnimations);
        console.log('Asset loading completed');
        this.skyShader = this.loadShader('assets/shaders/basic.vert', 'assets/shaders/sky.frag');
    }
    setup() {
        console.log('setup called');
        // make a canvas that fills the whole screen (a canvas is what is drawn to in p5.js, as well as lots of other JS rendering libraries)
        this.canvas = this.createCanvas(this.windowWidth, this.windowHeight);
        this.canvas.mouseOut(this.mouseExited);
        this.canvas.mouseOver(this.mouseEntered);
        this.skyLayer = this.createGraphics(this.width, this.height, 'webgl');
        this.currentUi = new _ui_screens_MainMenu__WEBPACK_IMPORTED_MODULE_2__.MainMenu(_assets_Assets__WEBPACK_IMPORTED_MODULE_1__.Fonts.title, _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.Fonts.big);
        // Tick
        setInterval(() => {
            if (this.world === undefined)
                return;
            this.world.tick(this);
        }, 1000 / this.netManager.playerTickRate);
        this.connection.emit('join', 'e4022d403dcc6d19d6a68ba3abfd0a60', 'player' + Math.floor(Math.random() * 1000));
        // go for a scale of <64 tiles wide screen
        this.windowResized();
        // remove texture interpolation (enable point filtering for images)
        this.noSmooth();
        // the highest keycode is 255, which is "Toggle Touchpad", according to keycode.info
        for (let i = 0; i < 255; i++) {
            this.keys.push(false);
        }
        // set the framerate goal to as high as possible (this will end up capping to your monitor's refresh rate with vsync.)
        this.frameRate(Infinity);
        // AudioAnpssets.ambient.winter1.playSound();
        this.particleMultiplier = 1;
        this.skyToggle = true;
        this.skyMod = 2;
        this.particles = [];
        this.cursor("assets/textures/ui/cursor2.png");
    }
    draw() {
        if (this.frameCount === 2) {
            //has to be done on the second frame for some reason?
            this.skyShader.setUniform('screenDimensions', [
                (this.width / this.upscaleSize) * 2,
                (this.height / this.upscaleSize) * 2,
            ]);
            this.skyShader.setUniform('skyImage', _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.WorldAssets.shaderResources.skyImage.image);
            Object.values(_assets_Assets__WEBPACK_IMPORTED_MODULE_1__.PlayerAnimations).forEach(playerAnimation => {
                playerAnimation.forEach(animationFrame => {
                    console.log("loading animation " + animationFrame[0].path);
                    animationFrame[0].loadReflection(this);
                });
            });
        }
        // do the tick calculations
        this.doTicks();
        // update mouse position
        this.updateMouse();
        if (this.mouseIsPressed) {
            this.world.inventory.worldClick(this.worldMouseX, this.worldMouseY);
        }
        // update the camera's interpolation
        this.moveCamera();
        // wipe the screen with a happy little layer of light blue
        this.skyShader.setUniform('offsetCoords', [
            this.interpolatedCamX,
            this.interpolatedCamY,
        ]);
        this.skyShader.setUniform('millis', this.millis());
        this.skyLayer.shader(this.skyShader);
        // this.fill(255, 0, 0);
        this.skyLayer.rect(0, 0, this.skyLayer.width, this.skyLayer.height);
        this.image(this.skyLayer, 0, 0, this.width, this.height);
        if (this.world !== undefined)
            this.world.render(this, this.upscaleSize);
        // render the player, all items, etc.
        //this.renderEntities();
        //delete any particles that have gotten too old
        for (let i = 0; i < this.particles.length; i++) {
            if (this.particles[i].age > this.particles[i].lifespan) {
                this.particles.splice(i, 1);
                i--;
            }
        }
        //no outline on particles
        this.noStroke();
        //draw all of the particles
        for (let particle of this.particles) {
            particle.render(this, this.upscaleSize);
        }
        this.smooth(); //enable image lerp
        this.drawingContext.globalAlpha = 0.6; //make image translucent
        _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.UiAssets.vignette.render(this, 0, 0, this.width, this.height);
        this.drawingContext.globalAlpha = 1.0;
        this.noSmooth();
        // draw the hot bar
        if (this.world !== undefined) {
            for (let i = 0; i < this.world.inventory.width; i++) {
                const currentItem = this.world.inventory.items[i];
                _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.UiAssets.ui_slot.render(this, 2 * this.upscaleSize + 16 * i * this.upscaleSize, 2 * this.upscaleSize, 16 * this.upscaleSize, 16 * this.upscaleSize);
                if (this.world.inventory.selectedSlot === i) {
                    _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.UiAssets.ui_slot_selected.render(this, 2 * this.upscaleSize + 16 * i * this.upscaleSize, 2 * this.upscaleSize, 16 * this.upscaleSize, 16 * this.upscaleSize);
                }
                else {
                    _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.UiAssets.ui_slot.render(this, 2 * this.upscaleSize + 16 * i * this.upscaleSize, 2 * this.upscaleSize, 16 * this.upscaleSize, 16 * this.upscaleSize);
                }
                if (currentItem !== undefined && currentItem !== null) {
                    this.fill(0);
                    if (this.pickedUpSlot === i) {
                        this.drawingContext.globalAlpha = 0.5;
                        this.fill(0, 127);
                    }
                    _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.ItemAssets[currentItem.item].render(this, 6 * this.upscaleSize + 16 * i * this.upscaleSize, 6 * this.upscaleSize, 8 * this.upscaleSize, 8 * this.upscaleSize);
                    _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.Fonts.tom_thumb.drawText(this, currentItem.quantity.toString(), (-4 * currentItem.quantity.toString().length + 16 * (i + 1.0625)) * this.upscaleSize, 11 * this.upscaleSize);
                    // this.text(
                    // 	currentItem.quantity,
                    // 	16 * this.upscaleSize + 16 * i * this.upscaleSize,
                    // 	16 * this.upscaleSize,
                    // );
                    this.drawingContext.globalAlpha = 1.0;
                }
            }
            // draw the cursor
            this.drawCursor();
        }
        if (this.currentUi !== undefined)
            this.currentUi.render(this, this.upscaleSize);
        _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.Fonts.tom_thumb.drawText(this, "Snowed In v1.0.0", this.upscaleSize, this.height - 6 * this.upscaleSize);
        // console.timeEnd("frame");
    }
    windowResized() {
        this.resizeCanvas(this.windowWidth, this.windowHeight);
        this.skyLayer.resizeCanvas(this.windowWidth, this.windowHeight);
        // go for a scale of <48 tiles screen
        this.upscaleSize = Math.min(Math.ceil(this.windowWidth / 48 / this.TILE_WIDTH), Math.ceil(this.windowHeight / 48 / this.TILE_HEIGHT));
        this.skyShader.setUniform('screenDimensions', [
            (this.windowWidth / this.upscaleSize) * 2,
            (this.windowHeight / this.upscaleSize) * 2,
        ]);
        if (this.currentUi !== undefined)
            this.currentUi.windowUpdate();
    }
    keyPressed(event) {
        this.keys[this.keyCode] = true;
        for (let control of this.controls) {
            if (control.keyboard && control.keyCode === event.keyCode)
                //event.keyCode is deprecated but i don't care
                control.onPressed();
        }
        if (this.currentUi !== undefined &&
            this.currentUi.inputBoxes !== undefined) {
            for (let i of this.currentUi.inputBoxes) {
                if (i.listening) {
                    console.log('test3');
                    i.listening = false;
                    this.controls[i.index].keyCode = event.keyCode;
                    this.controls[i.index].keyboard = false;
                    i.value = event.keyCode;
                    i.keyboard = true;
                    i.image = _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.UiAssets.button_unselected;
                }
            }
        }
    }
    keyReleased(event) {
        this.keys[this.keyCode] = false;
        for (let control of this.controls) {
            if (control.keyboard && control.keyCode === event.keyCode)
                //event.keyCode is deprecated but i don't care
                control.onReleased();
        }
    }
    // when it's dragged update the sliders
    mouseDragged() {
        if (this.currentUi !== undefined &&
            this.currentUi.sliders !== undefined) {
            for (const i of this.currentUi.sliders) {
                i.updateSliderPosition(this.mouseX);
            }
        }
    }
    mouseMoved() {
        if (this.currentUi !== undefined) {
            if (this.currentUi.buttons !== undefined) {
                for (const i of this.currentUi.buttons) {
                    i.updateMouseOver(this.mouseX, this.mouseY);
                }
            }
            if (this.currentUi.inputBoxes !== undefined) {
                for (const i of this.currentUi.inputBoxes) {
                    i.updateMouseOver(this.mouseX, this.mouseY);
                }
            }
        }
    }
    mousePressed(e) {
        // image(uiSlotImage, 2*upscaleSize+16*i*upscaleSize, 2*upscaleSize, 16*upscaleSize, 16*upscaleSize);
        if (this.currentUi !== undefined) {
            this.currentUi.mousePressed(e.button);
            return; // asjgsadkjfgIISUSUEUE
        }
        if (this.world === undefined)
            return;
        if (this.mouseX > 2 * this.upscaleSize &&
            this.mouseX <
                2 * this.upscaleSize +
                    16 * this.upscaleSize * this.world.inventory.width &&
            this.mouseY > 2 * this.upscaleSize &&
            this.mouseY < 18 * this.upscaleSize) {
            const clickedSlot = Math.floor((this.mouseX - 2 * this.upscaleSize) / 16 / this.upscaleSize);
            if (this.world.inventory.pickedUpSlot === undefined) {
                if (this.world.inventory.items[clickedSlot] !== undefined) {
                    this.world.inventory.pickedUpSlot = clickedSlot;
                }
            }
            else {
                // Swap clicked slot with the picked slot
                this.connection.emit('inventorySwap', this.world.inventory.pickedUpSlot, clickedSlot);
                // Set the picked up slot to nothing
                this.world.inventory.pickedUpSlot = undefined;
            }
        }
        else {
            this.world.inventory.worldClickCheck(this.worldMouseX, this.worldMouseY);
        }
    }
    mouseReleased() {
        /*
        if(this.currentUi !== undefined) {
            this.currentUi.mouseReleased();
        }
        const releasedSlot: number = Math.floor(
            (this.mouseX - 2 * this.upscaleSize) / 16 / this.upscaleSize
        );

        if (this.pickedUpSlot !== -1) {
            if (
                this.mouseX > 2 * this.upscaleSize &&
                this.mouseX <
                    2 * this.upscaleSize +
                        16 * this.upscaleSize * this.hotBar.length &&
                this.mouseY > 2 * this.upscaleSize &&
                this.mouseY < 18 * this.upscaleSize
            ) {
                // Make sure that the slot that the cursor was released was not the slot that was selected
                if (releasedSlot === this.pickedUpSlot) return;

                // Swap the picked up slot with the slot the mouse was released on
                [this.hotBar[this.pickedUpSlot], this.hotBar[releasedSlot]] = [
                    this.hotBar[releasedSlot],
                    this.hotBar[this.pickedUpSlot],
                ];

                this.pickedUpSlot = -1;
            } else {
                this.hotBar[this.pickedUpSlot] = undefined;
                this.pickedUpSlot = -1;
            }
        }

         */
    }
    mouseWheel(event) {
        //mouseEvent apparently doesn't have a delta property sooooo idk what to do sorry for the any type
        if (this.currentUi !== undefined &&
            this.currentUi.scroll !== undefined) {
            this.currentUi.scroll += event.delta / 10;
            this.currentUi.scroll = this.constrain(this.currentUi.scroll, this.currentUi.minScroll, this.currentUi.maxScroll);
            console.log(`Scroll: ${this.currentUi.scroll}, Min: ${this.currentUi.minScroll}, Max: ${this.currentUi.maxScroll}`);
        }
        else {
            this.world.inventory.selectedSlot += Math.floor(event.delta / 100);
            this.world.inventory.selectedSlot = this.world.inventory.selectedSlot % this.world.inventory.width;
            if (this.world.inventory.selectedSlot < 0)
                this.world.inventory.selectedSlot += this.world.inventory.width;
            console.log(this.world.inventory.selectedSlot);
        }
    }
    moveCamera() {
        this.interpolatedCamX =
            this.pCamX +
                (this.camX - this.pCamX) * this.amountSinceLastTick +
                (this.noise(this.millis() / 200) - 0.5) * this.screenshakeAmount;
        this.interpolatedCamY =
            this.pCamY +
                (this.camY - this.pCamY) * this.amountSinceLastTick +
                (this.noise(0, this.millis() / 200) - 0.5) * this.screenshakeAmount;
    }
    doTicks() {
        // increase the time since a tick has happened by deltaTime, which is a built-in p5.js value
        this.msSinceTick += this.deltaTime;
        // define a temporary variable called ticksThisFrame - this is used to keep track of how many ticks have been calculated within the duration of the current frame.  As long as this value is less than the forgivenessCount variable, it continues to calculate ticks as necessary.
        let ticksThisFrame = 0;
        while (this.msSinceTick > this.msPerTick &&
            ticksThisFrame !== this.forgivenessCount) {
            // console.time("tick");
            if (this.world !== undefined)
                this.doTick();
            // console.timeEnd("tick");
            this.msSinceTick -= this.msPerTick;
            ticksThisFrame++;
        }
        if (ticksThisFrame === this.forgivenessCount) {
            this.msSinceTick = 0;
            console.warn("lag spike detected, tick calculations couldn't keep up");
        }
        this.amountSinceLastTick = this.msSinceTick / this.msPerTick;
    }
    doTick() {
        if (this.world !== undefined && this.world.tileEntities !== undefined) { //tile entity particles
            for (let i = 0; i < 1 * this.particleMultiplier; i++) {
                let k = Object.keys(this.world.tileEntities);
                let r = this.world.tileEntities[k[Math.floor(Math.random() * k.length)]];
                if (r.type_ === _global_TileEntity__WEBPACK_IMPORTED_MODULE_9__.TileEntities.Tree) {
                    let t = r.coveredTiles[Math.floor(Math.random() * r.coveredTiles.length)];
                    this.particles.push(new _world_particles_ColorParticle__WEBPACK_IMPORTED_MODULE_8__.ColorParticle("#348965", Math.random() * 0.1 + 0.1, 20, t % this.world.width + Math.random(), Math.floor(t / this.world.width) + Math.random(), 0.1 * (Math.random() - 0.5), 0.06 * (Math.random() - 0.7), false));
                }
            }
        }
        for (let particle of this.particles) {
            particle.tick();
        }
        if (this.world.player === undefined)
            return;
        if (this.world.player === undefined)
            return;
        this.world.player.keyboardInput();
        this.world.player.applyGravityAndDrag();
        this.world.player.applyVelocityAndCollide();
        this.pCamX = this.camX;
        this.pCamY = this.camY;
        this.desiredCamX =
            this.world.player.x +
                this.world.player.width / 2 -
                this.width / 2 / this.TILE_WIDTH / this.upscaleSize +
                this.world.player.xVel * 40;
        this.desiredCamY =
            this.world.player.y +
                this.world.player.height / 2 -
                this.height / 2 / this.TILE_HEIGHT / this.upscaleSize +
                this.world.player.yVel * 20;
        this.camX = (this.desiredCamX + this.camX * 24) / 25;
        this.camY = (this.desiredCamY + this.camY * 24) / 25;
        this.screenshakeAmount *= 0.8;
        if (this.camX < 0) {
            this.camX = 0;
        }
        else if (this.camX >
            this.worldWidth - this.width / this.upscaleSize / this.TILE_WIDTH) {
            this.camX =
                this.worldWidth -
                    this.width / this.upscaleSize / this.TILE_WIDTH;
        }
        if (this.camY >
            this.worldHeight - this.height / this.upscaleSize / this.TILE_HEIGHT) {
            this.camY =
                this.worldHeight -
                    this.height / this.upscaleSize / this.TILE_HEIGHT;
        }
        // for (const item of this.items) {
        //     item.goTowardsPlayer();
        //     item.combineWithNearItems();
        //     item.applyGravityAndDrag();
        //     item.applyVelocityAndCollide();
        // }
        //
        // for (let i = 0; i < this.items.length; i++) {
        //     if (this.items[i].deleted === true) {
        //         this.items.splice(i, 1);
        //         i--;
        //     }
        // }
    }
    uiFrameRect(x, y, w, h) {
        // set the coords and dimensions to round to the nearest un-upscaled pixel
        x = Math.round(x / this.upscaleSize) * this.upscaleSize;
        y = Math.round(y / this.upscaleSize) * this.upscaleSize;
        w = Math.round(w / this.upscaleSize) * this.upscaleSize;
        h = Math.round(h / this.upscaleSize) * this.upscaleSize;
        // corners
        _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.UiAssets.ui_frame.renderPartial(this, x, y, 7 * this.upscaleSize, 7 * this.upscaleSize, 0, 0, 7, 7);
        _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.UiAssets.ui_frame.renderPartial(this, x + w - 7 * this.upscaleSize, y, 7 * this.upscaleSize, 7 * this.upscaleSize, 8, 0, 7, 7);
        _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.UiAssets.ui_frame.renderPartial(this, x, y + h - 7 * this.upscaleSize, 7 * this.upscaleSize, 7 * this.upscaleSize, 0, 8, 7, 7);
        _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.UiAssets.ui_frame.renderPartial(this, x + w - 7 * this.upscaleSize, y + h - 7 * this.upscaleSize, 7 * this.upscaleSize, 7 * this.upscaleSize, 8, 8, 7, 7);
        // top and bottom
        _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.UiAssets.ui_frame.renderPartial(this, x + 7 * this.upscaleSize, y, w - 14 * this.upscaleSize, 7 * this.upscaleSize, 7, 0, 1, 7);
        _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.UiAssets.ui_frame.renderPartial(this, x + 7 * this.upscaleSize, y + h - 7 * this.upscaleSize, w - 14 * this.upscaleSize, 7 * this.upscaleSize, 7, 8, 1, 7);
        // left and right
        _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.UiAssets.ui_frame.renderPartial(this, x, y + 7 * this.upscaleSize, 7 * this.upscaleSize, h - 14 * this.upscaleSize, 0, 7, 7, 1);
        _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.UiAssets.ui_frame.renderPartial(this, x + w - 7 * this.upscaleSize, y + 7 * this.upscaleSize, 7 * this.upscaleSize, h - 14 * this.upscaleSize, 8, 7, 7, 1);
        // center
        _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.UiAssets.ui_frame.renderPartial(this, x + 7 * this.upscaleSize, y + 7 * this.upscaleSize, w - 14 * this.upscaleSize, h - 14 * this.upscaleSize, 7, 7, 1, 1);
    }
    /*
   /$$$$$$$  /$$                           /$$
  | $$__  $$| $$                          |__/
  | $$  \ $$| $$$$$$$  /$$   /$$  /$$$$$$$ /$$  /$$$$$$$  /$$$$$$$ /$$
  | $$$$$$$/| $$__  $$| $$  | $$ /$$_____/| $$ /$$_____/ /$$_____/|__/
  | $$____/ | $$  \ $$| $$  | $$|  $$$$$$ | $$| $$      |  $$$$$$
  | $$      | $$  | $$| $$  | $$ \____  $$| $$| $$       \____  $$ /$$
  | $$      | $$  | $$|  $$$$$$$ /$$$$$$$/| $$|  $$$$$$$ /$$$$$$$/|__/
  |__/      |__/  |__/ \____  $$|_______/ |__/ \_______/|_______/
                       /$$  | $$
                      |  $$$$$$/
                       \______/
  */
    // this class holds an axis-aligned rectangle affected by gravity, drag, and collisions with tiles.
    rectVsRay(rectX, rectY, rectW, rectH, rayX, rayY, rayW, rayH) {
        // this ray is actually a line segment mathematically, but it's common to see people refer to similar checks as ray-casts, so for the duration of the definition of this function, ray can be assumed to mean the same as line segment.
        // if the ray doesn't have a length, then it can't have entered the rectangle.  This assumes that the objects don't start in collision, otherwise they'll behave strangely
        if (rayW === 0 && rayH === 0) {
            return false;
        }
        // calculate how far along the ray each side of the rectangle intersects with it (each side is extended out infinitely in both directions)
        const topIntersection = (rectY - rayY) / rayH;
        const bottomIntersection = (rectY + rectH - rayY) / rayH;
        const leftIntersection = (rectX - rayX) / rayW;
        const rightIntersection = (rectX + rectW - rayX) / rayW;
        if (isNaN(topIntersection) ||
            isNaN(bottomIntersection) ||
            isNaN(leftIntersection) ||
            isNaN(rightIntersection)) {
            // you have to use the JS function isNaN() to check if a value is NaN because both NaN==NaN and NaN===NaN are false.
            // if any of these values are NaN, no collision has occurred
            return false;
        }
        // calculate the nearest and farthest intersections for both x and y
        const nearX = this.min(leftIntersection, rightIntersection);
        const farX = this.max(leftIntersection, rightIntersection);
        const nearY = this.min(topIntersection, bottomIntersection);
        const farY = this.max(topIntersection, bottomIntersection);
        if (nearX > farY || nearY > farX) {
            // this must mean that the line that makes up the line segment doesn't pass through the ray
            return false;
        }
        if (farX < 0 || farY < 0) {
            // the intersection is happening before the ray starts, so the ray is pointing away from the triangle
            return false;
        }
        // calculate where the potential collision could be
        const nearCollisionPoint = this.max(nearX, nearY);
        if (nearX > 1 || nearY > 1) {
            // the intersection happens after the ray(line segment) ends
            return false;
        }
        if (nearX === nearCollisionPoint) {
            // it must have collided on either the left or the right! now which?
            if (leftIntersection === nearX) {
                // It must have collided on the left!  Return the collision normal [-1, 0]
                return [-1, 0, nearCollisionPoint];
            }
            // If it didn't collide on the left, it must have collided on the right.  Return the collision normal [1, 0]
            return [1, 0, nearCollisionPoint];
        }
        // If it didn't collide on the left or right, it must have collided on either the top or the bottom! now which?
        if (topIntersection === nearY) {
            // It must have collided on the top!  Return the collision normal [0, -1]
            return [0, -1, nearCollisionPoint];
        }
        // If it didn't collide on the top, it must have collided on the bottom.  Return the collision normal [0, 1]
        return [0, 1, nearCollisionPoint];
        // output if no collision: false
        // output if collision: [collision normal X, collision normal Y, nearCollisionPoint]
        //                         -1 to 1              -1 to 1            0 to 1
    }
    renderEntities() {
        // draw player
        // this.fill(255, 0, 0);
        // this.noStroke();
        // this.rect(
        //     (this.world.player.interpolatedX * this.TILE_WIDTH -
        //         this.interpolatedCamX * this.TILE_WIDTH) *
        //         this.upscaleSize,
        //     (this.world.player.interpolatedY * this.TILE_HEIGHT -
        //         this.interpolatedCamY * this.TILE_HEIGHT) *
        //         this.upscaleSize,
        //     this.world.player.width * this.upscaleSize * this.TILE_WIDTH,
        //     this.world.player.height * this.upscaleSize * this.TILE_HEIGHT
        // );
        // for (const item of this.items) {
        //     item.findInterpolatedCoordinates();
        //
        //     item.itemStack.texture.render(
        //         this,
        //         (item.interpolatedX * this.TILE_WIDTH -
        //             this.interpolatedCamX * this.TILE_WIDTH) *
        //             this.upscaleSize,
        //         (item.interpolatedY * this.TILE_HEIGHT -
        //             this.interpolatedCamY * this.TILE_HEIGHT) *
        //             this.upscaleSize,
        //         item.w * this.upscaleSize * this.TILE_WIDTH,
        //         item.h * this.upscaleSize * this.TILE_HEIGHT
        //     );
        //
        //     // Render the item quantity label
        //     this.fill(0);
        //
        //     this.noStroke();
        //
        //     this.textAlign(this.RIGHT, this.BOTTOM);
        //     this.textSize(5 * this.upscaleSize);
        //
        //     this.text(
        //         item.itemStack.stackSize,
        //         (item.interpolatedX * this.TILE_WIDTH -
        //             this.interpolatedCamX * this.TILE_WIDTH) *
        //             this.upscaleSize,
        //         (item.interpolatedY * this.TILE_HEIGHT -
        //             this.interpolatedCamY * this.TILE_HEIGHT) *
        //             this.upscaleSize
        //     );
        // }
    }
    /*
    pickUpItem(itemStack: ItemStack): boolean {
        for (let i = 0; i < this.hotBar.length; i++) {
            const item = this.hotBar[i];

            // If there are no items in the current slot of the hotBar
            if (item === undefined) {
                this.hotBar[i] = itemStack;
                return true;
            }

            if (
                item === itemStack &&
                item.stackSize < item.maxStackSize
            ) {
                const remainingSpace = item.maxStackSize - item.stackSize;

                // Top off the stack with items if it can take more than the stack being added
                if (remainingSpace >= itemStack.stackSize) {
                    this.hotBar[i].stackSize =
                        item.stackSize + itemStack.stackSize;
                    return true;
                }

                itemStack.stackSize -= remainingSpace;

                this.hotBar[i].stackSize = itemStack.maxStackSize;
            }
        }
        console.error(
            `Could not pickup ${itemStack.stackSize} ${itemStack.name}`
        );
        return false;
    }

     */
    mouseExited() {
        this.mouseOn = false;
    }
    mouseEntered() {
        this.mouseOn = true;
    }
    updateMouse() {
        if (Math.floor((this.interpolatedCamX * this.TILE_WIDTH +
            this.mouseX / this.upscaleSize) /
            this.TILE_WIDTH) !== this.worldMouseX ||
            Math.floor((this.interpolatedCamY * this.TILE_HEIGHT +
                this.mouseY / this.upscaleSize) /
                this.TILE_HEIGHT) !== this.worldMouseY) {
            this.lastCursorMove = Date.now();
        }
        // world mouse x and y variables hold the mouse position in world tiles.  0, 0 is top left
        this.worldMouseX = Math.floor((this.interpolatedCamX * this.TILE_WIDTH +
            this.mouseX / this.upscaleSize) /
            this.TILE_WIDTH);
        this.worldMouseY = Math.floor((this.interpolatedCamY * this.TILE_HEIGHT +
            this.mouseY / this.upscaleSize) /
            this.TILE_HEIGHT);
    }
    drawCursor() {
        if (this.mouseOn) {
            // if (this.pickedUpSlot > -1) {
            //     this.hotbar[this.pickedUpSlot].texture.render(
            //         this,
            //         this.mouseX,
            //         this.mouseY,
            //         8 * this.upscaleSize,
            //         8 * this.upscaleSize
            //     );
            //     this.text(
            //         this.hotBar[this.pickedUpSlot].stackSize,
            //         this.mouseX + 10 * this.upscaleSize,
            //         this.mouseY + 10 * this.upscaleSize
            //     );
            // }
            _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.UiAssets.selected_tile.render(this, Math.round((this.worldMouseX - this.interpolatedCamX) *
                this.TILE_WIDTH *
                this.upscaleSize), Math.round((this.worldMouseY - this.interpolatedCamY) *
                this.TILE_HEIGHT *
                this.upscaleSize), this.TILE_WIDTH * this.upscaleSize, this.TILE_HEIGHT * this.upscaleSize);
            if (Date.now() - this.lastCursorMove > 1000) {
                let selectedTile = this.world.worldTiles[this.world.width * this.worldMouseY + this.worldMouseX];
                if (typeof (selectedTile) === 'string') {
                    this.text("Tile entity: " + selectedTile, this.mouseX, this.mouseY); //JANKY ALERT
                }
                else if (_world_WorldTiles__WEBPACK_IMPORTED_MODULE_6__.WorldTiles[selectedTile] !== undefined) {
                    this.text(_world_WorldTiles__WEBPACK_IMPORTED_MODULE_6__.WorldTiles[selectedTile].name, this.mouseX, this.mouseY); //JANKY ALERT
                }
            }
        }
    }
}
const connection = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_3__.io)({
    auth: { token: window.localStorage.getItem('token') },
});
const game = new Game(connection);


/***/ }),

/***/ "./src/client/NetManager.ts":
/*!**********************************!*\
  !*** ./src/client/NetManager.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NetManager": () => (/* binding */ NetManager)
/* harmony export */ });
/* harmony import */ var _world_World__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./world/World */ "./src/client/world/World.ts");
/* harmony import */ var _world_entities_EntityClasses__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./world/entities/EntityClasses */ "./src/client/world/entities/EntityClasses.ts");
/* harmony import */ var _player_PlayerLocal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player/PlayerLocal */ "./src/client/player/PlayerLocal.ts");
/* harmony import */ var _player_Inventory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player/Inventory */ "./src/client/player/Inventory.ts");
/* harmony import */ var _world_entities_TileEntity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./world/entities/TileEntity */ "./src/client/world/entities/TileEntity.ts");
/* harmony import */ var _assets_Assets__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/Assets */ "./src/client/assets/Assets.ts");






class NetManager {
    constructor(game) {
        this.game = game;
        // Init event
        this.game.connection.on('init', (playerTickRate, token) => {
            console.log(`Tick rate set to: ${playerTickRate}`);
            this.playerTickRate = playerTickRate;
            if (token) {
                window.localStorage.setItem('token', token);
                this.game.connection.auth.token = token;
            }
        });
        // Initialization events
        {
            // Load the world and set the player entity id
            this.game.connection.on('worldLoad', (width, height, tiles, tileEntities, entities, player, inventory) => {
                console.log(entities);
                let tileEntities2 = {};
                tileEntities.forEach(tileEntity => {
                    console.log('adding tile entity: ' + tileEntity.id);
                    tileEntities2[tileEntity.id] = {
                        id: tileEntity.id,
                        coveredTiles: tileEntity.coveredTiles,
                        type_: tileEntity.payload.type_,
                        data: tileEntity.payload.data,
                        animFrame: randint(0, _assets_Assets__WEBPACK_IMPORTED_MODULE_5__.WorldAssets.tileEntities[tileEntity.payload.type_].length - 1),
                        animate: _world_entities_TileEntity__WEBPACK_IMPORTED_MODULE_4__.TileEntityAnimations[tileEntity.payload.type_],
                    };
                });
                this.game.world = new _world_World__WEBPACK_IMPORTED_MODULE_0__.World(width, height, tiles, tileEntities2);
                this.game.world.inventory = new _player_Inventory__WEBPACK_IMPORTED_MODULE_3__.Inventory(inventory);
                this.game.world.player = new _player_PlayerLocal__WEBPACK_IMPORTED_MODULE_2__.PlayerLocal(player);
                entities.forEach(entity => {
                    this.game.world.entities[entity.id] = new _world_entities_EntityClasses__WEBPACK_IMPORTED_MODULE_1__.EntityClasses[entity.type](entity);
                });
            });
        }
        // World events
        {
            // Tile updates such as breaking and placing
            this.game.connection.on('worldUpdate', (updatedTiles) => {
                // If the world is not set
                if (this.game.world === undefined)
                    return;
                updatedTiles.forEach(tile => {
                    this.game.world.updateTile(tile.tileIndex, tile.tile);
                });
            });
            this.game.connection.on('inventoryUpdate', updates => {
                // If the world is not set
                if (this.game.world === undefined)
                    return;
                updates.forEach(update => {
                    console.log(update);
                    this.game.world.inventory.items[update.slot] = update.item;
                });
            });
        }
        // Player events
        {
            this.game.connection.on('entityUpdate', entityData => {
                // If the world is not set
                if (this.game.world === undefined)
                    return;
                const entity = this.game.world.entities[entityData.id];
                if (entity === undefined)
                    return;
                entity.updateData(entityData);
            });
            this.game.connection.on('entityCreate', entityData => {
                // If the world is not set
                if (this.game.world === undefined)
                    return;
                this.game.world.entities[entityData.id] = new _world_entities_EntityClasses__WEBPACK_IMPORTED_MODULE_1__.EntityClasses[entityData.type](entityData);
            });
            this.game.connection.on('entityDelete', id => {
                // If the world is not set
                if (this.game.world === undefined)
                    return;
                delete this.game.world.entities[id];
            });
            // Update the other players in the world
            this.game.connection.on('entitySnapshot', (snapshot) => {
                // If the world is not set
                if (this.game.world === undefined)
                    return;
                this.game.world.updatePlayers(snapshot);
            });
        }
    }
}
function randint(x1, x2) {
    return Math.floor(x1 + Math.random() * (x2 + 1 - x1));
}


/***/ }),

/***/ "./src/client/assets/Assets.ts":
/*!*************************************!*\
  !*** ./src/client/assets/Assets.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayerAnimations": () => (/* binding */ PlayerAnimations),
/* harmony export */   "ItemAssets": () => (/* binding */ ItemAssets),
/* harmony export */   "UiAssets": () => (/* binding */ UiAssets),
/* harmony export */   "WorldAssets": () => (/* binding */ WorldAssets),
/* harmony export */   "Fonts": () => (/* binding */ Fonts),
/* harmony export */   "Keys": () => (/* binding */ Keys),
/* harmony export */   "AudioAssets": () => (/* binding */ AudioAssets),
/* harmony export */   "loadAssets": () => (/* binding */ loadAssets)
/* harmony export */ });
/* harmony import */ var _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resources/TileResource */ "./src/client/assets/resources/TileResource.ts");
/* harmony import */ var _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resources/ImageResource */ "./src/client/assets/resources/ImageResource.ts");
/* harmony import */ var _resources_FontResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resources/FontResource */ "./src/client/assets/resources/FontResource.ts");
/* harmony import */ var _resources_AudioResourceGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resources/AudioResourceGroup */ "./src/client/assets/resources/AudioResourceGroup.ts");
/* harmony import */ var _resources_AudioResource__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resources/AudioResource */ "./src/client/assets/resources/AudioResource.ts");
/* harmony import */ var _global_Inventory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../global/Inventory */ "./src/global/Inventory.ts");
/* harmony import */ var _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./resources/ReflectedImageResource */ "./src/client/assets/resources/ReflectedImageResource.ts");
/* harmony import */ var _resources_Resource__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./resources/Resource */ "./src/client/assets/resources/Resource.ts");








const playerAnimations = (data) => data;
const PlayerAnimations = playerAnimations({
    //image, milliseconds to display for
    idle: [
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanidle1.png'), 135],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanidle2.png'), 135],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanidle3.png'), 135],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanidle4.png'), 135],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanidle5.png'), 135],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanidle6.png'), 135],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanidle7.png'), 135],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanidle8.png'), 135],
    ],
    idleleft: [
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanidleflipped1.png'), 135],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanidleflipped2.png'), 135],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanidleflipped3.png'), 135],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanidleflipped4.png'), 135],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanidleflipped5.png'), 135],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanidleflipped6.png'), 135],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanidleflipped7.png'), 135],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanidleflipped8.png'), 135],
    ],
    walk: [
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanroll01.png'), 75],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanroll02.png'), 75],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanroll03.png'), 75],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanroll04.png'), 75],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanroll05.png'), 75],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanroll06.png'), 75],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanroll07.png'), 75],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanroll08.png'), 75],
    ],
    walkleft: [
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanrollleft01.png'), 75],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanrollleft02.png'), 75],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanrollleft03.png'), 75],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanrollleft04.png'), 75],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanrollleft05.png'), 75],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanrollleft06.png'), 75],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanrollleft07.png'), 75],
        [new _resources_ReflectedImageResource__WEBPACK_IMPORTED_MODULE_6__.ReflectableImageResource('assets/textures/player/snowmanrollleft08.png'), 75],
    ],
});
// Item related assets
const ItemAssets = {
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.SnowBlock]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_snow.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.IceBlock]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_ice.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.DirtBlock]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_dirt.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.Stone0Block]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_stone0.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.Stone1Block]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_stone1.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.Stone2Block]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_stone2.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.Stone3Block]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_stone3.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.Stone4Block]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_stone4.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.Stone5Block]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_stone5.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.Stone6Block]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_stone6.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.Stone7Block]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_stone7.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.Stone8Block]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_stone8.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.Stone9Block]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_stone9.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.TinBlock]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_tin.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.AluminumBlock]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_aluminum.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.GoldBlock]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_gold.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.TitaniumBlock]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_titanium.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.GrapeBlock]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_grape.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.Wood0Block]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_wood0.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.Wood1Block]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_wood1.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.Wood2Block]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_wood2.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.Wood3Block]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_wood3.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.Wood4Block]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_wood4.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.Wood5Block]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_wood5.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.Wood6Block]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_wood6.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.Wood7Block]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_wood7.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.Wood8Block]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_wood8.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.Wood9Block]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/block_wood9.png'),
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_5__.ItemType.Seed]: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/items/seed.png'),
};
// Ui related assets
const UiAssets = {
    ui_slot_selected: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/ui/uislot_selected.png'),
    ui_slot: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/ui/uislot.png'),
    ui_frame: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/ui/uiframe.png'),
    button_unselected: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/ui/button0.png'),
    button_selected: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/ui/button1.png'),
    slider_bar: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/ui/sliderBar.png'),
    slider_handle: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/ui/sliderHandle.png'),
    title_image: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/ui/snowedinBUMP.png'),
    vignette: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/ui/vignette-export.png'),
    selected_tile: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/ui/selectedtile.png'),
};
// World related assets
const WorldAssets = {
    shaderResources: {
        skyImage: new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/shader_resources/poissonsnow.png'),
    },
    middleground: {
        tileset_ice: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_ice.png', 16, 1, 8, 8),
        tileset_snow: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_snow.png', 16, 1, 8, 8),
        tileset_dirt: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_dirt0.png', 16, 1, 8, 8),
        tileset_stone0: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_stone0.png', 16, 1, 8, 8),
        tileset_stone1: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_stone1.png', 16, 1, 8, 8),
        tileset_stone2: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_stone2.png', 16, 1, 8, 8),
        tileset_stone3: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_stone3.png', 16, 1, 8, 8),
        tileset_stone4: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_stone4.png', 16, 1, 8, 8),
        tileset_stone5: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_stone5.png', 16, 1, 8, 8),
        tileset_stone6: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_stone6.png', 16, 1, 8, 8),
        tileset_stone7: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_stone7.png', 16, 1, 8, 8),
        tileset_stone8: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_stone8.png', 16, 1, 8, 8),
        tileset_stone9: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_stone9.png', 16, 1, 8, 8),
        tileset_tin: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_tin.png', 16, 1, 8, 8),
        tileset_aluminum: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_aluminum.png', 16, 1, 8, 8),
        tileset_gold: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_gold.png', 16, 1, 8, 8),
        tileset_titanium: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_titanium.png', 16, 1, 8, 8),
        tileset_grape: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_grape.png', 16, 1, 8, 8),
        tileset_wood0: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/wood0.png', 1, 1, 8, 8),
        tileset_wood1: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_wood1.png', 16, 1, 8, 8),
        tileset_wood2: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_wood2.png', 16, 1, 8, 8),
        tileset_wood3: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_wood3.png', 16, 1, 8, 8),
        tileset_wood4: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_wood4.png', 16, 1, 8, 8),
        tileset_wood5: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_wood5.png', 16, 1, 8, 8),
        tileset_wood6: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_wood6.png', 16, 1, 8, 8),
        tileset_wood7: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_wood7.png', 16, 1, 8, 8),
        tileset_wood8: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_wood8.png', 16, 1, 8, 8),
        tileset_wood9: new _resources_TileResource__WEBPACK_IMPORTED_MODULE_0__.TileResource('assets/textures/world/middleground/tileset_wood9.png', 16, 1, 8, 8),
    },
    foreground: {},
    tileEntities: [
        [
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/trees/Tree1.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/trees/Tree2.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/trees/Tree3.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/trees/Tree4.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/trees/Tree5.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/trees/Tree6.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/trees/Tree7.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/trees/Tree8.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/trees/Tree9.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/trees/Tree10.png'),
        ],
        [
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill1.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill2.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill3.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill4.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill5.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill6.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill7.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill8.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill9.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill10.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill11.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill12.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/Rusty Drill/RustyDrill13.png'),
        ],
        [ //drill tier 2
        ],
        [ //drill tier 3
        ],
        [ //drill tier 4
        ],
        [ //drill tier 5
        ],
        [
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/misc/craftingBench.png'),
        ],
        [
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/tileEntities/trees/sapling.png'),
        ]
    ],
    entities: {
        entity_t1drone: [
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/entities/Small Drone/SmallDrone01.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/entities/Small Drone/SmallDrone02.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/entities/Small Drone/SmallDrone03.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/entities/Small Drone/SmallDrone04.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/entities/Small Drone/SmallDrone05.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/entities/Small Drone/SmallDrone06.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/entities/Small Drone/SmallDrone07.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/entities/Small Drone/SmallDrone08.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/entities/Small Drone/SmallDrone09.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/entities/Small Drone/SmallDrone10.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/entities/Small Drone/SmallDrone11.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/entities/Small Drone/SmallDrone12.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/entities/Small Drone/SmallDrone13.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/entities/Small Drone/SmallDrone14.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/entities/Small Drone/SmallDrone15.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/entities/Small Drone/SmallDrone16.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/entities/Small Drone/SmallDrone17.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/entities/Small Drone/SmallDrone18.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/entities/Small Drone/SmallDrone19.png'),
            new _resources_ImageResource__WEBPACK_IMPORTED_MODULE_1__.ImageResource('assets/textures/world/entities/Small Drone/SmallDrone20.png'),
        ],
    }
};
const Fonts = {
    title: new _resources_FontResource__WEBPACK_IMPORTED_MODULE_2__.FontResource('assets/textures/ui/font.png', {
        '0': 7,
        '1': 7,
        '2': 7,
        '3': 6,
        '4': 6,
        '5': 6,
        '6': 6,
        '7': 7,
        '8': 7,
        '9': 6,
        'A': 6,
        'B': 7,
        'C': 7,
        'D': 6,
        'E': 7,
        'F': 6,
        'G': 7,
        'H': 7,
        'I': 7,
        'J': 8,
        'K': 6,
        'L': 6,
        'M': 8,
        'N': 8,
        'O': 8,
        'P': 9,
        'Q': 8,
        'R': 7,
        'S': 7,
        'T': 8,
        'U': 8,
        'V': 8,
        'W': 10,
        'X': 8,
        'Y': 8,
        'Z': 9,
        'a': 7,
        'b': 7,
        'c': 6,
        'd': 7,
        'e': 6,
        'f': 6,
        'g': 6,
        'h': 6,
        'i': 5,
        'j': 6,
        'k': 5,
        'l': 5,
        'm': 8,
        'n': 5,
        'o': 5,
        'p': 5,
        'q': 7,
        'r': 5,
        's': 4,
        't': 5,
        'u': 5,
        'v': 5,
        'w': 7,
        'x': 6,
        'y': 5,
        'z': 5,
        '!': 4,
        '.': 2,
        ',': 2,
        '?': 6,
        '_': 6,
        '-': 4,
        ':': 2,
        '↑': 7,
        '↓': 7,
        ' ': 2,
    }, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!.,?_-:↑↓ ', 12),
    big: new _resources_FontResource__WEBPACK_IMPORTED_MODULE_2__.FontResource('assets/textures/ui/fontBig.png', {
        '0': 15,
        '1': 14,
        '2': 14,
        '3': 13,
        '4': 12,
        '5': 13,
        '6': 12,
        '7': 14,
        '8': 15,
        '9': 12,
        'A': 13,
        'B': 14,
        'C': 15,
        'D': 12,
        'E': 14,
        'F': 13,
        'G': 14,
        'H': 15,
        'I': 15,
        'J': 16,
        'K': 12,
        'L': 13,
        'M': 16,
        'N': 17,
        'O': 17,
        'P': 19,
        'Q': 17,
        'R': 14,
        'S': 15,
        'T': 17,
        'U': 16,
        'V': 17,
        'W': 21,
        'X': 17,
        'Y': 17,
        'Z': 19,
        'a': 12,
        'b': 15,
        'c': 12,
        'd': 15,
        'e': 13,
        'f': 12,
        'g': 13,
        'h': 12,
        'i': 11,
        'j': 12,
        'k': 10,
        'l': 10,
        'm': 16,
        'n': 11,
        'o': 10,
        'p': 11,
        'q': 14,
        'r': 11,
        's': 8,
        't': 11,
        'u': 10,
        'v': 11,
        'w': 15,
        'x': 12,
        'y': 11,
        'z': 10,
        '!': 9,
        '.': 4,
        ',': 4,
        '?': 13,
        '_': 13,
        '-': 8,
        ':': 4,
        ' ': 4,
    }, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!.,?_-: ', 24),
    tom_thumb: new _resources_FontResource__WEBPACK_IMPORTED_MODULE_2__.FontResource('assets/textures/ui/tom_thumb.png', {
        'A': 3,
        'B': 3,
        'C': 3,
        'D': 3,
        'E': 3,
        'F': 3,
        'G': 3,
        'H': 3,
        'I': 3,
        'J': 3,
        'K': 3,
        'L': 3,
        'M': 3,
        'N': 3,
        'O': 3,
        'P': 3,
        'Q': 3,
        'R': 3,
        'S': 3,
        'T': 3,
        'U': 3,
        'V': 3,
        'W': 3,
        'X': 3,
        'Y': 3,
        'Z': 3,
        'a': 3,
        'b': 3,
        'c': 3,
        'd': 3,
        'e': 3,
        'f': 3,
        'g': 3,
        'h': 3,
        'i': 3,
        'j': 3,
        'k': 3,
        'l': 3,
        'm': 3,
        'n': 3,
        'o': 3,
        'p': 3,
        'q': 3,
        'r': 3,
        's': 3,
        't': 3,
        'u': 3,
        'v': 3,
        'w': 3,
        'x': 3,
        'y': 3,
        'z': 3,
        '[': 3,
        '\\': 3,
        ']': 3,
        '^': 3,
        ' ': 3,
        '!': 3,
        '"': 3,
        '#': 3,
        '$': 3,
        '%': 3,
        '&': 3,
        "'": 3,
        '(': 3,
        ')': 3,
        '*': 3,
        '+': 3,
        ',': 3,
        '-': 3,
        '.': 3,
        '/': 3,
        '0': 3,
        '1': 3,
        '2': 3,
        '3': 3,
        '4': 3,
        '5': 3,
        '6': 3,
        '7': 3,
        '8': 3,
        '9': 3,
        ':': 3,
        ';': 3,
        '<': 3,
        '=': 3,
        '>': 3,
        '?': 3,
    }, `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz[\\]^ !"#$%&'()*+,-./0123456789:;<=>?`, 5),
};
const Keys = {
    keyboardMap: [
        '',
        '',
        '',
        'CANCEL',
        '',
        '',
        'HELP',
        '',
        'BACKSPACE',
        'TAB',
        '',
        '',
        'CLEAR',
        'ENTER',
        'ENTER SPECIAL',
        '',
        'SHIFT',
        'CONTROL',
        'ALT',
        'PAUSE',
        'CAPS LOCK',
        'KANA',
        'EISU',
        'JUNJA',
        'FINAL',
        'HANJA',
        '',
        'ESCAPE',
        'CONVERT',
        'NONCONVERT',
        'ACCEPT',
        'MODECHANGE',
        'SPACE',
        'PAGE UP',
        'PAGE DOWN',
        'END',
        'HOME',
        'LEFT',
        'UP',
        'RIGHT',
        'DOWN',
        'SELECT',
        'PRINT',
        'EXECUTE',
        'PRINT SCREEN',
        'INSERT',
        'DELETE',
        '',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'COLON',
        'SEMICOLON',
        'LESS THAN',
        'EQUALS',
        'GREATER THAN',
        'QUESTION MARK',
        'AT',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        'OS KEY',
        '',
        'CONTEXT MENU',
        '',
        'SLEEP',
        'NUMPAD0',
        'NUMPAD1',
        'NUMPAD2',
        'NUMPAD3',
        'NUMPAD4',
        'NUMPAD5',
        'NUMPAD6',
        'NUMPAD7',
        'NUMPAD8',
        'NUMPAD9',
        'MULTIPLY',
        'ADD',
        'SEPARATOR',
        'SUBTRACT',
        'DECIMAL',
        'DIVIDE',
        'F1',
        'F2',
        'F3',
        'F4',
        'F5',
        'F6',
        'F7',
        'F8',
        'F9',
        'F10',
        'F11',
        'F12',
        'F13',
        'F14',
        'F15',
        'F16',
        'F17',
        'F18',
        'F19',
        'F20',
        'F21',
        'F22',
        'F23',
        'F24',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        'NUM LOCK',
        'SCROLL LOCK',
        'WIN OEM FJ JISHO',
        'WIN OEM FJ MASSHOU',
        'WIN OEM FJ TOUROKU',
        'WIN OEM FJ LOYA',
        'WIN OEM FJ ROYA',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        'CIRCUMFLEX',
        'EXCLAMATION',
        'DOUBLE_QUOTE',
        'HASH',
        'DOLLAR',
        'PERCENT',
        'AMPERSAND',
        'UNDERSCORE',
        'OPEN PARENTHESIS',
        'CLOSE PARENTHESIS',
        'ASTERISK',
        'PLUS',
        'PIPE',
        'HYPHEN',
        'OPEN CURLY BRACKET',
        'CLOSE CURLY BRACKET',
        'TILDE',
        '',
        '',
        '',
        '',
        'VOLUME MUTE',
        'VOLUME DOWN',
        'VOLUME UP',
        '',
        '',
        'SEMICOLON',
        'EQUALS',
        'COMMA',
        'MINUS',
        'PERIOD',
        'SLASH',
        'BACK QUOTE',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        'OPEN BRACKET',
        'BACK SLASH',
        'CLOSE BRACKET',
        'QUOTE',
        '',
        'META',
        'ALT GRAPH',
        '',
        'WIN ICO HELP',
        'WIN ICO 00',
        '',
        'WIN ICO CLEAR',
        '',
        '',
        'WIN OEM RESET',
        'WIN OEM JUMP',
        'WIN OEM PA1',
        'WIN OEM PA2',
        'WIN OEM PA3',
        'WIN OEM WSCTRL',
        'WIN OEM CUSEL',
        'WIN OEM ATTN',
        'WIN OEM FINISH',
        'WIN OEM COPY',
        'WIN OEM AUTO',
        'WIN OEM ENLW',
        'WIN OEM BACKTAB',
        'ATTN',
        'CRSEL',
        'EXSEL',
        'EREOF',
        'PLAY',
        'ZOOM',
        '',
        'PA1',
        'WIN OEM CLEAR',
        'TOGGLE TOUCHPAD', // [255]
    ], // https://stackoverflow.com/questions/1772179/get-character-value-from-keycode-in-javascript-then-trim
};
const AudioAssets = {
    ui: {
        inventoryClack: new _resources_AudioResourceGroup__WEBPACK_IMPORTED_MODULE_3__.AudioResourceGroup([
            new _resources_AudioResource__WEBPACK_IMPORTED_MODULE_4__.AudioResource('assets/sounds/sfx/ui/clack1.mp3'),
            new _resources_AudioResource__WEBPACK_IMPORTED_MODULE_4__.AudioResource('assets/sounds/sfx/ui/clack2.mp3'),
            new _resources_AudioResource__WEBPACK_IMPORTED_MODULE_4__.AudioResource('assets/sounds/sfx/ui/clack3.mp3'),
        ]),
    },
    music: {
        titleScreen: new _resources_AudioResource__WEBPACK_IMPORTED_MODULE_4__.AudioResource('assets/sounds/music/TitleScreen.mp3'),
    },
    ambient: {
        winter1: new _resources_AudioResource__WEBPACK_IMPORTED_MODULE_4__.AudioResource('assets/sounds/sfx/ambient/65813__pcaeldries__countrysidewinterevening02.wav'),
    },
};
// const animations = <T extends Record<string, ImageResource[]>>(data: T): T => data
const loadAssets = (sketch, ...assets) => {
    assets.forEach(assetGroup => {
        searchGroup(assetGroup, sketch);
    });
};
function searchGroup(assetGroup, sketch) {
    if (assetGroup instanceof _resources_Resource__WEBPACK_IMPORTED_MODULE_7__.Resource) {
        console.log(`Loading asset ${assetGroup.path}`);
        assetGroup.loadResource(sketch);
        return;
    }
    Object.entries(assetGroup).forEach(asset => {
        searchGroup(asset[1], sketch);
    });
}


/***/ }),

/***/ "./src/client/assets/resources/AudioResource.ts":
/*!******************************************************!*\
  !*** ./src/client/assets/resources/AudioResource.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AudioResource": () => (/* binding */ AudioResource)
/* harmony export */ });
/* harmony import */ var _Resource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Resource */ "./src/client/assets/resources/Resource.ts");

class AudioResource extends _Resource__WEBPACK_IMPORTED_MODULE_0__.Resource {
    // sound: AudioType
    constructor(path) {
        super(path);
    }
    loadResource(game) {
        // this.sound = Audio({
        //     file: this.path,
        //     loop: false,
        //     volume: 1.0,
        // });
    }
    // playRandom() {
    //     // Verify that the sound has been loaded
    //     if (this.sound === undefined)
    //         throw new Error(
    //             `Tried to play sound before loading it: ${this.path}`
    //         );
    //     this.sound.play();
    // }
    playSound() {
        //Verify that the sound has been loaded
        // if (this.sound === undefined)
        //     throw new Error(
        //         `Tried to play sound before loading it: ${this.path}`
        //     );
        // this.sound.pause();
        // this.sound.play();
    }
}


/***/ }),

/***/ "./src/client/assets/resources/AudioResourceGroup.ts":
/*!***********************************************************!*\
  !*** ./src/client/assets/resources/AudioResourceGroup.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AudioResourceGroup": () => (/* binding */ AudioResourceGroup)
/* harmony export */ });
class AudioResourceGroup {
    constructor(sounds) {
        this.sounds = sounds;
    }
    playRandom() {
        if (this.sounds === undefined || this.sounds.length === 0)
            throw new Error(`There are no sounds: ${this.sounds}`);
        const r = Math.floor(Math.random() * this.sounds.length);
        this.sounds[r].playSound(); // play a random sound from the array at a slightly randomized pitch, leading to the effect of it making a new sound each time, removing repetitiveness
    }
}


/***/ }),

/***/ "./src/client/assets/resources/FontResource.ts":
/*!*****************************************************!*\
  !*** ./src/client/assets/resources/FontResource.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FontResource": () => (/* binding */ FontResource)
/* harmony export */ });
/* harmony import */ var _ImageResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImageResource */ "./src/client/assets/resources/ImageResource.ts");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Game */ "./src/client/Game.ts");


class FontResource extends _ImageResource__WEBPACK_IMPORTED_MODULE_0__.ImageResource {
    constructor(path, characterData, characterOrder, fontHeight) {
        super(path);
        this.alphabet_soup = {};
        let runningTotal = 0;
        for (let i = 0; i < characterOrder.length; i++) {
            this.alphabet_soup[characterOrder[i]] = { x: runningTotal, y: 0, w: characterData[characterOrder[i]], h: fontHeight };
            runningTotal += characterData[characterOrder[i]] + 1;
            // console.log(characterOrder[i]+": "+characterData[characterOrder[i]]);
        }
    }
    drawText(target, str, x, y) {
        let xOffset = 0;
        for (let i = 0; i < str.length; i++) {
            this.renderPartial(target, x + xOffset * _Game__WEBPACK_IMPORTED_MODULE_1__.game.upscaleSize, y, this.alphabet_soup[str[i]].w * _Game__WEBPACK_IMPORTED_MODULE_1__.game.upscaleSize, this.alphabet_soup[str[i]].h * _Game__WEBPACK_IMPORTED_MODULE_1__.game.upscaleSize, this.alphabet_soup[str[i]].x, this.alphabet_soup[str[i]].y, this.alphabet_soup[str[i]].w, this.alphabet_soup[str[i]].h);
            xOffset += this.alphabet_soup[str[i]].w + 1;
        }
    }
}


/***/ }),

/***/ "./src/client/assets/resources/ImageResource.ts":
/*!******************************************************!*\
  !*** ./src/client/assets/resources/ImageResource.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageResource": () => (/* binding */ ImageResource)
/* harmony export */ });
/* harmony import */ var _Resource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Resource */ "./src/client/assets/resources/Resource.ts");

class ImageResource extends _Resource__WEBPACK_IMPORTED_MODULE_0__.Resource {
    constructor(path) {
        super(path);
    }
    loadResource(game) {
        this.image = game.loadImage(this.path);
    }
    render(target, x, y, width, height) {
        // Verify that the tiles has been loaded
        if (this.image === undefined)
            throw new Error(`Tried to render image before loading it: ${this.path}`);
        // Draw non tiles image
        target.image(this.image, x, y, width, height);
    }
    renderPartial(target, x, y, width, height, sourceX, sourceY, sourceWidth, sourceHeight) {
        // Verify that the tiles has been loaded
        if (this.image === undefined)
            throw new Error(`Tried to render image before loading it: ${this.path}`);
        // Draw a partial part of the image
        target.image(this.image, x, y, width, height, sourceX, sourceY, sourceWidth, sourceHeight);
    }
}


/***/ }),

/***/ "./src/client/assets/resources/ReflectedImageResource.ts":
/*!***************************************************************!*\
  !*** ./src/client/assets/resources/ReflectedImageResource.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReflectableImageResource": () => (/* binding */ ReflectableImageResource)
/* harmony export */ });
/* harmony import */ var _Resource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Resource */ "./src/client/assets/resources/Resource.ts");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Game */ "./src/client/Game.ts");
/* harmony import */ var _global_Tile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../global/Tile */ "./src/global/Tile.ts");



class ReflectableImageResource extends _Resource__WEBPACK_IMPORTED_MODULE_0__.Resource {
    constructor(path) {
        super(path);
        this.hasReflection = false;
        this.reflectivityArray = [0, 90, 150, 0, 10, 15, 17, 19, 21, 23, 25, 27, 29, 31, 10, 17, 21, 25, 29, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
    }
    loadResource(game) {
        this.image = game.loadImage(this.path);
    }
    loadReflection(game) {
        if (!this.hasReflection) { //this is so it doesn't load them all at once and instead makes the reflections when they are needed
            this.hasReflection = true;
            this.reflection = game.createImage(this.image.width, this.image.height);
            this.image.loadPixels();
            //console.log(this.image.pixels)
            this.reflection.loadPixels();
            for (let i = 0; i < this.reflection.width; i++) { //generate a reflection image that is displayed as a reflection
                for (let j = 0; j < this.reflection.height; j++) {
                    for (let k = 0; k < 3; k++) {
                        this.reflection.pixels[4 * (j * this.reflection.width + i) + k] = this.image.pixels[4 * ((this.image.height - j - 1) * this.image.width + i) + k];
                    }
                    this.reflection.pixels[4 * (j * this.reflection.width + i) + 3] =
                        this.image.pixels[4 * ((this.image.height - j - 1) * this.image.width + i) + 3] *
                            ((this.reflection.height - j) / this.reflection.height) *
                            (this.reflection.width / 2 + 0.5 - Math.abs(i - this.reflection.width / 2 + 0.5)) / (this.reflection.width / 2);
                }
            }
            this.reflection.updatePixels();
        }
    }
    render(target, x, y, width, height) {
        //console.log(WorldTiles);
        // Verify that the image has been loaded
        if (this.image === undefined)
            throw new Error(`Tried to render image before loading it: ${this.path}`);
        // Draw non tiles image
        target.image(this.image, x, y, width, height);
    }
    renderWorldspaceReflection(x, y, width, height) {
        if (this.image === undefined)
            throw new Error(`Tried to render reflection of image before loading it: ${this.path}`);
        if (!this.hasReflection)
            return;
        _Game__WEBPACK_IMPORTED_MODULE_1__.game.fill(255, 0, 0);
        _Game__WEBPACK_IMPORTED_MODULE_1__.game.stroke(150, 0, 0);
        //loop through every tile it passes through
        for (let i = Math.floor(x); i < x + width; i++) {
            for (let j = Math.floor(y); j < y + height; j++) {
                // console.log(target.world.worldTiles);
                let currentBlock = _Game__WEBPACK_IMPORTED_MODULE_1__.game.world.worldTiles[j * _Game__WEBPACK_IMPORTED_MODULE_1__.game.worldWidth + i];
                if (currentBlock === undefined || typeof currentBlock === "string" || currentBlock == _global_Tile__WEBPACK_IMPORTED_MODULE_2__.TileType.Air) { //the reference to TileEntity can be removed as soon as the better system is in place
                    continue;
                }
                _Game__WEBPACK_IMPORTED_MODULE_1__.game.drawingContext.globalAlpha = this.reflectivityArray[currentBlock] / 255; //TODO make this based on the tile reflectivity
                _Game__WEBPACK_IMPORTED_MODULE_1__.game.image(this.reflection, (i * _Game__WEBPACK_IMPORTED_MODULE_1__.game.TILE_WIDTH -
                    _Game__WEBPACK_IMPORTED_MODULE_1__.game.interpolatedCamX * _Game__WEBPACK_IMPORTED_MODULE_1__.game.TILE_WIDTH) *
                    _Game__WEBPACK_IMPORTED_MODULE_1__.game.upscaleSize, (j * _Game__WEBPACK_IMPORTED_MODULE_1__.game.TILE_HEIGHT -
                    _Game__WEBPACK_IMPORTED_MODULE_1__.game.interpolatedCamY * _Game__WEBPACK_IMPORTED_MODULE_1__.game.TILE_HEIGHT) *
                    _Game__WEBPACK_IMPORTED_MODULE_1__.game.upscaleSize, _Game__WEBPACK_IMPORTED_MODULE_1__.game.TILE_WIDTH * _Game__WEBPACK_IMPORTED_MODULE_1__.game.upscaleSize, _Game__WEBPACK_IMPORTED_MODULE_1__.game.TILE_HEIGHT * _Game__WEBPACK_IMPORTED_MODULE_1__.game.upscaleSize, (i - x) * _Game__WEBPACK_IMPORTED_MODULE_1__.game.TILE_WIDTH, (j - y) * _Game__WEBPACK_IMPORTED_MODULE_1__.game.TILE_HEIGHT, _Game__WEBPACK_IMPORTED_MODULE_1__.game.TILE_WIDTH, _Game__WEBPACK_IMPORTED_MODULE_1__.game.TILE_HEIGHT);
                _Game__WEBPACK_IMPORTED_MODULE_1__.game.drawingContext.globalAlpha = 1.0;
            }
        }
    }
    renderPartial(target, x, y, width, height, sourceX, sourceY, sourceWidth, sourceHeight) {
        // Verify that the tiles has been loaded
        if (this.image === undefined)
            throw new Error(`Tried to render image before loading it: ${this.path}`);
        // Draw a partial part of the image
        target.image(this.image, x, y, width, height, sourceX, sourceY, sourceWidth, sourceHeight);
    }
}


/***/ }),

/***/ "./src/client/assets/resources/Resource.ts":
/*!*************************************************!*\
  !*** ./src/client/assets/resources/Resource.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Resource": () => (/* binding */ Resource)
/* harmony export */ });
class Resource {
    constructor(path) {
        this.path = path;
    }
}


/***/ }),

/***/ "./src/client/assets/resources/TileResource.ts":
/*!*****************************************************!*\
  !*** ./src/client/assets/resources/TileResource.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TileResource": () => (/* binding */ TileResource)
/* harmony export */ });
/* harmony import */ var _ImageResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImageResource */ "./src/client/assets/resources/ImageResource.ts");

class TileResource extends _ImageResource__WEBPACK_IMPORTED_MODULE_0__.ImageResource {
    constructor(path, width, height, tileWidth, tileHeight) {
        super(path);
        this.width = width;
        this.height = height;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }
    renderTile(i, target, x, y, width, height) {
        const tileSetX = i % this.width;
        const tileSetY = Math.floor(i / this.width);
        // Make sure the tiles isn't out of bounds
        if (tileSetY > this.height)
            throw new Error(`Out of bounds tile. Tried to render tile index ${i} with a maximum of ${this.width * this.height} tiles`);
        super.renderPartial(target, x, y, width, height, tileSetX * this.tileWidth, tileSetY * this.tileHeight, this.tileWidth, this.tileHeight);
    }
    getTileAtCoordinate(x, y, target, xPos, yPos, width, height) {
        if (x > this.width || y > this.height || x < 0 || y < 0)
            throw new Error(`Out of bounds tile. Tried to load tile at ${x}, ${y} on a ${this.width}, ${this.height} grid`);
        super.renderPartial(target, xPos, yPos, width, height, x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
    }
}


/***/ }),

/***/ "./src/client/input/Control.ts":
/*!*************************************!*\
  !*** ./src/client/input/Control.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Control": () => (/* binding */ Control)
/* harmony export */ });
class Control {
    constructor(description, keyboard, keyCode, onPressed, onReleased) {
        this.description = description;
        this.keyboard = keyboard;
        this.keyCode = keyCode;
        this.onPressed = onPressed;
        this.onReleased = onReleased || function () { }; //for some reason arrow function doesn't like to exist here but i'm not gonna worry too much
        //if it's too ugly, you can try to fix it
    }
}


/***/ }),

/***/ "./src/client/player/Inventory.ts":
/*!****************************************!*\
  !*** ./src/client/player/Inventory.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Inventory": () => (/* binding */ Inventory)
/* harmony export */ });
/* harmony import */ var _global_Inventory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../global/Inventory */ "./src/global/Inventory.ts");
/* harmony import */ var _global_Tile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../global/Tile */ "./src/global/Tile.ts");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Game */ "./src/client/Game.ts");
/* harmony import */ var _world_particles_ColorParticle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../world/particles/ColorParticle */ "./src/client/world/particles/ColorParticle.ts");
/* harmony import */ var _world_WorldTiles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../world/WorldTiles */ "./src/client/world/WorldTiles.ts");





class Inventory {
    constructor(inventory) {
        this.selectedSlot = 0;
        this.pickedUpSlot = undefined;
        this.items = inventory.items;
        this.width = inventory.width;
        this.height = inventory.height;
    }
    worldClick(x, y) {
        const selectedItem = this.items[this.selectedSlot];
        if (selectedItem === undefined || selectedItem === null) {
            //console.error("Breaking tile")
            let tileBeingBroken = _Game__WEBPACK_IMPORTED_MODULE_2__.game.world.worldTiles[_Game__WEBPACK_IMPORTED_MODULE_2__.game.world.width * y + x];
            if (typeof tileBeingBroken === 'number') {
                let worldTileBeingBroken = _world_WorldTiles__WEBPACK_IMPORTED_MODULE_4__.WorldTiles[tileBeingBroken];
                for (let i = 0; i < 5 * _Game__WEBPACK_IMPORTED_MODULE_2__.game.particleMultiplier; i++) {
                    if (worldTileBeingBroken !== undefined)
                        _Game__WEBPACK_IMPORTED_MODULE_2__.game.particles.push(new _world_particles_ColorParticle__WEBPACK_IMPORTED_MODULE_3__.ColorParticle(worldTileBeingBroken.color, Math.random() * 0.2 + 0.1, 10, x + Math.random(), y + Math.random(), 0.2 * (Math.random() - 0.5), -0.15 * Math.random()));
                }
            }
            _Game__WEBPACK_IMPORTED_MODULE_2__.game.connection.emit('worldBreakStart', _Game__WEBPACK_IMPORTED_MODULE_2__.game.world.width * y + x);
            _Game__WEBPACK_IMPORTED_MODULE_2__.game.connection.emit('worldBreakFinish');
            return;
        }
        const worldClick = ItemActions[_global_Inventory__WEBPACK_IMPORTED_MODULE_0__.Items[selectedItem.item].type].worldClick;
        if (worldClick === undefined) {
            console.error("Cannot place selected item");
            return;
        }
        worldClick(x, y);
    }
    worldClickCheck(x, y) {
        let tileBeingBroken = _Game__WEBPACK_IMPORTED_MODULE_2__.game.world.worldTiles[_Game__WEBPACK_IMPORTED_MODULE_2__.game.world.width * y + x];
        if (typeof tileBeingBroken === 'number') {
            if (tileBeingBroken === _global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Air)
                _Game__WEBPACK_IMPORTED_MODULE_2__.game.breaking = false;
            else
                _Game__WEBPACK_IMPORTED_MODULE_2__.game.breaking = true;
        }
    }
}
const ItemActions = {
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_0__.ItemCategories.Tile]: {
        worldClick(x, y) {
            // If the tile isn't air
            if (_Game__WEBPACK_IMPORTED_MODULE_2__.game.world.worldTiles[_Game__WEBPACK_IMPORTED_MODULE_2__.game.world.width * y + x] !== _global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Air) {
                let tileBeingBroken = _Game__WEBPACK_IMPORTED_MODULE_2__.game.world.worldTiles[_Game__WEBPACK_IMPORTED_MODULE_2__.game.world.width * y + x];
                if (typeof tileBeingBroken === 'number') { //tile is tile
                    if (!_Game__WEBPACK_IMPORTED_MODULE_2__.game.breaking)
                        return;
                    let worldTileBeingBroken = _world_WorldTiles__WEBPACK_IMPORTED_MODULE_4__.WorldTiles[tileBeingBroken];
                    for (let i = 0; i < 5 * _Game__WEBPACK_IMPORTED_MODULE_2__.game.particleMultiplier; i++) {
                        if (worldTileBeingBroken !== undefined)
                            _Game__WEBPACK_IMPORTED_MODULE_2__.game.particles.push(new _world_particles_ColorParticle__WEBPACK_IMPORTED_MODULE_3__.ColorParticle(worldTileBeingBroken.color, Math.random() * 0.2 + 0.1, 10, x + Math.random(), y + Math.random(), 0.2 * (Math.random() - 0.5), -0.15 * Math.random()));
                    }
                    console.info('breaking');
                    _Game__WEBPACK_IMPORTED_MODULE_2__.game.connection.emit('worldBreakStart', _Game__WEBPACK_IMPORTED_MODULE_2__.game.world.width * y + x);
                    _Game__WEBPACK_IMPORTED_MODULE_2__.game.connection.emit('worldBreakFinish');
                    return;
                }
                else { //tile is tile entity
                    console.log("tile entity interact");
                    _Game__WEBPACK_IMPORTED_MODULE_2__.game.connection.emit('worldBreakStart', _Game__WEBPACK_IMPORTED_MODULE_2__.game.world.width * y + x);
                    _Game__WEBPACK_IMPORTED_MODULE_2__.game.connection.emit('worldBreakFinish');
                    return;
                }
            }
            //if the tile is air and the game is trying to place
            if (_Game__WEBPACK_IMPORTED_MODULE_2__.game.breaking)
                return;
            console.info('Placing');
            _Game__WEBPACK_IMPORTED_MODULE_2__.game.connection.emit('worldPlace', _Game__WEBPACK_IMPORTED_MODULE_2__.game.world.inventory.selectedSlot, x, y);
        }
    },
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_0__.ItemCategories.Resource]: {},
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_0__.ItemCategories.Tool]: {},
    [_global_Inventory__WEBPACK_IMPORTED_MODULE_0__.ItemCategories.TileEntity]: {
        worldClick(x, y) {
            var _a;
            let itemRef = _global_Inventory__WEBPACK_IMPORTED_MODULE_0__.Items[((_a = _Game__WEBPACK_IMPORTED_MODULE_2__.game.world.inventory.items[_Game__WEBPACK_IMPORTED_MODULE_2__.game.world.inventory.selectedSlot]) === null || _a === void 0 ? void 0 : _a.item) || 0];
            let offset = [0, 0];
            if ("tileEntityOffset" in itemRef) {
                offset = itemRef.tileEntityOffset;
            }
            _Game__WEBPACK_IMPORTED_MODULE_2__.game.connection.emit('worldPlace', _Game__WEBPACK_IMPORTED_MODULE_2__.game.world.inventory.selectedSlot, x, y);
        }
    },
};


/***/ }),

/***/ "./src/client/player/PlayerLocal.ts":
/*!******************************************!*\
  !*** ./src/client/player/PlayerLocal.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayerLocal": () => (/* binding */ PlayerLocal)
/* harmony export */ });
/* harmony import */ var _global_Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../global/Entity */ "./src/global/Entity.ts");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Game */ "./src/client/Game.ts");
/* harmony import */ var _world_entities_ServerEntity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../world/entities/ServerEntity */ "./src/client/world/entities/ServerEntity.ts");
/* harmony import */ var _assets_Assets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/Assets */ "./src/client/assets/Assets.ts");
/* harmony import */ var _global_Tile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../global/Tile */ "./src/global/Tile.ts");
/* harmony import */ var _world_WorldTiles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../world/WorldTiles */ "./src/client/world/WorldTiles.ts");
/* harmony import */ var _world_particles_ColorParticle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../world/particles/ColorParticle */ "./src/client/world/particles/ColorParticle.ts");



// import { ColorParticle } from '../world/';




class PlayerLocal extends _world_entities_ServerEntity__WEBPACK_IMPORTED_MODULE_2__.ServerEntity {
    constructor(data) {
        super(data.id);
        // Constant data
        this.width = 12 / _Game__WEBPACK_IMPORTED_MODULE_1__.game.TILE_WIDTH;
        this.height = 28 / _Game__WEBPACK_IMPORTED_MODULE_1__.game.TILE_HEIGHT;
        // Local data
        this.xVel = 0;
        this.yVel = 0;
        this.pXVel = 0;
        this.pYVel = 0;
        this.grounded = false;
        this.pGrounded = false;
        this.mass = this.width * this.height;
        this.currentAnimation = "idle";
        this.animFrame = 0;
        this.timeInThisAnimationFrame = 0;
        this.facingRight = true;
        this.topCollision = _world_WorldTiles__WEBPACK_IMPORTED_MODULE_5__.WorldTiles[_global_Tile__WEBPACK_IMPORTED_MODULE_4__.TileType.Air]; //hacky
        this.bottomCollision = _world_WorldTiles__WEBPACK_IMPORTED_MODULE_5__.WorldTiles[_global_Tile__WEBPACK_IMPORTED_MODULE_4__.TileType.Air];
        this.name = data.data.name;
        this.x = data.data.x;
        this.y = data.data.y;
        this.pX = this.x;
        this.pY = this.y;
        this.interpolatedX = this.x;
        this.interpolatedY = this.y;
        this.closestCollision = [1, 0, Infinity];
        this.leftButton = false;
        this.rightButton = false;
        this.jumpButton = false;
    }
    render(target, upscaleSize) {
        this.timeInThisAnimationFrame += _Game__WEBPACK_IMPORTED_MODULE_1__.game.deltaTime;
        if (this.timeInThisAnimationFrame > _assets_Assets__WEBPACK_IMPORTED_MODULE_3__.PlayerAnimations[this.currentAnimation][this.animFrame][1]) {
            this.timeInThisAnimationFrame = 0; //this does introduce some slight inaccuracies vs subtracting it, but, when you tab back into the browser after being tabbed out, subtracting it causes spazzing
            this.animFrame++;
            if (this.animFrame >= _assets_Assets__WEBPACK_IMPORTED_MODULE_3__.PlayerAnimations[this.currentAnimation].length) {
                this.animFrame = this.animFrame % _assets_Assets__WEBPACK_IMPORTED_MODULE_3__.PlayerAnimations[this.currentAnimation].length;
            }
        }
        // target.rect(
        //     (this.interpolatedX * game.TILE_WIDTH -
        //         game.interpolatedCamX * game.TILE_WIDTH) *
        //         upscaleSize,
        //     (this.interpolatedY * game.TILE_HEIGHT -
        //         game.interpolatedCamY * game.TILE_HEIGHT) *
        //         upscaleSize,
        //     this.width * upscaleSize * game.TILE_WIDTH,
        //     this.height * upscaleSize * game.TILE_HEIGHT
        // );
        _assets_Assets__WEBPACK_IMPORTED_MODULE_3__.PlayerAnimations[this.currentAnimation][this.animFrame][0].render(target, Math.round((this.interpolatedX * _Game__WEBPACK_IMPORTED_MODULE_1__.game.TILE_WIDTH -
            _Game__WEBPACK_IMPORTED_MODULE_1__.game.interpolatedCamX * _Game__WEBPACK_IMPORTED_MODULE_1__.game.TILE_WIDTH) *
            upscaleSize), Math.round((this.interpolatedY * _Game__WEBPACK_IMPORTED_MODULE_1__.game.TILE_HEIGHT -
            _Game__WEBPACK_IMPORTED_MODULE_1__.game.interpolatedCamY * _Game__WEBPACK_IMPORTED_MODULE_1__.game.TILE_HEIGHT) *
            upscaleSize), this.width * upscaleSize * _Game__WEBPACK_IMPORTED_MODULE_1__.game.TILE_WIDTH, this.height * upscaleSize * _Game__WEBPACK_IMPORTED_MODULE_1__.game.TILE_HEIGHT);
        _assets_Assets__WEBPACK_IMPORTED_MODULE_3__.PlayerAnimations[this.currentAnimation][this.animFrame][0].renderWorldspaceReflection(this.interpolatedX, this.interpolatedY + this.height, this.width, this.height);
    }
    updateData(data) {
        if (data.type === _global_Entity__WEBPACK_IMPORTED_MODULE_0__.Entities.Player)
            this.name = data.data.name;
    }
    keyboardInput() {
        this.xVel +=
            0.02 * (+this.rightButton - +this.leftButton);
        if (this.grounded && this.jumpButton) {
            _Game__WEBPACK_IMPORTED_MODULE_1__.game.screenshakeAmount = 0.5;
            for (let i = 0; i < 10 * _Game__WEBPACK_IMPORTED_MODULE_1__.game.particleMultiplier; i++) {
                if (this.bottomCollision !== undefined)
                    _Game__WEBPACK_IMPORTED_MODULE_1__.game.particles.push(new _world_particles_ColorParticle__WEBPACK_IMPORTED_MODULE_6__.ColorParticle(this.bottomCollision.color, 1 / 8 + Math.random() / 8, 20, this.x + this.width * Math.random(), this.y + this.height, 0.2 * (Math.random() - 0.5), 0.2 * -Math.random()));
            }
            this.yVel = -1.5;
        }
    }
    applyGravityAndDrag() {
        // this function changes the object's next tick's velocity in both the x and the y directions
        this.pXVel = this.xVel;
        this.pYVel = this.yVel;
        if (this.bottomCollision === undefined) {
            this.xVel -=
                (Math.abs(this.xVel) * this.xVel * _Game__WEBPACK_IMPORTED_MODULE_1__.game.DRAG_COEFFICIENT * this.width) / //apply air resistance
                    this.mass;
        }
        else {
            this.xVel -=
                (Math.abs(this.xVel) * this.xVel * _Game__WEBPACK_IMPORTED_MODULE_1__.game.DRAG_COEFFICIENT * (this.bottomCollision.friction) * this.width) / //apply air resistance and ground friction
                    this.mass;
        }
        this.yVel += _Game__WEBPACK_IMPORTED_MODULE_1__.game.GRAVITY_SPEED;
        this.yVel -=
            (_Game__WEBPACK_IMPORTED_MODULE_1__.game.abs(this.yVel) * this.yVel * _Game__WEBPACK_IMPORTED_MODULE_1__.game.DRAG_COEFFICIENT * this.height) /
                this.mass;
        //if on the ground, make walking particles
        if (this.grounded) {
            //footsteps
            for (let i = 0; i < randomlyToInt(Math.abs(this.xVel) * _Game__WEBPACK_IMPORTED_MODULE_1__.game.particleMultiplier / 2); i++) {
                _Game__WEBPACK_IMPORTED_MODULE_1__.game.particles.push(new _world_particles_ColorParticle__WEBPACK_IMPORTED_MODULE_6__.ColorParticle("#bbbbbb45", 1 / 4 + Math.random() / 8, 50, this.x + this.width / 2 + i / _Game__WEBPACK_IMPORTED_MODULE_1__.game.particleMultiplier, this.y + this.height, 0, 0, false));
            }
            //dust
            for (let i = 0; i < randomlyToInt(Math.abs(this.xVel) * _Game__WEBPACK_IMPORTED_MODULE_1__.game.particleMultiplier / 2); i++) {
                if (this.bottomCollision !== undefined)
                    _Game__WEBPACK_IMPORTED_MODULE_1__.game.particles.push(new _world_particles_ColorParticle__WEBPACK_IMPORTED_MODULE_6__.ColorParticle(this.bottomCollision.color, 1 / 8 + Math.random() / 8, 10, this.x + this.width / 2, this.y + this.height, 0.2 * -this.xVel + 0.2 * (Math.random() - 0.5), 0.2 * -Math.random(), true));
            }
        }
        if ((this.xVel) > 0.05) {
            this.currentAnimation = "walk";
            this.animFrame = this.animFrame % _assets_Assets__WEBPACK_IMPORTED_MODULE_3__.PlayerAnimations[this.currentAnimation].length;
            this.facingRight = true;
        }
        else if ((this.xVel) < -0.05) {
            this.currentAnimation = "walkleft";
            this.facingRight = false;
            this.animFrame = this.animFrame % _assets_Assets__WEBPACK_IMPORTED_MODULE_3__.PlayerAnimations[this.currentAnimation].length;
        }
        else if (this.facingRight) {
            this.currentAnimation = "idle";
            this.animFrame = this.animFrame % _assets_Assets__WEBPACK_IMPORTED_MODULE_3__.PlayerAnimations[this.currentAnimation].length;
        }
        else {
            this.currentAnimation = "idleleft";
            this.animFrame = this.animFrame % _assets_Assets__WEBPACK_IMPORTED_MODULE_3__.PlayerAnimations[this.currentAnimation].length;
        }
    }
    findInterpolatedCoordinates() {
        // this function essentially makes the character lag behind one tick, but means that it gets displayed at the maximum frame rate.
        if (this.pXVel > 0) {
            this.interpolatedX = _Game__WEBPACK_IMPORTED_MODULE_1__.game.min(this.pX + this.pXVel * _Game__WEBPACK_IMPORTED_MODULE_1__.game.amountSinceLastTick, this.x);
        }
        else {
            this.interpolatedX = _Game__WEBPACK_IMPORTED_MODULE_1__.game.max(this.pX + this.pXVel * _Game__WEBPACK_IMPORTED_MODULE_1__.game.amountSinceLastTick, this.x);
        }
        if (this.pYVel > 0) {
            this.interpolatedY = _Game__WEBPACK_IMPORTED_MODULE_1__.game.min(this.pY + this.pYVel * _Game__WEBPACK_IMPORTED_MODULE_1__.game.amountSinceLastTick, this.y);
        }
        else {
            this.interpolatedY = _Game__WEBPACK_IMPORTED_MODULE_1__.game.max(this.pY + this.pYVel * _Game__WEBPACK_IMPORTED_MODULE_1__.game.amountSinceLastTick, this.y);
        }
    }
    applyVelocityAndCollide() {
        this.topCollision = _world_WorldTiles__WEBPACK_IMPORTED_MODULE_5__.WorldTiles[_global_Tile__WEBPACK_IMPORTED_MODULE_4__.TileType.Air];
        this.bottomCollision = _world_WorldTiles__WEBPACK_IMPORTED_MODULE_5__.WorldTiles[_global_Tile__WEBPACK_IMPORTED_MODULE_4__.TileType.Air];
        this.pX = this.x;
        this.pY = this.y;
        this.pGrounded = this.grounded;
        this.grounded = false;
        /*
        This function assumes that the object doesn't start in collision

        Also, it takes advantage of the fact that an object can only collide once in each axis with these axis-aligned rectangles.
        That's a total of a possible two collisions, or an initial collision, and a sliding collision.
        */
        // calculate the initial collision:
        // set the closest collision to one infinitely far away.
        this.closestCollision = [1, 0, Infinity];
        let mostlyGoingHorizontally;
        // loop through all the possible tiles the physics box could be intersecting with
        for (let i = Math.floor(_Game__WEBPACK_IMPORTED_MODULE_1__.game.min(this.x, this.x + this.xVel)); i < Math.ceil(_Game__WEBPACK_IMPORTED_MODULE_1__.game.max(this.x, this.x + this.xVel) + this.width); i++) {
            for (let j = Math.floor(_Game__WEBPACK_IMPORTED_MODULE_1__.game.min(this.y, this.y + this.yVel)); j < Math.ceil(_Game__WEBPACK_IMPORTED_MODULE_1__.game.max(this.y, this.y + this.yVel) + this.height); j++) {
                // if the current tile isn't air (value 0), then continue with the collision detection
                let currentBlock = _Game__WEBPACK_IMPORTED_MODULE_1__.game.world.worldTiles[j * _Game__WEBPACK_IMPORTED_MODULE_1__.game.worldWidth + i];
                if (currentBlock !== _global_Tile__WEBPACK_IMPORTED_MODULE_4__.TileType.Air && typeof currentBlock !== 'string') {
                    // get the data about the collision and store it in a variable
                    this.collisionData = _Game__WEBPACK_IMPORTED_MODULE_1__.game.rectVsRay(i - this.width, j - this.height, this.width + 1, this.height + 1, this.x, this.y, this.xVel, this.yVel);
                    mostlyGoingHorizontally = Math.abs(this.xVel) > Math.abs(this.yVel);
                    if (this.collisionData !== false) { //a collision happened
                        if (this.closestCollision[2] > this.collisionData[2]) {
                            this.closestCollision = this.collisionData; //honestly this entire collision system is a mess but it work so so what
                            if (this.closestCollision[0] === 0) {
                                if (this.closestCollision[1] === 1) {
                                    this.topCollision = _world_WorldTiles__WEBPACK_IMPORTED_MODULE_5__.WorldTiles[currentBlock];
                                }
                                else {
                                    this.bottomCollision = _world_WorldTiles__WEBPACK_IMPORTED_MODULE_5__.WorldTiles[currentBlock];
                                }
                            }
                        }
                        else if (this.closestCollision[2] === this.collisionData[2] && mostlyGoingHorizontally === (this.closestCollision[0] === 0)) {
                            this.closestCollision = this.collisionData;
                            if (this.closestCollision[0] === 0) {
                                if (this.closestCollision[1] === 1) {
                                    this.topCollision = _world_WorldTiles__WEBPACK_IMPORTED_MODULE_5__.WorldTiles[currentBlock];
                                }
                                else {
                                    this.bottomCollision = _world_WorldTiles__WEBPACK_IMPORTED_MODULE_5__.WorldTiles[currentBlock];
                                }
                            }
                        }
                    }
                }
            }
        }
        if (this.closestCollision[2] !== Infinity) {
            // there has been at least one collision
            // go to the point of collision (this makes it behave as if the walls are sticky, but we will later slide against the walls)
            this.x += this.xVel * this.closestCollision[2];
            this.y += this.yVel * this.closestCollision[2];
            // the collision happened either on the top or bottom
            if (this.closestCollision[0] === 0) {
                if (this.closestCollision[1] === -1) {
                    this.grounded = true;
                    // if it collided on the higher side, it must be touching the ground. (higher y is down)
                    if (!this.pGrounded) { //if it isn't grounded yet, it must be colliding with the ground for the first time, so summon particles
                        _Game__WEBPACK_IMPORTED_MODULE_1__.game.screenshakeAmount = Math.abs(this.yVel * 0.75);
                        for (let i = 0; i < 5 * _Game__WEBPACK_IMPORTED_MODULE_1__.game.particleMultiplier; i++) {
                            if (this.bottomCollision !== undefined)
                                _Game__WEBPACK_IMPORTED_MODULE_1__.game.particles.push(new _world_particles_ColorParticle__WEBPACK_IMPORTED_MODULE_6__.ColorParticle(this.bottomCollision.color, 1 / 8 + Math.random() / 8, 20, this.x + this.width * Math.random(), this.y + this.height, 0.2 * (Math.random() - 0.5), 0.2 * -Math.random()));
                        }
                    }
                }
                else {
                    _Game__WEBPACK_IMPORTED_MODULE_1__.game.screenshakeAmount = Math.abs(this.yVel * 0.75);
                    for (let i = 0; i < 5 * _Game__WEBPACK_IMPORTED_MODULE_1__.game.particleMultiplier; i++) { //ceiling collision particles
                        if (this.topCollision !== undefined)
                            _Game__WEBPACK_IMPORTED_MODULE_1__.game.particles.push(new _world_particles_ColorParticle__WEBPACK_IMPORTED_MODULE_6__.ColorParticle(this.topCollision.color, 1 / 8 + Math.random() / 8, 20, this.x + this.width * Math.random(), this.y, 0.2 * (Math.random() - 0.5), 0.2 * -Math.random()));
                    }
                }
                this.yVel = 0; // set the y velocity to 0 because the object has run into a wall on its top or bottom
                this.slideX = this.xVel * (1 - this.closestCollision[2]); // this is the remaining distance to slide after the collision
                this.slideY = 0; // it doesn't slide in the y direction because there's a wall \(.-.)/
            }
            else {
                this.xVel = 0; // set the x velocity to 0 because wall go oof
                this.slideX = 0; // it doesn't slide in the x direction because there's a wall /(._.)\
                this.slideY = this.yVel * (1 - this.closestCollision[2]); // this is the remaining distance to slide after the collision
            }
            // at this point, the object is touching its first collision, ready to slide.  The amount it wants to slide is held in the this.slideX and this.slideY variables.
            // this can be treated essentially the same as the first collision, so a lot of the code will be reused.
            // set the closest collision to one infinitely far away.
            this.closestCollision = [1, 0, Infinity];
            // loop through all the possible tiles the physics box could be intersecting with
            for (let i = Math.floor(_Game__WEBPACK_IMPORTED_MODULE_1__.game.min(this.x, this.x + this.slideX)); i < Math.ceil(_Game__WEBPACK_IMPORTED_MODULE_1__.game.max(this.x, this.x + this.slideX) + this.width); i++) {
                for (let j = Math.floor(_Game__WEBPACK_IMPORTED_MODULE_1__.game.min(this.y, this.y + this.slideY)); j <
                    Math.ceil(_Game__WEBPACK_IMPORTED_MODULE_1__.game.max(this.y, this.y + this.slideY) + this.height); j++) {
                    let currentBlock = _Game__WEBPACK_IMPORTED_MODULE_1__.game.world.worldTiles[j * _Game__WEBPACK_IMPORTED_MODULE_1__.game.worldWidth + i];
                    // if the current tile isn't air, then continue with the collision detection
                    if (currentBlock !== _global_Tile__WEBPACK_IMPORTED_MODULE_4__.TileType.Air && typeof currentBlock !== "string") {
                        // get the data about the collision and store it in a variable
                        this.collisionData = _Game__WEBPACK_IMPORTED_MODULE_1__.game.rectVsRay(i - this.width, j - this.height, this.width + 1, this.height + 1, this.x, this.y, this.slideX, this.slideY);
                        if (this.collisionData !== false &&
                            this.closestCollision[2] > this.collisionData[2]) {
                            this.closestCollision = this.collisionData;
                            if (this.closestCollision[0] === 0) {
                                if (this.closestCollision[1] === 1) {
                                    this.topCollision = _world_WorldTiles__WEBPACK_IMPORTED_MODULE_5__.WorldTiles[currentBlock];
                                }
                                else {
                                    this.bottomCollision = _world_WorldTiles__WEBPACK_IMPORTED_MODULE_5__.WorldTiles[currentBlock];
                                }
                            }
                        }
                    }
                }
            }
            // it has collided while trying to slide
            if (this.closestCollision[2] !== Infinity) {
                this.x += this.slideX * this.closestCollision[2];
                this.y += this.slideY * this.closestCollision[2];
                if (this.closestCollision[0] === 0) {
                    this.yVel = 0; // set the y velocity to 0 because the object has run into a wall on its top or bottom
                    if (this.closestCollision[1] === -1) {
                        // if it collided on the higher side, it must be touching the ground. (higher y is down)
                        this.grounded = true;
                    }
                }
                else {
                    this.xVel = 0; // set the x velocity to 0 because wall go oof
                }
            }
            else {
                // it has not collided while trying to slide
                this.x += this.slideX;
                this.y += this.slideY;
            }
        }
        else {
            // there has been no collision
            this.x += this.xVel;
            this.y += this.yVel;
        }
        // collide with sides of map
        if (this.x < 0) {
            this.x = 0;
            this.xVel = 0;
        }
        else if (this.x + this.width > _Game__WEBPACK_IMPORTED_MODULE_1__.game.worldWidth) {
            this.x = _Game__WEBPACK_IMPORTED_MODULE_1__.game.worldWidth - this.width;
            this.xVel = 0;
        }
        if (this.y + this.height > _Game__WEBPACK_IMPORTED_MODULE_1__.game.worldHeight) {
            this.y = _Game__WEBPACK_IMPORTED_MODULE_1__.game.worldHeight - this.height;
            this.yVel = 0;
            this.grounded = true;
        }
    }
}
function randomlyToInt(f) {
    if (Math.random() > f - Math.floor(f)) {
        return (Math.floor(f));
    }
    return (Math.ceil(f));
}


/***/ }),

/***/ "./src/client/ui/Button.ts":
/*!*********************************!*\
  !*** ./src/client/ui/Button.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Button": () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var _assets_Assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/Assets */ "./src/client/assets/Assets.ts");

class Button {
    constructor(font, txt, description, x, y, w, h, onPressedCustom) {
        this.font = font;
        this.txt = txt;
        this.description = description;
        this.onPressedCustom = onPressedCustom;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.image = _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.UiAssets.button_unselected;
        this.mouseIsOver = false;
    }
    render(target, upscaleSize) {
        // set the coords and dimensions to round to the nearest un-upscaled pixel
        const x = Math.round(this.x / upscaleSize) * upscaleSize;
        const y = Math.round(this.y / upscaleSize) * upscaleSize;
        const w = Math.round(this.w / upscaleSize) * upscaleSize;
        const h = Math.round(this.h / upscaleSize) * upscaleSize;
        // corners
        this.image.renderPartial(target, x, y, 7 * upscaleSize, 7 * upscaleSize, 0, 0, 7, 7);
        this.image.renderPartial(target, x + w - 7 * upscaleSize, y, 7 * upscaleSize, 7 * upscaleSize, 8, 0, 7, 7);
        this.image.renderPartial(target, x, y + h - 7 * upscaleSize, 7 * upscaleSize, 7 * upscaleSize, 0, 8, 7, 7);
        this.image.renderPartial(target, x + w - 7 * upscaleSize, y + h - 7 * upscaleSize, 7 * upscaleSize, 7 * upscaleSize, 8, 8, 7, 7);
        // top and bottom
        this.image.renderPartial(target, x + 7 * upscaleSize, y, w - 14 * upscaleSize, 7 * upscaleSize, 7, 0, 1, 7);
        this.image.renderPartial(target, x + 7 * upscaleSize, y + h - 7 * upscaleSize, w - 14 * upscaleSize, 7 * upscaleSize, 7, 8, 1, 7);
        // left and right
        this.image.renderPartial(target, x, y + 7 * upscaleSize, 7 * upscaleSize, h - 14 * upscaleSize, 0, 7, 7, 1);
        this.image.renderPartial(target, x + w - 7 * upscaleSize, y + 7 * upscaleSize, 7 * upscaleSize, h - 14 * upscaleSize, 8, 7, 7, 1);
        // center
        this.image.renderPartial(target, x + 7 * upscaleSize, y + 7 * upscaleSize, w - 14 * upscaleSize, h - 14 * upscaleSize, 7, 7, 1, 1);
        this.font.drawText(target, this.txt, x + 6 * upscaleSize, Math.round((this.y + this.h / 2) / upscaleSize) * upscaleSize - 6 * upscaleSize);
    }
    updateMouseOver(mouseX, mouseY) {
        // if the mouse position is inside the button, return true
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
            this.mouseIsOver = true;
            this.image = _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.UiAssets.button_selected;
        }
        else {
            this.mouseIsOver = false;
            this.image = _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.UiAssets.button_unselected;
        }
    }
    onPressed() {
        this.onPressedCustom();
        console.log("button pressed");
        //AudioAssets.ui.inventoryClack.playRandom();
    }
}


/***/ }),

/***/ "./src/client/ui/InputBox.ts":
/*!***********************************!*\
  !*** ./src/client/ui/InputBox.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputBox": () => (/* binding */ InputBox)
/* harmony export */ });
/* harmony import */ var _assets_Assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/Assets */ "./src/client/assets/Assets.ts");

class InputBox {
    constructor(font, txt, keyboard, value, index, // the index in the Game.controls array that it changes
    x, y, w, h) {
        this.font = font;
        this.txt = txt;
        this.value = value;
        this.keyboard = keyboard;
        this.index = index;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.image = _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.UiAssets.button_unselected;
        this.mouseIsOver = false;
        this.listening = false;
    }
    render(target, upscaleSize) {
        // set the coords and dimensions to round to the nearest un-upscaled pixel
        const x = Math.round(this.x / upscaleSize) * upscaleSize;
        const y = Math.round(this.y / upscaleSize) * upscaleSize;
        const w = Math.round(this.w / upscaleSize) * upscaleSize;
        const h = Math.round(this.h / upscaleSize) * upscaleSize;
        // corners
        this.image.renderPartial(target, x, y, 7 * upscaleSize, 7 * upscaleSize, 0, 0, 7, 7);
        this.image.renderPartial(target, x + w - 7 * upscaleSize, y, 7 * upscaleSize, 7 * upscaleSize, 8, 0, 7, 7);
        this.image.renderPartial(target, x, y + h - 7 * upscaleSize, 7 * upscaleSize, 7 * upscaleSize, 0, 8, 7, 7);
        this.image.renderPartial(target, x + w - 7 * upscaleSize, y + h - 7 * upscaleSize, 7 * upscaleSize, 7 * upscaleSize, 8, 8, 7, 7);
        // top and bottom
        this.image.renderPartial(target, x + 7 * upscaleSize, y, w - 14 * upscaleSize, 7 * upscaleSize, 7, 0, 1, 7);
        this.image.renderPartial(target, x + 7 * upscaleSize, y + h - 7 * upscaleSize, w - 14 * upscaleSize, 7 * upscaleSize, 7, 8, 1, 7);
        // left and right
        this.image.renderPartial(target, x, y + 7 * upscaleSize, 7 * upscaleSize, h - 14 * upscaleSize, 0, 7, 7, 1);
        this.image.renderPartial(target, x + w - 7 * upscaleSize, y + 7 * upscaleSize, 7 * upscaleSize, h - 14 * upscaleSize, 8, 7, 7, 1);
        // center
        this.image.renderPartial(target, x + 7 * upscaleSize, y + 7 * upscaleSize, w - 14 * upscaleSize, h - 14 * upscaleSize, 7, 7, 1, 1);
        if (this.listening) {
            this.font.drawText(target, this.txt + ": click to cancel", x + 6 * upscaleSize, Math.round((this.y + this.h / 2) / upscaleSize) * upscaleSize - 6 * upscaleSize);
        }
        else {
            if (this.keyboard) {
                this.font.drawText(target, this.txt + ":   " + _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.Keys.keyboardMap[this.value], x + 6 * upscaleSize, Math.round((this.y + this.h / 2) / upscaleSize) * upscaleSize - 6 * upscaleSize);
            }
            else {
                this.font.drawText(target, this.txt + ":   Mouse " + this.value, x + 6 * upscaleSize, Math.round((this.y + this.h / 2) / upscaleSize) * upscaleSize - 6 * upscaleSize);
            }
        }
    }
    updateMouseOver(mouseX, mouseY) {
        // if the mouse position is inside the button, return true
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
            this.mouseIsOver = true;
        }
        else {
            this.mouseIsOver = false;
        }
    }
    onPressed() {
        console.log("input box pressed");
        this.listening = !this.listening;
        if (this.listening) {
            this.image = _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.UiAssets.button_selected;
            return;
        }
        this.image = _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.UiAssets.button_unselected;
        // AudioAssets.ui.inventoryClack.playRandom();
    }
}


/***/ }),

/***/ "./src/client/ui/Slider.ts":
/*!*********************************!*\
  !*** ./src/client/ui/Slider.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Slider": () => (/* binding */ Slider)
/* harmony export */ });
/* harmony import */ var _assets_Assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/Assets */ "./src/client/assets/Assets.ts");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Game */ "./src/client/Game.ts");


class Slider {
    constructor(font, txt, value, min, max, step, x, y, w, h, onChanged) {
        this.value = value;
        this.min = min;
        this.max = max;
        this.step = step;
        this.onChanged = onChanged;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.beingEdited = false;
    }
    render(target, upscaleSize) {
        // set the coords and dimensions to round to the nearest un-upscaled pixel
        const x = Math.round(this.x / upscaleSize) * upscaleSize;
        const y = Math.round((this.y + this.h / 2) / upscaleSize) * upscaleSize;
        const w = Math.round(this.w / upscaleSize) * upscaleSize;
        // left side of slider bar
        _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.UiAssets.slider_bar.renderPartial(target, x, y - 2 * upscaleSize, 2 * upscaleSize, 4 * upscaleSize, 0, 0, 2, 4);
        // right side of slider bar
        _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.UiAssets.slider_bar.renderPartial(target, x + w - 2 * upscaleSize, y - 2 * upscaleSize, 2 * upscaleSize, 4 * upscaleSize, 3, 0, 2, 4);
        // center of slider bar
        _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.UiAssets.slider_bar.renderPartial(target, x + 2 * upscaleSize, y - 2 * upscaleSize, w - 4 * upscaleSize, 4 * upscaleSize, 2, 0, 1, 4);
        // handle
        _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.UiAssets.slider_handle.render(target, x + Math.round((this.value - this.min) / (this.max - this.min) * (w - 8 * upscaleSize) / upscaleSize) * upscaleSize, y - 4 * upscaleSize, 8 * upscaleSize, 9 * upscaleSize);
    }
    updateSliderPosition(mouseX) {
        if (this.beingEdited) {
            this.value = Math.max(this.min, Math.min(this.max, Math.round((this.min + (this.max - this.min) * (((mouseX - this.x - 4 * _Game__WEBPACK_IMPORTED_MODULE_1__.game.upscaleSize) / (this.w - (8 * _Game__WEBPACK_IMPORTED_MODULE_1__.game.upscaleSize))))) / this.step) * this.step));
            this.onChanged();
        }
    }
}


/***/ }),

/***/ "./src/client/ui/UiFrame.ts":
/*!**********************************!*\
  !*** ./src/client/ui/UiFrame.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UiFrame": () => (/* binding */ UiFrame)
/* harmony export */ });
/* harmony import */ var _assets_Assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/Assets */ "./src/client/assets/Assets.ts");

class UiFrame {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    render(target, upscaleSize) {
        // set the coords and dimensions to round to the nearest un-upscaled pixel
        const x = Math.round(this.x / upscaleSize) * upscaleSize;
        const y = Math.round(this.y / upscaleSize) * upscaleSize;
        const w = Math.round(this.w / upscaleSize) * upscaleSize;
        const h = Math.round(this.h / upscaleSize) * upscaleSize;
        // corners
        _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.UiAssets.ui_frame.renderPartial(target, x, y, 7 * upscaleSize, 7 * upscaleSize, 0, 0, 7, 7);
        _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.UiAssets.ui_frame.renderPartial(target, x + w - 7 * upscaleSize, y, 7 * upscaleSize, 7 * upscaleSize, 8, 0, 7, 7);
        _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.UiAssets.ui_frame.renderPartial(target, x, y + h - 7 * upscaleSize, 7 * upscaleSize, 7 * upscaleSize, 0, 8, 7, 7);
        _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.UiAssets.ui_frame.renderPartial(target, x + w - 7 * upscaleSize, y + h - 7 * upscaleSize, 7 * upscaleSize, 7 * upscaleSize, 8, 8, 7, 7);
        // top and bottom
        _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.UiAssets.ui_frame.renderPartial(target, x + 7 * upscaleSize, y, w - 14 * upscaleSize, 7 * upscaleSize, 7, 0, 1, 7);
        _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.UiAssets.ui_frame.renderPartial(target, x + 7 * upscaleSize, y + h - 7 * upscaleSize, w - 14 * upscaleSize, 7 * upscaleSize, 7, 8, 1, 7);
        // left and right
        _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.UiAssets.ui_frame.renderPartial(target, x, y + 7 * upscaleSize, 7 * upscaleSize, h - 14 * upscaleSize, 0, 7, 7, 1);
        _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.UiAssets.ui_frame.renderPartial(target, x + w - 7 * upscaleSize, y + 7 * upscaleSize, 7 * upscaleSize, h - 14 * upscaleSize, 8, 7, 7, 1);
        // center
        _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.UiAssets.ui_frame.renderPartial(target, x + 7 * upscaleSize, y + 7 * upscaleSize, w - 14 * upscaleSize, h - 14 * upscaleSize, 7, 7, 1, 1);
    }
}


/***/ }),

/***/ "./src/client/ui/UiScreen.ts":
/*!***********************************!*\
  !*** ./src/client/ui/UiScreen.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UiScreen": () => (/* binding */ UiScreen)
/* harmony export */ });
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Game */ "./src/client/Game.ts");
/* harmony import */ var _assets_Assets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/Assets */ "./src/client/assets/Assets.ts");


class UiScreen {
    constructor() {
        this.minScroll = 0;
        this.maxScroll = 0;
    }
    mousePressed(btn) {
        if (this.buttons !== undefined) {
            // loop through all the buttons in this menu and if the mouse is over them, then call the button's onPressed() function.  The onPressed() function is passed in through the constructor.
            for (const i of this.buttons) {
                if (i.mouseIsOver) {
                    i.onPressed();
                }
            }
            ;
        }
        if (this.sliders !== undefined) {
            // loop through all the sliders and interact with them accordingly
            for (const i of this.sliders) {
                i.updateSliderPosition(_Game__WEBPACK_IMPORTED_MODULE_0__.game.mouseX);
                if (_Game__WEBPACK_IMPORTED_MODULE_0__.game.mouseX > i.x && _Game__WEBPACK_IMPORTED_MODULE_0__.game.mouseX < i.x + i.w && _Game__WEBPACK_IMPORTED_MODULE_0__.game.mouseY > i.y && _Game__WEBPACK_IMPORTED_MODULE_0__.game.mouseY < i.y + i.h)
                    i.beingEdited = true;
            }
        }
        if (this.inputBoxes !== undefined) {
            //console.log(this.inputBoxes);
            // loop through all the input boxes and interact with them accordingly
            for (const i of this.inputBoxes) {
                if (i.mouseIsOver) {
                    i.onPressed();
                }
                else if (i.listening) {
                    i.listening = false;
                    _Game__WEBPACK_IMPORTED_MODULE_0__.game.controls[i.index].keyCode = btn;
                    _Game__WEBPACK_IMPORTED_MODULE_0__.game.controls[i.index].keyboard = false;
                    i.value = btn;
                    i.keyboard = false;
                    i.image = _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.UiAssets.button_unselected;
                }
            }
        }
    }
    mouseReleased() {
        if (this.sliders !== undefined) {
            // loop through all the sliders and interact with them accordingly
            for (const i of this.sliders) {
                i.beingEdited = false;
            }
        }
    }
}


/***/ }),

/***/ "./src/client/ui/screens/ControlsMenu.ts":
/*!***********************************************!*\
  !*** ./src/client/ui/screens/ControlsMenu.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ControlsMenu": () => (/* binding */ ControlsMenu)
/* harmony export */ });
/* harmony import */ var _UiScreen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../UiScreen */ "./src/client/ui/UiScreen.ts");
/* harmony import */ var _UiFrame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UiFrame */ "./src/client/ui/UiFrame.ts");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Game */ "./src/client/Game.ts");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Button */ "./src/client/ui/Button.ts");
/* harmony import */ var _OptionsMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OptionsMenu */ "./src/client/ui/screens/OptionsMenu.ts");
/* harmony import */ var _InputBox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../InputBox */ "./src/client/ui/InputBox.ts");






class ControlsMenu extends _UiScreen__WEBPACK_IMPORTED_MODULE_0__.UiScreen {
    constructor(font, titleFont) {
        super();
        // make the frame with some default values.  These will later be changed to fit the screen size.
        this.frame = new _UiFrame__WEBPACK_IMPORTED_MODULE_1__.UiFrame(0, 0, 0, 0);
        // make some buttons with default positions
        this.buttons = [
            new _Button__WEBPACK_IMPORTED_MODULE_3__.Button(font, "Back", "Return to the options menu.", 0, 0, 0, 0, () => {
                console.log("options menu");
                _Game__WEBPACK_IMPORTED_MODULE_2__.game.currentUi = new _OptionsMenu__WEBPACK_IMPORTED_MODULE_4__.OptionsMenu(font, titleFont);
            })
        ];
        this.inputBoxes = [
        // new InputBox(font, "Walk Right", true, 68, 0, 0, 0, 0, 0),
        // new InputBox(font, "Walk Left", true, 65, 1, 0, 0, 0, 0),
        // new InputBox(font, "Jump", true, 32, 2, 0, 0, 0, 0),
        // new InputBox(font, "Pause", true, 27, 3, 0, 0, 0, 0)
        ];
        let i = 0;
        for (let control of _Game__WEBPACK_IMPORTED_MODULE_2__.game.controls) {
            i++;
            this.inputBoxes.push(new _InputBox__WEBPACK_IMPORTED_MODULE_5__.InputBox(font, control.description, control.keyboard, control.keyCode, i, 0, 0, 0, 0));
        }
        // update the size of the elements based on the initial screen size
        this.windowUpdate();
    }
    render(target, upscaleSize) {
        // render the rectangular image
        this.frame.render(target, upscaleSize);
        // loop through the buttons array and render each one.
        this.buttons.forEach(button => {
            button.render(target, upscaleSize);
        });
        // loop through the inputBoxes array and render each one.
        this.inputBoxes.forEach(inputBox => {
            inputBox.render(target, upscaleSize);
        });
    }
    windowUpdate() {
        // set the position of the frame
        this.frame.x = _Game__WEBPACK_IMPORTED_MODULE_2__.game.width / 2 - 200 / 2 * _Game__WEBPACK_IMPORTED_MODULE_2__.game.upscaleSize; // center the frame in the center of the screen
        this.frame.y = _Game__WEBPACK_IMPORTED_MODULE_2__.game.height / 2 - 56 * _Game__WEBPACK_IMPORTED_MODULE_2__.game.upscaleSize;
        this.frame.w = 200 * _Game__WEBPACK_IMPORTED_MODULE_2__.game.upscaleSize;
        this.frame.h = 48 * _Game__WEBPACK_IMPORTED_MODULE_2__.game.upscaleSize;
    }
}


/***/ }),

/***/ "./src/client/ui/screens/MainMenu.ts":
/*!*******************************************!*\
  !*** ./src/client/ui/screens/MainMenu.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainMenu": () => (/* binding */ MainMenu)
/* harmony export */ });
/* harmony import */ var _UiScreen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../UiScreen */ "./src/client/ui/UiScreen.ts");
/* harmony import */ var _UiFrame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UiFrame */ "./src/client/ui/UiFrame.ts");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Button */ "./src/client/ui/Button.ts");
/* harmony import */ var _OptionsMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OptionsMenu */ "./src/client/ui/screens/OptionsMenu.ts");
/* harmony import */ var _assets_Assets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../assets/Assets */ "./src/client/assets/Assets.ts");
/* harmony import */ var _WorldCreationMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./WorldCreationMenu */ "./src/client/ui/screens/WorldCreationMenu.ts");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Game */ "./src/client/Game.ts");







class MainMenu extends _UiScreen__WEBPACK_IMPORTED_MODULE_0__.UiScreen {
    constructor(font, titleFont) {
        super();
        // make the frame with some default values.  These will later be changed to fit the screen size.
        this.frame = new _UiFrame__WEBPACK_IMPORTED_MODULE_1__.UiFrame(0, 0, 0, 0);
        // make 4 buttons with default positions
        this.buttons = [
            new _Button__WEBPACK_IMPORTED_MODULE_2__.Button(font, "Resume Game", "Keep playing where you left off.", 0, 0, 0, 0, () => {
                console.log("resume game");
                _Game__WEBPACK_IMPORTED_MODULE_6__.game.currentUi = undefined;
            }),
            new _Button__WEBPACK_IMPORTED_MODULE_2__.Button(font, "New Game", "Creates a new server that your friends can join.", 0, 0, 0, 0, () => {
                console.log("new game");
                _Game__WEBPACK_IMPORTED_MODULE_6__.game.currentUi = new _WorldCreationMenu__WEBPACK_IMPORTED_MODULE_5__.WorldCreationMenu(font, titleFont);
            }),
            new _Button__WEBPACK_IMPORTED_MODULE_2__.Button(font, "Join Game", "Join a game with your friends, or make new ones.", 0, 0, 0, 0, () => {
                console.log("join game");
                _Game__WEBPACK_IMPORTED_MODULE_6__.game.currentUi = undefined;
            }),
            new _Button__WEBPACK_IMPORTED_MODULE_2__.Button(font, "Options", "Change your keybinds, reduce lag, etc.", 0, 0, 0, 0, () => {
                console.log("options");
                _Game__WEBPACK_IMPORTED_MODULE_6__.game.currentUi = new _OptionsMenu__WEBPACK_IMPORTED_MODULE_3__.OptionsMenu(font, titleFont);
            })
        ];
        // update the size of the elements based on the initial screen size
        this.windowUpdate();
    }
    render(target, upscaleSize) {
        // render the rectangular image that the whole menu is on
        this.frame.render(target, upscaleSize);
        _assets_Assets__WEBPACK_IMPORTED_MODULE_4__.UiAssets.title_image.render(target, Math.round(this.frame.x / upscaleSize + 1) * upscaleSize, Math.round(this.frame.y / upscaleSize + 4) * upscaleSize, 256 * upscaleSize, 40 * upscaleSize);
        // loop through the buttons array and render each one.
        for (const item of this.buttons) {
            item.render(target, upscaleSize);
        }
    }
    windowUpdate() {
        // set the position of the frame
        this.frame.x = _Game__WEBPACK_IMPORTED_MODULE_6__.game.width / 2 - 264 / 2 * _Game__WEBPACK_IMPORTED_MODULE_6__.game.upscaleSize; // center the frame in the middle of the screen
        this.frame.y = _Game__WEBPACK_IMPORTED_MODULE_6__.game.height / 2 - 56 * _Game__WEBPACK_IMPORTED_MODULE_6__.game.upscaleSize;
        this.frame.w = 264 * _Game__WEBPACK_IMPORTED_MODULE_6__.game.upscaleSize;
        this.frame.h = 48 * _Game__WEBPACK_IMPORTED_MODULE_6__.game.upscaleSize;
        // set the positions of all the buttons
        for (let i = 0; i < 4; i++) {
            this.buttons[i].x = _Game__WEBPACK_IMPORTED_MODULE_6__.game.width / 2 - 192 / 2 * _Game__WEBPACK_IMPORTED_MODULE_6__.game.upscaleSize;
            this.buttons[i].y = _Game__WEBPACK_IMPORTED_MODULE_6__.game.height / 2 + 20 * i * _Game__WEBPACK_IMPORTED_MODULE_6__.game.upscaleSize;
            this.buttons[i].w = 192 * _Game__WEBPACK_IMPORTED_MODULE_6__.game.upscaleSize;
            this.buttons[i].h = 16 * _Game__WEBPACK_IMPORTED_MODULE_6__.game.upscaleSize;
            this.buttons[i].updateMouseOver(_Game__WEBPACK_IMPORTED_MODULE_6__.game.mouseX, _Game__WEBPACK_IMPORTED_MODULE_6__.game.mouseY);
        }
    }
}


/***/ }),

/***/ "./src/client/ui/screens/OptionsMenu.ts":
/*!**********************************************!*\
  !*** ./src/client/ui/screens/OptionsMenu.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OptionsMenu": () => (/* binding */ OptionsMenu)
/* harmony export */ });
/* harmony import */ var _UiScreen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../UiScreen */ "./src/client/ui/UiScreen.ts");
/* harmony import */ var _UiFrame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UiFrame */ "./src/client/ui/UiFrame.ts");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Button */ "./src/client/ui/Button.ts");
/* harmony import */ var _MainMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MainMenu */ "./src/client/ui/screens/MainMenu.ts");
/* harmony import */ var _VideoSettingsMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VideoSettingsMenu */ "./src/client/ui/screens/VideoSettingsMenu.ts");
/* harmony import */ var _ControlsMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ControlsMenu */ "./src/client/ui/screens/ControlsMenu.ts");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Game */ "./src/client/Game.ts");







class OptionsMenu extends _UiScreen__WEBPACK_IMPORTED_MODULE_0__.UiScreen {
    constructor(font, titleFont) {
        super();
        // make the frame with some default values.  These will later be changed to fit the screen size.
        this.frame = new _UiFrame__WEBPACK_IMPORTED_MODULE_1__.UiFrame(0, 0, 0, 0);
        this.titleFont = titleFont;
        // make some buttons with default positions
        this.buttons = [
            new _Button__WEBPACK_IMPORTED_MODULE_2__.Button(font, "Video Settings", "Change the balance between performance and fidelity.", 0, 0, 0, 0, () => {
                console.log("video settings");
                _Game__WEBPACK_IMPORTED_MODULE_6__.game.currentUi = new _VideoSettingsMenu__WEBPACK_IMPORTED_MODULE_4__.VideoSettingsMenu(font, titleFont);
            }),
            new _Button__WEBPACK_IMPORTED_MODULE_2__.Button(font, "Controls", "Change your keybinds.", 0, 0, 0, 0, () => {
                console.log("control menu");
                _Game__WEBPACK_IMPORTED_MODULE_6__.game.currentUi = new _ControlsMenu__WEBPACK_IMPORTED_MODULE_5__.ControlsMenu(font, titleFont);
            }),
            new _Button__WEBPACK_IMPORTED_MODULE_2__.Button(font, "Audio Settings", "Change the volume of different sounds.", 0, 0, 0, 0, () => {
                console.log("audio menu");
                _Game__WEBPACK_IMPORTED_MODULE_6__.game.currentUi = undefined;
            }),
            new _Button__WEBPACK_IMPORTED_MODULE_2__.Button(font, "Back", "Return to the main menu.", 0, 0, 0, 0, () => {
                console.log("main menu");
                _Game__WEBPACK_IMPORTED_MODULE_6__.game.currentUi = new _MainMenu__WEBPACK_IMPORTED_MODULE_3__.MainMenu(font, titleFont);
            })
        ];
        // update the size of the elements based on the initial screen size
        this.windowUpdate();
    }
    render(target, upscaleSize) {
        // render the rectangular image that the whole menu is on
        this.frame.render(target, upscaleSize);
        // loop through the buttons array and render each one.
        this.buttons.forEach(button => {
            button.render(target, upscaleSize);
        });
        this.titleFont.drawText(target, "Options", this.frame.x + 54 * _Game__WEBPACK_IMPORTED_MODULE_6__.game.upscaleSize, this.frame.y + 16 * _Game__WEBPACK_IMPORTED_MODULE_6__.game.upscaleSize);
    }
    windowUpdate() {
        // set the position of the frame
        this.frame.x = _Game__WEBPACK_IMPORTED_MODULE_6__.game.width / 2 - 200 / 2 * _Game__WEBPACK_IMPORTED_MODULE_6__.game.upscaleSize; // center the frame in the center of the screen
        this.frame.y = _Game__WEBPACK_IMPORTED_MODULE_6__.game.height / 2 - 56 * _Game__WEBPACK_IMPORTED_MODULE_6__.game.upscaleSize;
        this.frame.w = 200 * _Game__WEBPACK_IMPORTED_MODULE_6__.game.upscaleSize;
        this.frame.h = 48 * _Game__WEBPACK_IMPORTED_MODULE_6__.game.upscaleSize;
        // set the positions of all the buttons
        for (let i = 0; i < 4; i++) {
            this.buttons[i].x = _Game__WEBPACK_IMPORTED_MODULE_6__.game.width / 2 - 192 / 2 * _Game__WEBPACK_IMPORTED_MODULE_6__.game.upscaleSize;
            this.buttons[i].y = _Game__WEBPACK_IMPORTED_MODULE_6__.game.height / 2 + 20 * i * _Game__WEBPACK_IMPORTED_MODULE_6__.game.upscaleSize;
            this.buttons[i].w = 192 * _Game__WEBPACK_IMPORTED_MODULE_6__.game.upscaleSize;
            this.buttons[i].h = 16 * _Game__WEBPACK_IMPORTED_MODULE_6__.game.upscaleSize;
            this.buttons[i].updateMouseOver(_Game__WEBPACK_IMPORTED_MODULE_6__.game.mouseX, _Game__WEBPACK_IMPORTED_MODULE_6__.game.mouseY);
        }
    }
}


/***/ }),

/***/ "./src/client/ui/screens/PauseMenu.ts":
/*!********************************************!*\
  !*** ./src/client/ui/screens/PauseMenu.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PauseMenu": () => (/* binding */ PauseMenu)
/* harmony export */ });
/* harmony import */ var _UiScreen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../UiScreen */ "./src/client/ui/UiScreen.ts");
/* harmony import */ var _UiFrame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UiFrame */ "./src/client/ui/UiFrame.ts");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Button */ "./src/client/ui/Button.ts");
/* harmony import */ var _OptionsMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OptionsMenu */ "./src/client/ui/screens/OptionsMenu.ts");
/* harmony import */ var _MainMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MainMenu */ "./src/client/ui/screens/MainMenu.ts");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Game */ "./src/client/Game.ts");






class PauseMenu extends _UiScreen__WEBPACK_IMPORTED_MODULE_0__.UiScreen {
    constructor(font, titleFont) {
        super();
        // make the frame with some default values.  These will later be changed to fit the screen size.
        this.frame = new _UiFrame__WEBPACK_IMPORTED_MODULE_1__.UiFrame(0, 0, 0, 0);
        this.titleFont = titleFont;
        // make 4 buttons with default positSions
        this.buttons = [
            new _Button__WEBPACK_IMPORTED_MODULE_2__.Button(font, "Resume game", "Go back to the game.", 0, 0, 0, 0, () => {
                _Game__WEBPACK_IMPORTED_MODULE_5__.game.currentUi = undefined;
            }),
            new _Button__WEBPACK_IMPORTED_MODULE_2__.Button(font, "Options", "Change your keybinds, reduce lag, etc.", 0, 0, 0, 0, () => {
                _Game__WEBPACK_IMPORTED_MODULE_5__.game.currentUi = new _OptionsMenu__WEBPACK_IMPORTED_MODULE_3__.OptionsMenu(font, titleFont);
            }),
            new _Button__WEBPACK_IMPORTED_MODULE_2__.Button(font, "Leave game", "Go back to Main Menu", 0, 0, 0, 0, () => {
                _Game__WEBPACK_IMPORTED_MODULE_5__.game.currentUi = new _MainMenu__WEBPACK_IMPORTED_MODULE_4__.MainMenu(font, titleFont);
            })
        ];
        // update the size of the elements based on the initial screen size
        this.windowUpdate();
    }
    render(target, upscaleSize) {
        // render the rectangular image that the whole menu is on
        this.frame.render(target, upscaleSize);
        // loop through the buttons array and render each one.
        for (const item of this.buttons) {
            item.render(target, upscaleSize);
        }
        this.titleFont.drawText(target, "Paused", this.frame.x + 54 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize, this.frame.y + 16 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize);
    }
    windowUpdate() {
        // set the position of the frame
        this.frame.x = _Game__WEBPACK_IMPORTED_MODULE_5__.game.width / 2 - 200 / 2 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize; // center the frame in the middle of the screen
        this.frame.y = _Game__WEBPACK_IMPORTED_MODULE_5__.game.height / 2 - 72 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
        this.frame.w = 200 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
        this.frame.h = 54 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
        // set the positions of all the buttons
        for (let i = 0; i < 3; i++) {
            this.buttons[i].x = _Game__WEBPACK_IMPORTED_MODULE_5__.game.width / 2 - 192 / 2 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
            this.buttons[i].y = _Game__WEBPACK_IMPORTED_MODULE_5__.game.height / 2 + 20 * i * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
            this.buttons[i].w = 192 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
            this.buttons[i].h = 16 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
            this.buttons[i].updateMouseOver(_Game__WEBPACK_IMPORTED_MODULE_5__.game.mouseX, _Game__WEBPACK_IMPORTED_MODULE_5__.game.mouseY);
        }
    }
}


/***/ }),

/***/ "./src/client/ui/screens/VideoSettingsMenu.ts":
/*!****************************************************!*\
  !*** ./src/client/ui/screens/VideoSettingsMenu.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VideoSettingsMenu": () => (/* binding */ VideoSettingsMenu)
/* harmony export */ });
/* harmony import */ var _UiScreen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../UiScreen */ "./src/client/ui/UiScreen.ts");
/* harmony import */ var _UiFrame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UiFrame */ "./src/client/ui/UiFrame.ts");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Game */ "./src/client/Game.ts");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Button */ "./src/client/ui/Button.ts");
/* harmony import */ var _OptionsMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OptionsMenu */ "./src/client/ui/screens/OptionsMenu.ts");





class VideoSettingsMenu extends _UiScreen__WEBPACK_IMPORTED_MODULE_0__.UiScreen {
    constructor(font, titleFont) {
        super();
        // make the frame with some default values.  These will later be changed to fit the screen size.
        this.frame = new _UiFrame__WEBPACK_IMPORTED_MODULE_1__.UiFrame(0, 0, 0, 0);
        if (_Game__WEBPACK_IMPORTED_MODULE_2__.game.skyMod === undefined)
            _Game__WEBPACK_IMPORTED_MODULE_2__.game.skyMod = 2;
        if (_Game__WEBPACK_IMPORTED_MODULE_2__.game.skyToggle === undefined)
            _Game__WEBPACK_IMPORTED_MODULE_2__.game.skyToggle = true;
        if (_Game__WEBPACK_IMPORTED_MODULE_2__.game.particleMultiplier === undefined)
            _Game__WEBPACK_IMPORTED_MODULE_2__.game.particleMultiplier = 1;
        let tempSkyModeText;
        if (_Game__WEBPACK_IMPORTED_MODULE_2__.game.skyMod === 2) {
            tempSkyModeText = "Half Framerate";
        }
        else if (_Game__WEBPACK_IMPORTED_MODULE_2__.game.skyMod === 1) {
            tempSkyModeText = "Full Framerate";
        }
        else {
            tempSkyModeText = "Solid Color";
        }
        let tempParticleText;
        if (_Game__WEBPACK_IMPORTED_MODULE_2__.game.particleMultiplier === 2) {
            tempParticleText = "Double";
        }
        else if (_Game__WEBPACK_IMPORTED_MODULE_2__.game.particleMultiplier === 1) {
            tempParticleText = "Normal";
        }
        else {
            tempParticleText = "Minimal";
        }
        // make some buttons with default positions
        this.buttons = [
            new _Button__WEBPACK_IMPORTED_MODULE_3__.Button(font, `Sky: ${tempSkyModeText}`, "Change the appearance of the sky.", 0, 0, 0, 0, () => {
                console.log("sky toggle");
                if (this.buttons[0].txt === "Sky: Half Framerate") {
                    this.buttons[0].txt = "Sky: Full Framerate";
                    _Game__WEBPACK_IMPORTED_MODULE_2__.game.skyMod = 1;
                    _Game__WEBPACK_IMPORTED_MODULE_2__.game.skyToggle = true;
                }
                else if (this.buttons[0].txt === "Sky: Full Framerate") {
                    this.buttons[0].txt = "Sky: Solid Color";
                    _Game__WEBPACK_IMPORTED_MODULE_2__.game.skyToggle = false;
                }
                else {
                    this.buttons[0].txt = "Sky: Half Framerate";
                    _Game__WEBPACK_IMPORTED_MODULE_2__.game.skyMod = 2;
                    _Game__WEBPACK_IMPORTED_MODULE_2__.game.skyToggle = true;
                }
            }),
            new _Button__WEBPACK_IMPORTED_MODULE_3__.Button(font, `Particles: ${tempParticleText}`, "Change the amount of particles", 0, 0, 0, 0, () => {
                console.log("particles");
                if (this.buttons[1].txt === "Particles: Normal") {
                    this.buttons[1].txt = "Particles: Double";
                    _Game__WEBPACK_IMPORTED_MODULE_2__.game.particleMultiplier = 2;
                }
                else if (this.buttons[1].txt === "Particles: Double") {
                    this.buttons[1].txt = "Particles: Minimal";
                    _Game__WEBPACK_IMPORTED_MODULE_2__.game.particleMultiplier = 0.5;
                }
                else {
                    this.buttons[1].txt = "Particles: Normal";
                    _Game__WEBPACK_IMPORTED_MODULE_2__.game.particleMultiplier = 1;
                }
            }),
            new _Button__WEBPACK_IMPORTED_MODULE_3__.Button(font, "Back", "Return to the main menu.", 0, 0, 0, 0, () => {
                console.log("main menu");
                _Game__WEBPACK_IMPORTED_MODULE_2__.game.currentUi = new _OptionsMenu__WEBPACK_IMPORTED_MODULE_4__.OptionsMenu(font, titleFont);
            })
        ];
        // update the size of the elements based on the initial screen size
        this.windowUpdate();
    }
    render(target, upscaleSize) {
        // render the rectangular image
        this.frame.render(target, upscaleSize);
        // loop through the buttons array and render each one.
        this.buttons.forEach(button => {
            button.render(target, upscaleSize);
        });
    }
    windowUpdate() {
        // set the position of the frame
        this.frame.x = _Game__WEBPACK_IMPORTED_MODULE_2__.game.width / 2 - 200 / 2 * _Game__WEBPACK_IMPORTED_MODULE_2__.game.upscaleSize; // center the frame in the center of the screen
        this.frame.y = _Game__WEBPACK_IMPORTED_MODULE_2__.game.height / 2 - 56 * _Game__WEBPACK_IMPORTED_MODULE_2__.game.upscaleSize;
        this.frame.w = 200 * _Game__WEBPACK_IMPORTED_MODULE_2__.game.upscaleSize;
        this.frame.h = 48 * _Game__WEBPACK_IMPORTED_MODULE_2__.game.upscaleSize;
        // set the positions of all the buttons
        for (let i = 0; i < 3; i++) {
            this.buttons[i].x = _Game__WEBPACK_IMPORTED_MODULE_2__.game.width / 2 - 192 / 2 * _Game__WEBPACK_IMPORTED_MODULE_2__.game.upscaleSize;
            this.buttons[i].y = _Game__WEBPACK_IMPORTED_MODULE_2__.game.height / 2 + 20 * i * _Game__WEBPACK_IMPORTED_MODULE_2__.game.upscaleSize;
            this.buttons[i].w = 192 * _Game__WEBPACK_IMPORTED_MODULE_2__.game.upscaleSize;
            this.buttons[i].h = 16 * _Game__WEBPACK_IMPORTED_MODULE_2__.game.upscaleSize;
            this.buttons[i].updateMouseOver(_Game__WEBPACK_IMPORTED_MODULE_2__.game.mouseX, _Game__WEBPACK_IMPORTED_MODULE_2__.game.mouseY);
        }
    }
}


/***/ }),

/***/ "./src/client/ui/screens/WorldCreationMenu.ts":
/*!****************************************************!*\
  !*** ./src/client/ui/screens/WorldCreationMenu.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorldCreationMenu": () => (/* binding */ WorldCreationMenu)
/* harmony export */ });
/* harmony import */ var _UiScreen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../UiScreen */ "./src/client/ui/UiScreen.ts");
/* harmony import */ var _UiFrame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UiFrame */ "./src/client/ui/UiFrame.ts");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Button */ "./src/client/ui/Button.ts");
/* harmony import */ var _MainMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MainMenu */ "./src/client/ui/screens/MainMenu.ts");
/* harmony import */ var _WorldOptionsMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WorldOptionsMenu */ "./src/client/ui/screens/WorldOptionsMenu.ts");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Game */ "./src/client/Game.ts");






class WorldCreationMenu extends _UiScreen__WEBPACK_IMPORTED_MODULE_0__.UiScreen {
    constructor(font, titleFont) {
        super();
        // make the frame with some default values.  These will later be changed to fit the screen size.
        this.frame = new _UiFrame__WEBPACK_IMPORTED_MODULE_1__.UiFrame(0, 0, 0, 0);
        this.titleFont = titleFont;
        // make some buttons with default positions
        if (_Game__WEBPACK_IMPORTED_MODULE_5__.game.serverVisibility === undefined)
            _Game__WEBPACK_IMPORTED_MODULE_5__.game.serverVisibility = "Public";
        this.buttons = [
            new _Button__WEBPACK_IMPORTED_MODULE_2__.Button(font, `Server Visibility: ${_Game__WEBPACK_IMPORTED_MODULE_5__.game.serverVisibility}`, "Change the visibility of the server", 0, 0, 0, 0, () => {
                if (this.buttons[0].txt === "Server Visibility: Public") {
                    _Game__WEBPACK_IMPORTED_MODULE_5__.game.serverVisibility = "Unlisted";
                    this.buttons[0].txt = "Server Visibility: Unlisted";
                }
                else if (this.buttons[0].txt === "Server Visibility: Unlisted") {
                    _Game__WEBPACK_IMPORTED_MODULE_5__.game.serverVisibility = "Private";
                    this.buttons[0].txt = "Server Visibility: Private";
                }
                else {
                    _Game__WEBPACK_IMPORTED_MODULE_5__.game.serverVisibility = "Public";
                    this.buttons[0].txt = "Server Visibility: Public";
                }
            }),
            new _Button__WEBPACK_IMPORTED_MODULE_2__.Button(font, "World Options", "Change how your world looks and generates.", 0, 0, 0, 0, () => {
                console.log("world menu");
                _Game__WEBPACK_IMPORTED_MODULE_5__.game.currentUi = new _WorldOptionsMenu__WEBPACK_IMPORTED_MODULE_4__.WorldOptionsMenu(font, titleFont);
            }),
            new _Button__WEBPACK_IMPORTED_MODULE_2__.Button(font, "Back", "Return to the main menu.", 0, 0, 0, 0, () => {
                console.log("main menu");
                _Game__WEBPACK_IMPORTED_MODULE_5__.game.currentUi = new _MainMenu__WEBPACK_IMPORTED_MODULE_3__.MainMenu(font, titleFont);
            })
        ];
        // update the size of the elements based on the initial screen size
        this.windowUpdate();
    }
    render(target, upscaleSize) {
        // render the rectangular image that the whole menu is on
        this.frame.render(target, upscaleSize);
        // loop through the buttons array and render each one.
        this.buttons.forEach(button => {
            button.render(target, upscaleSize);
        });
        this.titleFont.drawText(target, "Create World", this.frame.x + 30 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize, this.frame.y + 16 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize);
    }
    windowUpdate() {
        // set the position of the frame
        this.frame.x = _Game__WEBPACK_IMPORTED_MODULE_5__.game.width / 2 - 200 / 2 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize; // center the frame in the center of the screen
        this.frame.y = _Game__WEBPACK_IMPORTED_MODULE_5__.game.height / 2 - 56 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
        this.frame.w = 200 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
        this.frame.h = 48 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
        // set the positions of all the buttons
        for (let i = 0; i < 3; i++) {
            this.buttons[i].x = _Game__WEBPACK_IMPORTED_MODULE_5__.game.width / 2 - 192 / 2 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
            this.buttons[i].y = _Game__WEBPACK_IMPORTED_MODULE_5__.game.height / 2 + 20 * i * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
            this.buttons[i].w = 192 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
            this.buttons[i].h = 16 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
            this.buttons[i].updateMouseOver(_Game__WEBPACK_IMPORTED_MODULE_5__.game.mouseX, _Game__WEBPACK_IMPORTED_MODULE_5__.game.mouseY);
        }
    }
}


/***/ }),

/***/ "./src/client/ui/screens/WorldOptionsMenu.ts":
/*!***************************************************!*\
  !*** ./src/client/ui/screens/WorldOptionsMenu.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorldOptionsMenu": () => (/* binding */ WorldOptionsMenu)
/* harmony export */ });
/* harmony import */ var _UiScreen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../UiScreen */ "./src/client/ui/UiScreen.ts");
/* harmony import */ var _UiFrame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UiFrame */ "./src/client/ui/UiFrame.ts");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Button */ "./src/client/ui/Button.ts");
/* harmony import */ var _WorldCreationMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WorldCreationMenu */ "./src/client/ui/screens/WorldCreationMenu.ts");
/* harmony import */ var _Slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Slider */ "./src/client/ui/Slider.ts");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Game */ "./src/client/Game.ts");






class WorldOptionsMenu extends _UiScreen__WEBPACK_IMPORTED_MODULE_0__.UiScreen {
    constructor(font, titleFont) {
        super();
        // make the frame with some default values.  These will later be changed to fit the screen size.
        this.frame = new _UiFrame__WEBPACK_IMPORTED_MODULE_1__.UiFrame(0, 0, 0, 0);
        this.titleFont = titleFont;
        // make some buttons with default positions
        if (_Game__WEBPACK_IMPORTED_MODULE_5__.game.worldBumpiness === undefined)
            _Game__WEBPACK_IMPORTED_MODULE_5__.game.worldBumpiness = 1;
        let tempWorldBumpinessText;
        if (_Game__WEBPACK_IMPORTED_MODULE_5__.game.worldBumpiness === 1) {
            tempWorldBumpinessText = "Normal";
        }
        else if (_Game__WEBPACK_IMPORTED_MODULE_5__.game.worldBumpiness === 0) {
            tempWorldBumpinessText = "Superflat";
        }
        else {
            tempWorldBumpinessText = "Amplified";
        }
        this.buttons = [
            new _Button__WEBPACK_IMPORTED_MODULE_2__.Button(font, `World Bumpiness: ${tempWorldBumpinessText}`, "Change the intensity of the world's bumps.", 0, 0, 0, 0, () => {
                if (this.buttons[0].txt === "World Bumpiness: Normal") {
                    this.buttons[0].txt = "World Bumpiness: Amplified";
                    _Game__WEBPACK_IMPORTED_MODULE_5__.game.worldBumpiness = 3;
                }
                else if (this.buttons[0].txt === "World Bumpiness: Amplified") {
                    this.buttons[0].txt = "World Bumpiness: Superflat";
                    _Game__WEBPACK_IMPORTED_MODULE_5__.game.worldBumpiness = 0;
                }
                else {
                    this.buttons[0].txt = "World Bumpiness: Normal";
                    _Game__WEBPACK_IMPORTED_MODULE_5__.game.worldBumpiness = 1;
                }
            }),
            new _Button__WEBPACK_IMPORTED_MODULE_2__.Button(font, "Back", "Return to the main menu.", 0, 0, 0, 0, () => {
                console.log("main menu");
                _Game__WEBPACK_IMPORTED_MODULE_5__.game.currentUi = new _WorldCreationMenu__WEBPACK_IMPORTED_MODULE_3__.WorldCreationMenu(font, titleFont);
            })
        ];
        this.sliders = [
            new _Slider__WEBPACK_IMPORTED_MODULE_4__.Slider(font, "Width", 512, 64, 2048, 64, 0, 0, 0, 0, () => {
                _Game__WEBPACK_IMPORTED_MODULE_5__.game.worldWidth = this.sliders[0].value;
            }),
            new _Slider__WEBPACK_IMPORTED_MODULE_4__.Slider(font, "Height", 64, 64, 512, 16, 0, 0, 0, 0, () => {
                _Game__WEBPACK_IMPORTED_MODULE_5__.game.worldHeight = this.sliders[1].value;
            })
        ];
        // update the size of the elements based on the initial screen size
        this.windowUpdate();
    }
    render(target, upscaleSize) {
        // render the rectangular image that the whole menu is on
        this.frame.render(target, upscaleSize);
        // loop through the buttons array and render each one.
        this.buttons.forEach(button => {
            button.render(target, upscaleSize);
        });
        // loop through the sliders array and render each one.
        this.sliders.forEach(slider => {
            slider.render(target, upscaleSize);
        });
        this.titleFont.drawText(target, "World Options", this.frame.x + 30 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize, this.frame.y + 16 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize);
    }
    windowUpdate() {
        // set the position of the frame
        this.frame.x = _Game__WEBPACK_IMPORTED_MODULE_5__.game.width / 2 - 200 / 2 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize; // center the frame in the center of the screen
        this.frame.y = _Game__WEBPACK_IMPORTED_MODULE_5__.game.height / 2 - 56 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
        this.frame.w = 200 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
        this.frame.h = 48 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
        // set the positions of all the buttons
        for (let i = 0; i < 2; i++) {
            this.buttons[i].x = _Game__WEBPACK_IMPORTED_MODULE_5__.game.width / 2 - 192 / 2 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
            this.buttons[i].y = _Game__WEBPACK_IMPORTED_MODULE_5__.game.height / 2 + 60 * i * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
            this.buttons[i].w = 192 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
            this.buttons[i].h = 16 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
            this.buttons[i].updateMouseOver(_Game__WEBPACK_IMPORTED_MODULE_5__.game.mouseX, _Game__WEBPACK_IMPORTED_MODULE_5__.game.mouseY);
        }
        // set the positions of all the sliders
        for (let i = 0; i < 2; i++) {
            this.sliders[i].x = _Game__WEBPACK_IMPORTED_MODULE_5__.game.width / 2 - 192 / 2 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
            this.sliders[i].y = _Game__WEBPACK_IMPORTED_MODULE_5__.game.height / 2 + 20 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize + 20 * i * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
            this.sliders[i].w = 192 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
            this.sliders[i].h = 16 * _Game__WEBPACK_IMPORTED_MODULE_5__.game.upscaleSize;
            if (_Game__WEBPACK_IMPORTED_MODULE_5__.game.mouseIsPressed)
                this.sliders[i].updateSliderPosition(_Game__WEBPACK_IMPORTED_MODULE_5__.game.mouseX);
        }
    }
}


/***/ }),

/***/ "./src/client/world/World.ts":
/*!***********************************!*\
  !*** ./src/client/world/World.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "World": () => (/* binding */ World)
/* harmony export */ });
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Game */ "./src/client/Game.ts");
/* harmony import */ var _geckos_io_snapshot_interpolation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @geckos.io/snapshot-interpolation */ "./node_modules/@geckos.io/snapshot-interpolation/lib/index.js");
/* harmony import */ var _geckos_io_snapshot_interpolation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_geckos_io_snapshot_interpolation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _WorldTiles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WorldTiles */ "./src/client/world/WorldTiles.ts");
/* harmony import */ var _global_Tile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../global/Tile */ "./src/global/Tile.ts");
/* harmony import */ var _assets_Assets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/Assets */ "./src/client/assets/Assets.ts");





class World {
    constructor(width, height, tiles, tileEntities) {
        this.entities = {};
        // Initialize the world with the tiles and dimensions from the server
        this.width = width;
        this.height = height;
        this.worldTiles = tiles;
        this.tileEntities = tileEntities;
        this.snapshotInterpolation = new _geckos_io_snapshot_interpolation__WEBPACK_IMPORTED_MODULE_1__.SnapshotInterpolation();
        this.snapshotInterpolation.interpolationBuffer.set((1000 / _Game__WEBPACK_IMPORTED_MODULE_0__.game.netManager.playerTickRate) * 2);
        // define the p5.Graphics objects that hold an image of the tiles of the world.  These act sort of like a virtual canvas and can be drawn on just like a normal canvas by using tileLayer.rect();, tileLayer.ellipse();, tileLayer.fill();, etc.
        this.tileLayer = _Game__WEBPACK_IMPORTED_MODULE_0__.game.createGraphics(this.width * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH, this.height * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_HEIGHT);
        this.loadWorld();
    }
    tick(game) {
        if (this.player !== undefined)
            game.connection.emit('playerUpdate', this.player.x, this.player.y);
    }
    render(target, upscaleSize) {
        // draw the tiles layer onto the screen
        target.image(this.tileLayer, 0, 0, (_Game__WEBPACK_IMPORTED_MODULE_0__.game.width / upscaleSize) * upscaleSize, (_Game__WEBPACK_IMPORTED_MODULE_0__.game.height / upscaleSize) * upscaleSize, _Game__WEBPACK_IMPORTED_MODULE_0__.game.interpolatedCamX * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH, _Game__WEBPACK_IMPORTED_MODULE_0__.game.interpolatedCamY * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH, _Game__WEBPACK_IMPORTED_MODULE_0__.game.width / upscaleSize, _Game__WEBPACK_IMPORTED_MODULE_0__.game.height / upscaleSize);
        this.renderPlayers(target, upscaleSize);
        target.stroke(0);
        target.strokeWeight(4);
        target.noFill();
        target.rect(target.width - this.width, 0, this.width, this.height);
        target.image(this.tileLayer, target.width - this.width, 0, this.width, this.height);
    }
    updatePlayers(snapshot) {
        this.snapshotInterpolation.snapshot.add(snapshot);
    }
    updateTile(tileIndex, tile) {
        // Update the tile and the 4 neighbouring tiles
        this.worldTiles[tileIndex] = tile;
        // erase the broken tiles and its surrounding tiles if they're tiles
        this.tileLayer.erase();
        this.tileLayer.noStroke();
        this.tileLayer.rect(
        //center
        (tileIndex % this.width) * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH, Math.floor(tileIndex / this.width) * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_HEIGHT, _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH, _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_HEIGHT);
        if (tileIndex - 1 >= 0 &&
            typeof this.worldTiles[tileIndex - 1] !== 'string' &&
            this.worldTiles[tileIndex - 1] !== _global_Tile__WEBPACK_IMPORTED_MODULE_3__.TileType.Air) {
            this.tileLayer.rect(
            //left
            ((tileIndex % this.width) - 1) * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH, Math.floor(tileIndex / this.width) * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_HEIGHT, _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH, _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_HEIGHT);
        }
        if (tileIndex + 1 < this.width * this.height &&
            typeof this.worldTiles[tileIndex + 1] !== 'string' &&
            this.worldTiles[tileIndex + 1] !== _global_Tile__WEBPACK_IMPORTED_MODULE_3__.TileType.Air) {
            this.tileLayer.rect(
            //right
            ((tileIndex % this.width) - 1) * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH, Math.floor(tileIndex / this.width) * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_HEIGHT, _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH, _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_HEIGHT);
        }
        if (tileIndex - this.width >= 0 &&
            typeof this.worldTiles[tileIndex - this.width] !== 'string' &&
            this.worldTiles[tileIndex - this.width] !== _global_Tile__WEBPACK_IMPORTED_MODULE_3__.TileType.Air) {
            this.tileLayer.rect(
            //top
            (tileIndex % this.width) * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH, (Math.floor(tileIndex / this.width) - 1) * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_HEIGHT, _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH, _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_HEIGHT);
        }
        if (tileIndex + this.width < this.width * this.height &&
            typeof this.worldTiles[tileIndex + this.width] !== 'string' &&
            this.worldTiles[tileIndex + this.width] !== _global_Tile__WEBPACK_IMPORTED_MODULE_3__.TileType.Air) {
            this.tileLayer.rect(
            //bottom
            (tileIndex % this.width) * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH, (Math.floor(tileIndex / this.width) + 1) * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_HEIGHT, _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH, _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_HEIGHT);
        }
        this.tileLayer.noErase();
        // redraw the neighboring tiles
        this.drawTile(tileIndex);
        this.drawTile(tileIndex + this.width);
        this.drawTile(tileIndex - 1);
        this.drawTile(tileIndex - this.width);
        this.drawTile(tileIndex + 1);
    }
    renderPlayers(target, upscaleSize) {
        // Calculate the interpolated position of all updated entities
        const positionStates = {};
        try {
            const calculatedSnapshot = this.snapshotInterpolation.calcInterpolation('x y');
            if (!calculatedSnapshot)
                return;
            const state = calculatedSnapshot.state;
            if (!state)
                return;
            // The new positions of entities as object
            state.forEach(({ id, x, y }) => {
                positionStates[id] = { x, y };
            });
        }
        catch (e) { }
        // Render each entity in random order
        Object.entries(this.entities).forEach((entity) => {
            const updatedPosition = positionStates[entity[0]];
            if (updatedPosition !== undefined) {
                entity[1].x = updatedPosition.x;
                entity[1].y = updatedPosition.y;
            }
            entity[1].render(target, upscaleSize);
        });
        // Render the player on top
        if (this.player !== undefined) {
            this.player.findInterpolatedCoordinates();
            this.player.render(target, upscaleSize);
        }
    }
    loadWorld() {
        var _a;
        this.tileLayer.noStroke();
        this.tileLayer.fill(255, 0, 0);
        for (let x = 0; x < this.height; x++) {
            //x and y are switched for some stupid reason
            // i will be the y position of tiles being drawn
            for (let y = 0; y < this.width; y++) {
                const tileVal = this.worldTiles[x * this.width + y];
                if (typeof tileVal === 'string') {
                    if (this.tileEntities === undefined) {
                        console.error('tile entity array is undefined');
                    }
                    if (this.tileEntities[tileVal] === undefined) {
                        console.error('tile entity ' + tileVal + ' is undefined');
                    }
                    const topLeft = Math.min(...this.tileEntities[tileVal].coveredTiles);
                    if (x * this.width + y === topLeft) {
                        //render tile entity image
                        let img = _assets_Assets__WEBPACK_IMPORTED_MODULE_4__.WorldAssets.tileEntities[this.tileEntities[tileVal].type_][this.tileEntities[tileVal].animFrame];
                        img.render(this.tileLayer, y * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH, x * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_HEIGHT, img.image.width, img.image.height);
                    }
                    else {
                        //console.log(`Already rendered ${tileVal}`);
                    }
                    continue;
                }
                if (tileVal !== _global_Tile__WEBPACK_IMPORTED_MODULE_3__.TileType.Air) {
                    // Draw the correct image for the tiles onto the tiles layer
                    const tile = _WorldTiles__WEBPACK_IMPORTED_MODULE_2__.WorldTiles[tileVal];
                    if (tile === undefined)
                        continue;
                    if (tile.connected && 'renderTile' in tile.texture) {
                        // Render connected tiles
                        tile.texture.renderTile(this.findTilesetIndex(x, y, tileVal, (_a = _WorldTiles__WEBPACK_IMPORTED_MODULE_2__.WorldTiles[tileVal]) === null || _a === void 0 ? void 0 : _a.anyConnection), this.tileLayer, y * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH, x * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_HEIGHT, _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH, _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_HEIGHT);
                    }
                    else {
                        // Render non-connected tiles
                        tile.texture.render(this.tileLayer, y * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH, x * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_HEIGHT, _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH, _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_HEIGHT);
                    }
                }
            }
        }
    }
    drawTile(tileIndex) {
        const x = tileIndex % this.width;
        const y = Math.floor(tileIndex / this.width);
        if (this.worldTiles[tileIndex] !== _global_Tile__WEBPACK_IMPORTED_MODULE_3__.TileType.Air) {
            // Draw the correct image for the tiles onto the tiles layer
            const tileVal = this.worldTiles[tileIndex];
            if (typeof tileVal === 'string') {
                if (this.tileEntities[tileVal] === undefined) {
                    console.error('tile entity ' + tileVal + ' is undefined');
                }
                const topLeft = Math.min(...this.tileEntities[tileVal].coveredTiles);
                if (tileIndex === topLeft) {
                    //render tile entity image
                    //this.tileEntities[tileVal].render(tileLayer, x*8, y*8);
                }
                else {
                    //console.log(`Already rendered ${tileVal}`);
                }
                return;
            }
            const tile = _WorldTiles__WEBPACK_IMPORTED_MODULE_2__.WorldTiles[tileVal];
            // if the tiles is off-screen
            if (tile === undefined) {
                return;
            }
            if (tile.connected && 'renderTile' in tile.texture) {
                let topTileBool = false;
                let leftTileBool = false;
                let bottomTileBool = false;
                let rightTileBool = false;
                if (tile.anyConnection) {
                    // test if the neighboring tiles are solid
                    topTileBool =
                        x === 0 ||
                            (this.worldTiles[(y - 1) * this.width + x] !==
                                _global_Tile__WEBPACK_IMPORTED_MODULE_3__.TileType.Air &&
                                typeof this.worldTiles[(y - 1) * this.width + x] !==
                                    'string');
                    leftTileBool =
                        y === 0 ||
                            (this.worldTiles[y * this.width + x - 1] !==
                                _global_Tile__WEBPACK_IMPORTED_MODULE_3__.TileType.Air &&
                                typeof this.worldTiles[y * this.width + x - 1] !==
                                    'string');
                    bottomTileBool =
                        x === this.height - 1 ||
                            (this.worldTiles[(y + 1) * this.width + x] !==
                                _global_Tile__WEBPACK_IMPORTED_MODULE_3__.TileType.Air &&
                                typeof this.worldTiles[(y + 1) * this.width + x] !==
                                    'string');
                    rightTileBool =
                        y === this.width - 1 ||
                            (this.worldTiles[y * this.width + x + 1] !==
                                _global_Tile__WEBPACK_IMPORTED_MODULE_3__.TileType.Air &&
                                typeof this.worldTiles[y * this.width + x + 1] !==
                                    'string');
                    // console.log(["boring", leftTileBool, bottomTileBool, this.worldTiles[x * this.width + y + 1], topTileBool])
                }
                else {
                    // test if the neighboring tiles are the same tile
                    topTileBool =
                        x === 0 ||
                            this.worldTiles[(y - 1) * this.width + x] === tileVal;
                    leftTileBool =
                        y === 0 ||
                            this.worldTiles[y * this.width + x - 1] === tileVal;
                    bottomTileBool =
                        x === this.height - 1 ||
                            this.worldTiles[(y + 1) * this.width + x] === tileVal;
                    rightTileBool =
                        y === this.width - 1 ||
                            this.worldTiles[y * this.width + x + 1] === tileVal;
                    //console.log(["fancy", leftTileBool, bottomTileBool, rightTileBool, topTileBool])
                }
                this.worldTiles[tileIndex + 1] !== _global_Tile__WEBPACK_IMPORTED_MODULE_3__.TileType.Air;
                // convert 4 digit binary number to base 10
                const tileSetIndex = 8 * +topTileBool +
                    4 * +rightTileBool +
                    2 * +bottomTileBool +
                    +leftTileBool;
                // Render connected tiles
                tile.texture.renderTile(tileSetIndex, this.tileLayer, x * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH, y * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_HEIGHT, _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH, _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_HEIGHT);
            }
            else if (!tile.connected) {
                // Render non-connected tiles
                tile.texture.render(this.tileLayer, x * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH, y * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_HEIGHT, _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH, _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_HEIGHT);
            }
        }
    }
    findTilesetIndex(x, y, tileVal, anyConnection) {
        let topTileBool = false;
        let leftTileBool = false;
        let bottomTileBool = false;
        let rightTileBool = false;
        if (anyConnection) {
            // test if the neighboring tiles are solid
            topTileBool =
                x === 0 ||
                    (this.worldTiles[(x - 1) * this.width + y] !== _global_Tile__WEBPACK_IMPORTED_MODULE_3__.TileType.Air && //x and y appear to be switched
                        typeof this.worldTiles[(x - 1) * this.width + y] ==
                            'number');
            leftTileBool =
                y === 0 ||
                    (this.worldTiles[x * this.width + y - 1] !== _global_Tile__WEBPACK_IMPORTED_MODULE_3__.TileType.Air &&
                        typeof this.worldTiles[x * this.width + y - 1] ==
                            'number');
            bottomTileBool =
                x === this.height - 1 ||
                    (this.worldTiles[(x + 1) * this.width + y] !== _global_Tile__WEBPACK_IMPORTED_MODULE_3__.TileType.Air &&
                        typeof this.worldTiles[(x + 1) * this.width + y] ==
                            'number');
            rightTileBool =
                y === this.width - 1 ||
                    (this.worldTiles[x * this.width + y + 1] !== _global_Tile__WEBPACK_IMPORTED_MODULE_3__.TileType.Air &&
                        typeof this.worldTiles[x * this.width + y + 1] ==
                            'number');
        }
        else {
            // test if the neighboring tiles are the same tile
            topTileBool =
                x === 0 ||
                    this.worldTiles[(x - 1) * this.width + y] === tileVal;
            leftTileBool =
                y === 0 || this.worldTiles[x * this.width + y - 1] === tileVal;
            bottomTileBool =
                x === this.height - 1 ||
                    this.worldTiles[(x + 1) * this.width + y] === tileVal;
            rightTileBool =
                y === this.width - 1 ||
                    this.worldTiles[x * this.width + y + 1] === tileVal;
        }
        // convert 4 digit binary number to base 10
        return (8 * +topTileBool +
            4 * +rightTileBool +
            2 * +bottomTileBool +
            +leftTileBool);
    }
}


/***/ }),

/***/ "./src/client/world/WorldTiles.ts":
/*!****************************************!*\
  !*** ./src/client/world/WorldTiles.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorldTiles": () => (/* binding */ WorldTiles)
/* harmony export */ });
/* harmony import */ var _assets_Assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/Assets */ "./src/client/assets/Assets.ts");
/* harmony import */ var _global_Tile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../global/Tile */ "./src/global/Tile.ts");


const WorldTiles = {
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Air]: undefined,
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Snow]: {
        name: 'snow',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_snow,
        connected: true,
        anyConnection: true,
        color: "#cafafc",
        friction: 2,
        reflectivity: 50 //this reflectivity actually does nothing and instead reflectivity can be changed inside ReflectedImageResource.ts
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Ice]: {
        name: 'ice',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_ice,
        connected: true,
        anyConnection: true,
        color: "#76adc4",
        friction: 1.5,
        reflectivity: 150
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Dirt]: {
        name: 'dirt',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_dirt,
        connected: true,
        anyConnection: true,
        color: "#4a2e1e",
        friction: 4,
        reflectivity: 0
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Stone0]: {
        name: 'raw stone',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_stone0,
        connected: true,
        anyConnection: true,
        color: "#414245",
        friction: 3,
        reflectivity: 10
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Stone1]: {
        name: 'stone tier 1',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_stone1,
        connected: true,
        anyConnection: true,
        color: "#31323b",
        friction: 3,
        reflectivity: 15
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Stone2]: {
        name: 'stone tier 2',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_stone2,
        connected: true,
        anyConnection: true,
        color: "#31323b",
        friction: 3,
        reflectivity: 17
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Stone3]: {
        name: 'stone tier 3',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_stone3,
        connected: true,
        anyConnection: true,
        color: "#31323b",
        friction: 3,
        reflectivity: 19
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Stone4]: {
        name: 'stone tier 4',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_stone4,
        connected: true,
        anyConnection: true,
        color: "#31323b",
        friction: 3,
        reflectivity: 21
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Stone5]: {
        name: 'stone tier 5',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_stone5,
        connected: true,
        anyConnection: true,
        color: "#31323b",
        friction: 3,
        reflectivity: 23
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Stone6]: {
        name: 'stone tier 6',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_stone6,
        connected: true,
        anyConnection: true,
        color: "#31323b",
        friction: 3,
        reflectivity: 25
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Stone7]: {
        name: 'stone tier 7',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_stone7,
        connected: true,
        anyConnection: true,
        color: "#31323b",
        friction: 3,
        reflectivity: 27
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Stone8]: {
        name: 'stone tier 8',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_stone8,
        connected: true,
        anyConnection: true,
        color: "#31323b",
        friction: 3,
        reflectivity: 29
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Stone9]: {
        name: 'stone tier 9',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_stone9,
        connected: true,
        anyConnection: true,
        color: "#31323b",
        friction: 3,
        reflectivity: 31
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Tin]: {
        name: 'tin ore',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_tin,
        connected: true,
        anyConnection: false,
        color: "#31323b",
        friction: 3,
        reflectivity: 10
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Aluminum]: {
        name: 'aluminum ore',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_aluminum,
        connected: true,
        anyConnection: false,
        color: "#31323b",
        friction: 3,
        reflectivity: 17
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Gold]: {
        name: 'gold ore',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_gold,
        connected: true,
        anyConnection: false,
        color: "#31323b",
        friction: 3,
        reflectivity: 21
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Titanium]: {
        name: 'titanium ore',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_titanium,
        connected: true,
        anyConnection: false,
        color: "#31323b",
        friction: 3,
        reflectivity: 25
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Grape]: {
        name: 'grape ore',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_grape,
        connected: true,
        anyConnection: false,
        color: "#31323b",
        friction: 3,
        reflectivity: 29
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Wood0]: {
        name: 'raw wood',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_wood0,
        connected: false,
        anyConnection: true,
        color: "#a77145",
        friction: 3,
        reflectivity: 5
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Wood1]: {
        name: 'wood tier 1',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_wood1,
        connected: true,
        anyConnection: true,
        color: "#a77145",
        friction: 3,
        reflectivity: 5
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Wood2]: {
        name: 'wood tier 2',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_wood2,
        connected: true,
        anyConnection: true,
        color: "#a77145",
        friction: 3,
        reflectivity: 5
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Wood3]: {
        name: 'wood tier 3',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_wood3,
        connected: true,
        anyConnection: true,
        color: "#a77145",
        friction: 3,
        reflectivity: 5
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Wood4]: {
        name: 'wood tier 4',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_wood4,
        connected: true,
        anyConnection: true,
        color: "#a77145",
        friction: 3,
        reflectivity: 5
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Wood5]: {
        name: 'wood tier 5',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_wood5,
        connected: true,
        anyConnection: true,
        color: "#a77145",
        friction: 3,
        reflectivity: 5
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Wood6]: {
        name: 'wood tier 6',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_wood6,
        connected: true,
        anyConnection: true,
        color: "#a77145",
        friction: 3,
        reflectivity: 5
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Wood7]: {
        name: 'wood tier 7',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_wood7,
        connected: true,
        anyConnection: true,
        color: "#a77145",
        friction: 3,
        reflectivity: 5
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Wood8]: {
        name: 'wood tier 8',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_wood8,
        connected: true,
        anyConnection: true,
        color: "#a77145",
        friction: 3,
        reflectivity: 5
    },
    [_global_Tile__WEBPACK_IMPORTED_MODULE_1__.TileType.Wood9]: {
        name: 'wood tier 9',
        texture: _assets_Assets__WEBPACK_IMPORTED_MODULE_0__.WorldAssets.middleground.tileset_wood9,
        connected: true,
        anyConnection: true,
        color: "#a77145",
        friction: 3,
        reflectivity: 5
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


/***/ }),

/***/ "./src/client/world/entities/EntityClasses.ts":
/*!****************************************************!*\
  !*** ./src/client/world/entities/EntityClasses.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EntityClasses": () => (/* binding */ EntityClasses)
/* harmony export */ });
/* harmony import */ var _global_Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../global/Entity */ "./src/global/Entity.ts");
/* harmony import */ var _PlayerEntity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PlayerEntity */ "./src/client/world/entities/PlayerEntity.ts");
/* harmony import */ var _ItemEntity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ItemEntity */ "./src/client/world/entities/ItemEntity.ts");



const EntityClasses = {
    [_global_Entity__WEBPACK_IMPORTED_MODULE_0__.Entities.LocalPlayer]: undefined,
    [_global_Entity__WEBPACK_IMPORTED_MODULE_0__.Entities.Player]: _PlayerEntity__WEBPACK_IMPORTED_MODULE_1__.PlayerEntity,
    [_global_Entity__WEBPACK_IMPORTED_MODULE_0__.Entities.Item]: _ItemEntity__WEBPACK_IMPORTED_MODULE_2__.ItemEntity,
};


/***/ }),

/***/ "./src/client/world/entities/ItemEntity.ts":
/*!*************************************************!*\
  !*** ./src/client/world/entities/ItemEntity.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ItemEntity": () => (/* binding */ ItemEntity)
/* harmony export */ });
/* harmony import */ var _ServerEntity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ServerEntity */ "./src/client/world/entities/ServerEntity.ts");
/* harmony import */ var _assets_Assets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/Assets */ "./src/client/assets/Assets.ts");


class ItemEntity extends _ServerEntity__WEBPACK_IMPORTED_MODULE_0__.ServerEntity {
    constructor(payload) {
        super(payload.id);
        this.item = payload.data.item;
        this.x = payload.data.x;
        this.y = payload.data.y;
    }
    render(target, upscaleSize) {
        const asset = _assets_Assets__WEBPACK_IMPORTED_MODULE_1__.ItemAssets[this.item];
        if (asset !== undefined) {
            asset.render(target, this.x, this.y, 8, 8);
        }
    }
    updateData(data) {
        this.item = data.data.item;
        this.x = data.data.x;
        this.y = data.data.y;
    }
}


/***/ }),

/***/ "./src/client/world/entities/PlayerEntity.ts":
/*!***************************************************!*\
  !*** ./src/client/world/entities/PlayerEntity.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayerEntity": () => (/* binding */ PlayerEntity)
/* harmony export */ });
/* harmony import */ var _ServerEntity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ServerEntity */ "./src/client/world/entities/ServerEntity.ts");
/* harmony import */ var _global_Entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../global/Entity */ "./src/global/Entity.ts");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Game */ "./src/client/Game.ts");



class PlayerEntity extends _ServerEntity__WEBPACK_IMPORTED_MODULE_0__.ServerEntity {
    constructor(data) {
        super(data.id);
        this.width = 12 / _Game__WEBPACK_IMPORTED_MODULE_2__.game.TILE_WIDTH;
        this.height = 20 / _Game__WEBPACK_IMPORTED_MODULE_2__.game.TILE_HEIGHT;
        if (data.type === _global_Entity__WEBPACK_IMPORTED_MODULE_1__.Entities.Player) {
            this.name = data.data.name;
        }
    }
    updateData(data) {
        if (data.type === _global_Entity__WEBPACK_IMPORTED_MODULE_1__.Entities.Player) {
            this.name = data.data.name;
        }
    }
    render(target, upscaleSize) {
        target.fill(0, 255, 0);
        target.rect((this.x * _Game__WEBPACK_IMPORTED_MODULE_2__.game.TILE_WIDTH -
            _Game__WEBPACK_IMPORTED_MODULE_2__.game.interpolatedCamX * _Game__WEBPACK_IMPORTED_MODULE_2__.game.TILE_WIDTH) *
            upscaleSize, (this.y * _Game__WEBPACK_IMPORTED_MODULE_2__.game.TILE_HEIGHT -
            _Game__WEBPACK_IMPORTED_MODULE_2__.game.interpolatedCamY * _Game__WEBPACK_IMPORTED_MODULE_2__.game.TILE_HEIGHT) *
            upscaleSize, this.width * upscaleSize * _Game__WEBPACK_IMPORTED_MODULE_2__.game.TILE_WIDTH, this.height * upscaleSize * _Game__WEBPACK_IMPORTED_MODULE_2__.game.TILE_HEIGHT);
        // Render the item quantity label
        target.fill(0);
        target.noStroke();
        target.textSize(5 * upscaleSize);
        target.textAlign(target.CENTER, target.TOP);
        target.text(this.name, (this.x * _Game__WEBPACK_IMPORTED_MODULE_2__.game.TILE_WIDTH -
            _Game__WEBPACK_IMPORTED_MODULE_2__.game.interpolatedCamX * _Game__WEBPACK_IMPORTED_MODULE_2__.game.TILE_WIDTH +
            (this.width * _Game__WEBPACK_IMPORTED_MODULE_2__.game.TILE_WIDTH) / 2) *
            upscaleSize, (this.y * _Game__WEBPACK_IMPORTED_MODULE_2__.game.TILE_HEIGHT -
            _Game__WEBPACK_IMPORTED_MODULE_2__.game.interpolatedCamY * _Game__WEBPACK_IMPORTED_MODULE_2__.game.TILE_HEIGHT -
            (this.height * _Game__WEBPACK_IMPORTED_MODULE_2__.game.TILE_WIDTH) / 2.5) *
            upscaleSize);
    }
}


/***/ }),

/***/ "./src/client/world/entities/ServerEntity.ts":
/*!***************************************************!*\
  !*** ./src/client/world/entities/ServerEntity.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServerEntity": () => (/* binding */ ServerEntity)
/* harmony export */ });
class ServerEntity {
    constructor(entityId) {
        this.x = 0;
        this.y = 0;
        this.entityId = entityId;
    }
}


/***/ }),

/***/ "./src/client/world/entities/TileEntity.ts":
/*!*************************************************!*\
  !*** ./src/client/world/entities/TileEntity.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientTileEntity": () => (/* binding */ ClientTileEntity),
/* harmony export */   "TileEntityAnimations": () => (/* binding */ TileEntityAnimations)
/* harmony export */ });
class ClientTileEntity {
}
const TileEntityAnimations = [
    false,
    true,
    true,
    true,
    true,
    true,
    false,
    false, //planted seed
];


/***/ }),

/***/ "./src/client/world/particles/ColorParticle.ts":
/*!*****************************************************!*\
  !*** ./src/client/world/particles/ColorParticle.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColorParticle": () => (/* binding */ ColorParticle)
/* harmony export */ });
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Game */ "./src/client/Game.ts");
/* harmony import */ var simplex_noise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! simplex-noise */ "./node_modules/simplex-noise/dist/esm/simplex-noise.js");


class ColorParticle {
    constructor(color, size, lifespan, x, y, xVel, yVel, gravity, wind) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.xVel = xVel || 0;
        this.yVel = yVel || 0;
        this.size = size;
        this.gravity = true; //using the or modifier with booleans causes bugs; there's probably a better way to do this
        if (gravity !== undefined)
            this.gravity = gravity;
        this.wind = false; //using the or modifier with booleans causes bugs; there's probably a better way to do this
        if (wind !== undefined)
            this.wind = wind;
        this.age = 0;
        this.lifespan = lifespan;
        this.noise = new simplex_noise__WEBPACK_IMPORTED_MODULE_1__["default"]("asdfasdfasdfas");
    }
    render(target, upscaleSize) {
        if (this.age / this.lifespan < 0.8) { //if it's under 80% of the particle's lifespan, draw normally without fade
            target.fill(this.color);
        }
        else { //this means that the particle is almost going to be deleted, so fading is necessary
            if (this.color.length === 7) { //if there is no transparency by default, just map the things
                let transparencyString = Math.round(255 * (-5 * (this.age / this.lifespan) + 5)).toString(16).substring(0, 2);
                if (transparencyString === undefined || transparencyString.length === undefined) //catch what could be an infinite loop or just an error
                    throw new Error(`undefined transparency string on particle`);
                while (transparencyString.length < 2) { //make sure it's 2 characters long; this stops the computer from interpreting #ff ff ff 5 as #ff ff ff 55 instead of #ff ff ff 05
                    transparencyString = "0" + transparencyString;
                }
                target.fill(this.color.substring(0, 7) + transparencyString);
            }
            else { //if there is transparency, multiply
                let transparencyString = Math.round(parseInt(this.color.substring(7, 9), 16) * (-5 * (this.age / this.lifespan) + 5)).toString(16).substring(0, 2);
                if (transparencyString === undefined || transparencyString.length === undefined) //catch what could be an infinite loop or just an error
                    throw new Error(`undefined transparency string on particle`);
                while (transparencyString.length < 2) { //make sure it's 2 characters long; this stops the computer from interpreting #ff ff ff 5 as #ff ff ff 55 instead of #ff ff ff 05
                    transparencyString = "0" + transparencyString;
                }
                target.fill(this.color.substring(0, 7) + transparencyString);
            }
        }
        //draw a rectangle centered on the x and y position filled with the color of the object
        target.rect((-this.size / 2 + this.x * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH -
            _Game__WEBPACK_IMPORTED_MODULE_0__.game.interpolatedCamX * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH) *
            upscaleSize, (-this.size / 2 + this.y * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_HEIGHT -
            _Game__WEBPACK_IMPORTED_MODULE_0__.game.interpolatedCamY * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_HEIGHT) *
            upscaleSize, this.size * upscaleSize * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_WIDTH, this.size * upscaleSize * _Game__WEBPACK_IMPORTED_MODULE_0__.game.TILE_HEIGHT);
    }
    tick() {
        this.age++;
        this.x += this.xVel;
        this.y += this.yVel;
        this.xVel -= (Math.abs(this.xVel) * this.xVel * _Game__WEBPACK_IMPORTED_MODULE_0__.game.DRAG_COEFFICIENT * this.size); //assuming constant mass for each particle
        if (this.gravity) {
            this.yVel += _Game__WEBPACK_IMPORTED_MODULE_0__.game.GRAVITY_SPEED;
        }
        if (this.wind) {
            this.xVel += this.noise.noise2D(this.x / 10, this.y / 10) / 40;
            this.yVel += this.noise.noise2D(this.y / 10, this.x / 10) / 40;
        }
        this.yVel -= (Math.abs(this.yVel) * this.yVel * _Game__WEBPACK_IMPORTED_MODULE_0__.game.DRAG_COEFFICIENT * this.size);
    }
}


/***/ }),

/***/ "./src/global/Entity.ts":
/*!******************************!*\
  !*** ./src/global/Entity.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Entities": () => (/* binding */ Entities)
/* harmony export */ });
var Entities;
(function (Entities) {
    Entities[Entities["LocalPlayer"] = 0] = "LocalPlayer";
    Entities[Entities["Player"] = 1] = "Player";
    Entities[Entities["Item"] = 2] = "Item";
})(Entities || (Entities = {}));


/***/ }),

/***/ "./src/global/Inventory.ts":
/*!*********************************!*\
  !*** ./src/global/Inventory.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ItemCategories": () => (/* binding */ ItemCategories),
/* harmony export */   "ItemType": () => (/* binding */ ItemType),
/* harmony export */   "Items": () => (/* binding */ Items)
/* harmony export */ });
/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tile */ "./src/global/Tile.ts");
/* harmony import */ var _TileEntity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TileEntity */ "./src/global/TileEntity.ts");


const itemTypeData = (data) => data;
var ItemCategories;
(function (ItemCategories) {
    ItemCategories[ItemCategories["Tile"] = 0] = "Tile";
    ItemCategories[ItemCategories["Resource"] = 1] = "Resource";
    ItemCategories[ItemCategories["Tool"] = 2] = "Tool";
    ItemCategories[ItemCategories["TileEntity"] = 3] = "TileEntity";
})(ItemCategories || (ItemCategories = {}));
var ItemType;
(function (ItemType) {
    ItemType[ItemType["SnowBlock"] = 0] = "SnowBlock";
    ItemType[ItemType["IceBlock"] = 1] = "IceBlock";
    ItemType[ItemType["DirtBlock"] = 2] = "DirtBlock";
    ItemType[ItemType["Stone0Block"] = 3] = "Stone0Block";
    ItemType[ItemType["Stone1Block"] = 4] = "Stone1Block";
    ItemType[ItemType["Stone2Block"] = 5] = "Stone2Block";
    ItemType[ItemType["Stone3Block"] = 6] = "Stone3Block";
    ItemType[ItemType["Stone4Block"] = 7] = "Stone4Block";
    ItemType[ItemType["Stone5Block"] = 8] = "Stone5Block";
    ItemType[ItemType["Stone6Block"] = 9] = "Stone6Block";
    ItemType[ItemType["Stone7Block"] = 10] = "Stone7Block";
    ItemType[ItemType["Stone8Block"] = 11] = "Stone8Block";
    ItemType[ItemType["Stone9Block"] = 12] = "Stone9Block";
    ItemType[ItemType["TinBlock"] = 13] = "TinBlock";
    ItemType[ItemType["AluminumBlock"] = 14] = "AluminumBlock";
    ItemType[ItemType["GoldBlock"] = 15] = "GoldBlock";
    ItemType[ItemType["TitaniumBlock"] = 16] = "TitaniumBlock";
    ItemType[ItemType["GrapeBlock"] = 17] = "GrapeBlock";
    ItemType[ItemType["Wood0Block"] = 18] = "Wood0Block";
    ItemType[ItemType["Wood1Block"] = 19] = "Wood1Block";
    ItemType[ItemType["Wood2Block"] = 20] = "Wood2Block";
    ItemType[ItemType["Wood3Block"] = 21] = "Wood3Block";
    ItemType[ItemType["Wood4Block"] = 22] = "Wood4Block";
    ItemType[ItemType["Wood5Block"] = 23] = "Wood5Block";
    ItemType[ItemType["Wood6Block"] = 24] = "Wood6Block";
    ItemType[ItemType["Wood7Block"] = 25] = "Wood7Block";
    ItemType[ItemType["Wood8Block"] = 26] = "Wood8Block";
    ItemType[ItemType["Wood9Block"] = 27] = "Wood9Block";
    ItemType[ItemType["Seed"] = 28] = "Seed";
})(ItemType || (ItemType = {}));
const Items = itemTypeData({
    [ItemType.SnowBlock]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Snow,
    },
    [ItemType.IceBlock]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Ice,
    },
    [ItemType.DirtBlock]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Dirt,
    },
    [ItemType.Stone0Block]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Stone0,
    },
    [ItemType.Stone1Block]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Stone1,
    },
    [ItemType.Stone2Block]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Stone2,
    },
    [ItemType.Stone3Block]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Stone3,
    },
    [ItemType.Stone4Block]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Stone4,
    },
    [ItemType.Stone5Block]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Stone5,
    },
    [ItemType.Stone6Block]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Stone6,
    },
    [ItemType.Stone7Block]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Stone7,
    },
    [ItemType.Stone8Block]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Stone8,
    },
    [ItemType.Stone9Block]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Stone9,
    },
    [ItemType.TinBlock]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Tin,
    },
    [ItemType.AluminumBlock]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Aluminum,
    },
    [ItemType.GoldBlock]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Gold,
    },
    [ItemType.TitaniumBlock]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Titanium,
    },
    [ItemType.GrapeBlock]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Grape,
    },
    [ItemType.Wood0Block]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Wood0,
    },
    [ItemType.Wood1Block]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Wood1,
    },
    [ItemType.Wood2Block]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Wood2,
    },
    [ItemType.Wood3Block]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Wood3,
    },
    [ItemType.Wood4Block]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Wood4,
    },
    [ItemType.Wood5Block]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Wood5,
    },
    [ItemType.Wood6Block]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Wood6,
    },
    [ItemType.Wood7Block]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Wood7,
    },
    [ItemType.Wood8Block]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Wood8,
    },
    [ItemType.Wood9Block]: {
        type: ItemCategories.Tile,
        placedTile: _Tile__WEBPACK_IMPORTED_MODULE_0__.TileType.Wood9,
    },
    [ItemType.Seed]: {
        type: ItemCategories.TileEntity,
        placedTileEntity: _TileEntity__WEBPACK_IMPORTED_MODULE_1__.TileEntities.Seed,
        tileEntityOffset: [-1, -6],
    },
    // [ItemType.TinPickaxe]: {
    // 	type: ItemCategories.Tool,
    // 	breakableTiles: [TileType.Snow, TileType.Ice, TileType.Dirt, TileType.Wood0, TileType.Stone0, TileType.Stone1, TileType.Tin, TileType.Aluminum]
    // }
});


/***/ }),

/***/ "./src/global/Tile.ts":
/*!****************************!*\
  !*** ./src/global/Tile.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TileType": () => (/* binding */ TileType)
/* harmony export */ });
var TileType;
(function (TileType) {
    TileType[TileType["Air"] = 0] = "Air";
    TileType[TileType["Snow"] = 1] = "Snow";
    TileType[TileType["Ice"] = 2] = "Ice";
    TileType[TileType["Dirt"] = 3] = "Dirt";
    TileType[TileType["Stone0"] = 4] = "Stone0";
    TileType[TileType["Stone1"] = 5] = "Stone1";
    TileType[TileType["Stone2"] = 6] = "Stone2";
    TileType[TileType["Stone3"] = 7] = "Stone3";
    TileType[TileType["Stone4"] = 8] = "Stone4";
    TileType[TileType["Stone5"] = 9] = "Stone5";
    TileType[TileType["Stone6"] = 10] = "Stone6";
    TileType[TileType["Stone7"] = 11] = "Stone7";
    TileType[TileType["Stone8"] = 12] = "Stone8";
    TileType[TileType["Stone9"] = 13] = "Stone9";
    TileType[TileType["Tin"] = 14] = "Tin";
    TileType[TileType["Aluminum"] = 15] = "Aluminum";
    TileType[TileType["Gold"] = 16] = "Gold";
    TileType[TileType["Titanium"] = 17] = "Titanium";
    TileType[TileType["Grape"] = 18] = "Grape";
    TileType[TileType["Wood0"] = 19] = "Wood0";
    TileType[TileType["Wood1"] = 20] = "Wood1";
    TileType[TileType["Wood2"] = 21] = "Wood2";
    TileType[TileType["Wood3"] = 22] = "Wood3";
    TileType[TileType["Wood4"] = 23] = "Wood4";
    TileType[TileType["Wood5"] = 24] = "Wood5";
    TileType[TileType["Wood6"] = 25] = "Wood6";
    TileType[TileType["Wood7"] = 26] = "Wood7";
    TileType[TileType["Wood8"] = 27] = "Wood8";
    TileType[TileType["Wood9"] = 28] = "Wood9";
})(TileType || (TileType = {}));


/***/ }),

/***/ "./src/global/TileEntity.ts":
/*!**********************************!*\
  !*** ./src/global/TileEntity.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TileEntities": () => (/* binding */ TileEntities),
/* harmony export */   "TileEntityTextures": () => (/* binding */ TileEntityTextures)
/* harmony export */ });
var TileEntities;
(function (TileEntities) {
    TileEntities[TileEntities["Tree"] = 0] = "Tree";
    TileEntities[TileEntities["Tier1Drill"] = 1] = "Tier1Drill";
    TileEntities[TileEntities["Tier2Drill"] = 2] = "Tier2Drill";
    TileEntities[TileEntities["Tier3Drill"] = 3] = "Tier3Drill";
    TileEntities[TileEntities["Tier4Drill"] = 4] = "Tier4Drill";
    TileEntities[TileEntities["Tier5Drill"] = 5] = "Tier5Drill";
    TileEntities[TileEntities["CraftingBench"] = 6] = "CraftingBench";
    TileEntities[TileEntities["Seed"] = 7] = "Seed";
})(TileEntities || (TileEntities = {}));
var TileEntityTextures;
(function (TileEntityTextures) {
    TileEntityTextures[TileEntityTextures["Tree1"] = 0] = "Tree1";
    TileEntityTextures[TileEntityTextures["Tree2"] = 1] = "Tree2";
    TileEntityTextures[TileEntityTextures["Tree3"] = 2] = "Tree3";
    TileEntityTextures[TileEntityTextures["Tree4"] = 3] = "Tree4";
    TileEntityTextures[TileEntityTextures["Tree5"] = 4] = "Tree5";
    TileEntityTextures[TileEntityTextures["Tree6"] = 5] = "Tree6";
    TileEntityTextures[TileEntityTextures["Tree7"] = 6] = "Tree7";
    TileEntityTextures[TileEntityTextures["Tree8"] = 7] = "Tree8";
    TileEntityTextures[TileEntityTextures["Tree9"] = 8] = "Tree9";
    TileEntityTextures[TileEntityTextures["Tree10"] = 9] = "Tree10";
})(TileEntityTextures || (TileEntityTextures = {}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunksnowed_in"] = self["webpackChunksnowed_in"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["modules-main"], () => (__webpack_require__("./src/client/Game.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0QsQ0FBQyxtRUFBb0IsQ0FBQyxFQUFFLElBQUksbUVBQWEsQ0FDeEMsd0NBQXdDLENBQ3hDO0lBQ0QsQ0FBQyxtRUFBb0IsQ0FBQyxFQUFFLElBQUksbUVBQWEsQ0FDeEMsd0NBQXdDLENBQ3hDO0lBQ0QsQ0FBQyxtRUFBb0IsQ0FBQyxFQUFFLElBQUksbUVBQWEsQ0FDeEMsd0NBQXdDLENBQ3hDO0lBQ0QsQ0FBQyxtRUFBb0IsQ0FBQyxFQUFFLElBQUksbUVBQWEsQ0FDeEMsd0NBQXdDLENBQ3hDO0lBQ0QsQ0FBQyxtRUFBb0IsQ0FBQyxFQUFFLElBQUksbUVBQWEsQ0FDeEMsd0NBQXdDLENBQ3hDO0lBQ0QsQ0FBQyxtRUFBb0IsQ0FBQyxFQUFFLElBQUksbUVBQWEsQ0FDeEMsd0NBQXdDLENBQ3hDO0lBQ0QsQ0FBQyxtRUFBb0IsQ0FBQyxFQUFFLElBQUksbUVBQWEsQ0FDeEMsd0NBQXdDLENBQ3hDO0lBQ0QsQ0FBQyxtRUFBb0IsQ0FBQyxFQUFFLElBQUksbUVBQWEsQ0FDeEMsd0NBQXdDLENBQ3hDO0lBQ0QsQ0FBQyxtRUFBb0IsQ0FBQyxFQUFFLElBQUksbUVBQWEsQ0FDeEMsd0NBQXdDLENBQ3hDO0lBQ0QsQ0FBQyxtRUFBb0IsQ0FBQyxFQUFFLElBQUksbUVBQWEsQ0FDeEMsd0NBQXdDLENBQ3hDO0lBQ0QsQ0FBQyxnRUFBaUIsQ0FBQyxFQUFFLElBQUksbUVBQWEsQ0FDckMscUNBQXFDLENBQ3JDO0lBQ0QsQ0FBQyxxRUFBc0IsQ0FBQyxFQUFFLElBQUksbUVBQWEsQ0FDMUMsMENBQTBDLENBQzFDO0lBQ0QsQ0FBQyxpRUFBa0IsQ0FBQyxFQUFFLElBQUksbUVBQWEsQ0FDdEMsc0NBQXNDLENBQ3RDO0lBQ0QsQ0FBQyxxRUFBc0IsQ0FBQyxFQUFFLElBQUksbUVBQWEsQ0FDMUMsMENBQTBDLENBQzFDO0lBQ0QsQ0FBQyxrRUFBbUIsQ0FBQyxFQUFFLElBQUksbUVBQWEsQ0FDdkMsdUNBQXVDLENBQ3ZDO0lBQ0QsQ0FBQyxrRUFBbUIsQ0FBQyxFQUFFLElBQUksbUVBQWEsQ0FDdkMsdUNB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RSxJQUFJLGlFQUFZLENBQ3RCLDZCQUE2QixFQUM3QjtRQUNDLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztLQUNOLEVBQ0QsMEVBQTBFLEVBQzFFLEVBQUUsQ0FDRjtJQUVELEdBQUcsRUFBRSxJQUFJLGlFQUFZLENBQ3BCLGdDQUFnQyxFQUNoQztRQUNDLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO0tBQ04sRUFDRCx3RUFBd0UsRUFDeEUsRUFBRSxDQUNGO0lBQ0QsU0FBUyxFQUFFLElBQUksaUVBQVksQ0FDMUIsa0NBQWtDLEVBQ2xDO1FBQ0MsR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLElBQUksRUFBRSxDQUFDO1FBQ1AsR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVB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QUUsQ0FBQyxDQUFDLENBQUM7UUFDckYsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFakksaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxXQUFXLEVBQUUsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsV0FBVyxFQUFFLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFbEksaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFbEksU0FBUztRQUNULElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVuSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFdB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QUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0csSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVqSSxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLFdBQVcsRUFBRSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxXQUFXLEVBQUUsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVsSSxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVsSSxTQUFTO1FBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsV0FBVyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRW5JLElBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxHQUFDLG1CQUFtQixFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLEdBQUcsV0FBVyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQztTQUNsSzthQUNJO1lBQ0QsSUFBRyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNkLElBQUksQ0FB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QUUsQ0FBQyxHQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXhILGlCQUFpQjtRQUNqQiwyRUFBK0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBQyxFQUFFLEdBQUMsV0FBVyxFQUFFLENBQUMsR0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekcsMkVBQStCLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUMsV0FBVyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUMsRUFBRSxHQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXpILGlCQUFpQjtRQUNqQiwyRUFBK0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUMsV0FBVyxFQUFFLENBQUMsR0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFDLEVBQUUsR0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekcsMkVBQStCLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUMsV0FBVyxFQUFFLENBQUMsR0FBQyxFQUFFLEdBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXpILFNBQVM7UUFDVCwyRUFBK0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBQyxXQUFXLEVBQUUsQ0FBQyxH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QTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc25vd2VkX2luLy4vc3JjL2NsaWVudC9HYW1lLnRzIiwid2VicGFjazovL3Nub3dlZF9pbi8uL3NyYy9jbGllbnQvTmV0TWFuYWdlci50cyIsIndlYnBhY2s6Ly9zbm93ZWRfaW4vLi9zcmMvY2xpZW50L2Fzc2V0cy9Bc3NldHMudHMiLCJ3ZWJwYWNrOi8vc25vd2VkX2luLy4vc3JjL2NsaWVudC9hc3NldHMvcmVzb3VyY2VzL0F1ZGlvUmVzb3VyY2UudHMiLCJ3ZWJwYWNrOi8vc25vd2VkX2luLy4vc3JjL2NsaWVudC9hc3NldHMvcmVzb3VyY2VzL0F1ZGlvUmVzb3VyY2VHcm91cC50cyIsIndlYnBhY2s6Ly9zbm93ZWRfaW4vLi9zcmMvY2xpZW50L2Fzc2V0cy9yZXNvdXJjZXMvRm9udFJlc291cmNlLnRzIiwid2VicGFjazovL3Nub3dlZF9pbi8uL3NyYy9jbGllbnQvYXNzZXRzL3Jlc291cmNlcy9JbWFnZVJlc291cmNlLnRzIiwid2VicGFjazovL3Nub3dlZF9pbi8uL3NyYy9jbGllbnQvYXNzZXRzL3Jlc291cmNlcy9SZWZsZWN0ZWRJbWFnZVJlc291cmNlLnRzIiwid2VicGFjazovL3Nub3dlZF9pbi8uL3NyYy9jbGllbnQvYXNzZXRzL3Jlc291cmNlcy9SZXNvdXJjZS50cyIsIndlYnBhY2s6Ly9zbm93ZWRfaW4vLi9zcmMvY2xpZW50L2Fzc2V0cy9yZXNvdXJjZXMvVGlsZVJlc291cmNlLnRzIiwid2VicGFjazovL3Nub3dlZF9pbi8uL3NyYy9jbGllbnQvaW5wdXQvQ29udHJvbC50cyIsIndlYnBhY2s6Ly9zbm93ZWRfaW4vLi9zcmMvY2xpZW50L3BsYXllci9JbnZlbnRvcnkudHMiLCJ3ZWJwYWNrOi8vc25vd2VkX2luLy4vc3JjL2NsaWVudC9wbGF5ZXIvUGxheWVyTG9jYWwudHMiLCJ3ZWJwYWNrOi8vc25vd2VkX2luLy4vc3JjL2NsaWVudC91aS9CdXR0b24udHMiLCJ3ZWJwYWNrOi8vc25vd2VkX2luLy4vc3JjL2NsaWVudC91aS9JbnB1dEJveC50cyIsIndlYnBhY2s6Ly9zbm93ZWRfaW4vLi9zcmMvY2xpZW50L3VpL1NsaWRlci50cyIsIndlYnBhY2s6Ly9zbm93ZWRfaW4vLi9zcmMvY2xpZW50L3VpL1VpRnJhbWUudHMiLCJ3ZWJwYWNrOi8vc25vd2VkX2luLy4vc3JjL2NsaWVudC91aS9VaVNjcmVlbi50cyIsIndlYnBhY2s6Ly9zbm93ZWRfaW4vLi9zcmMvY2xpZW50L3VpL3NjcmVlbnMvQ29udHJvbHNNZW51LnRzIiwid2VicGFjazovL3Nub3dlZF9pbi8uL3NyYy9jbGllbnQvdWkvc2NyZWVucy9NYWluTWVudS50cyIsIndlYnBhY2s6Ly9zbm93ZWRfaW4vLi9zcmMvY2xpZW50L3VpL3NjcmVlbnMvT3B0aW9uc01lbnUudHMiLCJ3ZWJwYWNrOi8vc25vd2VkX2luLy4vc3JjL2NsaWVudC91aS9zY3JlZW5zL1BhdXNlTWVudS50cyIsIndlYnBhY2s6Ly9zbm93ZWRfaW4vLi9zcmMvY2xpZW50L3VpL3NjcmVlbnMvVmlkZW9TZXR0aW5nc01lbnUudHMiLCJ3ZWJwYWNrOi8vc25vd2VkX2luLy4vc3JjL2NsaWVudC91aS9zY3JlZW5zL1dvcmxkQ3JlYXRpb25NZW51LnRzIiwid2VicGFjazovL3Nub3dlZF9pbi8uL3NyYy9jbGllbnQvdWkvc2NyZWVucy9Xb3JsZE9wdGlvbnNNZW51LnRzIiwid2VicGFjazovL3Nub3dlZF9pbi8uL3NyYy9jbGllbnQvd29ybGQvV29ybGQudHMiLCJ3ZWJwYWNrOi8vc25vd2VkX2luLy4vc3JjL2NsaWVudC93b3JsZC9Xb3JsZFRpbGVzLnRzIiwid2VicGFjazovL3Nub3dlZF9pbi8uL3NyYy9jbGllbnQvd29ybGQvZW50aXRpZXMvRW50aXR5Q2xhc3Nlcy50cyIsIndlYnBhY2s6Ly9zbm93ZWRfaW4vLi9zcmMvY2xpZW50L3dvcmxkL2VudGl0aWVzL0l0ZW1FbnRpdHkudHMiLCJ3ZWJwYWNrOi8vc25vd2VkX2luLy4vc3JjL2NsaWVudC93b3JsZC9lbnRpdGllcy9QbGF5ZXJFbnRpdHkudHMiLCJ3ZWJwYWNrOi8vc25vd2VkX2luLy4vc3JjL2NsaWVudC93b3JsZC9lbnRpdGllcy9TZXJ2ZXJFbnRpdHkudHMiLCJ3ZWJwYWNrOi8vc25vd2VkX2luLy4vc3JjL2NsaWVudC93b3JsZC9lbnRpdGllcy9UaWxlRW50aXR5LnRzIiwid2VicGFjazovL3Nub3dlZF9pbi8uL3NyYy9jbGllbnQvd29ybGQvcGFydGljbGVzL0NvbG9yUGFydGljbGUudHMiLCJ3ZWJwYWNrOi8vc25vd2VkX2luLy4vc3JjL2dsb2JhbC9FbnRpdHkudHMiLCJ3ZWJwYWNrOi8vc25vd2VkX2luLy4vc3JjL2dsb2JhbC9JbnZlbnRvcnkudHMiLCJ3ZWJwYWNrOi8vc25vd2VkX2luLy4vc3JjL2dsb2JhbC9UaWxlLnRzIiwid2VicGFjazovL3Nub3dlZF9pbi8uL3NyYy9nbG9iYWwvVGlsZUVudGl0eS50cyIsIndlYnBhY2s6Ly9zbm93ZWRfaW4vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc25vd2VkX2luL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vc25vd2VkX2luL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3Nub3dlZF9pbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc25vd2VkX2luL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vc25vd2VkX2luL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc25vd2VkX2luL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc25vd2VkX2luL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3Nub3dlZF9pbi93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3Nub3dlZF9pbi93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc25vd2VkX2luL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcDUsIHsgU2hhZGVyIH0gZnJvbSAncDUnO1xyXG5cclxuaW1wb3J0IHsgV29ybGQgfSBmcm9tICcuL3dvcmxkL1dvcmxkJztcclxuXHJcbmltcG9ydCB7XHJcblx0QXVkaW9Bc3NldHMsXHJcblx0Rm9udHMsXHJcblx0SXRlbUFzc2V0cyxcclxuXHRsb2FkQXNzZXRzLFxyXG5cdFBsYXllckFuaW1hdGlvbnMsXHJcblx0VWlBc3NldHMsXHJcblx0V29ybGRBc3NldHMsXHJcbn0gZnJvbSAnLi9hc3NldHMvQXNzZXRzJztcclxuaW1wb3J0IHsgTWFpbk1lbnUgfSBmcm9tICcuL3VpL3NjcmVlbnMvTWFpbk1lbnUnO1xyXG5pbXBvcnQgeyBpbywgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XHJcbmltcG9ydCB7IFVpU2NyZWVuIH0gZnJvbSAnLi91aS9VaVNjcmVlbic7XHJcbmltcG9ydCB7IFBhdXNlTWVudSB9IGZyb20gJy4vdWkvc2NyZWVucy9QYXVzZU1lbnUnO1xyXG5pbXBvcnQgeyBOZXRNYW5hZ2VyIH0gZnJvbSAnLi9OZXRNYW5hZ2VyJztcclxuaW1wb3J0IHsgV29ybGRUaWxlcywgVGlsZSB9IGZyb20gJy4vd29ybGQvV29ybGRUaWxlcyc7XHJcblxyXG5pbXBvcnQgeyBDbGllbnRFdmVudHMsIFNlcnZlckV2ZW50cyB9IGZyb20gJy4uL2dsb2JhbC9FdmVudHMnO1xyXG5cclxuLypcclxuLy8vSU5GT1JNQVRJT05cclxuLy9TdGFydGluZyBhIGdhbWVcclxuUHJlc3MgTGl2ZSBTZXJ2ZXIgdG8gc3RhcnQgdGhlIGdhbWVcclxub3JcclxuVHlwZSBucG0gcnVuIHByZXN0YXJ0IHRvIHN0YXJ0IHRoZSBnYW1lLlxyXG4vL1RPRE9cclxuV2hlbiBzb21ldGhpbmcgaW4gdGhlIHRvZG8gc2VjdGlvbiwgZWl0aGVyIGRlbGV0ZSBpdCBhbmQgbWFyayB3aGF0IHdhcyBkb25lIGluIHRoZSBkZXNjcmlwdGlvbiAtXHJcbi0gd2hlbiBwdXNoaW5nLCBvciBqdXN0IG1hcmsgaXQgbGlrZSB0aGlzXHJcbihleGFtcGxlOiBDcmVhdGUgYSBudWNsZWFyIGV4cGxvc2lvbiAtLSBYKVxyXG4vLy9HRU5FUkFMIFRPRE86XHJcblxyXG4vL0F1ZGlvXHJcbnNvdW5kc1xyXG5tdXNpY1xyXG5OUEMnc1xyXG5cclxuLy9WaXN1YWxcclxuVXBkYXRlIHNub3cgdGV4dHVyZXNcclxuVXBkYXRlIEdVSSB0ZXh0dXJlc1xyXG5wbGF5ZXIgY2hhcmFjdGVyXHJcbml0ZW0gbG9yZSBpbXBsZW1lbnRlZFxyXG5cclxuLy9HYW1lcGxheVxyXG5maW5pc2ggaXRlbSBtYW5hZ2VtZW50XHJcbnBhdXNlIG1lbnVcclxuSHVuZ2VyLCBoZWF0LCBldGMgc3lzdGVtXHJcbml0ZW0gY3JlYXRpb25cclxuaXRlbSB1c2VcclxuUGFyZW50IFdvcmtiZW5jaFxyXG5cclxuLy9PYmplY3RzXHJcbmRpcnRcclxuc3RvbmVcclxud29ya2JlbmNoXHJcbmJhY2twYWNrICh1c2VkIGFzIGNoZXN0KVxyXG5cclxuLy9Qb2xpc2hcclxuYmV0dGVyIHdvcmxkIGdlbmVyYXRpb25cclxuZm9udCBjb25zaXN0ZW5jeVxyXG5maXggY3Vyc29yIGlucHV0IGxhZyAoc2VwYXJhdGUgY3Vyc29yIGFuZCBhbmltYXRpb24gaW1hZ2VzKVxyXG5maXggc3R1Y2sgb24gc2lkZSBvZiBibG9jayBidWdcclxuZml4IGNvbGxpZGUgd2l0aCBzaWRlcyBvZiBtYXAgYnVnXHJcbiAqL1xyXG5pbXBvcnQgeyBUaWxlVHlwZSB9IGZyb20gJy4uL2dsb2JhbC9UaWxlJztcclxuaW1wb3J0IHsgQ29udHJvbCB9IGZyb20gJy4vaW5wdXQvQ29udHJvbCc7XHJcbmltcG9ydCB7IENvbG9yUGFydGljbGUgfSBmcm9tICcuL3dvcmxkL3BhcnRpY2xlcy9Db2xvclBhcnRpY2xlJztcclxuaW1wb3J0IHsgVGlsZUVudGl0aWVzIH0gZnJvbSAnLi4vZ2xvYmFsL1RpbGVFbnRpdHknO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWUgZXh0ZW5kcyBwNSB7XHJcblx0d29ybGRXaWR0aDogbnVtYmVyID0gNTEyOyAvLyB3aWR0aCBvZiB0aGUgd29ybGQgaW4gdGlsZXMgICA8IT4gTUFLRSBTVVJFIFRISVMgSVMgTkVWRVIgTEVTUyBUSEFOIDY0ISEhIDwhPlxyXG5cdHdvcmxkSGVpZ2h0OiBudW1iZXIgPSAyNTY7IC8vIGhlaWdodCBvZiB0aGUgd29ybGQgaW4gdGlsZXMgIDwhPiBNQUtFIFNVUkUgVEhJUyBJUyBORVZFUiBMRVNTIFRIQU4gNjQhISEgPCE+XHJcblxyXG5cdFRJTEVfV0lEVEg6IG51bWJlciA9IDg7IC8vIHdpZHRoIG9mIGEgdGlsZXMgaW4gcGl4ZWxzXHJcblx0VElMRV9IRUlHSFQ6IG51bWJlciA9IDg7IC8vIGhlaWdodCBvZiBhIHRpbGVzIGluIHBpeGVsc1xyXG5cclxuXHR1cHNjYWxlU2l6ZTogbnVtYmVyID0gNjsgLy8gbnVtYmVyIG9mIHNjcmVlbiBwaXhlbHMgcGVyIHRleHR1cmUgcGl4ZWxzICh0aGluayBvZiB0aGlzIGFzIGh1ZCBzY2FsZSBpbiBNaW5lY3JhZnQpXHJcblxyXG5cdGNhbVg6IG51bWJlciA9IDA7IC8vIHBvc2l0aW9uIG9mIHRoZSB0b3AgbGVmdCBjb3JuZXIgb2YgdGhlIHNjcmVlbiBpbiB1bi11cC1zY2FsZWQgcGl4ZWxzICgwIGlzIGxlZnQgb2Ygd29ybGQpICh3b3JsZFdpZHRoKlRJTEVfV0lEVEggaXMgYm90dG9tIG9mIHdvcmxkKVxyXG5cdGNhbVk6IG51bWJlciA9IDA7IC8vIHBvc2l0aW9uIG9mIHRoZSB0b3AgbGVmdCBjb3JuZXIgb2YgdGhlIHNjcmVlbiBpbiB1bi11cC1zY2FsZWQgcGl4ZWxzICgwIGlzIHRvcCBvZiB3b3JsZCkgKHdvcmxkSGVpZ2h0KlRJTEVfSEVJR0hUIGlzIGJvdHRvbSBvZiB3b3JsZClcclxuXHRwQ2FtWDogbnVtYmVyID0gMDsgLy8gbGFzdCBmcmFtZSdzIHggb2YgdGhlIGNhbWVyYVxyXG5cdHBDYW1ZOiBudW1iZXIgPSAwOyAvLyBsYXN0IGZyYW1lJ3MgeSBvZiB0aGUgY2FtZXJhXHJcblx0aW50ZXJwb2xhdGVkQ2FtWDogbnVtYmVyID0gMDsgLy8gaW50ZXJwb2xhdGVkIHBvc2l0aW9uIG9mIHRoZSBjYW1lcmFcclxuXHRpbnRlcnBvbGF0ZWRDYW1ZOiBudW1iZXIgPSAwOyAvLyBpbnRlcnBvbGF0ZWQgcG9zaXRpb24gb2YgdGhlIGNhbWVyYVxyXG5cdGRlc2lyZWRDYW1YOiBudW1iZXIgPSAwOyAvLyBkZXNpcmVkIHBvc2l0aW9uIG9mIHRoZSBjYW1lcmFcclxuXHRkZXNpcmVkQ2FtWTogbnVtYmVyID0gMDsgLy8gZGVzaXJlZCBwb3NpdGlvbiBvZiB0aGUgY2FtZXJhXHJcblx0c2NyZWVuc2hha2VBbW91bnQ6IG51bWJlciA9IDA7IC8vIGFtb3VudCBvZiBzY3JlZW5zaGFrZSBoYXBwZW5pbmcgYXQgdGhlIGN1cnJlbnQgbW9tZW50XHJcblxyXG5cdC8vIHRpY2sgbWFuYWdlbWVudFxyXG5cdG1zU2luY2VUaWNrOiBudW1iZXIgPSAwOyAvLyB0aGlzIGlzIHRoZSBydW5uaW5nIGNvdW50ZXIgb2YgaG93IG1hbnkgbWlsbGlzZWNvbmRzIGl0IGhhcyBiZWVuIHNpbmNlIHRoZSBsYXN0IHRpY2suICBUaGUgZ2FtZSBjYW4gdGhlblxyXG5cdG1zUGVyVGljazogbnVtYmVyID0gMjA7IC8vIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHBlciBnYW1lIHRpY2suICAxMDAwL21zUGVyVGljayA9IHRpY2tzIHBlciBzZWNvbmRcclxuXHRhbW91bnRTaW5jZUxhc3RUaWNrOiBudW1iZXIgPSAwOyAvLyB0aGlzIGlzIGEgdmFyaWFibGUgY2FsY3VsYXRlZCBldmVyeSBmcmFtZSB1c2VkIGZvciBpbnRlcnBvbGF0aW9uIC0gZG9tYWluWzAsMSlcclxuXHRmb3JnaXZlbmVzc0NvdW50OiBudW1iZXIgPSA1MDsgLy8gaWYgdGhlIGNvbXB1dGVyIG5lZWRzIHRvIGRvIG1vcmUgdGhhbiA1MCB0aWNrcyBpbiBhIHNpbmdsZSBmcmFtZSwgdGhlbiBpdCBjb3VsZCBiZSBydW5uaW5nIGJlaGluZCwgcHJvYmFibHkgYmVjYXVzZSBvZiBhIGZyZWV6ZSBvciB0aGUgdXNlciBiZWluZyBvbiBhIGRpZmZlcmVudCB0YWIuICBJbiB0aGVzZSBjYXNlcywgaXQncyBwcm9iYWJseSBiZXN0IHRvIGp1c3QgaWdub3JlIHRoYXQgYW55IHRpbWUgaGFzIHBhc3NlZCB0byBhdm9pZCBmdXJ0aGVyIGZyZWV6aW5nXHJcblxyXG5cdC8vIHBoeXNpY3MgY29uc3RhbnRzXHJcblx0R1JBVklUWV9TUEVFRDogbnVtYmVyID0gMC4wNDsgLy8gaW4gdW5pdHMgcGVyIHNlY29uZCB0aWNrLCBwb3NpdGl2ZSBtZWFucyBkb3dud2FyZCBncmF2aXR5LCBuZWdhdGl2ZSBtZWFucyB1cHdhcmQgZ3Jhdml0eVxyXG5cdERSQUdfQ09FRkZJQ0lFTlQ6IG51bWJlciA9IDAuMjE7IC8vIGFyYml0cmFyeSBudW1iZXIsIDAgbWVhbnMgbm8gZHJhZ1xyXG5cclxuXHQvLyBDSEFSQUNURVIgU0hPVUxEIEJFIFJPVUdITFkgMTIgUElYRUxTIEJZIDIwIFBJWEVMU1xyXG5cclxuXHRwaWNrZWRVcFNsb3QgPSAtMTtcclxuXHJcblx0d29ybGRNb3VzZVggPSAwOyAvLyB0aGUgbW91c2UgcG9zaXRpb24gaW4gd29ybGQgY29vcmRpbmF0ZXNcclxuXHR3b3JsZE1vdXNlWSA9IDA7IC8vIHRoZSBtb3VzZSBwb3NpdGlvbiBpbiB3b3JsZCBjb29yZGluYXRlc1xyXG5cdGxhc3RDdXJzb3JNb3ZlID0gRGF0ZS5ub3coKVxyXG5cdG1vdXNlT24gPSB0cnVlOyAvLyBpcyB0aGUgbW91c2Ugb24gdGhlIHdpbmRvdz9cclxuXHJcblx0a2V5czogYm9vbGVhbltdID0gW107XHJcblxyXG5cdC8vIHRoZSBrZXljb2RlIGZvciB0aGUga2V5IHRoYXQgZG9lcyB0aGUgYWN0aW9uXHJcblx0Y29udHJvbHM6IENvbnRyb2xbXSA9IFtcclxuXHRcdG5ldyBDb250cm9sKFxyXG5cdFx0XHQnV2FsayBSaWdodCcsXHJcblx0XHRcdHRydWUsXHJcblx0XHRcdDY4LFxyXG5cdFx0XHQoKSA9PiB7XHJcblx0XHRcdFx0aWYgKHRoaXMuY3VycmVudFVpICE9PSB1bmRlZmluZWQpIHJldHVybjtcclxuXHRcdFx0XHR0aGlzLndvcmxkLnBsYXllci5yaWdodEJ1dHRvbiA9IHRydWU7XHJcblx0XHRcdH0sXHJcblx0XHRcdCgpID0+IHtcclxuXHRcdFx0XHRpZiAodGhpcy5jdXJyZW50VWkgIT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG5cdFx0XHRcdHRoaXMud29ybGQucGxheWVyLnJpZ2h0QnV0dG9uID0gZmFsc2U7XHJcblx0XHRcdH0sXHJcblx0XHQpLCAvLyByaWdodFxyXG5cdFx0bmV3IENvbnRyb2woXHJcblx0XHRcdCdXYWxrIExlZnQnLFxyXG5cdFx0XHR0cnVlLFxyXG5cdFx0XHQ2NSxcclxuXHRcdFx0KCkgPT4ge1xyXG5cdFx0XHRcdGlmICh0aGlzLmN1cnJlbnRVaSAhPT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblx0XHRcdFx0dGhpcy53b3JsZC5wbGF5ZXIubGVmdEJ1dHRvbiA9IHRydWU7XHJcblx0XHRcdH0sXHJcblx0XHRcdCgpID0+IHtcclxuXHRcdFx0XHRpZiAodGhpcy5jdXJyZW50VWkgIT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG5cdFx0XHRcdHRoaXMud29ybGQucGxheWVyLmxlZnRCdXR0b24gPSBmYWxzZTtcclxuXHRcdFx0fSxcclxuXHRcdCksIC8vIGxlZnRcclxuXHRcdG5ldyBDb250cm9sKFxyXG5cdFx0XHQnSnVtcCcsXHJcblx0XHRcdHRydWUsXHJcblx0XHRcdDg3LFxyXG5cdFx0XHQoKSA9PiB7XHJcblx0XHRcdFx0aWYgKHRoaXMuY3VycmVudFVpICE9PSB1bmRlZmluZWQpIHJldHVybjtcclxuXHRcdFx0XHR0aGlzLndvcmxkLnBsYXllci5qdW1wQnV0dG9uID0gdHJ1ZTtcclxuXHRcdFx0fSxcclxuXHRcdFx0KCkgPT4ge1xyXG5cdFx0XHRcdGlmICh0aGlzLmN1cnJlbnRVaSAhPT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblx0XHRcdFx0dGhpcy53b3JsZC5wbGF5ZXIuanVtcEJ1dHRvbiA9IGZhbHNlO1xyXG5cdFx0XHR9LFxyXG5cdFx0KSwgLy8ganVtcFxyXG5cdFx0bmV3IENvbnRyb2woJ1BhdXNlJywgdHJ1ZSwgMjcsICgpID0+IHtcclxuXHRcdFx0Ly9pZiBpbnZlbnRvcnkgb3BlbntcclxuXHRcdFx0Ly9jbG9zZSBpbnZlbnRvcnlcclxuXHRcdFx0Ly9yZXR1cm47fVxyXG5cdFx0XHRpZiAodGhpcy5jdXJyZW50VWkgPT09IHVuZGVmaW5lZClcclxuXHRcdFx0XHR0aGlzLmN1cnJlbnRVaSA9IG5ldyBQYXVzZU1lbnUoRm9udHMudGl0bGUsIEZvbnRzLmJpZyk7XHJcblx0XHRcdGVsc2UgdGhpcy5jdXJyZW50VWkgPSB1bmRlZmluZWQ7XHJcblx0XHR9KSwgLy8gc2V0dGluZ3NcclxuXHRcdG5ldyBDb250cm9sKCdJbnZlbnRvcnknLCB0cnVlLCA2OSwgKCkgPT4ge1xyXG5cdFx0XHQvL2lmIHVpIG9wZW4gcmV0dXJuO1xyXG5cdFx0XHQvL2lmIGludmVudG9yeSBjbG9zZWQgb3BlbiBpbnZlbnRvcnlcclxuXHRcdFx0Ly9lbHNlIGNsb3NlIGludmVudG9yeVxyXG5cdFx0XHRjb25zb2xlLmxvZygnaW52ZW50b3J5IGhhcyBub3QgYmVlbiBpbXBsZW1lbnRlZCB5ZXQnKTtcclxuXHRcdH0pLCAvLyBpbnZlbnRvcnlcclxuXHRcdG5ldyBDb250cm9sKCdIb3RiYXIgMScsIHRydWUsIDQ5LCAoKSA9PiB7XHJcblx0XHRcdHRoaXMud29ybGQuaW52ZW50b3J5LnNlbGVjdGVkU2xvdCA9IDA7XHJcblx0XHR9KSwgLy8gaG90IGJhciAxXHJcblx0XHRuZXcgQ29udHJvbCgnSG90YmFyIDInLCB0cnVlLCA1MCwgKCkgPT4ge1xyXG5cdFx0XHR0aGlzLndvcmxkLmludmVudG9yeS5zZWxlY3RlZFNsb3QgPSAxO1xyXG5cdFx0fSksIC8vIGhvdCBiYXIgMlxyXG5cdFx0bmV3IENvbnRyb2woJ0hvdGJhciAzJywgdHJ1ZSwgNTEsICgpID0+IHtcclxuXHRcdFx0dGhpcy53b3JsZC5pbnZlbnRvcnkuc2VsZWN0ZWRTbG90ID0gMjtcclxuXHRcdH0pLCAvLyBob3QgYmFyIDNcclxuXHRcdG5ldyBDb250cm9sKCdIb3RiYXIgNCcsIHRydWUsIDUyLCAoKSA9PiB7XHJcblx0XHRcdHRoaXMud29ybGQuaW52ZW50b3J5LnNlbGVjdGVkU2xvdCA9IDM7XHJcblx0XHR9KSwgLy8gaG90IGJhciA0XHJcblx0XHRuZXcgQ29udHJvbCgnSG90YmFyIDUnLCB0cnVlLCA1MywgKCkgPT4ge1xyXG5cdFx0XHR0aGlzLndvcmxkLmludmVudG9yeS5zZWxlY3RlZFNsb3QgPSA0O1xyXG5cdFx0fSksIC8vIGhvdCBiYXIgNVxyXG5cdFx0bmV3IENvbnRyb2woJ0hvdGJhciA2JywgdHJ1ZSwgNTQsICgpID0+IHtcclxuXHRcdFx0dGhpcy53b3JsZC5pbnZlbnRvcnkuc2VsZWN0ZWRTbG90ID0gNTtcclxuXHRcdH0pLCAvLyBob3QgYmFyIDZcclxuXHRcdG5ldyBDb250cm9sKCdIb3RiYXIgNycsIHRydWUsIDU1LCAoKSA9PiB7XHJcblx0XHRcdHRoaXMud29ybGQuaW52ZW50b3J5LnNlbGVjdGVkU2xvdCA9IDY7XHJcblx0XHR9KSwgLy8gaG90IGJhciA3XHJcblx0XHRuZXcgQ29udHJvbCgnSG90YmFyIDgnLCB0cnVlLCA1NiwgKCkgPT4ge1xyXG5cdFx0XHR0aGlzLndvcmxkLmludmVudG9yeS5zZWxlY3RlZFNsb3QgPSA3O1xyXG5cdFx0fSksIC8vIGhvdCBiYXIgOFxyXG5cdFx0bmV3IENvbnRyb2woJ0hvdGJhciA5JywgdHJ1ZSwgNTcsICgpID0+IHtcclxuXHRcdFx0dGhpcy53b3JsZC5pbnZlbnRvcnkuc2VsZWN0ZWRTbG90ID0gODtcclxuXHRcdH0pLCAvLyBob3QgYmFyIDlcclxuXHRcdG5ldyBDb250cm9sKCdIb3RiYXIgMTAnLCB0cnVlLCA0OCwgKCkgPT4ge1xyXG5cdFx0XHR0aGlzLndvcmxkLmludmVudG9yeS5zZWxlY3RlZFNsb3QgPSA5O1xyXG5cdFx0fSksIC8vIGhvdCBiYXIgMTBcclxuXHRcdG5ldyBDb250cm9sKCdIb3RiYXIgMTEnLCB0cnVlLCAxODksICgpID0+IHtcclxuXHRcdFx0dGhpcy53b3JsZC5pbnZlbnRvcnkuc2VsZWN0ZWRTbG90ID0gMTA7XHJcblx0XHR9KSwgLy8gaG90IGJhciAxMVxyXG5cdFx0bmV3IENvbnRyb2woJ0hvdGJhciAxMicsIHRydWUsIDE4NywgKCkgPT4ge1xyXG5cdFx0XHR0aGlzLndvcmxkLmludmVudG9yeS5zZWxlY3RlZFNsb3QgPSAxMTtcclxuXHRcdH0pLCAvLyBob3QgYmFyIDEyXHJcblx0XTtcclxuXHJcblx0Y2FudmFzOiBwNS5SZW5kZXJlcjsgLy90aGUgY2FudmFzIGZvciB0aGUgZ2FtZVxyXG5cdHNreUxheWVyOiBwNS5HcmFwaGljczsgLy9hIHA1LkdyYXBoaWNzIG9iamVjdCB0aGF0IHRoZSBzaGFkZXIgaXMgZHJhd24gb250by4gIHRoaXMgaXNuJ3QgdGhlIGJlc3Qgd2F5IHRvIGRvIHRoaXMsIGJ1dCB0aGUgbWFpbiBnYW1lIGNhbnZhcyBpc24ndCBXRUJHTCwgYW5kIGl0J3MgdG9vIG11Y2ggd29yayB0byBjaGFuZ2UgdGhhdFxyXG5cdHNreVNoYWRlcjogcDUuU2hhZGVyOyAvL3RoZSBzaGFkZXIgdGhhdCBkcmF3cyB0aGUgc2t5ICh0aGUgcGF0aCBmb3IgdGhpcyBpcyBpbiB0aGUgcHVibGljIGZvbGRlcilcclxuXHJcblx0d29ybGQ6IFdvcmxkO1xyXG5cclxuXHRjdXJyZW50VWk6IFVpU2NyZWVuIHwgdW5kZWZpbmVkO1xyXG5cclxuXHRjb25uZWN0aW9uOiBTb2NrZXQ8U2VydmVyRXZlbnRzLCBDbGllbnRFdmVudHM+O1xyXG5cclxuXHRuZXRNYW5hZ2VyOiBOZXRNYW5hZ2VyO1xyXG5cclxuXHQvL2NoYW5nZWFibGUgb3B0aW9ucyBmcm9tIG1lbnVzXHJcblx0c2VydmVyVmlzaWJpbGl0eTogc3RyaW5nO1xyXG5cdHdvcmxkQnVtcGluZXNzOiBudW1iZXI7XHJcblx0c2t5TW9kOiBudW1iZXI7XHJcblx0c2t5VG9nZ2xlOiBib29sZWFuO1xyXG5cdHBhcnRpY2xlTXVsdGlwbGllcjogbnVtYmVyO1xyXG5cclxuXHRwYXJ0aWNsZXM6IENvbG9yUGFydGljbGUgLyp8Rm9vdHN0ZXBQYXJ0aWNsZSovW107XHJcblx0YnJlYWtpbmc6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihjb25uZWN0aW9uOiBTb2NrZXQpIHtcclxuXHRcdHN1cGVyKCgpID0+IHsgfSk7IC8vIFRvIGNyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBwNSBpdCB3aWxsIGNhbGwgYmFjayB3aXRoIHRoZSBpbnN0YW5jZS4gV2UgZG9uJ3QgbmVlZCB0aGlzIHNpbmNlIHdlIGFyZSBleHRlbmRpbmcgdGhlIGNsYXNzXHJcblx0XHR0aGlzLmNvbm5lY3Rpb24gPSBjb25uZWN0aW9uO1xyXG5cclxuXHRcdC8vIEluaXRpYWxpc2UgdGhlIG5ldHdvcmsgbWFuYWdlclxyXG5cdFx0dGhpcy5uZXRNYW5hZ2VyID0gbmV3IE5ldE1hbmFnZXIodGhpcyk7XHJcblx0fVxyXG5cclxuXHRwcmVsb2FkKCkge1xyXG5cdFx0Y29uc29sZS5sb2coJ0xvYWRpbmcgYXNzZXRzJyk7XHJcblx0XHRsb2FkQXNzZXRzKFxyXG5cdFx0XHR0aGlzLFxyXG5cdFx0XHRVaUFzc2V0cyxcclxuXHRcdFx0SXRlbUFzc2V0cyxcclxuXHRcdFx0V29ybGRBc3NldHMsXHJcblx0XHRcdEZvbnRzLFxyXG5cdFx0XHRQbGF5ZXJBbmltYXRpb25zLFxyXG5cdFx0KTtcclxuXHRcdGNvbnNvbGUubG9nKCdBc3NldCBsb2FkaW5nIGNvbXBsZXRlZCcpO1xyXG5cdFx0dGhpcy5za3lTaGFkZXIgPSB0aGlzLmxvYWRTaGFkZXIoXHJcblx0XHRcdCdhc3NldHMvc2hhZGVycy9iYXNpYy52ZXJ0JyxcclxuXHRcdFx0J2Fzc2V0cy9zaGFkZXJzL3NreS5mcmFnJyxcclxuXHRcdCk7XHJcblx0fVxyXG5cclxuXHRzZXR1cCgpIHtcclxuXHRcdGNvbnNvbGUubG9nKCdzZXR1cCBjYWxsZWQnKTtcclxuXHRcdC8vIG1ha2UgYSBjYW52YXMgdGhhdCBmaWxscyB0aGUgd2hvbGUgc2NyZWVuIChhIGNhbnZhcyBpcyB3aGF0IGlzIGRyYXduIHRvIGluIHA1LmpzLCBhcyB3ZWxsIGFzIGxvdHMgb2Ygb3RoZXIgSlMgcmVuZGVyaW5nIGxpYnJhcmllcylcclxuXHRcdHRoaXMuY2FudmFzID0gdGhpcy5jcmVhdGVDYW52YXModGhpcy53aW5kb3dXaWR0aCwgdGhpcy53aW5kb3dIZWlnaHQpO1xyXG5cdFx0dGhpcy5jYW52YXMubW91c2VPdXQodGhpcy5tb3VzZUV4aXRlZCk7XHJcblx0XHR0aGlzLmNhbnZhcy5tb3VzZU92ZXIodGhpcy5tb3VzZUVudGVyZWQpO1xyXG5cclxuXHRcdHRoaXMuc2t5TGF5ZXIgPSB0aGlzLmNyZWF0ZUdyYXBoaWNzKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAnd2ViZ2wnKTtcclxuXHJcblx0XHR0aGlzLmN1cnJlbnRVaSA9IG5ldyBNYWluTWVudShGb250cy50aXRsZSwgRm9udHMuYmlnKTtcclxuXHJcblx0XHQvLyBUaWNrXHJcblx0XHRzZXRJbnRlcnZhbCgoKSA9PiB7XHJcblx0XHRcdGlmICh0aGlzLndvcmxkID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuXHRcdFx0dGhpcy53b3JsZC50aWNrKHRoaXMpO1xyXG5cdFx0fSwgMTAwMCAvIHRoaXMubmV0TWFuYWdlci5wbGF5ZXJUaWNrUmF0ZSk7XHJcblxyXG5cdFx0dGhpcy5jb25uZWN0aW9uLmVtaXQoXHJcblx0XHRcdCdqb2luJyxcclxuXHRcdFx0J2U0MDIyZDQwM2RjYzZkMTlkNmE2OGJhM2FiZmQwYTYwJyxcclxuXHRcdFx0J3BsYXllcicgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwKSxcclxuXHRcdCk7XHJcblxyXG5cdFx0Ly8gZ28gZm9yIGEgc2NhbGUgb2YgPDY0IHRpbGVzIHdpZGUgc2NyZWVuXHJcblx0XHR0aGlzLndpbmRvd1Jlc2l6ZWQoKTtcclxuXHJcblx0XHQvLyByZW1vdmUgdGV4dHVyZSBpbnRlcnBvbGF0aW9uIChlbmFibGUgcG9pbnQgZmlsdGVyaW5nIGZvciBpbWFnZXMpXHJcblx0XHR0aGlzLm5vU21vb3RoKCk7XHJcblxyXG5cdFx0Ly8gdGhlIGhpZ2hlc3Qga2V5Y29kZSBpcyAyNTUsIHdoaWNoIGlzIFwiVG9nZ2xlIFRvdWNocGFkXCIsIGFjY29yZGluZyB0byBrZXljb2RlLmluZm9cclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgMjU1OyBpKyspIHtcclxuXHRcdFx0dGhpcy5rZXlzLnB1c2goZmFsc2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIHNldCB0aGUgZnJhbWVyYXRlIGdvYWwgdG8gYXMgaGlnaCBhcyBwb3NzaWJsZSAodGhpcyB3aWxsIGVuZCB1cCBjYXBwaW5nIHRvIHlvdXIgbW9uaXRvcidzIHJlZnJlc2ggcmF0ZSB3aXRoIHZzeW5jLilcclxuXHRcdHRoaXMuZnJhbWVSYXRlKEluZmluaXR5KTtcclxuXHRcdC8vIEF1ZGlvQW5wc3NldHMuYW1iaWVudC53aW50ZXIxLnBsYXlTb3VuZCgpO1xyXG5cdFx0dGhpcy5wYXJ0aWNsZU11bHRpcGxpZXIgPSAxO1xyXG5cdFx0dGhpcy5za3lUb2dnbGUgPSB0cnVlO1xyXG5cdFx0dGhpcy5za3lNb2QgPSAyO1xyXG5cdFx0dGhpcy5wYXJ0aWNsZXMgPSBbXTtcclxuXHRcdHRoaXMuY3Vyc29yKFwiYXNzZXRzL3RleHR1cmVzL3VpL2N1cnNvcjIucG5nXCIpO1xyXG5cdH1cclxuXHJcblx0ZHJhdygpIHtcclxuXHRcdGlmICh0aGlzLmZyYW1lQ291bnQgPT09IDIpIHtcclxuXHRcdFx0Ly9oYXMgdG8gYmUgZG9uZSBvbiB0aGUgc2Vjb25kIGZyYW1lIGZvciBzb21lIHJlYXNvbj9cclxuXHRcdFx0dGhpcy5za3lTaGFkZXIuc2V0VW5pZm9ybSgnc2NyZWVuRGltZW5zaW9ucycsIFtcclxuXHRcdFx0XHQodGhpcy53aWR0aCAvIHRoaXMudXBzY2FsZVNpemUpICogMixcclxuXHRcdFx0XHQodGhpcy5oZWlnaHQgLyB0aGlzLnVwc2NhbGVTaXplKSAqIDIsXHJcblx0XHRcdF0pO1xyXG5cdFx0XHR0aGlzLnNreVNoYWRlci5zZXRVbmlmb3JtKFxyXG5cdFx0XHRcdCdza3lJbWFnZScsXHJcblx0XHRcdFx0V29ybGRBc3NldHMuc2hhZGVyUmVzb3VyY2VzLnNreUltYWdlLmltYWdlLFxyXG5cdFx0XHQpO1xyXG5cdFx0XHRPYmplY3QudmFsdWVzKFBsYXllckFuaW1hdGlvbnMpLmZvckVhY2gocGxheWVyQW5pbWF0aW9uID0+IHtcclxuXHRcdFx0XHRwbGF5ZXJBbmltYXRpb24uZm9yRWFjaChhbmltYXRpb25GcmFtZSA9PiB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImxvYWRpbmcgYW5pbWF0aW9uIFwiK2FuaW1hdGlvbkZyYW1lWzBdLnBhdGgpXHJcblx0XHRcdFx0XHRhbmltYXRpb25GcmFtZVswXS5sb2FkUmVmbGVjdGlvbih0aGlzKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0Ly8gZG8gdGhlIHRpY2sgY2FsY3VsYXRpb25zXHJcblx0XHR0aGlzLmRvVGlja3MoKTtcclxuXHJcblx0XHQvLyB1cGRhdGUgbW91c2UgcG9zaXRpb25cclxuXHRcdHRoaXMudXBkYXRlTW91c2UoKTtcclxuXHRcdGlmKHRoaXMubW91c2VJc1ByZXNzZWQpIHtcclxuXHRcdHRoaXMud29ybGQuaW52ZW50b3J5LndvcmxkQ2xpY2sodGhpcy53b3JsZE1vdXNlWCwgdGhpcy53b3JsZE1vdXNlWSk7fVxyXG5cclxuXHRcdC8vIHVwZGF0ZSB0aGUgY2FtZXJhJ3MgaW50ZXJwb2xhdGlvblxyXG5cdFx0dGhpcy5tb3ZlQ2FtZXJhKCk7XHJcblxyXG5cdFx0Ly8gd2lwZSB0aGUgc2NyZWVuIHdpdGggYSBoYXBweSBsaXR0bGUgbGF5ZXIgb2YgbGlnaHQgYmx1ZVxyXG5cdFx0dGhpcy5za3lTaGFkZXIuc2V0VW5pZm9ybSgnb2Zmc2V0Q29vcmRzJywgW1xyXG5cdFx0XHR0aGlzLmludGVycG9sYXRlZENhbVgsXHJcblx0XHRcdHRoaXMuaW50ZXJwb2xhdGVkQ2FtWSxcclxuXHRcdF0pO1xyXG5cdFx0dGhpcy5za3lTaGFkZXIuc2V0VW5pZm9ybSgnbWlsbGlzJywgdGhpcy5taWxsaXMoKSk7XHJcblx0XHR0aGlzLnNreUxheWVyLnNoYWRlcih0aGlzLnNreVNoYWRlcik7XHJcblx0XHQvLyB0aGlzLmZpbGwoMjU1LCAwLCAwKTtcclxuXHRcdHRoaXMuc2t5TGF5ZXIucmVjdCgwLCAwLCB0aGlzLnNreUxheWVyLndpZHRoLCB0aGlzLnNreUxheWVyLmhlaWdodCk7XHJcblxyXG5cdFx0dGhpcy5pbWFnZSh0aGlzLnNreUxheWVyLCAwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcblxyXG5cdFx0aWYgKHRoaXMud29ybGQgIT09IHVuZGVmaW5lZCkgdGhpcy53b3JsZC5yZW5kZXIodGhpcywgdGhpcy51cHNjYWxlU2l6ZSk7XHJcblxyXG5cdFx0Ly8gcmVuZGVyIHRoZSBwbGF5ZXIsIGFsbCBpdGVtcywgZXRjLlxyXG5cdFx0Ly90aGlzLnJlbmRlckVudGl0aWVzKCk7XHJcblxyXG5cdFx0Ly9kZWxldGUgYW55IHBhcnRpY2xlcyB0aGF0IGhhdmUgZ290dGVuIHRvbyBvbGRcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wYXJ0aWNsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKHRoaXMucGFydGljbGVzW2ldLmFnZSA+IHRoaXMucGFydGljbGVzW2ldLmxpZmVzcGFuKSB7XHJcblx0XHRcdFx0dGhpcy5wYXJ0aWNsZXMuc3BsaWNlKGksIDEpO1xyXG5cdFx0XHRcdGktLTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vbm8gb3V0bGluZSBvbiBwYXJ0aWNsZXNcclxuXHRcdHRoaXMubm9TdHJva2UoKTtcclxuXHRcdC8vZHJhdyBhbGwgb2YgdGhlIHBhcnRpY2xlc1xyXG5cdFx0Zm9yIChsZXQgcGFydGljbGUgb2YgdGhpcy5wYXJ0aWNsZXMpIHtcclxuXHRcdFx0cGFydGljbGUucmVuZGVyKHRoaXMsIHRoaXMudXBzY2FsZVNpemUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc21vb3RoKCk7IC8vZW5hYmxlIGltYWdlIGxlcnBcclxuXHRcdHRoaXMuZHJhd2luZ0NvbnRleHQuZ2xvYmFsQWxwaGEgPSAwLjY7IC8vbWFrZSBpbWFnZSB0cmFuc2x1Y2VudFxyXG5cdFx0VWlBc3NldHMudmlnbmV0dGUucmVuZGVyKHRoaXMsIDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuXHRcdHRoaXMuZHJhd2luZ0NvbnRleHQuZ2xvYmFsQWxwaGEgPSAxLjA7XHJcblx0XHR0aGlzLm5vU21vb3RoKCk7XHJcblxyXG5cdFx0Ly8gZHJhdyB0aGUgaG90IGJhclxyXG5cdFx0aWYgKHRoaXMud29ybGQgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQuaW52ZW50b3J5LndpZHRoOyBpKyspIHtcclxuXHRcdFx0XHRjb25zdCBjdXJyZW50SXRlbSA9IHRoaXMud29ybGQuaW52ZW50b3J5Lml0ZW1zW2ldO1xyXG5cclxuXHRcdFx0XHRVaUFzc2V0cy51aV9zbG90LnJlbmRlcihcclxuXHRcdFx0XHRcdHRoaXMsXHJcblx0XHRcdFx0XHQyICogdGhpcy51cHNjYWxlU2l6ZSArIDE2ICogaSAqIHRoaXMudXBzY2FsZVNpemUsXHJcblx0XHRcdFx0XHQyICogdGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdFx0XHRcdDE2ICogdGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdFx0XHRcdDE2ICogdGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdFx0XHQpO1xyXG5cclxuXHRcdFx0XHRpZiAodGhpcy53b3JsZC5pbnZlbnRvcnkuc2VsZWN0ZWRTbG90ID09PSBpKSB7XHJcblx0XHRcdFx0XHRVaUFzc2V0cy51aV9zbG90X3NlbGVjdGVkLnJlbmRlcihcclxuXHRcdFx0XHRcdFx0dGhpcyxcclxuXHRcdFx0XHRcdFx0MiAqIHRoaXMudXBzY2FsZVNpemUgKyAxNiAqIGkgKiB0aGlzLnVwc2NhbGVTaXplLFxyXG5cdFx0XHRcdFx0XHQyICogdGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdFx0XHRcdFx0MTYgKiB0aGlzLnVwc2NhbGVTaXplLFxyXG5cdFx0XHRcdFx0XHQxNiAqIHRoaXMudXBzY2FsZVNpemUsXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRVaUFzc2V0cy51aV9zbG90LnJlbmRlcihcclxuXHRcdFx0XHRcdFx0dGhpcyxcclxuXHRcdFx0XHRcdFx0MiAqIHRoaXMudXBzY2FsZVNpemUgKyAxNiAqIGkgKiB0aGlzLnVwc2NhbGVTaXplLFxyXG5cdFx0XHRcdFx0XHQyICogdGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdFx0XHRcdFx0MTYgKiB0aGlzLnVwc2NhbGVTaXplLFxyXG5cdFx0XHRcdFx0XHQxNiAqIHRoaXMudXBzY2FsZVNpemUsXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGN1cnJlbnRJdGVtICE9PSB1bmRlZmluZWQgJiYgY3VycmVudEl0ZW0gIT09IG51bGwpIHtcclxuXHRcdFx0XHRcdHRoaXMuZmlsbCgwKTtcclxuXHRcdFx0XHRcdGlmICh0aGlzLnBpY2tlZFVwU2xvdCA9PT0gaSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmRyYXdpbmdDb250ZXh0Lmdsb2JhbEFscGhhID0gMC41O1xyXG5cdFx0XHRcdFx0XHR0aGlzLmZpbGwoMCwgMTI3KTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRJdGVtQXNzZXRzW2N1cnJlbnRJdGVtLml0ZW1dLnJlbmRlcihcclxuXHRcdFx0XHRcdFx0dGhpcyxcclxuXHRcdFx0XHRcdFx0NiAqIHRoaXMudXBzY2FsZVNpemUgKyAxNiAqIGkgKiB0aGlzLnVwc2NhbGVTaXplLFxyXG5cdFx0XHRcdFx0XHQ2ICogdGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdFx0XHRcdFx0OCAqIHRoaXMudXBzY2FsZVNpemUsXHJcblx0XHRcdFx0XHRcdDggKiB0aGlzLnVwc2NhbGVTaXplLFxyXG5cdFx0XHRcdFx0KTtcclxuXHJcblx0XHRcdFx0XHRGb250cy50b21fdGh1bWIuZHJhd1RleHQodGhpcywgY3VycmVudEl0ZW0ucXVhbnRpdHkudG9TdHJpbmcoKSwgKC00ICogY3VycmVudEl0ZW0ucXVhbnRpdHkudG9TdHJpbmcoKS5sZW5ndGggKyAxNiAqIChpKzEuMDYyNSkpICogdGhpcy51cHNjYWxlU2l6ZSwgMTEgKiB0aGlzLnVwc2NhbGVTaXplKVxyXG5cdFx0XHRcdFx0Ly8gdGhpcy50ZXh0KFxyXG5cdFx0XHRcdFx0Ly8gXHRjdXJyZW50SXRlbS5xdWFudGl0eSxcclxuXHRcdFx0XHRcdC8vIFx0MTYgKiB0aGlzLnVwc2NhbGVTaXplICsgMTYgKiBpICogdGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdFx0XHRcdC8vIFx0MTYgKiB0aGlzLnVwc2NhbGVTaXplLFxyXG5cdFx0XHRcdFx0Ly8gKTtcclxuXHJcblx0XHRcdFx0XHR0aGlzLmRyYXdpbmdDb250ZXh0Lmdsb2JhbEFscGhhID0gMS4wO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gZHJhdyB0aGUgY3Vyc29yXHJcblx0XHRcdHRoaXMuZHJhd0N1cnNvcigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLmN1cnJlbnRVaSAhPT0gdW5kZWZpbmVkKVxyXG5cdFx0XHR0aGlzLmN1cnJlbnRVaS5yZW5kZXIodGhpcywgdGhpcy51cHNjYWxlU2l6ZSk7XHJcblxyXG5cdFx0Rm9udHMudG9tX3RodW1iLmRyYXdUZXh0KHRoaXMsIFwiU25vd2VkIEluIHYxLjAuMFwiLCB0aGlzLnVwc2NhbGVTaXplLCB0aGlzLmhlaWdodC02KnRoaXMudXBzY2FsZVNpemUpO1xyXG5cclxuXHRcdC8vIGNvbnNvbGUudGltZUVuZChcImZyYW1lXCIpO1xyXG5cdH1cclxuXHJcblx0d2luZG93UmVzaXplZCgpIHtcclxuXHRcdHRoaXMucmVzaXplQ2FudmFzKHRoaXMud2luZG93V2lkdGgsIHRoaXMud2luZG93SGVpZ2h0KTtcclxuXHRcdHRoaXMuc2t5TGF5ZXIucmVzaXplQ2FudmFzKHRoaXMud2luZG93V2lkdGgsIHRoaXMud2luZG93SGVpZ2h0KTtcclxuXHJcblx0XHQvLyBnbyBmb3IgYSBzY2FsZSBvZiA8NDggdGlsZXMgc2NyZWVuXHJcblx0XHR0aGlzLnVwc2NhbGVTaXplID0gTWF0aC5taW4oXHJcblx0XHRcdE1hdGguY2VpbCh0aGlzLndpbmRvd1dpZHRoIC8gNDggLyB0aGlzLlRJTEVfV0lEVEgpLFxyXG5cdFx0XHRNYXRoLmNlaWwodGhpcy53aW5kb3dIZWlnaHQgLyA0OCAvIHRoaXMuVElMRV9IRUlHSFQpLFxyXG5cdFx0KTtcclxuXHJcblx0XHR0aGlzLnNreVNoYWRlci5zZXRVbmlmb3JtKCdzY3JlZW5EaW1lbnNpb25zJywgW1xyXG5cdFx0XHQodGhpcy53aW5kb3dXaWR0aCAvIHRoaXMudXBzY2FsZVNpemUpICogMixcclxuXHRcdFx0KHRoaXMud2luZG93SGVpZ2h0IC8gdGhpcy51cHNjYWxlU2l6ZSkgKiAyLFxyXG5cdFx0XSk7XHJcblxyXG5cdFx0aWYgKHRoaXMuY3VycmVudFVpICE9PSB1bmRlZmluZWQpIHRoaXMuY3VycmVudFVpLndpbmRvd1VwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0a2V5UHJlc3NlZChldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG5cdFx0dGhpcy5rZXlzW3RoaXMua2V5Q29kZV0gPSB0cnVlO1xyXG5cdFx0Zm9yIChsZXQgY29udHJvbCBvZiB0aGlzLmNvbnRyb2xzKSB7XHJcblx0XHRcdGlmIChjb250cm9sLmtleWJvYXJkICYmIGNvbnRyb2wua2V5Q29kZSA9PT0gZXZlbnQua2V5Q29kZSlcclxuXHRcdFx0XHQvL2V2ZW50LmtleUNvZGUgaXMgZGVwcmVjYXRlZCBidXQgaSBkb24ndCBjYXJlXHJcblx0XHRcdFx0Y29udHJvbC5vblByZXNzZWQoKTtcclxuXHRcdH1cclxuXHRcdGlmIChcclxuXHRcdFx0dGhpcy5jdXJyZW50VWkgIT09IHVuZGVmaW5lZCAmJlxyXG5cdFx0XHR0aGlzLmN1cnJlbnRVaS5pbnB1dEJveGVzICE9PSB1bmRlZmluZWRcclxuXHRcdCkge1xyXG5cdFx0XHRmb3IgKGxldCBpIG9mIHRoaXMuY3VycmVudFVpLmlucHV0Qm94ZXMpIHtcclxuXHRcdFx0XHRpZiAoaS5saXN0ZW5pbmcpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCd0ZXN0MycpO1xyXG5cdFx0XHRcdFx0aS5saXN0ZW5pbmcgPSBmYWxzZTtcclxuXHRcdFx0XHRcdHRoaXMuY29udHJvbHNbaS5pbmRleF0ua2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XHJcblx0XHRcdFx0XHR0aGlzLmNvbnRyb2xzW2kuaW5kZXhdLmtleWJvYXJkID0gZmFsc2U7XHJcblx0XHRcdFx0XHRpLnZhbHVlID0gZXZlbnQua2V5Q29kZTtcclxuXHRcdFx0XHRcdGkua2V5Ym9hcmQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0aS5pbWFnZSA9IFVpQXNzZXRzLmJ1dHRvbl91bnNlbGVjdGVkO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0a2V5UmVsZWFzZWQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuXHRcdHRoaXMua2V5c1t0aGlzLmtleUNvZGVdID0gZmFsc2U7XHJcblx0XHRmb3IgKGxldCBjb250cm9sIG9mIHRoaXMuY29udHJvbHMpIHtcclxuXHRcdFx0aWYgKGNvbnRyb2wua2V5Ym9hcmQgJiYgY29udHJvbC5rZXlDb2RlID09PSBldmVudC5rZXlDb2RlKVxyXG5cdFx0XHRcdC8vZXZlbnQua2V5Q29kZSBpcyBkZXByZWNhdGVkIGJ1dCBpIGRvbid0IGNhcmVcclxuXHRcdFx0XHRjb250cm9sLm9uUmVsZWFzZWQoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIHdoZW4gaXQncyBkcmFnZ2VkIHVwZGF0ZSB0aGUgc2xpZGVyc1xyXG5cdG1vdXNlRHJhZ2dlZCgpIHtcclxuXHRcdGlmIChcclxuXHRcdFx0dGhpcy5jdXJyZW50VWkgIT09IHVuZGVmaW5lZCAmJlxyXG5cdFx0XHR0aGlzLmN1cnJlbnRVaS5zbGlkZXJzICE9PSB1bmRlZmluZWRcclxuXHRcdCkge1xyXG5cdFx0XHRmb3IgKGNvbnN0IGkgb2YgdGhpcy5jdXJyZW50VWkuc2xpZGVycykge1xyXG5cdFx0XHRcdGkudXBkYXRlU2xpZGVyUG9zaXRpb24odGhpcy5tb3VzZVgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRtb3VzZU1vdmVkKCkge1xyXG5cdFx0aWYgKHRoaXMuY3VycmVudFVpICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0aWYgKHRoaXMuY3VycmVudFVpLmJ1dHRvbnMgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdGZvciAoY29uc3QgaSBvZiB0aGlzLmN1cnJlbnRVaS5idXR0b25zKSB7XHJcblx0XHRcdFx0XHRpLnVwZGF0ZU1vdXNlT3Zlcih0aGlzLm1vdXNlWCwgdGhpcy5tb3VzZVkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGhpcy5jdXJyZW50VWkuaW5wdXRCb3hlcyAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0Zm9yIChjb25zdCBpIG9mIHRoaXMuY3VycmVudFVpLmlucHV0Qm94ZXMpIHtcclxuXHRcdFx0XHRcdGkudXBkYXRlTW91c2VPdmVyKHRoaXMubW91c2VYLCB0aGlzLm1vdXNlWSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRtb3VzZVByZXNzZWQoZTogTW91c2VFdmVudCkge1xyXG5cdFx0Ly8gaW1hZ2UodWlTbG90SW1hZ2UsIDIqdXBzY2FsZVNpemUrMTYqaSp1cHNjYWxlU2l6ZSwgMip1cHNjYWxlU2l6ZSwgMTYqdXBzY2FsZVNpemUsIDE2KnVwc2NhbGVTaXplKTtcclxuXHRcdGlmICh0aGlzLmN1cnJlbnRVaSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMuY3VycmVudFVpLm1vdXNlUHJlc3NlZChlLmJ1dHRvbik7XHJcblx0XHRcdHJldHVybjsgLy8gYXNqZ3NhZGtqZmdJSVNVU1VFVUVcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy53b3JsZCA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblxyXG5cdFx0aWYgKFxyXG5cdFx0XHR0aGlzLm1vdXNlWCA+IDIgKiB0aGlzLnVwc2NhbGVTaXplICYmXHJcblx0XHRcdHRoaXMubW91c2VYIDxcclxuXHRcdFx0MiAqIHRoaXMudXBzY2FsZVNpemUgK1xyXG5cdFx0XHQxNiAqIHRoaXMudXBzY2FsZVNpemUgKiB0aGlzLndvcmxkLmludmVudG9yeS53aWR0aCAmJlxyXG5cdFx0XHR0aGlzLm1vdXNlWSA+IDIgKiB0aGlzLnVwc2NhbGVTaXplICYmXHJcblx0XHRcdHRoaXMubW91c2VZIDwgMTggKiB0aGlzLnVwc2NhbGVTaXplXHJcblx0XHQpIHtcclxuXHRcdFx0Y29uc3QgY2xpY2tlZFNsb3Q6IG51bWJlciA9IE1hdGguZmxvb3IoXHJcblx0XHRcdFx0KHRoaXMubW91c2VYIC0gMiAqIHRoaXMudXBzY2FsZVNpemUpIC8gMTYgLyB0aGlzLnVwc2NhbGVTaXplLFxyXG5cdFx0XHQpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMud29ybGQuaW52ZW50b3J5LnBpY2tlZFVwU2xvdCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMud29ybGQuaW52ZW50b3J5Lml0ZW1zW2NsaWNrZWRTbG90XSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHR0aGlzLndvcmxkLmludmVudG9yeS5waWNrZWRVcFNsb3QgPSBjbGlja2VkU2xvdDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gU3dhcCBjbGlja2VkIHNsb3Qgd2l0aCB0aGUgcGlja2VkIHNsb3RcclxuXHRcdFx0XHR0aGlzLmNvbm5lY3Rpb24uZW1pdChcclxuXHRcdFx0XHRcdCdpbnZlbnRvcnlTd2FwJyxcclxuXHRcdFx0XHRcdHRoaXMud29ybGQuaW52ZW50b3J5LnBpY2tlZFVwU2xvdCxcclxuXHRcdFx0XHRcdGNsaWNrZWRTbG90LFxyXG5cdFx0XHRcdCk7XHJcblxyXG5cdFx0XHRcdC8vIFNldCB0aGUgcGlja2VkIHVwIHNsb3QgdG8gbm90aGluZ1xyXG5cdFx0XHRcdHRoaXMud29ybGQuaW52ZW50b3J5LnBpY2tlZFVwU2xvdCA9IHVuZGVmaW5lZDtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy53b3JsZC5pbnZlbnRvcnkud29ybGRDbGlja0NoZWNrKHRoaXMud29ybGRNb3VzZVgsIHRoaXMud29ybGRNb3VzZVkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bW91c2VSZWxlYXNlZCgpIHtcclxuXHRcdC8qXHJcblx0XHRpZih0aGlzLmN1cnJlbnRVaSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMuY3VycmVudFVpLm1vdXNlUmVsZWFzZWQoKTtcclxuXHRcdH1cclxuXHRcdGNvbnN0IHJlbGVhc2VkU2xvdDogbnVtYmVyID0gTWF0aC5mbG9vcihcclxuXHRcdFx0KHRoaXMubW91c2VYIC0gMiAqIHRoaXMudXBzY2FsZVNpemUpIC8gMTYgLyB0aGlzLnVwc2NhbGVTaXplXHJcblx0XHQpO1xyXG5cclxuXHRcdGlmICh0aGlzLnBpY2tlZFVwU2xvdCAhPT0gLTEpIHtcclxuXHRcdFx0aWYgKFxyXG5cdFx0XHRcdHRoaXMubW91c2VYID4gMiAqIHRoaXMudXBzY2FsZVNpemUgJiZcclxuXHRcdFx0XHR0aGlzLm1vdXNlWCA8XHJcblx0XHRcdFx0XHQyICogdGhpcy51cHNjYWxlU2l6ZSArXHJcblx0XHRcdFx0XHRcdDE2ICogdGhpcy51cHNjYWxlU2l6ZSAqIHRoaXMuaG90QmFyLmxlbmd0aCAmJlxyXG5cdFx0XHRcdHRoaXMubW91c2VZID4gMiAqIHRoaXMudXBzY2FsZVNpemUgJiZcclxuXHRcdFx0XHR0aGlzLm1vdXNlWSA8IDE4ICogdGhpcy51cHNjYWxlU2l6ZVxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHQvLyBNYWtlIHN1cmUgdGhhdCB0aGUgc2xvdCB0aGF0IHRoZSBjdXJzb3Igd2FzIHJlbGVhc2VkIHdhcyBub3QgdGhlIHNsb3QgdGhhdCB3YXMgc2VsZWN0ZWRcclxuXHRcdFx0XHRpZiAocmVsZWFzZWRTbG90ID09PSB0aGlzLnBpY2tlZFVwU2xvdCkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHQvLyBTd2FwIHRoZSBwaWNrZWQgdXAgc2xvdCB3aXRoIHRoZSBzbG90IHRoZSBtb3VzZSB3YXMgcmVsZWFzZWQgb25cclxuXHRcdFx0XHRbdGhpcy5ob3RCYXJbdGhpcy5waWNrZWRVcFNsb3RdLCB0aGlzLmhvdEJhcltyZWxlYXNlZFNsb3RdXSA9IFtcclxuXHRcdFx0XHRcdHRoaXMuaG90QmFyW3JlbGVhc2VkU2xvdF0sXHJcblx0XHRcdFx0XHR0aGlzLmhvdEJhclt0aGlzLnBpY2tlZFVwU2xvdF0sXHJcblx0XHRcdFx0XTtcclxuXHJcblx0XHRcdFx0dGhpcy5waWNrZWRVcFNsb3QgPSAtMTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmhvdEJhclt0aGlzLnBpY2tlZFVwU2xvdF0gPSB1bmRlZmluZWQ7XHJcblx0XHRcdFx0dGhpcy5waWNrZWRVcFNsb3QgPSAtMTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdCAqL1xyXG5cdH1cclxuXHJcblx0bW91c2VXaGVlbChldmVudDogYW55KSB7XHJcblx0XHQvL21vdXNlRXZlbnQgYXBwYXJlbnRseSBkb2Vzbid0IGhhdmUgYSBkZWx0YSBwcm9wZXJ0eSBzb29vb28gaWRrIHdoYXQgdG8gZG8gc29ycnkgZm9yIHRoZSBhbnkgdHlwZVxyXG5cdFx0aWYgKFxyXG5cdFx0XHR0aGlzLmN1cnJlbnRVaSAhPT0gdW5kZWZpbmVkICYmXHJcblx0XHRcdHRoaXMuY3VycmVudFVpLnNjcm9sbCAhPT0gdW5kZWZpbmVkXHJcblx0XHQpIHtcclxuXHRcdFx0dGhpcy5jdXJyZW50VWkuc2Nyb2xsICs9IGV2ZW50LmRlbHRhIC8gMTA7XHJcblx0XHRcdHRoaXMuY3VycmVudFVpLnNjcm9sbCA9IHRoaXMuY29uc3RyYWluKFxyXG5cdFx0XHRcdHRoaXMuY3VycmVudFVpLnNjcm9sbCxcclxuXHRcdFx0XHR0aGlzLmN1cnJlbnRVaS5taW5TY3JvbGwsXHJcblx0XHRcdFx0dGhpcy5jdXJyZW50VWkubWF4U2Nyb2xsLFxyXG5cdFx0XHQpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcclxuXHRcdFx0XHRgU2Nyb2xsOiAke3RoaXMuY3VycmVudFVpLnNjcm9sbH0sIE1pbjogJHt0aGlzLmN1cnJlbnRVaS5taW5TY3JvbGx9LCBNYXg6ICR7dGhpcy5jdXJyZW50VWkubWF4U2Nyb2xsfWAsXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy53b3JsZC5pbnZlbnRvcnkuc2VsZWN0ZWRTbG90ICs9IE1hdGguZmxvb3IoZXZlbnQuZGVsdGEvMTAwKVxyXG5cdFx0XHR0aGlzLndvcmxkLmludmVudG9yeS5zZWxlY3RlZFNsb3QgPSB0aGlzLndvcmxkLmludmVudG9yeS5zZWxlY3RlZFNsb3QldGhpcy53b3JsZC5pbnZlbnRvcnkud2lkdGg7XHJcblx0XHRcdGlmKHRoaXMud29ybGQuaW52ZW50b3J5LnNlbGVjdGVkU2xvdDwwKSB0aGlzLndvcmxkLmludmVudG9yeS5zZWxlY3RlZFNsb3QgKz0gdGhpcy53b3JsZC5pbnZlbnRvcnkud2lkdGhcclxuXHRcdFx0Y29uc29sZS5sb2codGhpcy53b3JsZC5pbnZlbnRvcnkuc2VsZWN0ZWRTbG90KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bW92ZUNhbWVyYSgpIHtcclxuXHRcdHRoaXMuaW50ZXJwb2xhdGVkQ2FtWCA9XHJcblx0XHRcdHRoaXMucENhbVggK1xyXG5cdFx0XHQodGhpcy5jYW1YIC0gdGhpcy5wQ2FtWCkgKiB0aGlzLmFtb3VudFNpbmNlTGFzdFRpY2sgK1xyXG5cdFx0XHQodGhpcy5ub2lzZSh0aGlzLm1pbGxpcygpIC8gMjAwKSAtIDAuNSkgKiB0aGlzLnNjcmVlbnNoYWtlQW1vdW50O1xyXG5cdFx0dGhpcy5pbnRlcnBvbGF0ZWRDYW1ZID1cclxuXHRcdFx0dGhpcy5wQ2FtWSArXHJcblx0XHRcdCh0aGlzLmNhbVkgLSB0aGlzLnBDYW1ZKSAqIHRoaXMuYW1vdW50U2luY2VMYXN0VGljayArXHJcblx0XHRcdCh0aGlzLm5vaXNlKDAsIHRoaXMubWlsbGlzKCkgLyAyMDApIC0gMC41KSAqIHRoaXMuc2NyZWVuc2hha2VBbW91bnQ7XHJcblx0fVxyXG5cclxuXHRkb1RpY2tzKCkge1xyXG5cdFx0Ly8gaW5jcmVhc2UgdGhlIHRpbWUgc2luY2UgYSB0aWNrIGhhcyBoYXBwZW5lZCBieSBkZWx0YVRpbWUsIHdoaWNoIGlzIGEgYnVpbHQtaW4gcDUuanMgdmFsdWVcclxuXHRcdHRoaXMubXNTaW5jZVRpY2sgKz0gdGhpcy5kZWx0YVRpbWU7XHJcblxyXG5cdFx0Ly8gZGVmaW5lIGEgdGVtcG9yYXJ5IHZhcmlhYmxlIGNhbGxlZCB0aWNrc1RoaXNGcmFtZSAtIHRoaXMgaXMgdXNlZCB0byBrZWVwIHRyYWNrIG9mIGhvdyBtYW55IHRpY2tzIGhhdmUgYmVlbiBjYWxjdWxhdGVkIHdpdGhpbiB0aGUgZHVyYXRpb24gb2YgdGhlIGN1cnJlbnQgZnJhbWUuICBBcyBsb25nIGFzIHRoaXMgdmFsdWUgaXMgbGVzcyB0aGFuIHRoZSBmb3JnaXZlbmVzc0NvdW50IHZhcmlhYmxlLCBpdCBjb250aW51ZXMgdG8gY2FsY3VsYXRlIHRpY2tzIGFzIG5lY2Vzc2FyeS5cclxuXHRcdGxldCB0aWNrc1RoaXNGcmFtZSA9IDA7XHJcblx0XHR3aGlsZSAoXHJcblx0XHRcdHRoaXMubXNTaW5jZVRpY2sgPiB0aGlzLm1zUGVyVGljayAmJlxyXG5cdFx0XHR0aWNrc1RoaXNGcmFtZSAhPT0gdGhpcy5mb3JnaXZlbmVzc0NvdW50XHJcblx0XHQpIHtcclxuXHRcdFx0Ly8gY29uc29sZS50aW1lKFwidGlja1wiKTtcclxuXHRcdFx0aWYgKHRoaXMud29ybGQgIT09IHVuZGVmaW5lZCkgdGhpcy5kb1RpY2soKTtcclxuXHRcdFx0Ly8gY29uc29sZS50aW1lRW5kKFwidGlja1wiKTtcclxuXHRcdFx0dGhpcy5tc1NpbmNlVGljayAtPSB0aGlzLm1zUGVyVGljaztcclxuXHRcdFx0dGlja3NUaGlzRnJhbWUrKztcclxuXHRcdH1cclxuXHRcdGlmICh0aWNrc1RoaXNGcmFtZSA9PT0gdGhpcy5mb3JnaXZlbmVzc0NvdW50KSB7XHJcblx0XHRcdHRoaXMubXNTaW5jZVRpY2sgPSAwO1xyXG5cdFx0XHRjb25zb2xlLndhcm4oXHJcblx0XHRcdFx0XCJsYWcgc3Bpa2UgZGV0ZWN0ZWQsIHRpY2sgY2FsY3VsYXRpb25zIGNvdWxkbid0IGtlZXAgdXBcIixcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHRcdHRoaXMuYW1vdW50U2luY2VMYXN0VGljayA9IHRoaXMubXNTaW5jZVRpY2sgLyB0aGlzLm1zUGVyVGljaztcclxuXHR9XHJcblxyXG5cdGRvVGljaygpIHtcclxuXHRcdGlmKHRoaXMud29ybGQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLndvcmxkLnRpbGVFbnRpdGllcyAhPT0gdW5kZWZpbmVkKSB7Ly90aWxlIGVudGl0eSBwYXJ0aWNsZXNcclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCAxICogdGhpcy5wYXJ0aWNsZU11bHRpcGxpZXI7IGkrKykge1xyXG5cdFx0XHRcdGxldCBrID0gT2JqZWN0LmtleXModGhpcy53b3JsZC50aWxlRW50aXRpZXMpO1xyXG5cdFx0XHRcdGxldCByID0gdGhpcy53b3JsZC50aWxlRW50aXRpZXNba1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqay5sZW5ndGgpXV07XHJcblx0XHRcdFx0aWYoci50eXBlXz09PVRpbGVFbnRpdGllcy5UcmVlKSB7XHJcblx0XHRcdFx0XHRsZXQgdCA9IHIuY292ZXJlZFRpbGVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpyLmNvdmVyZWRUaWxlcy5sZW5ndGgpXTtcclxuXHRcdFx0XHRcdHRoaXMucGFydGljbGVzLnB1c2gobmV3IENvbG9yUGFydGljbGUoXCIjMzQ4OTY1XCIsIE1hdGgucmFuZG9tKCkqMC4xKzAuMSwgMjAsIHQldGhpcy53b3JsZC53aWR0aCtNYXRoLnJhbmRvbSgpLCBNYXRoLmZsb29yKHQvdGhpcy53b3JsZC53aWR0aCkrTWF0aC5yYW5kb20oKSwgMC4xKihNYXRoLnJhbmRvbSgpLTAuNSksIDAuMDYqKE1hdGgucmFuZG9tKCktMC43KSwgZmFsc2UpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGZvciAobGV0IHBhcnRpY2xlIG9mIHRoaXMucGFydGljbGVzKSB7XHJcblx0XHRcdHBhcnRpY2xlLnRpY2soKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLndvcmxkLnBsYXllciA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblx0XHRpZiAodGhpcy53b3JsZC5wbGF5ZXIgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG5cdFx0dGhpcy53b3JsZC5wbGF5ZXIua2V5Ym9hcmRJbnB1dCgpO1xyXG5cdFx0dGhpcy53b3JsZC5wbGF5ZXIuYXBwbHlHcmF2aXR5QW5kRHJhZygpO1xyXG5cdFx0dGhpcy53b3JsZC5wbGF5ZXIuYXBwbHlWZWxvY2l0eUFuZENvbGxpZGUoKTtcclxuXHJcblx0XHR0aGlzLnBDYW1YID0gdGhpcy5jYW1YO1xyXG5cdFx0dGhpcy5wQ2FtWSA9IHRoaXMuY2FtWTtcclxuXHRcdHRoaXMuZGVzaXJlZENhbVggPVxyXG5cdFx0XHR0aGlzLndvcmxkLnBsYXllci54ICtcclxuXHRcdFx0dGhpcy53b3JsZC5wbGF5ZXIud2lkdGggLyAyIC1cclxuXHRcdFx0dGhpcy53aWR0aCAvIDIgLyB0aGlzLlRJTEVfV0lEVEggLyB0aGlzLnVwc2NhbGVTaXplICtcclxuXHRcdFx0dGhpcy53b3JsZC5wbGF5ZXIueFZlbCAqIDQwO1xyXG5cdFx0dGhpcy5kZXNpcmVkQ2FtWSA9XHJcblx0XHRcdHRoaXMud29ybGQucGxheWVyLnkgK1xyXG5cdFx0XHR0aGlzLndvcmxkLnBsYXllci5oZWlnaHQgLyAyIC1cclxuXHRcdFx0dGhpcy5oZWlnaHQgLyAyIC8gdGhpcy5USUxFX0hFSUdIVCAvIHRoaXMudXBzY2FsZVNpemUgK1xyXG5cdFx0XHR0aGlzLndvcmxkLnBsYXllci55VmVsICogMjA7XHJcblx0XHR0aGlzLmNhbVggPSAodGhpcy5kZXNpcmVkQ2FtWCArIHRoaXMuY2FtWCAqIDI0KSAvIDI1O1xyXG5cdFx0dGhpcy5jYW1ZID0gKHRoaXMuZGVzaXJlZENhbVkgKyB0aGlzLmNhbVkgKiAyNCkgLyAyNTtcclxuXHJcblx0XHR0aGlzLnNjcmVlbnNoYWtlQW1vdW50ICo9IDAuODtcclxuXHJcblx0XHRpZiAodGhpcy5jYW1YIDwgMCkge1xyXG5cdFx0XHR0aGlzLmNhbVggPSAwO1xyXG5cdFx0fSBlbHNlIGlmIChcclxuXHRcdFx0dGhpcy5jYW1YID5cclxuXHRcdFx0dGhpcy53b3JsZFdpZHRoIC0gdGhpcy53aWR0aCAvIHRoaXMudXBzY2FsZVNpemUgLyB0aGlzLlRJTEVfV0lEVEhcclxuXHRcdCkge1xyXG5cdFx0XHR0aGlzLmNhbVggPVxyXG5cdFx0XHRcdHRoaXMud29ybGRXaWR0aCAtXHJcblx0XHRcdFx0dGhpcy53aWR0aCAvIHRoaXMudXBzY2FsZVNpemUgLyB0aGlzLlRJTEVfV0lEVEg7XHJcblx0XHR9XHJcblx0XHRpZiAoXHJcblx0XHRcdHRoaXMuY2FtWSA+XHJcblx0XHRcdHRoaXMud29ybGRIZWlnaHQgLSB0aGlzLmhlaWdodCAvIHRoaXMudXBzY2FsZVNpemUgLyB0aGlzLlRJTEVfSEVJR0hUXHJcblx0XHQpIHtcclxuXHRcdFx0dGhpcy5jYW1ZID1cclxuXHRcdFx0XHR0aGlzLndvcmxkSGVpZ2h0IC1cclxuXHRcdFx0XHR0aGlzLmhlaWdodCAvIHRoaXMudXBzY2FsZVNpemUgLyB0aGlzLlRJTEVfSEVJR0hUO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLml0ZW1zKSB7XHJcblx0XHQvLyAgICAgaXRlbS5nb1Rvd2FyZHNQbGF5ZXIoKTtcclxuXHRcdC8vICAgICBpdGVtLmNvbWJpbmVXaXRoTmVhckl0ZW1zKCk7XHJcblx0XHQvLyAgICAgaXRlbS5hcHBseUdyYXZpdHlBbmREcmFnKCk7XHJcblx0XHQvLyAgICAgaXRlbS5hcHBseVZlbG9jaXR5QW5kQ29sbGlkZSgpO1xyXG5cdFx0Ly8gfVxyXG5cdFx0Ly9cclxuXHRcdC8vIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0Ly8gICAgIGlmICh0aGlzLml0ZW1zW2ldLmRlbGV0ZWQgPT09IHRydWUpIHtcclxuXHRcdC8vICAgICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoaSwgMSk7XHJcblx0XHQvLyAgICAgICAgIGktLTtcclxuXHRcdC8vICAgICB9XHJcblx0XHQvLyB9XHJcblx0fVxyXG5cclxuXHR1aUZyYW1lUmVjdCh4OiBudW1iZXIsIHk6IG51bWJlciwgdzogbnVtYmVyLCBoOiBudW1iZXIpIHtcclxuXHRcdC8vIHNldCB0aGUgY29vcmRzIGFuZCBkaW1lbnNpb25zIHRvIHJvdW5kIHRvIHRoZSBuZWFyZXN0IHVuLXVwc2NhbGVkIHBpeGVsXHJcblx0XHR4ID0gTWF0aC5yb3VuZCh4IC8gdGhpcy51cHNjYWxlU2l6ZSkgKiB0aGlzLnVwc2NhbGVTaXplO1xyXG5cdFx0eSA9IE1hdGgucm91bmQoeSAvIHRoaXMudXBzY2FsZVNpemUpICogdGhpcy51cHNjYWxlU2l6ZTtcclxuXHRcdHcgPSBNYXRoLnJvdW5kKHcgLyB0aGlzLnVwc2NhbGVTaXplKSAqIHRoaXMudXBzY2FsZVNpemU7XHJcblx0XHRoID0gTWF0aC5yb3VuZChoIC8gdGhpcy51cHNjYWxlU2l6ZSkgKiB0aGlzLnVwc2NhbGVTaXplO1xyXG5cclxuXHRcdC8vIGNvcm5lcnNcclxuXHRcdFVpQXNzZXRzLnVpX2ZyYW1lLnJlbmRlclBhcnRpYWwoXHJcblx0XHRcdHRoaXMsXHJcblx0XHRcdHgsXHJcblx0XHRcdHksXHJcblx0XHRcdDcgKiB0aGlzLnVwc2NhbGVTaXplLFxyXG5cdFx0XHQ3ICogdGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdFx0MCxcclxuXHRcdFx0MCxcclxuXHRcdFx0NyxcclxuXHRcdFx0NyxcclxuXHRcdCk7XHJcblx0XHRVaUFzc2V0cy51aV9mcmFtZS5yZW5kZXJQYXJ0aWFsKFxyXG5cdFx0XHR0aGlzLFxyXG5cdFx0XHR4ICsgdyAtIDcgKiB0aGlzLnVwc2NhbGVTaXplLFxyXG5cdFx0XHR5LFxyXG5cdFx0XHQ3ICogdGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdFx0NyAqIHRoaXMudXBzY2FsZVNpemUsXHJcblx0XHRcdDgsXHJcblx0XHRcdDAsXHJcblx0XHRcdDcsXHJcblx0XHRcdDcsXHJcblx0XHQpO1xyXG5cdFx0VWlBc3NldHMudWlfZnJhbWUucmVuZGVyUGFydGlhbChcclxuXHRcdFx0dGhpcyxcclxuXHRcdFx0eCxcclxuXHRcdFx0eSArIGggLSA3ICogdGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdFx0NyAqIHRoaXMudXBzY2FsZVNpemUsXHJcblx0XHRcdDcgKiB0aGlzLnVwc2NhbGVTaXplLFxyXG5cdFx0XHQwLFxyXG5cdFx0XHQ4LFxyXG5cdFx0XHQ3LFxyXG5cdFx0XHQ3LFxyXG5cdFx0KTtcclxuXHRcdFVpQXNzZXRzLnVpX2ZyYW1lLnJlbmRlclBhcnRpYWwoXHJcblx0XHRcdHRoaXMsXHJcblx0XHRcdHggKyB3IC0gNyAqIHRoaXMudXBzY2FsZVNpemUsXHJcblx0XHRcdHkgKyBoIC0gNyAqIHRoaXMudXBzY2FsZVNpemUsXHJcblx0XHRcdDcgKiB0aGlzLnVwc2NhbGVTaXplLFxyXG5cdFx0XHQ3ICogdGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdFx0OCxcclxuXHRcdFx0OCxcclxuXHRcdFx0NyxcclxuXHRcdFx0NyxcclxuXHRcdCk7XHJcblxyXG5cdFx0Ly8gdG9wIGFuZCBib3R0b21cclxuXHRcdFVpQXNzZXRzLnVpX2ZyYW1lLnJlbmRlclBhcnRpYWwoXHJcblx0XHRcdHRoaXMsXHJcblx0XHRcdHggKyA3ICogdGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdFx0eSxcclxuXHRcdFx0dyAtIDE0ICogdGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdFx0NyAqIHRoaXMudXBzY2FsZVNpemUsXHJcblx0XHRcdDcsXHJcblx0XHRcdDAsXHJcblx0XHRcdDEsXHJcblx0XHRcdDcsXHJcblx0XHQpO1xyXG5cdFx0VWlBc3NldHMudWlfZnJhbWUucmVuZGVyUGFydGlhbChcclxuXHRcdFx0dGhpcyxcclxuXHRcdFx0eCArIDcgKiB0aGlzLnVwc2NhbGVTaXplLFxyXG5cdFx0XHR5ICsgaCAtIDcgKiB0aGlzLnVwc2NhbGVTaXplLFxyXG5cdFx0XHR3IC0gMTQgKiB0aGlzLnVwc2NhbGVTaXplLFxyXG5cdFx0XHQ3ICogdGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdFx0NyxcclxuXHRcdFx0OCxcclxuXHRcdFx0MSxcclxuXHRcdFx0NyxcclxuXHRcdCk7XHJcblxyXG5cdFx0Ly8gbGVmdCBhbmQgcmlnaHRcclxuXHRcdFVpQXNzZXRzLnVpX2ZyYW1lLnJlbmRlclBhcnRpYWwoXHJcblx0XHRcdHRoaXMsXHJcblx0XHRcdHgsXHJcblx0XHRcdHkgKyA3ICogdGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdFx0NyAqIHRoaXMudXBzY2FsZVNpemUsXHJcblx0XHRcdGggLSAxNCAqIHRoaXMudXBzY2FsZVNpemUsXHJcblx0XHRcdDAsXHJcblx0XHRcdDcsXHJcblx0XHRcdDcsXHJcblx0XHRcdDEsXHJcblx0XHQpO1xyXG5cdFx0VWlBc3NldHMudWlfZnJhbWUucmVuZGVyUGFydGlhbChcclxuXHRcdFx0dGhpcyxcclxuXHRcdFx0eCArIHcgLSA3ICogdGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdFx0eSArIDcgKiB0aGlzLnVwc2NhbGVTaXplLFxyXG5cdFx0XHQ3ICogdGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdFx0aCAtIDE0ICogdGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdFx0OCxcclxuXHRcdFx0NyxcclxuXHRcdFx0NyxcclxuXHRcdFx0MSxcclxuXHRcdCk7XHJcblxyXG5cdFx0Ly8gY2VudGVyXHJcblx0XHRVaUFzc2V0cy51aV9mcmFtZS5yZW5kZXJQYXJ0aWFsKFxyXG5cdFx0XHR0aGlzLFxyXG5cdFx0XHR4ICsgNyAqIHRoaXMudXBzY2FsZVNpemUsXHJcblx0XHRcdHkgKyA3ICogdGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdFx0dyAtIDE0ICogdGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdFx0aCAtIDE0ICogdGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdFx0NyxcclxuXHRcdFx0NyxcclxuXHRcdFx0MSxcclxuXHRcdFx0MSxcclxuXHRcdCk7XHJcblx0fVxyXG5cclxuXHQvKlxyXG4gICAvJCQkJCQkJCAgLyQkICAgICAgICAgICAgICAgICAgICAgICAgICAgLyQkXHJcbiAgfCAkJF9fICAkJHwgJCQgICAgICAgICAgICAgICAgICAgICAgICAgIHxfXy9cclxuICB8ICQkICBcXCAkJHwgJCQkJCQkJCAgLyQkICAgLyQkICAvJCQkJCQkJCAvJCQgIC8kJCQkJCQkICAvJCQkJCQkJCAvJCRcclxuICB8ICQkJCQkJCQvfCAkJF9fICAkJHwgJCQgIHwgJCQgLyQkX19fX18vfCAkJCAvJCRfX19fXy8gLyQkX19fX18vfF9fL1xyXG4gIHwgJCRfX19fLyB8ICQkICBcXCAkJHwgJCQgIHwgJCR8ICAkJCQkJCQgfCAkJHwgJCQgICAgICB8ICAkJCQkJCRcclxuICB8ICQkICAgICAgfCAkJCAgfCAkJHwgJCQgIHwgJCQgXFxfX19fICAkJHwgJCR8ICQkICAgICAgIFxcX19fXyAgJCQgLyQkXHJcbiAgfCAkJCAgICAgIHwgJCQgIHwgJCR8ICAkJCQkJCQkIC8kJCQkJCQkL3wgJCR8ICAkJCQkJCQkIC8kJCQkJCQkL3xfXy9cclxuICB8X18vICAgICAgfF9fLyAgfF9fLyBcXF9fX18gICQkfF9fX19fX18vIHxfXy8gXFxfX19fX19fL3xfX19fX19fL1xyXG5cdFx0XHRcdFx0ICAgLyQkICB8ICQkXHJcblx0XHRcdFx0XHQgIHwgICQkJCQkJC9cclxuXHRcdFx0XHRcdCAgIFxcX19fX19fL1xyXG4gICovXHJcblxyXG5cdC8vIHRoaXMgY2xhc3MgaG9sZHMgYW4gYXhpcy1hbGlnbmVkIHJlY3RhbmdsZSBhZmZlY3RlZCBieSBncmF2aXR5LCBkcmFnLCBhbmQgY29sbGlzaW9ucyB3aXRoIHRpbGVzLlxyXG5cclxuXHRyZWN0VnNSYXkoXHJcblx0XHRyZWN0WD86IGFueSxcclxuXHRcdHJlY3RZPzogYW55LFxyXG5cdFx0cmVjdFc/OiBhbnksXHJcblx0XHRyZWN0SD86IGFueSxcclxuXHRcdHJheVg/OiBhbnksXHJcblx0XHRyYXlZPzogYW55LFxyXG5cdFx0cmF5Vz86IGFueSxcclxuXHRcdHJheUg/OiBhbnksXHJcblx0KSB7XHJcblx0XHQvLyB0aGlzIHJheSBpcyBhY3R1YWxseSBhIGxpbmUgc2VnbWVudCBtYXRoZW1hdGljYWxseSwgYnV0IGl0J3MgY29tbW9uIHRvIHNlZSBwZW9wbGUgcmVmZXIgdG8gc2ltaWxhciBjaGVja3MgYXMgcmF5LWNhc3RzLCBzbyBmb3IgdGhlIGR1cmF0aW9uIG9mIHRoZSBkZWZpbml0aW9uIG9mIHRoaXMgZnVuY3Rpb24sIHJheSBjYW4gYmUgYXNzdW1lZCB0byBtZWFuIHRoZSBzYW1lIGFzIGxpbmUgc2VnbWVudC5cclxuXHJcblx0XHQvLyBpZiB0aGUgcmF5IGRvZXNuJ3QgaGF2ZSBhIGxlbmd0aCwgdGhlbiBpdCBjYW4ndCBoYXZlIGVudGVyZWQgdGhlIHJlY3RhbmdsZS4gIFRoaXMgYXNzdW1lcyB0aGF0IHRoZSBvYmplY3RzIGRvbid0IHN0YXJ0IGluIGNvbGxpc2lvbiwgb3RoZXJ3aXNlIHRoZXknbGwgYmVoYXZlIHN0cmFuZ2VseVxyXG5cdFx0aWYgKHJheVcgPT09IDAgJiYgcmF5SCA9PT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gY2FsY3VsYXRlIGhvdyBmYXIgYWxvbmcgdGhlIHJheSBlYWNoIHNpZGUgb2YgdGhlIHJlY3RhbmdsZSBpbnRlcnNlY3RzIHdpdGggaXQgKGVhY2ggc2lkZSBpcyBleHRlbmRlZCBvdXQgaW5maW5pdGVseSBpbiBib3RoIGRpcmVjdGlvbnMpXHJcblx0XHRjb25zdCB0b3BJbnRlcnNlY3Rpb24gPSAocmVjdFkgLSByYXlZKSAvIHJheUg7XHJcblx0XHRjb25zdCBib3R0b21JbnRlcnNlY3Rpb24gPSAocmVjdFkgKyByZWN0SCAtIHJheVkpIC8gcmF5SDtcclxuXHRcdGNvbnN0IGxlZnRJbnRlcnNlY3Rpb24gPSAocmVjdFggLSByYXlYKSAvIHJheVc7XHJcblx0XHRjb25zdCByaWdodEludGVyc2VjdGlvbiA9IChyZWN0WCArIHJlY3RXIC0gcmF5WCkgLyByYXlXO1xyXG5cclxuXHRcdGlmIChcclxuXHRcdFx0aXNOYU4odG9wSW50ZXJzZWN0aW9uKSB8fFxyXG5cdFx0XHRpc05hTihib3R0b21JbnRlcnNlY3Rpb24pIHx8XHJcblx0XHRcdGlzTmFOKGxlZnRJbnRlcnNlY3Rpb24pIHx8XHJcblx0XHRcdGlzTmFOKHJpZ2h0SW50ZXJzZWN0aW9uKVxyXG5cdFx0KSB7XHJcblx0XHRcdC8vIHlvdSBoYXZlIHRvIHVzZSB0aGUgSlMgZnVuY3Rpb24gaXNOYU4oKSB0byBjaGVjayBpZiBhIHZhbHVlIGlzIE5hTiBiZWNhdXNlIGJvdGggTmFOPT1OYU4gYW5kIE5hTj09PU5hTiBhcmUgZmFsc2UuXHJcblx0XHRcdC8vIGlmIGFueSBvZiB0aGVzZSB2YWx1ZXMgYXJlIE5hTiwgbm8gY29sbGlzaW9uIGhhcyBvY2N1cnJlZFxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gY2FsY3VsYXRlIHRoZSBuZWFyZXN0IGFuZCBmYXJ0aGVzdCBpbnRlcnNlY3Rpb25zIGZvciBib3RoIHggYW5kIHlcclxuXHRcdGNvbnN0IG5lYXJYID0gdGhpcy5taW4obGVmdEludGVyc2VjdGlvbiwgcmlnaHRJbnRlcnNlY3Rpb24pO1xyXG5cdFx0Y29uc3QgZmFyWCA9IHRoaXMubWF4KGxlZnRJbnRlcnNlY3Rpb24sIHJpZ2h0SW50ZXJzZWN0aW9uKTtcclxuXHRcdGNvbnN0IG5lYXJZID0gdGhpcy5taW4odG9wSW50ZXJzZWN0aW9uLCBib3R0b21JbnRlcnNlY3Rpb24pO1xyXG5cdFx0Y29uc3QgZmFyWSA9IHRoaXMubWF4KHRvcEludGVyc2VjdGlvbiwgYm90dG9tSW50ZXJzZWN0aW9uKTtcclxuXHJcblx0XHRpZiAobmVhclggPiBmYXJZIHx8IG5lYXJZID4gZmFyWCkge1xyXG5cdFx0XHQvLyB0aGlzIG11c3QgbWVhbiB0aGF0IHRoZSBsaW5lIHRoYXQgbWFrZXMgdXAgdGhlIGxpbmUgc2VnbWVudCBkb2Vzbid0IHBhc3MgdGhyb3VnaCB0aGUgcmF5XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZmFyWCA8IDAgfHwgZmFyWSA8IDApIHtcclxuXHRcdFx0Ly8gdGhlIGludGVyc2VjdGlvbiBpcyBoYXBwZW5pbmcgYmVmb3JlIHRoZSByYXkgc3RhcnRzLCBzbyB0aGUgcmF5IGlzIHBvaW50aW5nIGF3YXkgZnJvbSB0aGUgdHJpYW5nbGVcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGNhbGN1bGF0ZSB3aGVyZSB0aGUgcG90ZW50aWFsIGNvbGxpc2lvbiBjb3VsZCBiZVxyXG5cdFx0Y29uc3QgbmVhckNvbGxpc2lvblBvaW50ID0gdGhpcy5tYXgobmVhclgsIG5lYXJZKTtcclxuXHJcblx0XHRpZiAobmVhclggPiAxIHx8IG5lYXJZID4gMSkge1xyXG5cdFx0XHQvLyB0aGUgaW50ZXJzZWN0aW9uIGhhcHBlbnMgYWZ0ZXIgdGhlIHJheShsaW5lIHNlZ21lbnQpIGVuZHNcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChuZWFyWCA9PT0gbmVhckNvbGxpc2lvblBvaW50KSB7XHJcblx0XHRcdC8vIGl0IG11c3QgaGF2ZSBjb2xsaWRlZCBvbiBlaXRoZXIgdGhlIGxlZnQgb3IgdGhlIHJpZ2h0ISBub3cgd2hpY2g/XHJcblx0XHRcdGlmIChsZWZ0SW50ZXJzZWN0aW9uID09PSBuZWFyWCkge1xyXG5cdFx0XHRcdC8vIEl0IG11c3QgaGF2ZSBjb2xsaWRlZCBvbiB0aGUgbGVmdCEgIFJldHVybiB0aGUgY29sbGlzaW9uIG5vcm1hbCBbLTEsIDBdXHJcblx0XHRcdFx0cmV0dXJuIFstMSwgMCwgbmVhckNvbGxpc2lvblBvaW50XTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBJZiBpdCBkaWRuJ3QgY29sbGlkZSBvbiB0aGUgbGVmdCwgaXQgbXVzdCBoYXZlIGNvbGxpZGVkIG9uIHRoZSByaWdodC4gIFJldHVybiB0aGUgY29sbGlzaW9uIG5vcm1hbCBbMSwgMF1cclxuXHRcdFx0cmV0dXJuIFsxLCAwLCBuZWFyQ29sbGlzaW9uUG9pbnRdO1xyXG5cdFx0fVxyXG5cdFx0Ly8gSWYgaXQgZGlkbid0IGNvbGxpZGUgb24gdGhlIGxlZnQgb3IgcmlnaHQsIGl0IG11c3QgaGF2ZSBjb2xsaWRlZCBvbiBlaXRoZXIgdGhlIHRvcCBvciB0aGUgYm90dG9tISBub3cgd2hpY2g/XHJcblx0XHRpZiAodG9wSW50ZXJzZWN0aW9uID09PSBuZWFyWSkge1xyXG5cdFx0XHQvLyBJdCBtdXN0IGhhdmUgY29sbGlkZWQgb24gdGhlIHRvcCEgIFJldHVybiB0aGUgY29sbGlzaW9uIG5vcm1hbCBbMCwgLTFdXHJcblx0XHRcdHJldHVybiBbMCwgLTEsIG5lYXJDb2xsaXNpb25Qb2ludF07XHJcblx0XHR9XHJcblx0XHQvLyBJZiBpdCBkaWRuJ3QgY29sbGlkZSBvbiB0aGUgdG9wLCBpdCBtdXN0IGhhdmUgY29sbGlkZWQgb24gdGhlIGJvdHRvbS4gIFJldHVybiB0aGUgY29sbGlzaW9uIG5vcm1hbCBbMCwgMV1cclxuXHRcdHJldHVybiBbMCwgMSwgbmVhckNvbGxpc2lvblBvaW50XTtcclxuXHJcblx0XHQvLyBvdXRwdXQgaWYgbm8gY29sbGlzaW9uOiBmYWxzZVxyXG5cdFx0Ly8gb3V0cHV0IGlmIGNvbGxpc2lvbjogW2NvbGxpc2lvbiBub3JtYWwgWCwgY29sbGlzaW9uIG5vcm1hbCBZLCBuZWFyQ29sbGlzaW9uUG9pbnRdXHJcblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICAgICAtMSB0byAxICAgICAgICAgICAgICAtMSB0byAxICAgICAgICAgICAgMCB0byAxXHJcblx0fVxyXG5cclxuXHRyZW5kZXJFbnRpdGllcygpIHtcclxuXHRcdC8vIGRyYXcgcGxheWVyXHJcblx0XHQvLyB0aGlzLmZpbGwoMjU1LCAwLCAwKTtcclxuXHRcdC8vIHRoaXMubm9TdHJva2UoKTtcclxuXHRcdC8vIHRoaXMucmVjdChcclxuXHRcdC8vICAgICAodGhpcy53b3JsZC5wbGF5ZXIuaW50ZXJwb2xhdGVkWCAqIHRoaXMuVElMRV9XSURUSCAtXHJcblx0XHQvLyAgICAgICAgIHRoaXMuaW50ZXJwb2xhdGVkQ2FtWCAqIHRoaXMuVElMRV9XSURUSCkgKlxyXG5cdFx0Ly8gICAgICAgICB0aGlzLnVwc2NhbGVTaXplLFxyXG5cdFx0Ly8gICAgICh0aGlzLndvcmxkLnBsYXllci5pbnRlcnBvbGF0ZWRZICogdGhpcy5USUxFX0hFSUdIVCAtXHJcblx0XHQvLyAgICAgICAgIHRoaXMuaW50ZXJwb2xhdGVkQ2FtWSAqIHRoaXMuVElMRV9IRUlHSFQpICpcclxuXHRcdC8vICAgICAgICAgdGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdC8vICAgICB0aGlzLndvcmxkLnBsYXllci53aWR0aCAqIHRoaXMudXBzY2FsZVNpemUgKiB0aGlzLlRJTEVfV0lEVEgsXHJcblx0XHQvLyAgICAgdGhpcy53b3JsZC5wbGF5ZXIuaGVpZ2h0ICogdGhpcy51cHNjYWxlU2l6ZSAqIHRoaXMuVElMRV9IRUlHSFRcclxuXHRcdC8vICk7XHJcblx0XHQvLyBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5pdGVtcykge1xyXG5cdFx0Ly8gICAgIGl0ZW0uZmluZEludGVycG9sYXRlZENvb3JkaW5hdGVzKCk7XHJcblx0XHQvL1xyXG5cdFx0Ly8gICAgIGl0ZW0uaXRlbVN0YWNrLnRleHR1cmUucmVuZGVyKFxyXG5cdFx0Ly8gICAgICAgICB0aGlzLFxyXG5cdFx0Ly8gICAgICAgICAoaXRlbS5pbnRlcnBvbGF0ZWRYICogdGhpcy5USUxFX1dJRFRIIC1cclxuXHRcdC8vICAgICAgICAgICAgIHRoaXMuaW50ZXJwb2xhdGVkQ2FtWCAqIHRoaXMuVElMRV9XSURUSCkgKlxyXG5cdFx0Ly8gICAgICAgICAgICAgdGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdC8vICAgICAgICAgKGl0ZW0uaW50ZXJwb2xhdGVkWSAqIHRoaXMuVElMRV9IRUlHSFQgLVxyXG5cdFx0Ly8gICAgICAgICAgICAgdGhpcy5pbnRlcnBvbGF0ZWRDYW1ZICogdGhpcy5USUxFX0hFSUdIVCkgKlxyXG5cdFx0Ly8gICAgICAgICAgICAgdGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdC8vICAgICAgICAgaXRlbS53ICogdGhpcy51cHNjYWxlU2l6ZSAqIHRoaXMuVElMRV9XSURUSCxcclxuXHRcdC8vICAgICAgICAgaXRlbS5oICogdGhpcy51cHNjYWxlU2l6ZSAqIHRoaXMuVElMRV9IRUlHSFRcclxuXHRcdC8vICAgICApO1xyXG5cdFx0Ly9cclxuXHRcdC8vICAgICAvLyBSZW5kZXIgdGhlIGl0ZW0gcXVhbnRpdHkgbGFiZWxcclxuXHRcdC8vICAgICB0aGlzLmZpbGwoMCk7XHJcblx0XHQvL1xyXG5cdFx0Ly8gICAgIHRoaXMubm9TdHJva2UoKTtcclxuXHRcdC8vXHJcblx0XHQvLyAgICAgdGhpcy50ZXh0QWxpZ24odGhpcy5SSUdIVCwgdGhpcy5CT1RUT00pO1xyXG5cdFx0Ly8gICAgIHRoaXMudGV4dFNpemUoNSAqIHRoaXMudXBzY2FsZVNpemUpO1xyXG5cdFx0Ly9cclxuXHRcdC8vICAgICB0aGlzLnRleHQoXHJcblx0XHQvLyAgICAgICAgIGl0ZW0uaXRlbVN0YWNrLnN0YWNrU2l6ZSxcclxuXHRcdC8vICAgICAgICAgKGl0ZW0uaW50ZXJwb2xhdGVkWCAqIHRoaXMuVElMRV9XSURUSCAtXHJcblx0XHQvLyAgICAgICAgICAgICB0aGlzLmludGVycG9sYXRlZENhbVggKiB0aGlzLlRJTEVfV0lEVEgpICpcclxuXHRcdC8vICAgICAgICAgICAgIHRoaXMudXBzY2FsZVNpemUsXHJcblx0XHQvLyAgICAgICAgIChpdGVtLmludGVycG9sYXRlZFkgKiB0aGlzLlRJTEVfSEVJR0hUIC1cclxuXHRcdC8vICAgICAgICAgICAgIHRoaXMuaW50ZXJwb2xhdGVkQ2FtWSAqIHRoaXMuVElMRV9IRUlHSFQpICpcclxuXHRcdC8vICAgICAgICAgICAgIHRoaXMudXBzY2FsZVNpemVcclxuXHRcdC8vICAgICApO1xyXG5cdFx0Ly8gfVxyXG5cdH1cclxuXHJcblx0LypcclxuXHRwaWNrVXBJdGVtKGl0ZW1TdGFjazogSXRlbVN0YWNrKTogYm9vbGVhbiB7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaG90QmFyLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGNvbnN0IGl0ZW0gPSB0aGlzLmhvdEJhcltpXTtcclxuXHJcblx0XHRcdC8vIElmIHRoZXJlIGFyZSBubyBpdGVtcyBpbiB0aGUgY3VycmVudCBzbG90IG9mIHRoZSBob3RCYXJcclxuXHRcdFx0aWYgKGl0ZW0gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdHRoaXMuaG90QmFyW2ldID0gaXRlbVN0YWNrO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoXHJcblx0XHRcdFx0aXRlbSA9PT0gaXRlbVN0YWNrICYmXHJcblx0XHRcdFx0aXRlbS5zdGFja1NpemUgPCBpdGVtLm1heFN0YWNrU2l6ZVxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHRjb25zdCByZW1haW5pbmdTcGFjZSA9IGl0ZW0ubWF4U3RhY2tTaXplIC0gaXRlbS5zdGFja1NpemU7XHJcblxyXG5cdFx0XHRcdC8vIFRvcCBvZmYgdGhlIHN0YWNrIHdpdGggaXRlbXMgaWYgaXQgY2FuIHRha2UgbW9yZSB0aGFuIHRoZSBzdGFjayBiZWluZyBhZGRlZFxyXG5cdFx0XHRcdGlmIChyZW1haW5pbmdTcGFjZSA+PSBpdGVtU3RhY2suc3RhY2tTaXplKSB7XHJcblx0XHRcdFx0XHR0aGlzLmhvdEJhcltpXS5zdGFja1NpemUgPVxyXG5cdFx0XHRcdFx0XHRpdGVtLnN0YWNrU2l6ZSArIGl0ZW1TdGFjay5zdGFja1NpemU7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGl0ZW1TdGFjay5zdGFja1NpemUgLT0gcmVtYWluaW5nU3BhY2U7XHJcblxyXG5cdFx0XHRcdHRoaXMuaG90QmFyW2ldLnN0YWNrU2l6ZSA9IGl0ZW1TdGFjay5tYXhTdGFja1NpemU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGNvbnNvbGUuZXJyb3IoXHJcblx0XHRcdGBDb3VsZCBub3QgcGlja3VwICR7aXRlbVN0YWNrLnN0YWNrU2l6ZX0gJHtpdGVtU3RhY2submFtZX1gXHJcblx0XHQpO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0ICovXHJcblxyXG5cdG1vdXNlRXhpdGVkKCkge1xyXG5cdFx0dGhpcy5tb3VzZU9uID0gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRtb3VzZUVudGVyZWQoKSB7XHJcblx0XHR0aGlzLm1vdXNlT24gPSB0cnVlO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlTW91c2UoKSB7XHJcblx0XHRpZiAoXHJcblx0XHRcdE1hdGguZmxvb3IoXHJcblx0XHRcdFx0KHRoaXMuaW50ZXJwb2xhdGVkQ2FtWCAqIHRoaXMuVElMRV9XSURUSCArXHJcblx0XHRcdFx0XHR0aGlzLm1vdXNlWCAvIHRoaXMudXBzY2FsZVNpemUpIC9cclxuXHRcdFx0XHR0aGlzLlRJTEVfV0lEVEgsXHJcblx0XHRcdCkgIT09IHRoaXMud29ybGRNb3VzZVggfHxcclxuXHRcdFx0TWF0aC5mbG9vcihcclxuXHRcdFx0XHQodGhpcy5pbnRlcnBvbGF0ZWRDYW1ZICogdGhpcy5USUxFX0hFSUdIVCArXHJcblx0XHRcdFx0XHR0aGlzLm1vdXNlWSAvIHRoaXMudXBzY2FsZVNpemUpIC9cclxuXHRcdFx0XHR0aGlzLlRJTEVfSEVJR0hULFxyXG5cdFx0XHQpICE9PSB0aGlzLndvcmxkTW91c2VZXHJcblx0XHQpIHtcclxuXHRcdFx0dGhpcy5sYXN0Q3Vyc29yTW92ZSA9IERhdGUubm93KCk7XHJcblx0XHR9XHJcblx0XHQvLyB3b3JsZCBtb3VzZSB4IGFuZCB5IHZhcmlhYmxlcyBob2xkIHRoZSBtb3VzZSBwb3NpdGlvbiBpbiB3b3JsZCB0aWxlcy4gIDAsIDAgaXMgdG9wIGxlZnRcclxuXHRcdHRoaXMud29ybGRNb3VzZVggPSBNYXRoLmZsb29yKFxyXG5cdFx0XHQodGhpcy5pbnRlcnBvbGF0ZWRDYW1YICogdGhpcy5USUxFX1dJRFRIICtcclxuXHRcdFx0XHR0aGlzLm1vdXNlWCAvIHRoaXMudXBzY2FsZVNpemUpIC9cclxuXHRcdFx0dGhpcy5USUxFX1dJRFRILFxyXG5cdFx0KTtcclxuXHRcdHRoaXMud29ybGRNb3VzZVkgPSBNYXRoLmZsb29yKFxyXG5cdFx0XHQodGhpcy5pbnRlcnBvbGF0ZWRDYW1ZICogdGhpcy5USUxFX0hFSUdIVCArXHJcblx0XHRcdFx0dGhpcy5tb3VzZVkgLyB0aGlzLnVwc2NhbGVTaXplKSAvXHJcblx0XHRcdHRoaXMuVElMRV9IRUlHSFQsXHJcblx0XHQpO1xyXG5cdH1cclxuXHJcblx0ZHJhd0N1cnNvcigpIHtcclxuXHRcdGlmICh0aGlzLm1vdXNlT24pIHtcclxuXHRcdFx0Ly8gaWYgKHRoaXMucGlja2VkVXBTbG90ID4gLTEpIHtcclxuXHRcdFx0Ly8gICAgIHRoaXMuaG90YmFyW3RoaXMucGlja2VkVXBTbG90XS50ZXh0dXJlLnJlbmRlcihcclxuXHRcdFx0Ly8gICAgICAgICB0aGlzLFxyXG5cdFx0XHQvLyAgICAgICAgIHRoaXMubW91c2VYLFxyXG5cdFx0XHQvLyAgICAgICAgIHRoaXMubW91c2VZLFxyXG5cdFx0XHQvLyAgICAgICAgIDggKiB0aGlzLnVwc2NhbGVTaXplLFxyXG5cdFx0XHQvLyAgICAgICAgIDggKiB0aGlzLnVwc2NhbGVTaXplXHJcblx0XHRcdC8vICAgICApO1xyXG5cclxuXHRcdFx0Ly8gICAgIHRoaXMudGV4dChcclxuXHRcdFx0Ly8gICAgICAgICB0aGlzLmhvdEJhclt0aGlzLnBpY2tlZFVwU2xvdF0uc3RhY2tTaXplLFxyXG5cdFx0XHQvLyAgICAgICAgIHRoaXMubW91c2VYICsgMTAgKiB0aGlzLnVwc2NhbGVTaXplLFxyXG5cdFx0XHQvLyAgICAgICAgIHRoaXMubW91c2VZICsgMTAgKiB0aGlzLnVwc2NhbGVTaXplXHJcblx0XHRcdC8vICAgICApO1xyXG5cdFx0XHQvLyB9XHJcblxyXG5cdFx0XHRVaUFzc2V0cy5zZWxlY3RlZF90aWxlLnJlbmRlcihcclxuXHRcdFx0XHR0aGlzLFxyXG5cdFx0XHRcdE1hdGgucm91bmQoXHJcblx0XHRcdFx0XHQodGhpcy53b3JsZE1vdXNlWCAtIHRoaXMuaW50ZXJwb2xhdGVkQ2FtWCkgKlxyXG5cdFx0XHRcdFx0dGhpcy5USUxFX1dJRFRIICpcclxuXHRcdFx0XHRcdHRoaXMudXBzY2FsZVNpemUsXHJcblx0XHRcdFx0KSxcclxuXHRcdFx0XHRNYXRoLnJvdW5kKFxyXG5cdFx0XHRcdFx0KHRoaXMud29ybGRNb3VzZVkgLSB0aGlzLmludGVycG9sYXRlZENhbVkpICpcclxuXHRcdFx0XHRcdHRoaXMuVElMRV9IRUlHSFQgKlxyXG5cdFx0XHRcdFx0dGhpcy51cHNjYWxlU2l6ZSxcclxuXHRcdFx0XHQpLFxyXG5cdFx0XHRcdHRoaXMuVElMRV9XSURUSCAqIHRoaXMudXBzY2FsZVNpemUsXHJcblx0XHRcdFx0dGhpcy5USUxFX0hFSUdIVCAqIHRoaXMudXBzY2FsZVNpemUsXHJcblx0XHRcdCk7XHJcblx0XHRcdGlmIChEYXRlLm5vdygpIC0gdGhpcy5sYXN0Q3Vyc29yTW92ZSA+IDEwMDApIHtcclxuXHRcdFx0XHRsZXQgc2VsZWN0ZWRUaWxlID0gdGhpcy53b3JsZC53b3JsZFRpbGVzW3RoaXMud29ybGQud2lkdGggKiB0aGlzLndvcmxkTW91c2VZICsgdGhpcy53b3JsZE1vdXNlWF07XHJcblx0XHRcdFx0aWYgKHR5cGVvZiAoc2VsZWN0ZWRUaWxlKSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRcdHRoaXMudGV4dChcIlRpbGUgZW50aXR5OiBcIiArIHNlbGVjdGVkVGlsZSwgdGhpcy5tb3VzZVgsIHRoaXMubW91c2VZKTsvL0pBTktZIEFMRVJUXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYgKFdvcmxkVGlsZXNbc2VsZWN0ZWRUaWxlXSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHR0aGlzLnRleHQoKFdvcmxkVGlsZXNbc2VsZWN0ZWRUaWxlXSBhcyBUaWxlKS5uYW1lLCB0aGlzLm1vdXNlWCwgdGhpcy5tb3VzZVkpOy8vSkFOS1kgQUxFUlRcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmNvbnN0IGNvbm5lY3Rpb24gPSBpbyh7XHJcblx0YXV0aDogeyB0b2tlbjogd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdhbWUgPSBuZXcgR2FtZShjb25uZWN0aW9uKTtcclxuIiwiaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4vR2FtZSc7XHJcbmltcG9ydCB7IFdvcmxkIH0gZnJvbSAnLi93b3JsZC9Xb3JsZCc7XHJcbmltcG9ydCB7IEVudGl0eUNsYXNzZXMgfSBmcm9tICcuL3dvcmxkL2VudGl0aWVzL0VudGl0eUNsYXNzZXMnO1xyXG5pbXBvcnQgeyBQbGF5ZXJMb2NhbCB9IGZyb20gJy4vcGxheWVyL1BsYXllckxvY2FsJztcclxuaW1wb3J0IHsgSW52ZW50b3J5IH0gZnJvbSAnLi9wbGF5ZXIvSW52ZW50b3J5JztcclxuaW1wb3J0IHsgVGlsZUVudGl0eUFuaW1hdGlvbnMgfSBmcm9tICcuL3dvcmxkL2VudGl0aWVzL1RpbGVFbnRpdHknO1xyXG5pbXBvcnQgeyBXb3JsZEFzc2V0cyB9IGZyb20gJy4vYXNzZXRzL0Fzc2V0cyc7XHJcbmltcG9ydCB7IFRpbGVUeXBlIH0gZnJvbSAnLi4vZ2xvYmFsL1RpbGUnO1xyXG5pbXBvcnQge1xyXG5cdEVudGl0aWVzLFxyXG5cdEVudGl0aWVzRGF0YSxcclxuXHRFbnRpdHlEYXRhLFxyXG5cdEVudGl0eVBheWxvYWQsXHJcbn0gZnJvbSAnLi4vZ2xvYmFsL0VudGl0eSc7XHJcbmltcG9ydCB7IEludmVudG9yeVBheWxvYWQgfSBmcm9tICcuLi9nbG9iYWwvSW52ZW50b3J5JztcclxuaW1wb3J0IHsgVGlsZUVudGl0eVBheWxvYWQgfSBmcm9tICcuLi9nbG9iYWwvVGlsZUVudGl0eSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTmV0TWFuYWdlciB7XHJcblx0Z2FtZTogR2FtZTtcclxuXHJcblx0cGxheWVyVGlja1JhdGU6IG51bWJlcjtcclxuXHJcblx0Y29uc3RydWN0b3IoZ2FtZTogR2FtZSkge1xyXG5cdFx0dGhpcy5nYW1lID0gZ2FtZTtcclxuXHJcblx0XHQvLyBJbml0IGV2ZW50XHJcblx0XHR0aGlzLmdhbWUuY29ubmVjdGlvbi5vbignaW5pdCcsIChwbGF5ZXJUaWNrUmF0ZSwgdG9rZW4pID0+IHtcclxuXHRcdFx0Y29uc29sZS5sb2coYFRpY2sgcmF0ZSBzZXQgdG86ICR7cGxheWVyVGlja1JhdGV9YCk7XHJcblx0XHRcdHRoaXMucGxheWVyVGlja1JhdGUgPSBwbGF5ZXJUaWNrUmF0ZTtcclxuXHRcdFx0aWYgKHRva2VuKSB7XHJcblx0XHRcdFx0d2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIHRva2VuKTtcclxuXHRcdFx0XHQodGhpcy5nYW1lLmNvbm5lY3Rpb24uYXV0aCBhcyB7IHRva2VuOiBzdHJpbmcgfSkudG9rZW4gPSB0b2tlbjtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gSW5pdGlhbGl6YXRpb24gZXZlbnRzXHJcblx0XHR7XHJcblx0XHRcdC8vIExvYWQgdGhlIHdvcmxkIGFuZCBzZXQgdGhlIHBsYXllciBlbnRpdHkgaWRcclxuXHRcdFx0dGhpcy5nYW1lLmNvbm5lY3Rpb24ub24oXHJcblx0XHRcdFx0J3dvcmxkTG9hZCcsXHJcblx0XHRcdFx0KFxyXG5cdFx0XHRcdFx0d2lkdGgsXHJcblx0XHRcdFx0XHRoZWlnaHQsXHJcblx0XHRcdFx0XHR0aWxlcyxcclxuXHRcdFx0XHRcdHRpbGVFbnRpdGllcyxcclxuXHRcdFx0XHRcdGVudGl0aWVzLFxyXG5cdFx0XHRcdFx0cGxheWVyLFxyXG5cdFx0XHRcdFx0aW52ZW50b3J5LFxyXG5cdFx0XHRcdCkgPT4ge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coZW50aXRpZXMpO1xyXG5cdFx0XHRcdFx0bGV0IHRpbGVFbnRpdGllczI6IHtcclxuXHRcdFx0XHRcdFx0W2lkOiBzdHJpbmddOiB7XHJcblx0XHRcdFx0XHRcdFx0aWQ6IHN0cmluZztcclxuXHRcdFx0XHRcdFx0XHRjb3ZlcmVkVGlsZXM6IG51bWJlcltdO1xyXG5cdFx0XHRcdFx0XHRcdHR5cGVfOiBudW1iZXI7XHJcblx0XHRcdFx0XHRcdFx0ZGF0YToge307XHJcblx0XHRcdFx0XHRcdFx0YW5pbUZyYW1lOiBudW1iZXI7XHJcblx0XHRcdFx0XHRcdFx0YW5pbWF0ZTogYm9vbGVhbjtcclxuXHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdH0gPSB7fTtcclxuXHRcdFx0XHRcdHRpbGVFbnRpdGllcy5mb3JFYWNoKHRpbGVFbnRpdHkgPT4ge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnYWRkaW5nIHRpbGUgZW50aXR5OiAnICsgdGlsZUVudGl0eS5pZCk7XHJcblx0XHRcdFx0XHRcdHRpbGVFbnRpdGllczJbdGlsZUVudGl0eS5pZF0gPSB7XHJcblx0XHRcdFx0XHRcdFx0aWQ6IHRpbGVFbnRpdHkuaWQsXHJcblx0XHRcdFx0XHRcdFx0Y292ZXJlZFRpbGVzOiB0aWxlRW50aXR5LmNvdmVyZWRUaWxlcyxcclxuXHRcdFx0XHRcdFx0XHR0eXBlXzogdGlsZUVudGl0eS5wYXlsb2FkLnR5cGVfLFxyXG5cdFx0XHRcdFx0XHRcdGRhdGE6IHRpbGVFbnRpdHkucGF5bG9hZC5kYXRhLFxyXG5cdFx0XHRcdFx0XHRcdGFuaW1GcmFtZTogcmFuZGludChcclxuXHRcdFx0XHRcdFx0XHRcdDAsXHJcblx0XHRcdFx0XHRcdFx0XHRXb3JsZEFzc2V0cy50aWxlRW50aXRpZXNbXHJcblx0XHRcdFx0XHRcdFx0XHRcdHRpbGVFbnRpdHkucGF5bG9hZC50eXBlX1xyXG5cdFx0XHRcdFx0XHRcdFx0XS5sZW5ndGggLSAxLFxyXG5cdFx0XHRcdFx0XHRcdCksXHJcblx0XHRcdFx0XHRcdFx0YW5pbWF0ZTpcclxuXHRcdFx0XHRcdFx0XHRcdFRpbGVFbnRpdHlBbmltYXRpb25zW3RpbGVFbnRpdHkucGF5bG9hZC50eXBlX10sXHJcblx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdHRoaXMuZ2FtZS53b3JsZCA9IG5ldyBXb3JsZChcclxuXHRcdFx0XHRcdFx0d2lkdGgsXHJcblx0XHRcdFx0XHRcdGhlaWdodCxcclxuXHRcdFx0XHRcdFx0dGlsZXMsXHJcblx0XHRcdFx0XHRcdHRpbGVFbnRpdGllczIsXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0dGhpcy5nYW1lLndvcmxkLmludmVudG9yeSA9IG5ldyBJbnZlbnRvcnkoaW52ZW50b3J5KTtcclxuXHRcdFx0XHRcdHRoaXMuZ2FtZS53b3JsZC5wbGF5ZXIgPSBuZXcgUGxheWVyTG9jYWwocGxheWVyKTtcclxuXHRcdFx0XHRcdGVudGl0aWVzLmZvckVhY2goZW50aXR5ID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpcy5nYW1lLndvcmxkLmVudGl0aWVzW2VudGl0eS5pZF0gPSBuZXcgRW50aXR5Q2xhc3Nlc1tcclxuXHRcdFx0XHRcdFx0XHRlbnRpdHkudHlwZVxyXG5cdFx0XHRcdFx0XHRdKGVudGl0eSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFdvcmxkIGV2ZW50c1xyXG5cdFx0e1xyXG5cdFx0XHQvLyBUaWxlIHVwZGF0ZXMgc3VjaCBhcyBicmVha2luZyBhbmQgcGxhY2luZ1xyXG5cdFx0XHR0aGlzLmdhbWUuY29ubmVjdGlvbi5vbihcclxuXHRcdFx0XHQnd29ybGRVcGRhdGUnLFxyXG5cdFx0XHRcdCh1cGRhdGVkVGlsZXM6IHsgdGlsZUluZGV4OiBudW1iZXI7IHRpbGU6IG51bWJlciB9W10pID0+IHtcclxuXHRcdFx0XHRcdC8vIElmIHRoZSB3b3JsZCBpcyBub3Qgc2V0XHJcblx0XHRcdFx0XHRpZiAodGhpcy5nYW1lLndvcmxkID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuXHJcblx0XHRcdFx0XHR1cGRhdGVkVGlsZXMuZm9yRWFjaCh0aWxlID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpcy5nYW1lLndvcmxkLnVwZGF0ZVRpbGUodGlsZS50aWxlSW5kZXgsIHRpbGUudGlsZSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHQpO1xyXG5cclxuXHRcdFx0dGhpcy5nYW1lLmNvbm5lY3Rpb24ub24oJ2ludmVudG9yeVVwZGF0ZScsIHVwZGF0ZXMgPT4ge1xyXG5cdFx0XHRcdC8vIElmIHRoZSB3b3JsZCBpcyBub3Qgc2V0XHJcblx0XHRcdFx0aWYgKHRoaXMuZ2FtZS53b3JsZCA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblxyXG5cdFx0XHRcdHVwZGF0ZXMuZm9yRWFjaCh1cGRhdGUgPT4ge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2codXBkYXRlKTtcclxuXHRcdFx0XHRcdHRoaXMuZ2FtZS53b3JsZC5pbnZlbnRvcnkuaXRlbXNbdXBkYXRlLnNsb3RdID0gdXBkYXRlLml0ZW07XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFBsYXllciBldmVudHNcclxuXHRcdHtcclxuXHRcdFx0dGhpcy5nYW1lLmNvbm5lY3Rpb24ub24oJ2VudGl0eVVwZGF0ZScsIGVudGl0eURhdGEgPT4ge1xyXG5cdFx0XHRcdC8vIElmIHRoZSB3b3JsZCBpcyBub3Qgc2V0XHJcblx0XHRcdFx0aWYgKHRoaXMuZ2FtZS53b3JsZCA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblxyXG5cdFx0XHRcdGNvbnN0IGVudGl0eSA9IHRoaXMuZ2FtZS53b3JsZC5lbnRpdGllc1tlbnRpdHlEYXRhLmlkXTtcclxuXHRcdFx0XHRpZiAoZW50aXR5ID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuXHJcblx0XHRcdFx0ZW50aXR5LnVwZGF0ZURhdGEoZW50aXR5RGF0YSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dGhpcy5nYW1lLmNvbm5lY3Rpb24ub24oJ2VudGl0eUNyZWF0ZScsIGVudGl0eURhdGEgPT4ge1xyXG5cdFx0XHRcdC8vIElmIHRoZSB3b3JsZCBpcyBub3Qgc2V0XHJcblx0XHRcdFx0aWYgKHRoaXMuZ2FtZS53b3JsZCA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblxyXG5cdFx0XHRcdHRoaXMuZ2FtZS53b3JsZC5lbnRpdGllc1tlbnRpdHlEYXRhLmlkXSA9IG5ldyBFbnRpdHlDbGFzc2VzW1xyXG5cdFx0XHRcdFx0ZW50aXR5RGF0YS50eXBlXHJcblx0XHRcdFx0XShlbnRpdHlEYXRhKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0aGlzLmdhbWUuY29ubmVjdGlvbi5vbignZW50aXR5RGVsZXRlJywgaWQgPT4ge1xyXG5cdFx0XHRcdC8vIElmIHRoZSB3b3JsZCBpcyBub3Qgc2V0XHJcblx0XHRcdFx0aWYgKHRoaXMuZ2FtZS53b3JsZCA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblxyXG5cdFx0XHRcdGRlbGV0ZSB0aGlzLmdhbWUud29ybGQuZW50aXRpZXNbaWRdO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIFVwZGF0ZSB0aGUgb3RoZXIgcGxheWVycyBpbiB0aGUgd29ybGRcclxuXHRcdFx0dGhpcy5nYW1lLmNvbm5lY3Rpb24ub24oXHJcblx0XHRcdFx0J2VudGl0eVNuYXBzaG90JyxcclxuXHRcdFx0XHQoc25hcHNob3Q6IHtcclxuXHRcdFx0XHRcdGlkOiBzdHJpbmc7XHJcblx0XHRcdFx0XHR0aW1lOiBudW1iZXI7XHJcblx0XHRcdFx0XHRzdGF0ZTogeyBpZDogc3RyaW5nOyB4OiBzdHJpbmc7IHk6IHN0cmluZyB9W107XHJcblx0XHRcdFx0fSkgPT4ge1xyXG5cdFx0XHRcdFx0Ly8gSWYgdGhlIHdvcmxkIGlzIG5vdCBzZXRcclxuXHRcdFx0XHRcdGlmICh0aGlzLmdhbWUud29ybGQgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuZ2FtZS53b3JsZC51cGRhdGVQbGF5ZXJzKHNuYXBzaG90KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmFuZGludCh4MTogbnVtYmVyLCB4MjogbnVtYmVyKSB7XHJcblx0cmV0dXJuIE1hdGguZmxvb3IoeDEgKyBNYXRoLnJhbmRvbSgpICogKHgyICsgMSAtIHgxKSk7XHJcbn1cclxuIiwiaW1wb3J0IHsgVGlsZVJlc291cmNlIH0gZnJvbSAnLi9yZXNvdXJjZXMvVGlsZVJlc291cmNlJztcclxuaW1wb3J0IHsgSW1hZ2VSZXNvdXJjZSB9IGZyb20gJy4vcmVzb3VyY2VzL0ltYWdlUmVzb3VyY2UnO1xyXG5pbXBvcnQgeyBGb250UmVzb3VyY2UgfSBmcm9tICcuL3Jlc291cmNlcy9Gb250UmVzb3VyY2UnO1xyXG5pbXBvcnQgeyBBdWRpb1Jlc291cmNlR3JvdXAgfSBmcm9tICcuL3Jlc291cmNlcy9BdWRpb1Jlc291cmNlR3JvdXAnO1xyXG5pbXBvcnQgeyBBdWRpb1Jlc291cmNlIH0gZnJvbSAnLi9yZXNvdXJjZXMvQXVkaW9SZXNvdXJjZSc7XHJcbmltcG9ydCB7IEl0ZW1UeXBlIH0gZnJvbSAnLi4vLi4vZ2xvYmFsL0ludmVudG9yeSc7XHJcbmltcG9ydCB7IFJlZmxlY3RhYmxlSW1hZ2VSZXNvdXJjZSB9IGZyb20gJy4vcmVzb3VyY2VzL1JlZmxlY3RlZEltYWdlUmVzb3VyY2UnO1xyXG5pbXBvcnQgUDUgZnJvbSAncDUnO1xyXG5pbXBvcnQgeyBSZXNvdXJjZSB9IGZyb20gJy4vcmVzb3VyY2VzL1Jlc291cmNlJztcclxuXHJcbmludGVyZmFjZSBBc3NldEdyb3VwIHtcclxuXHRbbmFtZTogc3RyaW5nXTpcclxuXHRcdHwge1xyXG5cdFx0XHRcdFtuYW1lOiBzdHJpbmddOlxyXG5cdFx0XHRcdFx0fCBSZXNvdXJjZVxyXG5cdFx0XHRcdFx0fCBBc3NldEdyb3VwXHJcblx0XHRcdFx0XHR8IEF1ZGlvUmVzb3VyY2VHcm91cFxyXG5cdFx0XHRcdFx0fCBBdWRpb1Jlc291cmNlXHJcblx0XHRcdFx0XHR8IEltYWdlUmVzb3VyY2VbXVxyXG4gICAgICAgICAgICAgICAgICAgIHwgUmVmbGVjdGFibGVJbWFnZVJlc291cmNlW11cclxuICAgICAgICAgICAgICAgICAgICB8IFJlZmxlY3RhYmxlSW1hZ2VSZXNvdXJjZVxyXG5cdFx0XHRcdFx0fCBbUmVmbGVjdGFibGVJbWFnZVJlc291cmNlLCBudW1iZXJdW107XHJcblx0XHQgIH1cclxuXHRcdHwgUmVzb3VyY2VcclxuXHRcdHwgQXNzZXRHcm91cFxyXG5cdFx0fCBBdWRpb1Jlc291cmNlR3JvdXBcclxuXHRcdHwgQXVkaW9SZXNvdXJjZVxyXG5cdFx0fCBJbWFnZVJlc291cmNlW11cclxuXHRcdHwgSW1hZ2VSZXNvdXJjZVtdW11cclxuICAgICAgICB8IFJlZmxlY3RhYmxlSW1hZ2VSZXNvdXJjZVtdXHJcbiAgICAgICAgfCBSZWZsZWN0YWJsZUltYWdlUmVzb3VyY2VcclxuXHRcdHwgW1JlZmxlY3RhYmxlSW1hZ2VSZXNvdXJjZSwgbnVtYmVyXVtdO1xyXG59XHJcblxyXG5jb25zdCBwbGF5ZXJBbmltYXRpb25zID0gPFQgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBbUmVmbGVjdGFibGVJbWFnZVJlc291cmNlLCBudW1iZXJdW10+PihcclxuXHRkYXRhOiBULFxyXG4pOiBUID0+IGRhdGE7XHJcblxyXG5leHBvcnQgY29uc3QgUGxheWVyQW5pbWF0aW9ucyA9IHBsYXllckFuaW1hdGlvbnMoe1xyXG5cdC8vaW1hZ2UsIG1pbGxpc2Vjb25kcyB0byBkaXNwbGF5IGZvclxyXG5cdGlkbGU6IFtcclxuXHRcdFtuZXcgUmVmbGVjdGFibGVJbWFnZVJlc291cmNlKCdhc3NldHMvdGV4dHVyZXMvcGxheWVyL3Nub3dtYW5pZGxlMS5wbmcnKSwgMTM1XSwvL2lnbm9yZSB0aGUgYXRyb2Npb3VzIG5hbWluZyBzY2hlbWUgb2YgdGhlc2UgaW1hZ2VzXHJcblx0XHRbbmV3IFJlZmxlY3RhYmxlSW1hZ2VSZXNvdXJjZSgnYXNzZXRzL3RleHR1cmVzL3BsYXllci9zbm93bWFuaWRsZTIucG5nJyksIDEzNV0sXHJcblx0XHRbbmV3IFJlZmxlY3RhYmxlSW1hZ2VSZXNvdXJjZSgnYXNzZXRzL3RleHR1cmVzL3BsYXllci9zbm93bWFuaWRsZTMucG5nJyksIDEzNV0sXHJcblx0XHRbbmV3IFJlZmxlY3RhYmxlSW1hZ2VSZXNvdXJjZSgnYXNzZXRzL3RleHR1cmVzL3BsYXllci9zbm93bWFuaWRsZTQucG5nJyksIDEzNV0sXHJcblx0XHRbbmV3IFJlZmxlY3RhYmxlSW1hZ2VSZXNvdXJjZSgnYXNzZXRzL3RleHR1cmVzL3BsYXllci9zbm93bWFuaWRsZTUucG5nJyksIDEzNV0sXHJcblx0XHRbbmV3IFJlZmxlY3RhYmxlSW1hZ2VSZXNvdXJjZSgnYXNzZXRzL3RleHR1cmVzL3BsYXllci9zbm93bWFuaWRsZTYucG5nJyksIDEzNV0sXHJcblx0XHRbbmV3IFJlZmxlY3RhYmxlSW1hZ2VSZXNvdXJjZSgnYXNzZXRzL3RleHR1cmVzL3BsYXllci9zbm93bWFuaWRsZTcucG5nJyksIDEzNV0sXHJcblx0XHRbbmV3IFJlZmxlY3RhYmxlSW1hZ2VSZXNvdXJjZSgnYXNzZXRzL3RleHR1cmVzL3BsYXllci9zbm93bWFuaWRsZTgucG5nJyksIDEzNV0sXHJcblx0XSxcclxuXHRpZGxlbGVmdDogW1xyXG5cdFx0W25ldyBSZWZsZWN0YWJsZUltYWdlUmVzb3VyY2UoJ2Fzc2V0cy90ZXh0dXJlcy9wbGF5ZXIvc25vd21hbmlkbGVmbGlwcGVkMS5wbmcnKSwgMTM1XSxcclxuXHRcdFtuZXcgUmVmbGVjdGFibGVJbWFnZVJlc291cmNlKCdhc3NldHMvdGV4dHVyZXMvcGxheWVyL3Nub3dtYW5pZGxlZmxpcHBlZDIucG5nJyksIDEzNV0sXHJcblx0XHRbbmV3IFJlZmxlY3RhYmxlSW1hZ2VSZXNvdXJjZSgnYXNzZXRzL3RleHR1cmVzL3BsYXllci9zbm93bWFuaWRsZWZsaXBwZWQzLnBuZycpLCAxMzVdLFxyXG5cdFx0W25ldyBSZWZsZWN0YWJsZUltYWdlUmVzb3VyY2UoJ2Fzc2V0cy90ZXh0dXJlcy9wbGF5ZXIvc25vd21hbmlkbGVmbGlwcGVkNC5wbmcnKSwgMTM1XSxcclxuXHRcdFtuZXcgUmVmbGVjdGFibGVJbWFnZVJlc291cmNlKCdhc3NldHMvdGV4dHVyZXMvcGxheWVyL3Nub3dtYW5pZGxlZmxpcHBlZDUucG5nJyksIDEzNV0sXHJcblx0XHRbbmV3IFJlZmxlY3RhYmxlSW1hZ2VSZXNvdXJjZSgnYXNzZXRzL3RleHR1cmVzL3BsYXllci9zbm93bWFuaWRsZWZsaXBwZWQ2LnBuZycpLCAxMzVdLFxyXG5cdFx0W25ldyBSZWZsZWN0YWJsZUltYWdlUmVzb3VyY2UoJ2Fzc2V0cy90ZXh0dXJlcy9wbGF5ZXIvc25vd21hbmlkbGVmbGlwcGVkNy5wbmcnKSwgMTM1XSxcclxuXHRcdFtuZXcgUmVmbGVjdGFibGVJbWFnZVJlc291cmNlKCdhc3NldHMvdGV4dHVyZXMvcGxheWVyL3Nub3dtYW5pZGxlZmxpcHBlZDgucG5nJyksIDEzNV0sXHJcblx0XSxcclxuXHR3YWxrOiBbXHJcblx0XHRbbmV3IFJlZmxlY3RhYmxlSW1hZ2VSZXNvdXJjZSgnYXNzZXRzL3RleHR1cmVzL3BsYXllci9zbm93bWFucm9sbDAxLnBuZycpLCA3NV0sXHJcblx0XHRbbmV3IFJlZmxlY3RhYmxlSW1hZ2VSZXNvdXJjZSgnYXNzZXRzL3RleHR1cmVzL3BsYXllci9zbm93bWFucm9sbDAyLnBuZycpLCA3NV0sXHJcblx0XHRbbmV3IFJlZmxlY3RhYmxlSW1hZ2VSZXNvdXJjZSgnYXNzZXRzL3RleHR1cmVzL3BsYXllci9zbm93bWFucm9sbDAzLnBuZycpLCA3NV0sXHJcblx0XHRbbmV3IFJlZmxlY3RhYmxlSW1hZ2VSZXNvdXJjZSgnYXNzZXRzL3RleHR1cmVzL3BsYXllci9zbm93bWFucm9sbDA0LnBuZycpLCA3NV0sXHJcblx0XHRbbmV3IFJlZmxlY3RhYmxlSW1hZ2VSZXNvdXJjZSgnYXNzZXRzL3RleHR1cmVzL3BsYXllci9zbm93bWFucm9sbDA1LnBuZycpLCA3NV0sXHJcblx0XHRbbmV3IFJlZmxlY3RhYmxlSW1hZ2VSZXNvdXJjZSgnYXNzZXRzL3RleHR1cmVzL3BsYXllci9zbm93bWFucm9sbDA2LnBuZycpLCA3NV0sXHJcblx0XHRbbmV3IFJlZmxlY3RhYmxlSW1hZ2VSZXNvdXJjZSgnYXNzZXRzL3RleHR1cmVzL3BsYXllci9zbm93bWFucm9sbDA3LnBuZycpLCA3NV0sXHJcblx0XHRbbmV3IFJlZmxlY3RhYmxlSW1hZ2VSZXNvdXJjZSgnYXNzZXRzL3RleHR1cmVzL3BsYXllci9zbm93bWFucm9sbDA4LnBuZycpLCA3NV0sXHJcblx0XSxcclxuXHR3YWxrbGVmdDogW1xyXG5cdFx0W25ldyBSZWZsZWN0YWJsZUltYWdlUmVzb3VyY2UoJ2Fzc2V0cy90ZXh0dXJlcy9wbGF5ZXIvc25vd21hbnJvbGxsZWZ0MDEucG5nJyksIDc1XSxcclxuXHRcdFtuZXcgUmVmbGVjdGFibGVJbWFnZVJlc291cmNlKCdhc3NldHMvdGV4dHVyZXMvcGxheWVyL3Nub3dtYW5yb2xsbGVmdDAyLnBuZycpLCA3NV0sXHJcblx0XHRbbmV3IFJlZmxlY3RhYmxlSW1hZ2VSZXNvdXJjZSgnYXNzZXRzL3RleHR1cmVzL3BsYXllci9zbm93bWFucm9sbGxlZnQwMy5wbmcnKSwgNzVdLFxyXG5cdFx0W25ldyBSZWZsZWN0YWJsZUltYWdlUmVzb3VyY2UoJ2Fzc2V0cy90ZXh0dXJlcy9wbGF5ZXIvc25vd21hbnJvbGxsZWZ0MDQucG5nJyksIDc1XSxcclxuXHRcdFtuZXcgUmVmbGVjdGFibGVJbWFnZVJlc291cmNlKCdhc3NldHMvdGV4dHVyZXMvcGxheWVyL3Nub3dtYW5yb2xsbGVmdDA1LnBuZycpLCA3NV0sXHJcblx0XHRbbmV3IFJlZmxlY3RhYmxlSW1hZ2VSZXNvdXJjZSgnYXNzZXRzL3RleHR1cmVzL3BsYXllci9zbm93bWFucm9sbGxlZnQwNi5wbmcnKSwgNzVdLFxyXG5cdFx0W25ldyBSZWZsZWN0YWJsZUltYWdlUmVzb3VyY2UoJ2Fzc2V0cy90ZXh0dXJlcy9wbGF5ZXIvc25vd21hbnJvbGxsZWZ0MDcucG5nJyksIDc1XSxcclxuXHRcdFtuZXcgUmVmbGVjdGFibGVJbWFnZVJlc291cmNlKCdhc3NldHMvdGV4dHVyZXMvcGxheWVyL3Nub3dtYW5yb2xsbGVmdDA4LnBuZycpLCA3NV0sXHJcblx0XSxcclxufSk7XHJcblxyXG4vLyBJdGVtIHJlbGF0ZWQgYXNzZXRzXHJcbmV4cG9ydCBjb25zdCBJdGVtQXNzZXRzOiBSZWNvcmQ8SXRlbVR5cGUsIEltYWdlUmVzb3VyY2U+ID0ge1xyXG5cdFtJdGVtVHlwZS5Tbm93QmxvY2tdOiBuZXcgSW1hZ2VSZXNvdXJjZShcclxuXHRcdCdhc3NldHMvdGV4dHVyZXMvaXRlbXMvYmxvY2tfc25vdy5wbmcnLFxyXG5cdCksXHJcblx0W0l0ZW1UeXBlLkljZUJsb2NrXTogbmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHQnYXNzZXRzL3RleHR1cmVzL2l0ZW1zL2Jsb2NrX2ljZS5wbmcnLFxyXG5cdCksXHJcblx0W0l0ZW1UeXBlLkRpcnRCbG9ja106IG5ldyBJbWFnZVJlc291cmNlKFxyXG5cdFx0J2Fzc2V0cy90ZXh0dXJlcy9pdGVtcy9ibG9ja19kaXJ0LnBuZycsXHJcblx0KSxcclxuXHRbSXRlbVR5cGUuU3RvbmUwQmxvY2tdOiBuZXcgSW1hZ2VSZXNvdXJjZShcclxuXHRcdCdhc3NldHMvdGV4dHVyZXMvaXRlbXMvYmxvY2tfc3RvbmUwLnBuZycsXHJcblx0KSxcclxuXHRbSXRlbVR5cGUuU3RvbmUxQmxvY2tdOiBuZXcgSW1hZ2VSZXNvdXJjZShcclxuXHRcdCdhc3NldHMvdGV4dHVyZXMvaXRlbXMvYmxvY2tfc3RvbmUxLnBuZycsXHJcblx0KSxcclxuXHRbSXRlbVR5cGUuU3RvbmUyQmxvY2tdOiBuZXcgSW1hZ2VSZXNvdXJjZShcclxuXHRcdCdhc3NldHMvdGV4dHVyZXMvaXRlbXMvYmxvY2tfc3RvbmUyLnBuZycsXHJcblx0KSxcclxuXHRbSXRlbVR5cGUuU3RvbmUzQmxvY2tdOiBuZXcgSW1hZ2VSZXNvdXJjZShcclxuXHRcdCdhc3NldHMvdGV4dHVyZXMvaXRlbXMvYmxvY2tfc3RvbmUzLnBuZycsXHJcblx0KSxcclxuXHRbSXRlbVR5cGUuU3RvbmU0QmxvY2tdOiBuZXcgSW1hZ2VSZXNvdXJjZShcclxuXHRcdCdhc3NldHMvdGV4dHVyZXMvaXRlbXMvYmxvY2tfc3RvbmU0LnBuZycsXHJcblx0KSxcclxuXHRbSXRlbVR5cGUuU3RvbmU1QmxvY2tdOiBuZXcgSW1hZ2VSZXNvdXJjZShcclxuXHRcdCdhc3NldHMvdGV4dHVyZXMvaXRlbXMvYmxvY2tfc3RvbmU1LnBuZycsXHJcblx0KSxcclxuXHRbSXRlbVR5cGUuU3RvbmU2QmxvY2tdOiBuZXcgSW1hZ2VSZXNvdXJjZShcclxuXHRcdCdhc3NldHMvdGV4dHVyZXMvaXRlbXMvYmxvY2tfc3RvbmU2LnBuZycsXHJcblx0KSxcclxuXHRbSXRlbVR5cGUuU3RvbmU3QmxvY2tdOiBuZXcgSW1hZ2VSZXNvdXJjZShcclxuXHRcdCdhc3NldHMvdGV4dHVyZXMvaXRlbXMvYmxvY2tfc3RvbmU3LnBuZycsXHJcblx0KSxcclxuXHRbSXRlbVR5cGUuU3RvbmU4QmxvY2tdOiBuZXcgSW1hZ2VSZXNvdXJjZShcclxuXHRcdCdhc3NldHMvdGV4dHVyZXMvaXRlbXMvYmxvY2tfc3RvbmU4LnBuZycsXHJcblx0KSxcclxuXHRbSXRlbVR5cGUuU3RvbmU5QmxvY2tdOiBuZXcgSW1hZ2VSZXNvdXJjZShcclxuXHRcdCdhc3NldHMvdGV4dHVyZXMvaXRlbXMvYmxvY2tfc3RvbmU5LnBuZycsXHJcblx0KSxcclxuXHRbSXRlbVR5cGUuVGluQmxvY2tdOiBuZXcgSW1hZ2VSZXNvdXJjZShcclxuXHRcdCdhc3NldHMvdGV4dHVyZXMvaXRlbXMvYmxvY2tfdGluLnBuZycsXHJcblx0KSxcclxuXHRbSXRlbVR5cGUuQWx1bWludW1CbG9ja106IG5ldyBJbWFnZVJlc291cmNlKFxyXG5cdFx0J2Fzc2V0cy90ZXh0dXJlcy9pdGVtcy9ibG9ja19hbHVtaW51bS5wbmcnLFxyXG5cdCksXHJcblx0W0l0ZW1UeXBlLkdvbGRCbG9ja106IG5ldyBJbWFnZVJlc291cmNlKFxyXG5cdFx0J2Fzc2V0cy90ZXh0dXJlcy9pdGVtcy9ibG9ja19nb2xkLnBuZycsXHJcblx0KSxcclxuXHRbSXRlbVR5cGUuVGl0YW5pdW1CbG9ja106IG5ldyBJbWFnZVJlc291cmNlKFxyXG5cdFx0J2Fzc2V0cy90ZXh0dXJlcy9pdGVtcy9ibG9ja190aXRhbml1bS5wbmcnLFxyXG5cdCksXHJcblx0W0l0ZW1UeXBlLkdyYXBlQmxvY2tdOiBuZXcgSW1hZ2VSZXNvdXJjZShcclxuXHRcdCdhc3NldHMvdGV4dHVyZXMvaXRlbXMvYmxvY2tfZ3JhcGUucG5nJyxcclxuXHQpLFxyXG5cdFtJdGVtVHlwZS5Xb29kMEJsb2NrXTogbmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHQnYXNzZXRzL3RleHR1cmVzL2l0ZW1zL2Jsb2NrX3dvb2QwLnBuZycsXHJcblx0KSxcclxuXHRbSXRlbVR5cGUuV29vZDFCbG9ja106IG5ldyBJbWFnZVJlc291cmNlKFxyXG5cdFx0J2Fzc2V0cy90ZXh0dXJlcy9pdGVtcy9ibG9ja193b29kMS5wbmcnLFxyXG5cdCksXHJcblx0W0l0ZW1UeXBlLldvb2QyQmxvY2tdOiBuZXcgSW1hZ2VSZXNvdXJjZShcclxuXHRcdCdhc3NldHMvdGV4dHVyZXMvaXRlbXMvYmxvY2tfd29vZDIucG5nJyxcclxuXHQpLFxyXG5cdFtJdGVtVHlwZS5Xb29kM0Jsb2NrXTogbmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHQnYXNzZXRzL3RleHR1cmVzL2l0ZW1zL2Jsb2NrX3dvb2QzLnBuZycsXHJcblx0KSxcclxuXHRbSXRlbVR5cGUuV29vZDRCbG9ja106IG5ldyBJbWFnZVJlc291cmNlKFxyXG5cdFx0J2Fzc2V0cy90ZXh0dXJlcy9pdGVtcy9ibG9ja193b29kNC5wbmcnLFxyXG5cdCksXHJcblx0W0l0ZW1UeXBlLldvb2Q1QmxvY2tdOiBuZXcgSW1hZ2VSZXNvdXJjZShcclxuXHRcdCdhc3NldHMvdGV4dHVyZXMvaXRlbXMvYmxvY2tfd29vZDUucG5nJyxcclxuXHQpLFxyXG5cdFtJdGVtVHlwZS5Xb29kNkJsb2NrXTogbmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHQnYXNzZXRzL3RleHR1cmVzL2l0ZW1zL2Jsb2NrX3dvb2Q2LnBuZycsXHJcblx0KSxcclxuXHRbSXRlbVR5cGUuV29vZDdCbG9ja106IG5ldyBJbWFnZVJlc291cmNlKFxyXG5cdFx0J2Fzc2V0cy90ZXh0dXJlcy9pdGVtcy9ibG9ja193b29kNy5wbmcnLFxyXG5cdCksXHJcblx0W0l0ZW1UeXBlLldvb2Q4QmxvY2tdOiBuZXcgSW1hZ2VSZXNvdXJjZShcclxuXHRcdCdhc3NldHMvdGV4dHVyZXMvaXRlbXMvYmxvY2tfd29vZDgucG5nJyxcclxuXHQpLFxyXG5cdFtJdGVtVHlwZS5Xb29kOUJsb2NrXTogbmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHQnYXNzZXRzL3RleHR1cmVzL2l0ZW1zL2Jsb2NrX3dvb2Q5LnBuZycsXHJcblx0KSxcclxuXHRbSXRlbVR5cGUuU2VlZF06IG5ldyBJbWFnZVJlc291cmNlKFxyXG5cdFx0J2Fzc2V0cy90ZXh0dXJlcy9pdGVtcy9zZWVkLnBuZycsXHJcblx0KSxcclxufTtcclxuXHJcbi8vIFVpIHJlbGF0ZWQgYXNzZXRzXHJcbmV4cG9ydCBjb25zdCBVaUFzc2V0cyA9IHtcclxuXHR1aV9zbG90X3NlbGVjdGVkOiBuZXcgSW1hZ2VSZXNvdXJjZShcclxuXHRcdCdhc3NldHMvdGV4dHVyZXMvdWkvdWlzbG90X3NlbGVjdGVkLnBuZycsXHJcblx0KSxcclxuXHR1aV9zbG90OiBuZXcgSW1hZ2VSZXNvdXJjZSgnYXNzZXRzL3RleHR1cmVzL3VpL3Vpc2xvdC5wbmcnKSxcclxuXHR1aV9mcmFtZTogbmV3IEltYWdlUmVzb3VyY2UoJ2Fzc2V0cy90ZXh0dXJlcy91aS91aWZyYW1lLnBuZycpLFxyXG5cdGJ1dHRvbl91bnNlbGVjdGVkOiBuZXcgSW1hZ2VSZXNvdXJjZSgnYXNzZXRzL3RleHR1cmVzL3VpL2J1dHRvbjAucG5nJyksXHJcblx0YnV0dG9uX3NlbGVjdGVkOiBuZXcgSW1hZ2VSZXNvdXJjZSgnYXNzZXRzL3RleHR1cmVzL3VpL2J1dHRvbjEucG5nJyksXHJcblx0c2xpZGVyX2JhcjogbmV3IEltYWdlUmVzb3VyY2UoJ2Fzc2V0cy90ZXh0dXJlcy91aS9zbGlkZXJCYXIucG5nJyksXHJcblx0c2xpZGVyX2hhbmRsZTogbmV3IEltYWdlUmVzb3VyY2UoJ2Fzc2V0cy90ZXh0dXJlcy91aS9zbGlkZXJIYW5kbGUucG5nJyksXHJcblx0dGl0bGVfaW1hZ2U6IG5ldyBJbWFnZVJlc291cmNlKCdhc3NldHMvdGV4dHVyZXMvdWkvc25vd2VkaW5CVU1QLnBuZycpLFxyXG5cdHZpZ25ldHRlOiBuZXcgSW1hZ2VSZXNvdXJjZSgnYXNzZXRzL3RleHR1cmVzL3VpL3ZpZ25ldHRlLWV4cG9ydC5wbmcnKSxcclxuXHRzZWxlY3RlZF90aWxlOiBuZXcgSW1hZ2VSZXNvdXJjZSgnYXNzZXRzL3RleHR1cmVzL3VpL3NlbGVjdGVkdGlsZS5wbmcnKSxcclxufTtcclxuXHJcbi8vIFdvcmxkIHJlbGF0ZWQgYXNzZXRzXHJcbmV4cG9ydCBjb25zdCBXb3JsZEFzc2V0cyA9IHtcclxuXHRzaGFkZXJSZXNvdXJjZXM6IHtcclxuXHRcdHNreUltYWdlOiBuZXcgSW1hZ2VSZXNvdXJjZShcclxuXHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy9zaGFkZXJfcmVzb3VyY2VzL3BvaXNzb25zbm93LnBuZycsXHJcblx0XHQpLFxyXG5cdH0sXHJcblx0bWlkZGxlZ3JvdW5kOiB7XHJcblx0XHR0aWxlc2V0X2ljZTogbmV3IFRpbGVSZXNvdXJjZShcclxuXHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9taWRkbGVncm91bmQvdGlsZXNldF9pY2UucG5nJyxcclxuXHRcdFx0MTYsXHJcblx0XHRcdDEsXHJcblx0XHRcdDgsXHJcblx0XHRcdDgsXHJcblx0XHQpLFxyXG5cdFx0dGlsZXNldF9zbm93OiBuZXcgVGlsZVJlc291cmNlKFxyXG5cdFx0XHQnYXNzZXRzL3RleHR1cmVzL3dvcmxkL21pZGRsZWdyb3VuZC90aWxlc2V0X3Nub3cucG5nJyxcclxuXHRcdFx0MTYsXHJcblx0XHRcdDEsXHJcblx0XHRcdDgsXHJcblx0XHRcdDgsXHJcblx0XHQpLFxyXG5cdFx0dGlsZXNldF9kaXJ0OiBuZXcgVGlsZVJlc291cmNlKFxyXG5cdFx0XHQnYXNzZXRzL3RleHR1cmVzL3dvcmxkL21pZGRsZWdyb3VuZC90aWxlc2V0X2RpcnQwLnBuZycsXHJcblx0XHRcdDE2LFxyXG5cdFx0XHQxLFxyXG5cdFx0XHQ4LFxyXG5cdFx0XHQ4LFxyXG5cdFx0KSxcclxuXHRcdHRpbGVzZXRfc3RvbmUwOiBuZXcgVGlsZVJlc291cmNlKFxyXG5cdFx0XHQnYXNzZXRzL3RleHR1cmVzL3dvcmxkL21pZGRsZWdyb3VuZC90aWxlc2V0X3N0b25lMC5wbmcnLFxyXG5cdFx0XHQxNixcclxuXHRcdFx0MSxcclxuXHRcdFx0OCxcclxuXHRcdFx0OCxcclxuXHRcdCksXHJcblx0XHR0aWxlc2V0X3N0b25lMTogbmV3IFRpbGVSZXNvdXJjZShcclxuXHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9taWRkbGVncm91bmQvdGlsZXNldF9zdG9uZTEucG5nJyxcclxuXHRcdFx0MTYsXHJcblx0XHRcdDEsXHJcblx0XHRcdDgsXHJcblx0XHRcdDgsXHJcblx0XHQpLFxyXG5cdFx0dGlsZXNldF9zdG9uZTI6IG5ldyBUaWxlUmVzb3VyY2UoXHJcblx0XHRcdCdhc3NldHMvdGV4dHVyZXMvd29ybGQvbWlkZGxlZ3JvdW5kL3RpbGVzZXRfc3RvbmUyLnBuZycsXHJcblx0XHRcdDE2LFxyXG5cdFx0XHQxLFxyXG5cdFx0XHQ4LFxyXG5cdFx0XHQ4LFxyXG5cdFx0KSxcclxuXHRcdHRpbGVzZXRfc3RvbmUzOiBuZXcgVGlsZVJlc291cmNlKFxyXG5cdFx0XHQnYXNzZXRzL3RleHR1cmVzL3dvcmxkL21pZGRsZWdyb3VuZC90aWxlc2V0X3N0b25lMy5wbmcnLFxyXG5cdFx0XHQxNixcclxuXHRcdFx0MSxcclxuXHRcdFx0OCxcclxuXHRcdFx0OCxcclxuXHRcdCksXHJcblx0XHR0aWxlc2V0X3N0b25lNDogbmV3IFRpbGVSZXNvdXJjZShcclxuXHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9taWRkbGVncm91bmQvdGlsZXNldF9zdG9uZTQucG5nJyxcclxuXHRcdFx0MTYsXHJcblx0XHRcdDEsXHJcblx0XHRcdDgsXHJcblx0XHRcdDgsXHJcblx0XHQpLFxyXG5cdFx0dGlsZXNldF9zdG9uZTU6IG5ldyBUaWxlUmVzb3VyY2UoXHJcblx0XHRcdCdhc3NldHMvdGV4dHVyZXMvd29ybGQvbWlkZGxlZ3JvdW5kL3RpbGVzZXRfc3RvbmU1LnBuZycsXHJcblx0XHRcdDE2LFxyXG5cdFx0XHQxLFxyXG5cdFx0XHQ4LFxyXG5cdFx0XHQ4LFxyXG5cdFx0KSxcclxuXHRcdHRpbGVzZXRfc3RvbmU2OiBuZXcgVGlsZVJlc291cmNlKFxyXG5cdFx0XHQnYXNzZXRzL3RleHR1cmVzL3dvcmxkL21pZGRsZWdyb3VuZC90aWxlc2V0X3N0b25lNi5wbmcnLFxyXG5cdFx0XHQxNixcclxuXHRcdFx0MSxcclxuXHRcdFx0OCxcclxuXHRcdFx0OCxcclxuXHRcdCksXHJcblx0XHR0aWxlc2V0X3N0b25lNzogbmV3IFRpbGVSZXNvdXJjZShcclxuXHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9taWRkbGVncm91bmQvdGlsZXNldF9zdG9uZTcucG5nJyxcclxuXHRcdFx0MTYsXHJcblx0XHRcdDEsXHJcblx0XHRcdDgsXHJcblx0XHRcdDgsXHJcblx0XHQpLFxyXG5cdFx0dGlsZXNldF9zdG9uZTg6IG5ldyBUaWxlUmVzb3VyY2UoXHJcblx0XHRcdCdhc3NldHMvdGV4dHVyZXMvd29ybGQvbWlkZGxlZ3JvdW5kL3RpbGVzZXRfc3RvbmU4LnBuZycsXHJcblx0XHRcdDE2LFxyXG5cdFx0XHQxLFxyXG5cdFx0XHQ4LFxyXG5cdFx0XHQ4LFxyXG5cdFx0KSxcclxuXHRcdHRpbGVzZXRfc3RvbmU5OiBuZXcgVGlsZVJlc291cmNlKFxyXG5cdFx0XHQnYXNzZXRzL3RleHR1cmVzL3dvcmxkL21pZGRsZWdyb3VuZC90aWxlc2V0X3N0b25lOS5wbmcnLFxyXG5cdFx0XHQxNixcclxuXHRcdFx0MSxcclxuXHRcdFx0OCxcclxuXHRcdFx0OCxcclxuXHRcdCksXHJcblx0XHR0aWxlc2V0X3RpbjogbmV3IFRpbGVSZXNvdXJjZShcclxuXHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9taWRkbGVncm91bmQvdGlsZXNldF90aW4ucG5nJyxcclxuXHRcdFx0MTYsXHJcblx0XHRcdDEsXHJcblx0XHRcdDgsXHJcblx0XHRcdDgsXHJcblx0XHQpLFxyXG5cdFx0dGlsZXNldF9hbHVtaW51bTogbmV3IFRpbGVSZXNvdXJjZShcclxuXHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9taWRkbGVncm91bmQvdGlsZXNldF9hbHVtaW51bS5wbmcnLFxyXG5cdFx0XHQxNixcclxuXHRcdFx0MSxcclxuXHRcdFx0OCxcclxuXHRcdFx0OCxcclxuXHRcdCksXHJcblx0XHR0aWxlc2V0X2dvbGQ6IG5ldyBUaWxlUmVzb3VyY2UoXHJcblx0XHRcdCdhc3NldHMvdGV4dHVyZXMvd29ybGQvbWlkZGxlZ3JvdW5kL3RpbGVzZXRfZ29sZC5wbmcnLFxyXG5cdFx0XHQxNixcclxuXHRcdFx0MSxcclxuXHRcdFx0OCxcclxuXHRcdFx0OCxcclxuXHRcdCksXHJcblx0XHR0aWxlc2V0X3RpdGFuaXVtOiBuZXcgVGlsZVJlc291cmNlKFxyXG5cdFx0XHQnYXNzZXRzL3RleHR1cmVzL3dvcmxkL21pZGRsZWdyb3VuZC90aWxlc2V0X3RpdGFuaXVtLnBuZycsXHJcblx0XHRcdDE2LFxyXG5cdFx0XHQxLFxyXG5cdFx0XHQ4LFxyXG5cdFx0XHQ4LFxyXG5cdFx0KSxcclxuXHRcdHRpbGVzZXRfZ3JhcGU6IG5ldyBUaWxlUmVzb3VyY2UoXHJcblx0XHRcdCdhc3NldHMvdGV4dHVyZXMvd29ybGQvbWlkZGxlZ3JvdW5kL3RpbGVzZXRfZ3JhcGUucG5nJyxcclxuXHRcdFx0MTYsXHJcblx0XHRcdDEsXHJcblx0XHRcdDgsXHJcblx0XHRcdDgsXHJcblx0XHQpLFxyXG5cdFx0dGlsZXNldF93b29kMDogbmV3IFRpbGVSZXNvdXJjZShcclxuXHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9taWRkbGVncm91bmQvd29vZDAucG5nJyxcclxuXHRcdFx0MSxcclxuXHRcdFx0MSxcclxuXHRcdFx0OCxcclxuXHRcdFx0OCxcclxuXHRcdCksXHJcblx0XHR0aWxlc2V0X3dvb2QxOiBuZXcgVGlsZVJlc291cmNlKFxyXG5cdFx0XHQnYXNzZXRzL3RleHR1cmVzL3dvcmxkL21pZGRsZWdyb3VuZC90aWxlc2V0X3dvb2QxLnBuZycsXHJcblx0XHRcdDE2LFxyXG5cdFx0XHQxLFxyXG5cdFx0XHQ4LFxyXG5cdFx0XHQ4LFxyXG5cdFx0KSxcclxuXHRcdHRpbGVzZXRfd29vZDI6IG5ldyBUaWxlUmVzb3VyY2UoXHJcblx0XHRcdCdhc3NldHMvdGV4dHVyZXMvd29ybGQvbWlkZGxlZ3JvdW5kL3RpbGVzZXRfd29vZDIucG5nJyxcclxuXHRcdFx0MTYsXHJcblx0XHRcdDEsXHJcblx0XHRcdDgsXHJcblx0XHRcdDgsXHJcblx0XHQpLFxyXG5cdFx0dGlsZXNldF93b29kMzogbmV3IFRpbGVSZXNvdXJjZShcclxuXHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9taWRkbGVncm91bmQvdGlsZXNldF93b29kMy5wbmcnLFxyXG5cdFx0XHQxNixcclxuXHRcdFx0MSxcclxuXHRcdFx0OCxcclxuXHRcdFx0OCxcclxuXHRcdCksXHJcblx0XHR0aWxlc2V0X3dvb2Q0OiBuZXcgVGlsZVJlc291cmNlKFxyXG5cdFx0XHQnYXNzZXRzL3RleHR1cmVzL3dvcmxkL21pZGRsZWdyb3VuZC90aWxlc2V0X3dvb2Q0LnBuZycsXHJcblx0XHRcdDE2LFxyXG5cdFx0XHQxLFxyXG5cdFx0XHQ4LFxyXG5cdFx0XHQ4LFxyXG5cdFx0KSxcclxuXHRcdHRpbGVzZXRfd29vZDU6IG5ldyBUaWxlUmVzb3VyY2UoXHJcblx0XHRcdCdhc3NldHMvdGV4dHVyZXMvd29ybGQvbWlkZGxlZ3JvdW5kL3RpbGVzZXRfd29vZDUucG5nJyxcclxuXHRcdFx0MTYsXHJcblx0XHRcdDEsXHJcblx0XHRcdDgsXHJcblx0XHRcdDgsXHJcblx0XHQpLFxyXG5cdFx0dGlsZXNldF93b29kNjogbmV3IFRpbGVSZXNvdXJjZShcclxuXHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9taWRkbGVncm91bmQvdGlsZXNldF93b29kNi5wbmcnLFxyXG5cdFx0XHQxNixcclxuXHRcdFx0MSxcclxuXHRcdFx0OCxcclxuXHRcdFx0OCxcclxuXHRcdCksXHJcblx0XHR0aWxlc2V0X3dvb2Q3OiBuZXcgVGlsZVJlc291cmNlKFxyXG5cdFx0XHQnYXNzZXRzL3RleHR1cmVzL3dvcmxkL21pZGRsZWdyb3VuZC90aWxlc2V0X3dvb2Q3LnBuZycsXHJcblx0XHRcdDE2LFxyXG5cdFx0XHQxLFxyXG5cdFx0XHQ4LFxyXG5cdFx0XHQ4LFxyXG5cdFx0KSxcclxuXHRcdHRpbGVzZXRfd29vZDg6IG5ldyBUaWxlUmVzb3VyY2UoXHJcblx0XHRcdCdhc3NldHMvdGV4dHVyZXMvd29ybGQvbWlkZGxlZ3JvdW5kL3RpbGVzZXRfd29vZDgucG5nJyxcclxuXHRcdFx0MTYsXHJcblx0XHRcdDEsXHJcblx0XHRcdDgsXHJcblx0XHRcdDgsXHJcblx0XHQpLFxyXG5cdFx0dGlsZXNldF93b29kOTogbmV3IFRpbGVSZXNvdXJjZShcclxuXHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9taWRkbGVncm91bmQvdGlsZXNldF93b29kOS5wbmcnLFxyXG5cdFx0XHQxNixcclxuXHRcdFx0MSxcclxuXHRcdFx0OCxcclxuXHRcdFx0OCxcclxuXHRcdCksXHJcblx0fSxcclxuXHRmb3JlZ3JvdW5kOiB7XHJcblx0XHRcclxuXHR9LFxyXG5cdHRpbGVFbnRpdGllczogW1xyXG5cdFx0Wy8vdHJlZVxyXG5cdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdCdhc3NldHMvdGV4dHVyZXMvd29ybGQvdGlsZUVudGl0aWVzL3RyZWVzL1RyZWUxLnBuZycsXHJcblx0XHQpLFxyXG5cdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdCdhc3NldHMvdGV4dHVyZXMvd29ybGQvdGlsZUVudGl0aWVzL3RyZWVzL1RyZWUyLnBuZycsXHJcblx0XHQpLFxyXG5cdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdCdhc3NldHMvdGV4dHVyZXMvd29ybGQvdGlsZUVudGl0aWVzL3RyZWVzL1RyZWUzLnBuZycsXHJcblx0XHQpLFxyXG5cdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdCdhc3NldHMvdGV4dHVyZXMvd29ybGQvdGlsZUVudGl0aWVzL3RyZWVzL1RyZWU0LnBuZycsXHJcblx0XHQpLFxyXG5cdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdCdhc3NldHMvdGV4dHVyZXMvd29ybGQvdGlsZUVudGl0aWVzL3RyZWVzL1RyZWU1LnBuZycsXHJcblx0XHQpLFxyXG5cdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdCdhc3NldHMvdGV4dHVyZXMvd29ybGQvdGlsZUVudGl0aWVzL3RyZWVzL1RyZWU2LnBuZycsXHJcblx0XHQpLFxyXG5cdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdCdhc3NldHMvdGV4dHVyZXMvd29ybGQvdGlsZUVudGl0aWVzL3RyZWVzL1RyZWU3LnBuZycsXHJcblx0XHQpLFxyXG5cdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdCdhc3NldHMvdGV4dHVyZXMvd29ybGQvdGlsZUVudGl0aWVzL3RyZWVzL1RyZWU4LnBuZycsXHJcblx0XHQpLFxyXG5cdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdCdhc3NldHMvdGV4dHVyZXMvd29ybGQvdGlsZUVudGl0aWVzL3RyZWVzL1RyZWU5LnBuZycsXHJcblx0XHQpLFxyXG5cdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdCdhc3NldHMvdGV4dHVyZXMvd29ybGQvdGlsZUVudGl0aWVzL3RyZWVzL1RyZWUxMC5wbmcnLFxyXG5cdFx0KSxcclxuXHRcdF0sXHJcblx0XHRbLy9kcmlsbCB0aWVyIDFcclxuXHRcdG5ldyBJbWFnZVJlc291cmNlKFxyXG5cdFx0XHQnYXNzZXRzL3RleHR1cmVzL3dvcmxkL3RpbGVFbnRpdGllcy9SdXN0eSBEcmlsbC9SdXN0eURyaWxsMS5wbmcnLFxyXG5cdFx0KSxcclxuXHRcdG5ldyBJbWFnZVJlc291cmNlKFxyXG5cdFx0XHQnYXNzZXRzL3RleHR1cmVzL3dvcmxkL3RpbGVFbnRpdGllcy9SdXN0eSBEcmlsbC9SdXN0eURyaWxsMi5wbmcnLFxyXG5cdFx0KSxcclxuXHRcdG5ldyBJbWFnZVJlc291cmNlKFxyXG5cdFx0XHQnYXNzZXRzL3RleHR1cmVzL3dvcmxkL3RpbGVFbnRpdGllcy9SdXN0eSBEcmlsbC9SdXN0eURyaWxsMy5wbmcnLFxyXG5cdFx0KSxcclxuXHRcdG5ldyBJbWFnZVJlc291cmNlKFxyXG5cdFx0XHQnYXNzZXRzL3RleHR1cmVzL3dvcmxkL3RpbGVFbnRpdGllcy9SdXN0eSBEcmlsbC9SdXN0eURyaWxsNC5wbmcnLFxyXG5cdFx0KSxcclxuXHRcdG5ldyBJbWFnZVJlc291cmNlKFxyXG5cdFx0XHQnYXNzZXRzL3RleHR1cmVzL3dvcmxkL3RpbGVFbnRpdGllcy9SdXN0eSBEcmlsbC9SdXN0eURyaWxsNS5wbmcnLFxyXG5cdFx0KSxcclxuXHRcdG5ldyBJbWFnZVJlc291cmNlKFxyXG5cdFx0XHQnYXNzZXRzL3RleHR1cmVzL3dvcmxkL3RpbGVFbnRpdGllcy9SdXN0eSBEcmlsbC9SdXN0eURyaWxsNi5wbmcnLFxyXG5cdFx0KSxcclxuXHRcdG5ldyBJbWFnZVJlc291cmNlKFxyXG5cdFx0XHQnYXNzZXRzL3RleHR1cmVzL3dvcmxkL3RpbGVFbnRpdGllcy9SdXN0eSBEcmlsbC9SdXN0eURyaWxsNy5wbmcnLFxyXG5cdFx0KSxcclxuXHRcdG5ldyBJbWFnZVJlc291cmNlKFxyXG5cdFx0XHQnYXNzZXRzL3RleHR1cmVzL3dvcmxkL3RpbGVFbnRpdGllcy9SdXN0eSBEcmlsbC9SdXN0eURyaWxsOC5wbmcnLFxyXG5cdFx0KSxcclxuXHRcdG5ldyBJbWFnZVJlc291cmNlKFxyXG5cdFx0XHQnYXNzZXRzL3RleHR1cmVzL3dvcmxkL3RpbGVFbnRpdGllcy9SdXN0eSBEcmlsbC9SdXN0eURyaWxsOS5wbmcnLFxyXG5cdFx0KSxcclxuXHRcdG5ldyBJbWFnZVJlc291cmNlKFxyXG5cdFx0XHQnYXNzZXRzL3RleHR1cmVzL3dvcmxkL3RpbGVFbnRpdGllcy9SdXN0eSBEcmlsbC9SdXN0eURyaWxsMTAucG5nJyxcclxuXHRcdCksXHJcblx0XHRuZXcgSW1hZ2VSZXNvdXJjZShcclxuXHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC90aWxlRW50aXRpZXMvUnVzdHkgRHJpbGwvUnVzdHlEcmlsbDExLnBuZycsXHJcblx0XHQpLFxyXG5cdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdCdhc3NldHMvdGV4dHVyZXMvd29ybGQvdGlsZUVudGl0aWVzL1J1c3R5IERyaWxsL1J1c3R5RHJpbGwxMi5wbmcnLFxyXG5cdFx0KSxcclxuXHRcdG5ldyBJbWFnZVJlc291cmNlKFxyXG5cdFx0XHQnYXNzZXRzL3RleHR1cmVzL3dvcmxkL3RpbGVFbnRpdGllcy9SdXN0eSBEcmlsbC9SdXN0eURyaWxsMTMucG5nJyxcclxuXHRcdCksXHJcblx0XHRdLFxyXG5cdFx0Wy8vZHJpbGwgdGllciAyXHJcblxyXG5cdFx0XSxcclxuXHRcdFsvL2RyaWxsIHRpZXIgM1xyXG5cclxuXHRcdF0sXHJcblx0XHRbLy9kcmlsbCB0aWVyIDRcclxuXHJcblx0XHRdLFxyXG5cdFx0Wy8vZHJpbGwgdGllciA1XHJcblxyXG5cdFx0XSxcclxuXHRcdFsvL2NyYWZ0aW5nIGJlbmNoXHJcblx0XHRuZXcgSW1hZ2VSZXNvdXJjZShcclxuXHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC90aWxlRW50aXRpZXMvbWlzYy9jcmFmdGluZ0JlbmNoLnBuZycsXHJcblx0XHQpLFxyXG5cdFx0XSxcclxuXHRcdFsvL3NhcGxpbmcvc2VlZFxyXG5cdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdCdhc3NldHMvdGV4dHVyZXMvd29ybGQvdGlsZUVudGl0aWVzL3RyZWVzL3NhcGxpbmcucG5nJyxcclxuXHRcdCksXHJcblx0XHRdXHJcblx0XSxcclxuXHRlbnRpdGllczoge1xyXG5cdFx0ZW50aXR5X3QxZHJvbmU6IFtcclxuXHRcdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9lbnRpdGllcy9TbWFsbCBEcm9uZS9TbWFsbERyb25lMDEucG5nJyxcclxuXHRcdFx0KSxcclxuXHRcdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9lbnRpdGllcy9TbWFsbCBEcm9uZS9TbWFsbERyb25lMDIucG5nJyxcclxuXHRcdFx0KSxcclxuXHRcdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9lbnRpdGllcy9TbWFsbCBEcm9uZS9TbWFsbERyb25lMDMucG5nJyxcclxuXHRcdFx0KSxcclxuXHRcdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9lbnRpdGllcy9TbWFsbCBEcm9uZS9TbWFsbERyb25lMDQucG5nJyxcclxuXHRcdFx0KSxcclxuXHRcdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9lbnRpdGllcy9TbWFsbCBEcm9uZS9TbWFsbERyb25lMDUucG5nJyxcclxuXHRcdFx0KSxcclxuXHRcdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9lbnRpdGllcy9TbWFsbCBEcm9uZS9TbWFsbERyb25lMDYucG5nJyxcclxuXHRcdFx0KSxcclxuXHRcdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9lbnRpdGllcy9TbWFsbCBEcm9uZS9TbWFsbERyb25lMDcucG5nJyxcclxuXHRcdFx0KSxcclxuXHRcdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9lbnRpdGllcy9TbWFsbCBEcm9uZS9TbWFsbERyb25lMDgucG5nJyxcclxuXHRcdFx0KSxcclxuXHRcdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9lbnRpdGllcy9TbWFsbCBEcm9uZS9TbWFsbERyb25lMDkucG5nJyxcclxuXHRcdFx0KSxcclxuXHRcdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9lbnRpdGllcy9TbWFsbCBEcm9uZS9TbWFsbERyb25lMTAucG5nJyxcclxuXHRcdFx0KSxcclxuXHRcdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9lbnRpdGllcy9TbWFsbCBEcm9uZS9TbWFsbERyb25lMTEucG5nJyxcclxuXHRcdFx0KSxcclxuXHRcdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9lbnRpdGllcy9TbWFsbCBEcm9uZS9TbWFsbERyb25lMTIucG5nJyxcclxuXHRcdFx0KSxcclxuXHRcdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9lbnRpdGllcy9TbWFsbCBEcm9uZS9TbWFsbERyb25lMTMucG5nJyxcclxuXHRcdFx0KSxcclxuXHRcdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9lbnRpdGllcy9TbWFsbCBEcm9uZS9TbWFsbERyb25lMTQucG5nJyxcclxuXHRcdFx0KSxcclxuXHRcdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9lbnRpdGllcy9TbWFsbCBEcm9uZS9TbWFsbERyb25lMTUucG5nJyxcclxuXHRcdFx0KSxcclxuXHRcdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9lbnRpdGllcy9TbWFsbCBEcm9uZS9TbWFsbERyb25lMTYucG5nJyxcclxuXHRcdFx0KSxcclxuXHRcdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9lbnRpdGllcy9TbWFsbCBEcm9uZS9TbWFsbERyb25lMTcucG5nJyxcclxuXHRcdFx0KSxcclxuXHRcdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9lbnRpdGllcy9TbWFsbCBEcm9uZS9TbWFsbERyb25lMTgucG5nJyxcclxuXHRcdFx0KSxcclxuXHRcdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9lbnRpdGllcy9TbWFsbCBEcm9uZS9TbWFsbERyb25lMTkucG5nJyxcclxuXHRcdFx0KSxcclxuXHRcdFx0bmV3IEltYWdlUmVzb3VyY2UoXHJcblx0XHRcdFx0J2Fzc2V0cy90ZXh0dXJlcy93b3JsZC9lbnRpdGllcy9TbWFsbCBEcm9uZS9TbWFsbERyb25lMjAucG5nJyxcclxuXHRcdFx0KSxcclxuXHRcdF0sXHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IEZvbnRzID0ge1xyXG5cdHRpdGxlOiBuZXcgRm9udFJlc291cmNlKFxyXG5cdFx0J2Fzc2V0cy90ZXh0dXJlcy91aS9mb250LnBuZycsXHJcblx0XHR7XHJcblx0XHRcdCcwJzogNyxcclxuXHRcdFx0JzEnOiA3LFxyXG5cdFx0XHQnMic6IDcsXHJcblx0XHRcdCczJzogNixcclxuXHRcdFx0JzQnOiA2LFxyXG5cdFx0XHQnNSc6IDYsXHJcblx0XHRcdCc2JzogNixcclxuXHRcdFx0JzcnOiA3LFxyXG5cdFx0XHQnOCc6IDcsXHJcblx0XHRcdCc5JzogNixcclxuXHRcdFx0J0EnOiA2LFxyXG5cdFx0XHQnQic6IDcsXHJcblx0XHRcdCdDJzogNyxcclxuXHRcdFx0J0QnOiA2LFxyXG5cdFx0XHQnRSc6IDcsXHJcblx0XHRcdCdGJzogNixcclxuXHRcdFx0J0cnOiA3LFxyXG5cdFx0XHQnSCc6IDcsXHJcblx0XHRcdCdJJzogNyxcclxuXHRcdFx0J0onOiA4LFxyXG5cdFx0XHQnSyc6IDYsXHJcblx0XHRcdCdMJzogNixcclxuXHRcdFx0J00nOiA4LFxyXG5cdFx0XHQnTic6IDgsXHJcblx0XHRcdCdPJzogOCxcclxuXHRcdFx0J1AnOiA5LFxyXG5cdFx0XHQnUSc6IDgsXHJcblx0XHRcdCdSJzogNyxcclxuXHRcdFx0J1MnOiA3LFxyXG5cdFx0XHQnVCc6IDgsXHJcblx0XHRcdCdVJzogOCxcclxuXHRcdFx0J1YnOiA4LFxyXG5cdFx0XHQnVyc6IDEwLFxyXG5cdFx0XHQnWCc6IDgsXHJcblx0XHRcdCdZJzogOCxcclxuXHRcdFx0J1onOiA5LFxyXG5cdFx0XHQnYSc6IDcsXHJcblx0XHRcdCdiJzogNyxcclxuXHRcdFx0J2MnOiA2LFxyXG5cdFx0XHQnZCc6IDcsXHJcblx0XHRcdCdlJzogNixcclxuXHRcdFx0J2YnOiA2LFxyXG5cdFx0XHQnZyc6IDYsXHJcblx0XHRcdCdoJzogNixcclxuXHRcdFx0J2knOiA1LFxyXG5cdFx0XHQnaic6IDYsXHJcblx0XHRcdCdrJzogNSxcclxuXHRcdFx0J2wnOiA1LFxyXG5cdFx0XHQnbSc6IDgsXHJcblx0XHRcdCduJzogNSxcclxuXHRcdFx0J28nOiA1LFxyXG5cdFx0XHQncCc6IDUsXHJcblx0XHRcdCdxJzogNyxcclxuXHRcdFx0J3InOiA1LFxyXG5cdFx0XHQncyc6IDQsXHJcblx0XHRcdCd0JzogNSxcclxuXHRcdFx0J3UnOiA1LFxyXG5cdFx0XHQndic6IDUsXHJcblx0XHRcdCd3JzogNyxcclxuXHRcdFx0J3gnOiA2LFxyXG5cdFx0XHQneSc6IDUsXHJcblx0XHRcdCd6JzogNSxcclxuXHRcdFx0JyEnOiA0LFxyXG5cdFx0XHQnLic6IDIsXHJcblx0XHRcdCcsJzogMixcclxuXHRcdFx0Jz8nOiA2LFxyXG5cdFx0XHQnXyc6IDYsXHJcblx0XHRcdCctJzogNCxcclxuXHRcdFx0JzonOiAyLFxyXG5cdFx0XHQn4oaRJzogNyxcclxuXHRcdFx0J+KGkyc6IDcsXHJcblx0XHRcdCcgJzogMixcclxuXHRcdH0sXHJcblx0XHQnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkhLiw/Xy064oaR4oaTICcsXHJcblx0XHQxMixcclxuXHQpLFxyXG5cclxuXHRiaWc6IG5ldyBGb250UmVzb3VyY2UoXHJcblx0XHQnYXNzZXRzL3RleHR1cmVzL3VpL2ZvbnRCaWcucG5nJyxcclxuXHRcdHtcclxuXHRcdFx0JzAnOiAxNSxcclxuXHRcdFx0JzEnOiAxNCxcclxuXHRcdFx0JzInOiAxNCxcclxuXHRcdFx0JzMnOiAxMyxcclxuXHRcdFx0JzQnOiAxMixcclxuXHRcdFx0JzUnOiAxMyxcclxuXHRcdFx0JzYnOiAxMixcclxuXHRcdFx0JzcnOiAxNCxcclxuXHRcdFx0JzgnOiAxNSxcclxuXHRcdFx0JzknOiAxMixcclxuXHRcdFx0J0EnOiAxMyxcclxuXHRcdFx0J0InOiAxNCxcclxuXHRcdFx0J0MnOiAxNSxcclxuXHRcdFx0J0QnOiAxMixcclxuXHRcdFx0J0UnOiAxNCxcclxuXHRcdFx0J0YnOiAxMyxcclxuXHRcdFx0J0cnOiAxNCxcclxuXHRcdFx0J0gnOiAxNSxcclxuXHRcdFx0J0knOiAxNSxcclxuXHRcdFx0J0onOiAxNixcclxuXHRcdFx0J0snOiAxMixcclxuXHRcdFx0J0wnOiAxMyxcclxuXHRcdFx0J00nOiAxNixcclxuXHRcdFx0J04nOiAxNyxcclxuXHRcdFx0J08nOiAxNyxcclxuXHRcdFx0J1AnOiAxOSxcclxuXHRcdFx0J1EnOiAxNyxcclxuXHRcdFx0J1InOiAxNCxcclxuXHRcdFx0J1MnOiAxNSxcclxuXHRcdFx0J1QnOiAxNyxcclxuXHRcdFx0J1UnOiAxNixcclxuXHRcdFx0J1YnOiAxNyxcclxuXHRcdFx0J1cnOiAyMSxcclxuXHRcdFx0J1gnOiAxNyxcclxuXHRcdFx0J1knOiAxNyxcclxuXHRcdFx0J1onOiAxOSxcclxuXHRcdFx0J2EnOiAxMixcclxuXHRcdFx0J2InOiAxNSxcclxuXHRcdFx0J2MnOiAxMixcclxuXHRcdFx0J2QnOiAxNSxcclxuXHRcdFx0J2UnOiAxMyxcclxuXHRcdFx0J2YnOiAxMixcclxuXHRcdFx0J2cnOiAxMyxcclxuXHRcdFx0J2gnOiAxMixcclxuXHRcdFx0J2knOiAxMSxcclxuXHRcdFx0J2onOiAxMixcclxuXHRcdFx0J2snOiAxMCxcclxuXHRcdFx0J2wnOiAxMCxcclxuXHRcdFx0J20nOiAxNixcclxuXHRcdFx0J24nOiAxMSxcclxuXHRcdFx0J28nOiAxMCxcclxuXHRcdFx0J3AnOiAxMSxcclxuXHRcdFx0J3EnOiAxNCxcclxuXHRcdFx0J3InOiAxMSxcclxuXHRcdFx0J3MnOiA4LFxyXG5cdFx0XHQndCc6IDExLFxyXG5cdFx0XHQndSc6IDEwLFxyXG5cdFx0XHQndic6IDExLFxyXG5cdFx0XHQndyc6IDE1LFxyXG5cdFx0XHQneCc6IDEyLFxyXG5cdFx0XHQneSc6IDExLFxyXG5cdFx0XHQneic6IDEwLFxyXG5cdFx0XHQnISc6IDksXHJcblx0XHRcdCcuJzogNCxcclxuXHRcdFx0JywnOiA0LFxyXG5cdFx0XHQnPyc6IDEzLFxyXG5cdFx0XHQnXyc6IDEzLFxyXG5cdFx0XHQnLSc6IDgsXHJcblx0XHRcdCc6JzogNCxcclxuXHRcdFx0JyAnOiA0LFxyXG5cdFx0fSxcclxuXHRcdCdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSEuLD9fLTogJyxcclxuXHRcdDI0LFxyXG5cdCksXHJcblx0dG9tX3RodW1iOiBuZXcgRm9udFJlc291cmNlKFxyXG5cdFx0J2Fzc2V0cy90ZXh0dXJlcy91aS90b21fdGh1bWIucG5nJyxcclxuXHRcdHtcclxuXHRcdFx0J0EnOiAzLFxyXG5cdFx0XHQnQic6IDMsXHJcblx0XHRcdCdDJzogMyxcclxuXHRcdFx0J0QnOiAzLFxyXG5cdFx0XHQnRSc6IDMsXHJcblx0XHRcdCdGJzogMyxcclxuXHRcdFx0J0cnOiAzLFxyXG5cdFx0XHQnSCc6IDMsXHJcblx0XHRcdCdJJzogMyxcclxuXHRcdFx0J0onOiAzLFxyXG5cdFx0XHQnSyc6IDMsXHJcblx0XHRcdCdMJzogMyxcclxuXHRcdFx0J00nOiAzLFxyXG5cdFx0XHQnTic6IDMsXHJcblx0XHRcdCdPJzogMyxcclxuXHRcdFx0J1AnOiAzLFxyXG5cdFx0XHQnUSc6IDMsXHJcblx0XHRcdCdSJzogMyxcclxuXHRcdFx0J1MnOiAzLFxyXG5cdFx0XHQnVCc6IDMsXHJcblx0XHRcdCdVJzogMyxcclxuXHRcdFx0J1YnOiAzLFxyXG5cdFx0XHQnVyc6IDMsXHJcblx0XHRcdCdYJzogMyxcclxuXHRcdFx0J1knOiAzLFxyXG5cdFx0XHQnWic6IDMsXHJcblx0XHRcdCdhJzogMyxcclxuXHRcdFx0J2InOiAzLFxyXG5cdFx0XHQnYyc6IDMsXHJcblx0XHRcdCdkJzogMyxcclxuXHRcdFx0J2UnOiAzLFxyXG5cdFx0XHQnZic6IDMsXHJcblx0XHRcdCdnJzogMyxcclxuXHRcdFx0J2gnOiAzLFxyXG5cdFx0XHQnaSc6IDMsXHJcblx0XHRcdCdqJzogMyxcclxuXHRcdFx0J2snOiAzLFxyXG5cdFx0XHQnbCc6IDMsXHJcblx0XHRcdCdtJzogMyxcclxuXHRcdFx0J24nOiAzLFxyXG5cdFx0XHQnbyc6IDMsXHJcblx0XHRcdCdwJzogMyxcclxuXHRcdFx0J3EnOiAzLFxyXG5cdFx0XHQncic6IDMsXHJcblx0XHRcdCdzJzogMyxcclxuXHRcdFx0J3QnOiAzLFxyXG5cdFx0XHQndSc6IDMsXHJcblx0XHRcdCd2JzogMyxcclxuXHRcdFx0J3cnOiAzLFxyXG5cdFx0XHQneCc6IDMsXHJcblx0XHRcdCd5JzogMyxcclxuXHRcdFx0J3onOiAzLFxyXG5cdFx0XHQnWyc6IDMsXHJcblx0XHRcdCdcXFxcJzogMyxcclxuXHRcdFx0J10nOiAzLFxyXG5cdFx0XHQnXic6IDMsXHJcblx0XHRcdCcgJzogMyxcclxuXHRcdFx0JyEnOiAzLFxyXG5cdFx0XHQnXCInOiAzLFxyXG5cdFx0XHQnIyc6IDMsXHJcblx0XHRcdCckJzogMyxcclxuXHRcdFx0JyUnOiAzLFxyXG5cdFx0XHQnJic6IDMsXHJcblx0XHRcdFwiJ1wiOiAzLFxyXG5cdFx0XHQnKCc6IDMsXHJcblx0XHRcdCcpJzogMyxcclxuXHRcdFx0JyonOiAzLFxyXG5cdFx0XHQnKyc6IDMsXHJcblx0XHRcdCcsJzogMyxcclxuXHRcdFx0Jy0nOiAzLFxyXG5cdFx0XHQnLic6IDMsXHJcblx0XHRcdCcvJzogMyxcclxuXHRcdFx0JzAnOiAzLFxyXG5cdFx0XHQnMSc6IDMsXHJcblx0XHRcdCcyJzogMyxcclxuXHRcdFx0JzMnOiAzLFxyXG5cdFx0XHQnNCc6IDMsXHJcblx0XHRcdCc1JzogMyxcclxuXHRcdFx0JzYnOiAzLFxyXG5cdFx0XHQnNyc6IDMsXHJcblx0XHRcdCc4JzogMyxcclxuXHRcdFx0JzknOiAzLFxyXG5cdFx0XHQnOic6IDMsXHJcblx0XHRcdCc7JzogMyxcclxuXHRcdFx0JzwnOiAzLFxyXG5cdFx0XHQnPSc6IDMsXHJcblx0XHRcdCc+JzogMyxcclxuXHRcdFx0Jz8nOiAzLFxyXG5cdFx0fSxcclxuXHRcdGBBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6W1xcXFxdXiAhXCIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P2AsXHJcblx0XHQ1LFxyXG5cdCksXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgS2V5cyA9IHtcclxuXHRrZXlib2FyZE1hcDogW1xyXG5cdFx0JycsIC8vIFswXVxyXG5cdFx0JycsIC8vIFsxXVxyXG5cdFx0JycsIC8vIFsyXVxyXG5cdFx0J0NBTkNFTCcsIC8vIFszXVxyXG5cdFx0JycsIC8vIFs0XVxyXG5cdFx0JycsIC8vIFs1XVxyXG5cdFx0J0hFTFAnLCAvLyBbNl1cclxuXHRcdCcnLCAvLyBbN11cclxuXHRcdCdCQUNLU1BBQ0UnLCAvLyBbOF1cclxuXHRcdCdUQUInLCAvLyBbOV1cclxuXHRcdCcnLCAvLyBbMTBdXHJcblx0XHQnJywgLy8gWzExXVxyXG5cdFx0J0NMRUFSJywgLy8gWzEyXVxyXG5cdFx0J0VOVEVSJywgLy8gWzEzXVxyXG5cdFx0J0VOVEVSIFNQRUNJQUwnLCAvLyBbMTRdXHJcblx0XHQnJywgLy8gWzE1XVxyXG5cdFx0J1NISUZUJywgLy8gWzE2XVxyXG5cdFx0J0NPTlRST0wnLCAvLyBbMTddXHJcblx0XHQnQUxUJywgLy8gWzE4XVxyXG5cdFx0J1BBVVNFJywgLy8gWzE5XVxyXG5cdFx0J0NBUFMgTE9DSycsIC8vIFsyMF1cclxuXHRcdCdLQU5BJywgLy8gWzIxXVxyXG5cdFx0J0VJU1UnLCAvLyBbMjJdXHJcblx0XHQnSlVOSkEnLCAvLyBbMjNdXHJcblx0XHQnRklOQUwnLCAvLyBbMjRdXHJcblx0XHQnSEFOSkEnLCAvLyBbMjVdXHJcblx0XHQnJywgLy8gWzI2XVxyXG5cdFx0J0VTQ0FQRScsIC8vIFsyN11cclxuXHRcdCdDT05WRVJUJywgLy8gWzI4XVxyXG5cdFx0J05PTkNPTlZFUlQnLCAvLyBbMjldXHJcblx0XHQnQUNDRVBUJywgLy8gWzMwXVxyXG5cdFx0J01PREVDSEFOR0UnLCAvLyBbMzFdXHJcblx0XHQnU1BBQ0UnLCAvLyBbMzJdXHJcblx0XHQnUEFHRSBVUCcsIC8vIFszM11cclxuXHRcdCdQQUdFIERPV04nLCAvLyBbMzRdXHJcblx0XHQnRU5EJywgLy8gWzM1XVxyXG5cdFx0J0hPTUUnLCAvLyBbMzZdXHJcblx0XHQnTEVGVCcsIC8vIFszN11cclxuXHRcdCdVUCcsIC8vIFszOF1cclxuXHRcdCdSSUdIVCcsIC8vIFszOV1cclxuXHRcdCdET1dOJywgLy8gWzQwXVxyXG5cdFx0J1NFTEVDVCcsIC8vIFs0MV1cclxuXHRcdCdQUklOVCcsIC8vIFs0Ml1cclxuXHRcdCdFWEVDVVRFJywgLy8gWzQzXVxyXG5cdFx0J1BSSU5UIFNDUkVFTicsIC8vIFs0NF1cclxuXHRcdCdJTlNFUlQnLCAvLyBbNDVdXHJcblx0XHQnREVMRVRFJywgLy8gWzQ2XVxyXG5cdFx0JycsIC8vIFs0N11cclxuXHRcdCcwJywgLy8gWzQ4XVxyXG5cdFx0JzEnLCAvLyBbNDldXHJcblx0XHQnMicsIC8vIFs1MF1cclxuXHRcdCczJywgLy8gWzUxXVxyXG5cdFx0JzQnLCAvLyBbNTJdXHJcblx0XHQnNScsIC8vIFs1M11cclxuXHRcdCc2JywgLy8gWzU0XVxyXG5cdFx0JzcnLCAvLyBbNTVdXHJcblx0XHQnOCcsIC8vIFs1Nl1cclxuXHRcdCc5JywgLy8gWzU3XVxyXG5cdFx0J0NPTE9OJywgLy8gWzU4XVxyXG5cdFx0J1NFTUlDT0xPTicsIC8vIFs1OV1cclxuXHRcdCdMRVNTIFRIQU4nLCAvLyBbNjBdXHJcblx0XHQnRVFVQUxTJywgLy8gWzYxXVxyXG5cdFx0J0dSRUFURVIgVEhBTicsIC8vIFs2Ml1cclxuXHRcdCdRVUVTVElPTiBNQVJLJywgLy8gWzYzXVxyXG5cdFx0J0FUJywgLy8gWzY0XVxyXG5cdFx0J0EnLCAvLyBbNjVdXHJcblx0XHQnQicsIC8vIFs2Nl1cclxuXHRcdCdDJywgLy8gWzY3XVxyXG5cdFx0J0QnLCAvLyBbNjhdXHJcblx0XHQnRScsIC8vIFs2OV1cclxuXHRcdCdGJywgLy8gWzcwXVxyXG5cdFx0J0cnLCAvLyBbNzFdXHJcblx0XHQnSCcsIC8vIFs3Ml1cclxuXHRcdCdJJywgLy8gWzczXVxyXG5cdFx0J0onLCAvLyBbNzRdXHJcblx0XHQnSycsIC8vIFs3NV1cclxuXHRcdCdMJywgLy8gWzc2XVxyXG5cdFx0J00nLCAvLyBbNzddXHJcblx0XHQnTicsIC8vIFs3OF1cclxuXHRcdCdPJywgLy8gWzc5XVxyXG5cdFx0J1AnLCAvLyBbODBdXHJcblx0XHQnUScsIC8vIFs4MV1cclxuXHRcdCdSJywgLy8gWzgyXVxyXG5cdFx0J1MnLCAvLyBbODNdXHJcblx0XHQnVCcsIC8vIFs4NF1cclxuXHRcdCdVJywgLy8gWzg1XVxyXG5cdFx0J1YnLCAvLyBbODZdXHJcblx0XHQnVycsIC8vIFs4N11cclxuXHRcdCdYJywgLy8gWzg4XVxyXG5cdFx0J1knLCAvLyBbODldXHJcblx0XHQnWicsIC8vIFs5MF1cclxuXHRcdCdPUyBLRVknLCAvLyBbOTFdIFdpbmRvd3MgS2V5IChXaW5kb3dzKSBvciBDb21tYW5kIEtleSAoTWFjKVxyXG5cdFx0JycsIC8vIFs5Ml1cclxuXHRcdCdDT05URVhUIE1FTlUnLCAvLyBbOTNdXHJcblx0XHQnJywgLy8gWzk0XVxyXG5cdFx0J1NMRUVQJywgLy8gWzk1XVxyXG5cdFx0J05VTVBBRDAnLCAvLyBbOTZdXHJcblx0XHQnTlVNUEFEMScsIC8vIFs5N11cclxuXHRcdCdOVU1QQUQyJywgLy8gWzk4XVxyXG5cdFx0J05VTVBBRDMnLCAvLyBbOTldXHJcblx0XHQnTlVNUEFENCcsIC8vIFsxMDBdXHJcblx0XHQnTlVNUEFENScsIC8vIFsxMDFdXHJcblx0XHQnTlVNUEFENicsIC8vIFsxMDJdXHJcblx0XHQnTlVNUEFENycsIC8vIFsxMDNdXHJcblx0XHQnTlVNUEFEOCcsIC8vIFsxMDRdXHJcblx0XHQnTlVNUEFEOScsIC8vIFsxMDVdXHJcblx0XHQnTVVMVElQTFknLCAvLyBbMTA2XVxyXG5cdFx0J0FERCcsIC8vIFsxMDddXHJcblx0XHQnU0VQQVJBVE9SJywgLy8gWzEwOF1cclxuXHRcdCdTVUJUUkFDVCcsIC8vIFsxMDldXHJcblx0XHQnREVDSU1BTCcsIC8vIFsxMTBdXHJcblx0XHQnRElWSURFJywgLy8gWzExMV1cclxuXHRcdCdGMScsIC8vIFsxMTJdXHJcblx0XHQnRjInLCAvLyBbMTEzXVxyXG5cdFx0J0YzJywgLy8gWzExNF1cclxuXHRcdCdGNCcsIC8vIFsxMTVdXHJcblx0XHQnRjUnLCAvLyBbMTE2XVxyXG5cdFx0J0Y2JywgLy8gWzExN11cclxuXHRcdCdGNycsIC8vIFsxMThdXHJcblx0XHQnRjgnLCAvLyBbMTE5XVxyXG5cdFx0J0Y5JywgLy8gWzEyMF1cclxuXHRcdCdGMTAnLCAvLyBbMTIxXVxyXG5cdFx0J0YxMScsIC8vIFsxMjJdXHJcblx0XHQnRjEyJywgLy8gWzEyM11cclxuXHRcdCdGMTMnLCAvLyBbMTI0XVxyXG5cdFx0J0YxNCcsIC8vIFsxMjVdXHJcblx0XHQnRjE1JywgLy8gWzEyNl1cclxuXHRcdCdGMTYnLCAvLyBbMTI3XVxyXG5cdFx0J0YxNycsIC8vIFsxMjhdXHJcblx0XHQnRjE4JywgLy8gWzEyOV1cclxuXHRcdCdGMTknLCAvLyBbMTMwXVxyXG5cdFx0J0YyMCcsIC8vIFsxMzFdXHJcblx0XHQnRjIxJywgLy8gWzEzMl1cclxuXHRcdCdGMjInLCAvLyBbMTMzXVxyXG5cdFx0J0YyMycsIC8vIFsxMzRdXHJcblx0XHQnRjI0JywgLy8gWzEzNV1cclxuXHRcdCcnLCAvLyBbMTM2XVxyXG5cdFx0JycsIC8vIFsxMzddXHJcblx0XHQnJywgLy8gWzEzOF1cclxuXHRcdCcnLCAvLyBbMTM5XVxyXG5cdFx0JycsIC8vIFsxNDBdXHJcblx0XHQnJywgLy8gWzE0MV1cclxuXHRcdCcnLCAvLyBbMTQyXVxyXG5cdFx0JycsIC8vIFsxNDNdXHJcblx0XHQnTlVNIExPQ0snLCAvLyBbMTQ0XVxyXG5cdFx0J1NDUk9MTCBMT0NLJywgLy8gWzE0NV1cclxuXHRcdCdXSU4gT0VNIEZKIEpJU0hPJywgLy8gWzE0Nl1cclxuXHRcdCdXSU4gT0VNIEZKIE1BU1NIT1UnLCAvLyBbMTQ3XVxyXG5cdFx0J1dJTiBPRU0gRkogVE9VUk9LVScsIC8vIFsxNDhdXHJcblx0XHQnV0lOIE9FTSBGSiBMT1lBJywgLy8gWzE0OV1cclxuXHRcdCdXSU4gT0VNIEZKIFJPWUEnLCAvLyBbMTUwXVxyXG5cdFx0JycsIC8vIFsxNTFdXHJcblx0XHQnJywgLy8gWzE1Ml1cclxuXHRcdCcnLCAvLyBbMTUzXVxyXG5cdFx0JycsIC8vIFsxNTRdXHJcblx0XHQnJywgLy8gWzE1NV1cclxuXHRcdCcnLCAvLyBbMTU2XVxyXG5cdFx0JycsIC8vIFsxNTddXHJcblx0XHQnJywgLy8gWzE1OF1cclxuXHRcdCcnLCAvLyBbMTU5XVxyXG5cdFx0J0NJUkNVTUZMRVgnLCAvLyBbMTYwXVxyXG5cdFx0J0VYQ0xBTUFUSU9OJywgLy8gWzE2MV1cclxuXHRcdCdET1VCTEVfUVVPVEUnLCAvLyBbMTYyXVxyXG5cdFx0J0hBU0gnLCAvLyBbMTYzXVxyXG5cdFx0J0RPTExBUicsIC8vIFsxNjRdXHJcblx0XHQnUEVSQ0VOVCcsIC8vIFsxNjVdXHJcblx0XHQnQU1QRVJTQU5EJywgLy8gWzE2Nl1cclxuXHRcdCdVTkRFUlNDT1JFJywgLy8gWzE2N11cclxuXHRcdCdPUEVOIFBBUkVOVEhFU0lTJywgLy8gWzE2OF1cclxuXHRcdCdDTE9TRSBQQVJFTlRIRVNJUycsIC8vIFsxNjldXHJcblx0XHQnQVNURVJJU0snLCAvLyBbMTcwXVxyXG5cdFx0J1BMVVMnLCAvLyBbMTcxXVxyXG5cdFx0J1BJUEUnLCAvLyBbMTcyXVxyXG5cdFx0J0hZUEhFTicsIC8vIFsxNzNdXHJcblx0XHQnT1BFTiBDVVJMWSBCUkFDS0VUJywgLy8gWzE3NF1cclxuXHRcdCdDTE9TRSBDVVJMWSBCUkFDS0VUJywgLy8gWzE3NV1cclxuXHRcdCdUSUxERScsIC8vIFsxNzZdXHJcblx0XHQnJywgLy8gWzE3N11cclxuXHRcdCcnLCAvLyBbMTc4XVxyXG5cdFx0JycsIC8vIFsxNzldXHJcblx0XHQnJywgLy8gWzE4MF1cclxuXHRcdCdWT0xVTUUgTVVURScsIC8vIFsxODFdXHJcblx0XHQnVk9MVU1FIERPV04nLCAvLyBbMTgyXVxyXG5cdFx0J1ZPTFVNRSBVUCcsIC8vIFsxODNdXHJcblx0XHQnJywgLy8gWzE4NF1cclxuXHRcdCcnLCAvLyBbMTg1XVxyXG5cdFx0J1NFTUlDT0xPTicsIC8vIFsxODZdXHJcblx0XHQnRVFVQUxTJywgLy8gWzE4N11cclxuXHRcdCdDT01NQScsIC8vIFsxODhdXHJcblx0XHQnTUlOVVMnLCAvLyBbMTg5XVxyXG5cdFx0J1BFUklPRCcsIC8vIFsxOTBdXHJcblx0XHQnU0xBU0gnLCAvLyBbMTkxXVxyXG5cdFx0J0JBQ0sgUVVPVEUnLCAvLyBbMTkyXVxyXG5cdFx0JycsIC8vIFsxOTNdXHJcblx0XHQnJywgLy8gWzE5NF1cclxuXHRcdCcnLCAvLyBbMTk1XVxyXG5cdFx0JycsIC8vIFsxOTZdXHJcblx0XHQnJywgLy8gWzE5N11cclxuXHRcdCcnLCAvLyBbMTk4XVxyXG5cdFx0JycsIC8vIFsxOTldXHJcblx0XHQnJywgLy8gWzIwMF1cclxuXHRcdCcnLCAvLyBbMjAxXVxyXG5cdFx0JycsIC8vIFsyMDJdXHJcblx0XHQnJywgLy8gWzIwM11cclxuXHRcdCcnLCAvLyBbMjA0XVxyXG5cdFx0JycsIC8vIFsyMDVdXHJcblx0XHQnJywgLy8gWzIwNl1cclxuXHRcdCcnLCAvLyBbMjA3XVxyXG5cdFx0JycsIC8vIFsyMDhdXHJcblx0XHQnJywgLy8gWzIwOV1cclxuXHRcdCcnLCAvLyBbMjEwXVxyXG5cdFx0JycsIC8vIFsyMTFdXHJcblx0XHQnJywgLy8gWzIxMl1cclxuXHRcdCcnLCAvLyBbMjEzXVxyXG5cdFx0JycsIC8vIFsyMTRdXHJcblx0XHQnJywgLy8gWzIxNV1cclxuXHRcdCcnLCAvLyBbMjE2XVxyXG5cdFx0JycsIC8vIFsyMTddXHJcblx0XHQnJywgLy8gWzIxOF1cclxuXHRcdCdPUEVOIEJSQUNLRVQnLCAvLyBbMjE5XVxyXG5cdFx0J0JBQ0sgU0xBU0gnLCAvLyBbMjIwXVxyXG5cdFx0J0NMT1NFIEJSQUNLRVQnLCAvLyBbMjIxXVxyXG5cdFx0J1FVT1RFJywgLy8gWzIyMl1cclxuXHRcdCcnLCAvLyBbMjIzXVxyXG5cdFx0J01FVEEnLCAvLyBbMjI0XVxyXG5cdFx0J0FMVCBHUkFQSCcsIC8vIFsyMjVdXHJcblx0XHQnJywgLy8gWzIyNl1cclxuXHRcdCdXSU4gSUNPIEhFTFAnLCAvLyBbMjI3XVxyXG5cdFx0J1dJTiBJQ08gMDAnLCAvLyBbMjI4XVxyXG5cdFx0JycsIC8vIFsyMjldXHJcblx0XHQnV0lOIElDTyBDTEVBUicsIC8vIFsyMzBdXHJcblx0XHQnJywgLy8gWzIzMV1cclxuXHRcdCcnLCAvLyBbMjMyXVxyXG5cdFx0J1dJTiBPRU0gUkVTRVQnLCAvLyBbMjMzXVxyXG5cdFx0J1dJTiBPRU0gSlVNUCcsIC8vIFsyMzRdXHJcblx0XHQnV0lOIE9FTSBQQTEnLCAvLyBbMjM1XVxyXG5cdFx0J1dJTiBPRU0gUEEyJywgLy8gWzIzNl1cclxuXHRcdCdXSU4gT0VNIFBBMycsIC8vIFsyMzddXHJcblx0XHQnV0lOIE9FTSBXU0NUUkwnLCAvLyBbMjM4XVxyXG5cdFx0J1dJTiBPRU0gQ1VTRUwnLCAvLyBbMjM5XVxyXG5cdFx0J1dJTiBPRU0gQVRUTicsIC8vIFsyNDBdXHJcblx0XHQnV0lOIE9FTSBGSU5JU0gnLCAvLyBbMjQxXVxyXG5cdFx0J1dJTiBPRU0gQ09QWScsIC8vIFsyNDJdXHJcblx0XHQnV0lOIE9FTSBBVVRPJywgLy8gWzI0M11cclxuXHRcdCdXSU4gT0VNIEVOTFcnLCAvLyBbMjQ0XVxyXG5cdFx0J1dJTiBPRU0gQkFDS1RBQicsIC8vIFsyNDVdXHJcblx0XHQnQVRUTicsIC8vIFsyNDZdXHJcblx0XHQnQ1JTRUwnLCAvLyBbMjQ3XVxyXG5cdFx0J0VYU0VMJywgLy8gWzI0OF1cclxuXHRcdCdFUkVPRicsIC8vIFsyNDldXHJcblx0XHQnUExBWScsIC8vIFsyNTBdXHJcblx0XHQnWk9PTScsIC8vIFsyNTFdXHJcblx0XHQnJywgLy8gWzI1Ml1cclxuXHRcdCdQQTEnLCAvLyBbMjUzXVxyXG5cdFx0J1dJTiBPRU0gQ0xFQVInLCAvLyBbMjU0XVxyXG5cdFx0J1RPR0dMRSBUT1VDSFBBRCcsIC8vIFsyNTVdXHJcblx0XSwgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTc3MjE3OS9nZXQtY2hhcmFjdGVyLXZhbHVlLWZyb20ta2V5Y29kZS1pbi1qYXZhc2NyaXB0LXRoZW4tdHJpbVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IEF1ZGlvQXNzZXRzID0ge1xyXG5cdHVpOiB7XHJcblx0XHRpbnZlbnRvcnlDbGFjazogbmV3IEF1ZGlvUmVzb3VyY2VHcm91cChbXHJcblx0XHRcdG5ldyBBdWRpb1Jlc291cmNlKCdhc3NldHMvc291bmRzL3NmeC91aS9jbGFjazEubXAzJyksXHJcblx0XHRcdG5ldyBBdWRpb1Jlc291cmNlKCdhc3NldHMvc291bmRzL3NmeC91aS9jbGFjazIubXAzJyksXHJcblx0XHRcdG5ldyBBdWRpb1Jlc291cmNlKCdhc3NldHMvc291bmRzL3NmeC91aS9jbGFjazMubXAzJyksXHJcblx0XHRdKSxcclxuXHR9LFxyXG5cdG11c2ljOiB7XHJcblx0XHR0aXRsZVNjcmVlbjogbmV3IEF1ZGlvUmVzb3VyY2UoJ2Fzc2V0cy9zb3VuZHMvbXVzaWMvVGl0bGVTY3JlZW4ubXAzJyksXHJcblx0fSxcclxuXHRhbWJpZW50OiB7XHJcblx0XHR3aW50ZXIxOiBuZXcgQXVkaW9SZXNvdXJjZShcclxuXHRcdFx0J2Fzc2V0cy9zb3VuZHMvc2Z4L2FtYmllbnQvNjU4MTNfX3BjYWVsZHJpZXNfX2NvdW50cnlzaWRld2ludGVyZXZlbmluZzAyLndhdicsXHJcblx0XHQpLFxyXG5cdH0sXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBBbmltYXRpb25GcmFtZTxUIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgW0ltYWdlUmVzb3VyY2UsIG51bWJlcl1bXT4+ID0ga2V5b2YgVDtcclxuXHJcbi8vIGNvbnN0IGFuaW1hdGlvbnMgPSA8VCBleHRlbmRzIFJlY29yZDxzdHJpbmcsIEltYWdlUmVzb3VyY2VbXT4+KGRhdGE6IFQpOiBUID0+IGRhdGFcclxuXHJcbmV4cG9ydCBjb25zdCBsb2FkQXNzZXRzID0gKHNrZXRjaDogUDUsIC4uLmFzc2V0czogQXNzZXRHcm91cFtdKSA9PiB7XHJcblx0YXNzZXRzLmZvckVhY2goYXNzZXRHcm91cCA9PiB7XHJcblx0XHRzZWFyY2hHcm91cChhc3NldEdyb3VwLCBza2V0Y2gpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gc2VhcmNoR3JvdXAoXHJcblx0YXNzZXRHcm91cDpcclxuXHRcdHwgQXNzZXRHcm91cFxyXG5cdFx0fCBSZXNvdXJjZVxyXG5cdFx0fCBBdWRpb1Jlc291cmNlXHJcblx0XHR8IEF1ZGlvUmVzb3VyY2VHcm91cCxcclxuXHRza2V0Y2g6IFA1LFxyXG4pIHtcclxuXHRpZiAoYXNzZXRHcm91cCBpbnN0YW5jZW9mIFJlc291cmNlKSB7XHJcblx0XHRjb25zb2xlLmxvZyhgTG9hZGluZyBhc3NldCAke2Fzc2V0R3JvdXAucGF0aH1gKTtcclxuXHRcdGFzc2V0R3JvdXAubG9hZFJlc291cmNlKHNrZXRjaCk7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdE9iamVjdC5lbnRyaWVzKGFzc2V0R3JvdXApLmZvckVhY2goYXNzZXQgPT4ge1xyXG5cdFx0c2VhcmNoR3JvdXAoYXNzZXRbMV0sIHNrZXRjaCk7XHJcblx0fSk7XHJcbn1cclxuIiwiaW1wb3J0IFA1IGZyb20gJ3A1JztcclxuaW1wb3J0IHsgUmVzb3VyY2UgfSBmcm9tICcuL1Jlc291cmNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBdWRpb1Jlc291cmNlIGV4dGVuZHMgUmVzb3VyY2Uge1xyXG4gICAgLy8gc291bmQ6IEF1ZGlvVHlwZVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBhdGg6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKHBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRSZXNvdXJjZShnYW1lOiBQNSkge1xyXG4gICAgICAgIC8vIHRoaXMuc291bmQgPSBBdWRpbyh7XHJcbiAgICAgICAgLy8gICAgIGZpbGU6IHRoaXMucGF0aCxcclxuICAgICAgICAvLyAgICAgbG9vcDogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgIHZvbHVtZTogMS4wLFxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHBsYXlSYW5kb20oKSB7XHJcbiAgICAvLyAgICAgLy8gVmVyaWZ5IHRoYXQgdGhlIHNvdW5kIGhhcyBiZWVuIGxvYWRlZFxyXG4gICAgLy8gICAgIGlmICh0aGlzLnNvdW5kID09PSB1bmRlZmluZWQpXHJcbiAgICAvLyAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgIC8vICAgICAgICAgICAgIGBUcmllZCB0byBwbGF5IHNvdW5kIGJlZm9yZSBsb2FkaW5nIGl0OiAke3RoaXMucGF0aH1gXHJcbiAgICAvLyAgICAgICAgICk7XHJcblxyXG4gICAgLy8gICAgIHRoaXMuc291bmQucGxheSgpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHBsYXlTb3VuZCgpIHsvLyBwbGF5IHRoZSBzb3VuZFxyXG4gICAgICAgIC8vVmVyaWZ5IHRoYXQgdGhlIHNvdW5kIGhhcyBiZWVuIGxvYWRlZFxyXG4gICAgICAgIC8vIGlmICh0aGlzLnNvdW5kID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgLy8gICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAvLyAgICAgICAgIGBUcmllZCB0byBwbGF5IHNvdW5kIGJlZm9yZSBsb2FkaW5nIGl0OiAke3RoaXMucGF0aH1gXHJcbiAgICAgICAgLy8gICAgICk7XHJcbiAgICAgICAgLy8gdGhpcy5zb3VuZC5wYXVzZSgpO1xyXG4gICAgICAgIC8vIHRoaXMuc291bmQucGxheSgpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBBdWRpb1Jlc291cmNlIH0gZnJvbSAnLi9BdWRpb1Jlc291cmNlJztcclxuaW1wb3J0IFA1IGZyb20gXCJwNVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEF1ZGlvUmVzb3VyY2VHcm91cCB7XHJcblxyXG4gICAgc291bmRzOiBBdWRpb1Jlc291cmNlW11cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VuZHM6IEF1ZGlvUmVzb3VyY2VbXSkgey8vIHBhc3MgaW4gYW4gYXJyYXkgb2YgQXVkaW9SZXNvdXJjZXMgdGhhdCBhcmUgYWxsIHNpbWlsYXJcclxuICAgICAgICB0aGlzLnNvdW5kcyA9IHNvdW5kcztcclxuICAgIH1cclxuXHJcbiAgICBwbGF5UmFuZG9tKCkgey8vIHBsYXkgYSByYW5kb20gc291bmRcclxuICAgICAgICBpZih0aGlzLnNvdW5kcyA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuc291bmRzLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICAgICAgYFRoZXJlIGFyZSBubyBzb3VuZHM6ICR7dGhpcy5zb3VuZHN9YFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IHIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLnNvdW5kcy5sZW5ndGgpO1xyXG4gICAgICAgIHRoaXMuc291bmRzW3JdLnBsYXlTb3VuZCgpOy8vIHBsYXkgYSByYW5kb20gc291bmQgZnJvbSB0aGUgYXJyYXkgYXQgYSBzbGlnaHRseSByYW5kb21pemVkIHBpdGNoLCBsZWFkaW5nIHRvIHRoZSBlZmZlY3Qgb2YgaXQgbWFraW5nIGEgbmV3IHNvdW5kIGVhY2ggdGltZSwgcmVtb3ZpbmcgcmVwZXRpdGl2ZW5lc3NcclxuXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgSW1hZ2VSZXNvdXJjZSB9IGZyb20gJy4vSW1hZ2VSZXNvdXJjZSc7XHJcbmltcG9ydCBwNSBmcm9tICdwNSc7XHJcbmltcG9ydCB7IGdhbWUgfSBmcm9tICcuLi8uLi9HYW1lJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGb250UmVzb3VyY2UgZXh0ZW5kcyBJbWFnZVJlc291cmNlIHtcclxuXHJcbiAgICBhbHBoYWJldF9zb3VwOiB7W2xldHRlcjogc3RyaW5nXToge3g6IG51bWJlciwgeTogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlcn19ID0ge31cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwYXRoOiBzdHJpbmcsIGNoYXJhY3RlckRhdGE6IHtbbGV0dGVyOiBzdHJpbmddOiBudW1iZXJ9LCBjaGFyYWN0ZXJPcmRlcjogc3RyaW5nLCBmb250SGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihwYXRoKTtcclxuICAgICAgICBsZXQgcnVubmluZ1RvdGFsID0gMFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGk8Y2hhcmFjdGVyT3JkZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5hbHBoYWJldF9zb3VwW2NoYXJhY3Rlck9yZGVyW2ldXSA9IHt4OiBydW5uaW5nVG90YWwsIHk6IDAsIHc6IGNoYXJhY3RlckRhdGFbY2hhcmFjdGVyT3JkZXJbaV1dLCBoOiBmb250SGVpZ2h0fVxyXG4gICAgICAgICAgICBydW5uaW5nVG90YWwgKz0gY2hhcmFjdGVyRGF0YVtjaGFyYWN0ZXJPcmRlcltpXV0gKyAxXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNoYXJhY3Rlck9yZGVyW2ldK1wiOiBcIitjaGFyYWN0ZXJEYXRhW2NoYXJhY3Rlck9yZGVyW2ldXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRyYXdUZXh0KHRhcmdldDogcDUsIHN0cjogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB4T2Zmc2V0OiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGk8c3RyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyUGFydGlhbCh0YXJnZXQsIHgreE9mZnNldCpnYW1lLnVwc2NhbGVTaXplLCB5LCB0aGlzLmFscGhhYmV0X3NvdXBbc3RyW2ldXS53KmdhbWUudXBzY2FsZVNpemUsIHRoaXMuYWxwaGFiZXRfc291cFtzdHJbaV1dLmgqZ2FtZS51cHNjYWxlU2l6ZSwgdGhpcy5hbHBoYWJldF9zb3VwW3N0cltpXV0ueCwgdGhpcy5hbHBoYWJldF9zb3VwW3N0cltpXV0ueSwgdGhpcy5hbHBoYWJldF9zb3VwW3N0cltpXV0udywgdGhpcy5hbHBoYWJldF9zb3VwW3N0cltpXV0uaCk7XHJcbiAgICAgICAgICAgIHhPZmZzZXQgKz0gdGhpcy5hbHBoYWJldF9zb3VwW3N0cltpXV0udysxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBQNSBmcm9tICdwNSc7XHJcbmltcG9ydCB7IFJlc291cmNlIH0gZnJvbSAnLi9SZXNvdXJjZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgSW1hZ2VSZXNvdXJjZSBleHRlbmRzIFJlc291cmNlIHtcclxuICAgIGltYWdlOiBQNS5JbWFnZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwYXRoOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihwYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkUmVzb3VyY2UoZ2FtZTogUDUpIHtcclxuICAgICAgICB0aGlzLmltYWdlID0gZ2FtZS5sb2FkSW1hZ2UodGhpcy5wYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIodGFyZ2V0OiBhbnksIHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIC8vIFZlcmlmeSB0aGF0IHRoZSB0aWxlcyBoYXMgYmVlbiBsb2FkZWRcclxuICAgICAgICBpZiAodGhpcy5pbWFnZSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgICAgICBgVHJpZWQgdG8gcmVuZGVyIGltYWdlIGJlZm9yZSBsb2FkaW5nIGl0OiAke3RoaXMucGF0aH1gXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIERyYXcgbm9uIHRpbGVzIGltYWdlXHJcbiAgICAgICAgdGFyZ2V0LmltYWdlKHRoaXMuaW1hZ2UsIHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZW5kZXJQYXJ0aWFsKFxyXG4gICAgICAgIHRhcmdldDogYW55LFxyXG4gICAgICAgIHg6IG51bWJlcixcclxuICAgICAgICB5OiBudW1iZXIsXHJcbiAgICAgICAgd2lkdGg6IG51bWJlcixcclxuICAgICAgICBoZWlnaHQ6IG51bWJlcixcclxuICAgICAgICBzb3VyY2VYPzogbnVtYmVyLFxyXG4gICAgICAgIHNvdXJjZVk/OiBudW1iZXIsXHJcbiAgICAgICAgc291cmNlV2lkdGg/OiBudW1iZXIsXHJcbiAgICAgICAgc291cmNlSGVpZ2h0PzogbnVtYmVyXHJcbiAgICApIHtcclxuICAgICAgICAvLyBWZXJpZnkgdGhhdCB0aGUgdGlsZXMgaGFzIGJlZW4gbG9hZGVkXHJcbiAgICAgICAgaWYgKHRoaXMuaW1hZ2UgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICAgICAgYFRyaWVkIHRvIHJlbmRlciBpbWFnZSBiZWZvcmUgbG9hZGluZyBpdDogJHt0aGlzLnBhdGh9YFxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBEcmF3IGEgcGFydGlhbCBwYXJ0IG9mIHRoZSBpbWFnZVxyXG4gICAgICAgIHRhcmdldC5pbWFnZShcclxuICAgICAgICAgICAgdGhpcy5pbWFnZSxcclxuICAgICAgICAgICAgeCxcclxuICAgICAgICAgICAgeSxcclxuICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodCxcclxuICAgICAgICAgICAgc291cmNlWCxcclxuICAgICAgICAgICAgc291cmNlWSxcclxuICAgICAgICAgICAgc291cmNlV2lkdGgsXHJcbiAgICAgICAgICAgIHNvdXJjZUhlaWdodFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgUmVzb3VyY2UgfSBmcm9tIFwiLi9SZXNvdXJjZVwiO1xyXG5pbXBvcnQgUDUgZnJvbSAncDUnO1xyXG5pbXBvcnQgeyBnYW1lIH0gZnJvbSAnLi4vLi4vR2FtZSc7XHJcbmltcG9ydCB7IFRpbGVUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2dsb2JhbC9UaWxlXCJcclxuaW1wb3J0IHsgV29ybGRUaWxlcyB9IGZyb20gXCIuLi8uLi93b3JsZC9Xb3JsZFRpbGVzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVmbGVjdGFibGVJbWFnZVJlc291cmNlIGV4dGVuZHMgUmVzb3VyY2Uge1xyXG5cclxuICAgIGltYWdlOiBQNS5JbWFnZTtcclxuICAgIGhhc1JlZmxlY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHJlZmxlY3Rpb246IFA1LkltYWdlO1xyXG4gICAgcmVmbGVjdGl2aXR5QXJyYXk6IG51bWJlcltdID0gWzAsIDkwLCAxNTAsIDAsIDEwLCAxNSwgMTcsIDE5LCAyMSwgMjMsIDI1LCAyNywgMjksIDMxLCAxMCwgMTcsIDIxLCAyNSwgMjksIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDVdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBhdGg6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKHBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRSZXNvdXJjZShnYW1lOiBQNSkge1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBnYW1lLmxvYWRJbWFnZSh0aGlzLnBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRSZWZsZWN0aW9uKGdhbWU6IFA1KSB7XHJcbiAgICAgICAgaWYoIXRoaXMuaGFzUmVmbGVjdGlvbikgey8vdGhpcyBpcyBzbyBpdCBkb2Vzbid0IGxvYWQgdGhlbSBhbGwgYXQgb25jZSBhbmQgaW5zdGVhZCBtYWtlcyB0aGUgcmVmbGVjdGlvbnMgd2hlbiB0aGV5IGFyZSBuZWVkZWRcclxuICAgICAgICAgICAgdGhpcy5oYXNSZWZsZWN0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5yZWZsZWN0aW9uID0gZ2FtZS5jcmVhdGVJbWFnZSh0aGlzLmltYWdlLndpZHRoLCB0aGlzLmltYWdlLmhlaWdodCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UubG9hZFBpeGVscygpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuaW1hZ2UucGl4ZWxzKVxyXG4gICAgICAgICAgICB0aGlzLnJlZmxlY3Rpb24ubG9hZFBpeGVscygpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpPHRoaXMucmVmbGVjdGlvbi53aWR0aDsgaSsrKSB7Ly9nZW5lcmF0ZSBhIHJlZmxlY3Rpb24gaW1hZ2UgdGhhdCBpcyBkaXNwbGF5ZWQgYXMgYSByZWZsZWN0aW9uXHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqPHRoaXMucmVmbGVjdGlvbi5oZWlnaHQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgayA9IDA7IGs8MzsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmbGVjdGlvbi5waXhlbHNbNCooaip0aGlzLnJlZmxlY3Rpb24ud2lkdGgraSkra10gPSB0aGlzLmltYWdlLnBpeGVsc1s0KigodGhpcy5pbWFnZS5oZWlnaHQtai0xKSp0aGlzLmltYWdlLndpZHRoK2kpK2tdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZmxlY3Rpb24ucGl4ZWxzWzQqKGoqdGhpcy5yZWZsZWN0aW9uLndpZHRoK2kpKzNdID0gXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZS5waXhlbHNbNCooKHRoaXMuaW1hZ2UuaGVpZ2h0LWotMSkqdGhpcy5pbWFnZS53aWR0aCtpKSszXSAqIFxyXG4gICAgICAgICAgICAgICAgICAgICgodGhpcy5yZWZsZWN0aW9uLmhlaWdodC1qKS90aGlzLnJlZmxlY3Rpb24uaGVpZ2h0KSAqIFxyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnJlZmxlY3Rpb24ud2lkdGgvMiswLjUtTWF0aC5hYnMoaS10aGlzLnJlZmxlY3Rpb24ud2lkdGgvMiswLjUpKS8odGhpcy5yZWZsZWN0aW9uLndpZHRoLzIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVmbGVjdGlvbi51cGRhdGVQaXhlbHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHRhcmdldDogYW55LCB4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFdvcmxkVGlsZXMpO1xyXG4gICAgICAgIC8vIFZlcmlmeSB0aGF0IHRoZSBpbWFnZSBoYXMgYmVlbiBsb2FkZWRcclxuICAgICAgICBpZiAodGhpcy5pbWFnZSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgICAgICBgVHJpZWQgdG8gcmVuZGVyIGltYWdlIGJlZm9yZSBsb2FkaW5nIGl0OiAke3RoaXMucGF0aH1gXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIERyYXcgbm9uIHRpbGVzIGltYWdlXHJcbiAgICAgICAgdGFyZ2V0LmltYWdlKHRoaXMuaW1hZ2UsIHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZW5kZXJXb3JsZHNwYWNlUmVmbGVjdGlvbih4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5pbWFnZSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgICAgICBgVHJpZWQgdG8gcmVuZGVyIHJlZmxlY3Rpb24gb2YgaW1hZ2UgYmVmb3JlIGxvYWRpbmcgaXQ6ICR7dGhpcy5wYXRofWBcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmhhc1JlZmxlY3Rpb24pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICBnYW1lLmZpbGwoMjU1LCAwLCAwKTtcclxuICAgICAgICBnYW1lLnN0cm9rZSgxNTAsIDAsIDApO1xyXG5cclxuICAgICAgICAvL2xvb3AgdGhyb3VnaCBldmVyeSB0aWxlIGl0IHBhc3NlcyB0aHJvdWdoXHJcbiAgICAgICAgZm9yKGxldCBpID0gTWF0aC5mbG9vcih4KTsgaTx4K3dpZHRoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gTWF0aC5mbG9vcih5KTsgajx5K2hlaWdodDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0YXJnZXQud29ybGQud29ybGRUaWxlcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudEJsb2NrOiBUaWxlVHlwZSB8IHN0cmluZyA9IGdhbWUud29ybGQud29ybGRUaWxlc1tqICogZ2FtZS53b3JsZFdpZHRoICsgaV07XHJcbiAgICAgICAgICAgICAgICBpZihjdXJyZW50QmxvY2sgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgY3VycmVudEJsb2NrID09PSBcInN0cmluZ1wiIHx8IGN1cnJlbnRCbG9jayA9PSBUaWxlVHlwZS5BaXIpIHsvL3RoZSByZWZlcmVuY2UgdG8gVGlsZUVudGl0eSBjYW4gYmUgcmVtb3ZlZCBhcyBzb29uIGFzIHRoZSBiZXR0ZXIgc3lzdGVtIGlzIGluIHBsYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnYW1lLmRyYXdpbmdDb250ZXh0Lmdsb2JhbEFscGhhID0gdGhpcy5yZWZsZWN0aXZpdHlBcnJheVtjdXJyZW50QmxvY2tdLzI1NTsvL1RPRE8gbWFrZSB0aGlzIGJhc2VkIG9uIHRoZSB0aWxlIHJlZmxlY3Rpdml0eVxyXG4gICAgICAgICAgICAgICAgZ2FtZS5pbWFnZShcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZmxlY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgKGkgKiBnYW1lLlRJTEVfV0lEVEggLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lLmludGVycG9sYXRlZENhbVggKiBnYW1lLlRJTEVfV0lEVEgpICpcclxuICAgICAgICAgICAgICAgICAgICBnYW1lLnVwc2NhbGVTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoaiAqIGdhbWUuVElMRV9IRUlHSFQgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZS5pbnRlcnBvbGF0ZWRDYW1ZICogZ2FtZS5USUxFX0hFSUdIVCkgKlxyXG4gICAgICAgICAgICAgICAgICAgIGdhbWUudXBzY2FsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZS5USUxFX1dJRFRIKmdhbWUudXBzY2FsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZS5USUxFX0hFSUdIVCpnYW1lLnVwc2NhbGVTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgIChpLXgpKmdhbWUuVElMRV9XSURUSCxcclxuICAgICAgICAgICAgICAgICAgICAoai15KSpnYW1lLlRJTEVfSEVJR0hULFxyXG4gICAgICAgICAgICAgICAgICAgIGdhbWUuVElMRV9XSURUSCxcclxuICAgICAgICAgICAgICAgICAgICBnYW1lLlRJTEVfSEVJR0hUXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5kcmF3aW5nQ29udGV4dC5nbG9iYWxBbHBoYSA9IDEuMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJQYXJ0aWFsKFxyXG4gICAgICAgIHRhcmdldDogYW55LFxyXG4gICAgICAgIHg6IG51bWJlcixcclxuICAgICAgICB5OiBudW1iZXIsXHJcbiAgICAgICAgd2lkdGg6IG51bWJlcixcclxuICAgICAgICBoZWlnaHQ6IG51bWJlcixcclxuICAgICAgICBzb3VyY2VYPzogbnVtYmVyLFxyXG4gICAgICAgIHNvdXJjZVk/OiBudW1iZXIsXHJcbiAgICAgICAgc291cmNlV2lkdGg/OiBudW1iZXIsXHJcbiAgICAgICAgc291cmNlSGVpZ2h0PzogbnVtYmVyXHJcbiAgICApIHtcclxuICAgICAgICAvLyBWZXJpZnkgdGhhdCB0aGUgdGlsZXMgaGFzIGJlZW4gbG9hZGVkXHJcbiAgICAgICAgaWYgKHRoaXMuaW1hZ2UgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICAgICAgYFRyaWVkIHRvIHJlbmRlciBpbWFnZSBiZWZvcmUgbG9hZGluZyBpdDogJHt0aGlzLnBhdGh9YFxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBEcmF3IGEgcGFydGlhbCBwYXJ0IG9mIHRoZSBpbWFnZVxyXG4gICAgICAgIHRhcmdldC5pbWFnZShcclxuICAgICAgICAgICAgdGhpcy5pbWFnZSxcclxuICAgICAgICAgICAgeCxcclxuICAgICAgICAgICAgeSxcclxuICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodCxcclxuICAgICAgICAgICAgc291cmNlWCxcclxuICAgICAgICAgICAgc291cmNlWSxcclxuICAgICAgICAgICAgc291cmNlV2lkdGgsXHJcbiAgICAgICAgICAgIHNvdXJjZUhlaWdodFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUDUgZnJvbSAncDUnO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlc291cmNlIHtcclxuICAgIHBhdGg6IHN0cmluZztcclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IocGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcclxuICAgIH1cclxuXHJcbiAgICBhYnN0cmFjdCBsb2FkUmVzb3VyY2Uoc2tldGNoOiBQNSk6IHZvaWQ7XHJcbn1cclxuIiwiaW1wb3J0IHsgSW1hZ2VSZXNvdXJjZSB9IGZyb20gJy4vSW1hZ2VSZXNvdXJjZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgVGlsZVJlc291cmNlIGV4dGVuZHMgSW1hZ2VSZXNvdXJjZSB7XHJcbiAgICAvLyBUaGUgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgdGlsZXMgc2V0XHJcbiAgICB3aWR0aDogbnVtYmVyO1xyXG4gICAgaGVpZ2h0OiBudW1iZXI7XHJcblxyXG4gICAgLy8gVGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgZWFjaCB0aWxlcyBpbiBwaXhlbHNcclxuICAgIHRpbGVXaWR0aDogbnVtYmVyO1xyXG4gICAgdGlsZUhlaWdodDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHBhdGg6IHN0cmluZyxcclxuICAgICAgICB3aWR0aDogbnVtYmVyLFxyXG4gICAgICAgIGhlaWdodDogbnVtYmVyLFxyXG4gICAgICAgIHRpbGVXaWR0aDogbnVtYmVyLFxyXG4gICAgICAgIHRpbGVIZWlnaHQ6IG51bWJlclxyXG4gICAgKSB7XHJcbiAgICAgICAgc3VwZXIocGF0aCk7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMudGlsZVdpZHRoID0gdGlsZVdpZHRoO1xyXG4gICAgICAgIHRoaXMudGlsZUhlaWdodCA9IHRpbGVIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyVGlsZShcclxuICAgICAgICBpOiBudW1iZXIsXHJcbiAgICAgICAgdGFyZ2V0OiBhbnksXHJcbiAgICAgICAgeDogbnVtYmVyLFxyXG4gICAgICAgIHk6IG51bWJlcixcclxuICAgICAgICB3aWR0aDogbnVtYmVyLFxyXG4gICAgICAgIGhlaWdodDogbnVtYmVyXHJcbiAgICApIHtcclxuICAgICAgICBjb25zdCB0aWxlU2V0WCA9IGkgJSB0aGlzLndpZHRoO1xyXG4gICAgICAgIGNvbnN0IHRpbGVTZXRZID0gTWF0aC5mbG9vcihpIC8gdGhpcy53aWR0aCk7XHJcblxyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgdGlsZXMgaXNuJ3Qgb3V0IG9mIGJvdW5kc1xyXG4gICAgICAgIGlmICh0aWxlU2V0WSA+IHRoaXMuaGVpZ2h0KVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgICAgICBgT3V0IG9mIGJvdW5kcyB0aWxlLiBUcmllZCB0byByZW5kZXIgdGlsZSBpbmRleCAke2l9IHdpdGggYSBtYXhpbXVtIG9mICR7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICB9IHRpbGVzYFxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICBzdXBlci5yZW5kZXJQYXJ0aWFsKFxyXG4gICAgICAgICAgICB0YXJnZXQsXHJcbiAgICAgICAgICAgIHgsXHJcbiAgICAgICAgICAgIHksXHJcbiAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgICAgIHRpbGVTZXRYICogdGhpcy50aWxlV2lkdGgsXHJcbiAgICAgICAgICAgIHRpbGVTZXRZICogdGhpcy50aWxlSGVpZ2h0LFxyXG4gICAgICAgICAgICB0aGlzLnRpbGVXaWR0aCxcclxuICAgICAgICAgICAgdGhpcy50aWxlSGVpZ2h0XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUaWxlQXRDb29yZGluYXRlKFxyXG4gICAgICAgIHg6IG51bWJlcixcclxuICAgICAgICB5OiBudW1iZXIsXHJcbiAgICAgICAgdGFyZ2V0OiBhbnksXHJcbiAgICAgICAgeFBvczogbnVtYmVyLFxyXG4gICAgICAgIHlQb3M6IG51bWJlcixcclxuICAgICAgICB3aWR0aDogbnVtYmVyLFxyXG4gICAgICAgIGhlaWdodDogbnVtYmVyXHJcbiAgICApIHtcclxuICAgICAgICBpZiAoeCA+IHRoaXMud2lkdGggfHwgeSA+IHRoaXMuaGVpZ2h0IHx8IHggPCAwIHx8IHkgPCAwKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgICAgICBgT3V0IG9mIGJvdW5kcyB0aWxlLiBUcmllZCB0byBsb2FkIHRpbGUgYXQgJHt4fSwgJHt5fSBvbiBhICR7dGhpcy53aWR0aH0sICR7dGhpcy5oZWlnaHR9IGdyaWRgXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIHN1cGVyLnJlbmRlclBhcnRpYWwoXHJcbiAgICAgICAgICAgIHRhcmdldCxcclxuICAgICAgICAgICAgeFBvcyxcclxuICAgICAgICAgICAgeVBvcyxcclxuICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodCxcclxuICAgICAgICAgICAgeCAqIHRoaXMudGlsZVdpZHRoLFxyXG4gICAgICAgICAgICB5ICogdGhpcy50aWxlSGVpZ2h0LFxyXG4gICAgICAgICAgICB0aGlzLnRpbGVXaWR0aCxcclxuICAgICAgICAgICAgdGhpcy50aWxlSGVpZ2h0XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBDb250cm9sIHtcclxuICAgIGtleWJvYXJkOiBib29sZWFuXHJcbiAgICBrZXlDb2RlOiBudW1iZXJcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmdcclxuICAgIG9uUHJlc3NlZDogKCkgPT4gdm9pZFxyXG4gICAgb25SZWxlYXNlZDogKCkgPT4gdm9pZFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGRlc2NyaXB0aW9uOiBzdHJpbmcsIGtleWJvYXJkOiBib29sZWFuLCBrZXlDb2RlOiBudW1iZXIsIG9uUHJlc3NlZDogKCkgPT4gdm9pZCwgb25SZWxlYXNlZD86ICgpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25cclxuICAgICAgICB0aGlzLmtleWJvYXJkID0ga2V5Ym9hcmQ7XHJcbiAgICAgICAgdGhpcy5rZXlDb2RlID0ga2V5Q29kZTtcclxuICAgICAgICB0aGlzLm9uUHJlc3NlZCA9IG9uUHJlc3NlZDtcclxuICAgICAgICB0aGlzLm9uUmVsZWFzZWQgPSBvblJlbGVhc2VkIHx8IGZ1bmN0aW9uKCl7fTsvL2ZvciBzb21lIHJlYXNvbiBhcnJvdyBmdW5jdGlvbiBkb2Vzbid0IGxpa2UgdG8gZXhpc3QgaGVyZSBidXQgaSdtIG5vdCBnb25uYSB3b3JyeSB0b28gbXVjaFxyXG4gICAgICAgIC8vaWYgaXQncyB0b28gdWdseSwgeW91IGNhbiB0cnkgdG8gZml4IGl0XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgSW52ZW50b3J5UGF5bG9hZCwgSXRlbUNhdGVnb3JpZXMsIEl0ZW1zLCBJdGVtU3RhY2sgfSBmcm9tICcuLi8uLi9nbG9iYWwvSW52ZW50b3J5JztcclxuaW1wb3J0IHsgVGlsZVR5cGUgfSBmcm9tICcuLi8uLi9nbG9iYWwvVGlsZSc7XHJcbmltcG9ydCB7IGdhbWUgfSBmcm9tICcuLi9HYW1lJztcclxuaW1wb3J0IHsgQ29sb3JQYXJ0aWNsZSB9IGZyb20gJy4uL3dvcmxkL3BhcnRpY2xlcy9Db2xvclBhcnRpY2xlJztcclxuaW1wb3J0IHsgV29ybGRUaWxlcyB9IGZyb20gJy4uL3dvcmxkL1dvcmxkVGlsZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEludmVudG9yeSB7XHJcblxyXG5cdGl0ZW1zOiAoSXRlbVN0YWNrIHwgdW5kZWZpbmVkIHwgbnVsbClbXTtcclxuXHJcblx0d2lkdGg6IG51bWJlcjtcclxuXHRoZWlnaHQ6IG51bWJlcjtcclxuXHJcblx0c2VsZWN0ZWRTbG90OiBudW1iZXIgPSAwXHJcblx0cGlja2VkVXBTbG90OiBudW1iZXIgfCB1bmRlZmluZWQgPSB1bmRlZmluZWRcclxuXHJcblx0Y29uc3RydWN0b3IoaW52ZW50b3J5OiBJbnZlbnRvcnlQYXlsb2FkKSB7XHJcblx0XHR0aGlzLml0ZW1zID0gaW52ZW50b3J5Lml0ZW1zXHJcblx0XHR0aGlzLndpZHRoID0gaW52ZW50b3J5LndpZHRoXHJcblx0XHR0aGlzLmhlaWdodCA9IGludmVudG9yeS5oZWlnaHRcclxuXHR9XHJcblxyXG5cdHdvcmxkQ2xpY2soeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuXHRcdGNvbnN0IHNlbGVjdGVkSXRlbSA9IHRoaXMuaXRlbXNbdGhpcy5zZWxlY3RlZFNsb3RdXHJcblx0XHRpZihzZWxlY3RlZEl0ZW0gPT09IHVuZGVmaW5lZCB8fCBzZWxlY3RlZEl0ZW0gPT09IG51bGwpIHtcclxuXHRcdFx0Ly9jb25zb2xlLmVycm9yKFwiQnJlYWtpbmcgdGlsZVwiKVxyXG5cdFx0XHRsZXQgdGlsZUJlaW5nQnJva2VuID0gZ2FtZS53b3JsZC53b3JsZFRpbGVzW2dhbWUud29ybGQud2lkdGggKiB5ICsgeF07XHJcblx0XHRcdGlmKHR5cGVvZiB0aWxlQmVpbmdCcm9rZW4gPT09ICdudW1iZXInKSB7XHJcblx0XHRcdFx0bGV0IHdvcmxkVGlsZUJlaW5nQnJva2VuID0gV29ybGRUaWxlc1t0aWxlQmVpbmdCcm9rZW5dXHJcblx0XHRcdFx0Zm9yKGxldCBpID0gMDsgaTw1KmdhbWUucGFydGljbGVNdWx0aXBsaWVyOyBpKyspIHtcclxuXHRcdFx0XHRcdGlmICh3b3JsZFRpbGVCZWluZ0Jyb2tlbiAhPT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRcdFx0Z2FtZS5wYXJ0aWNsZXMucHVzaChuZXcgQ29sb3JQYXJ0aWNsZSh3b3JsZFRpbGVCZWluZ0Jyb2tlbi5jb2xvciwgTWF0aC5yYW5kb20oKSowLjIrMC4xLCAxMCwgeCtNYXRoLnJhbmRvbSgpLCB5K01hdGgucmFuZG9tKCksIDAuMiooTWF0aC5yYW5kb20oKS0wLjUpLCAtMC4xNSpNYXRoLnJhbmRvbSgpKSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0Z2FtZS5jb25uZWN0aW9uLmVtaXQoXHJcblx0XHRcdFx0J3dvcmxkQnJlYWtTdGFydCcsXHJcblx0XHRcdFx0Z2FtZS53b3JsZC53aWR0aCAqIHkgKyB4XHJcblx0XHRcdCk7XHJcblx0XHRcdGdhbWUuY29ubmVjdGlvbi5lbWl0KCd3b3JsZEJyZWFrRmluaXNoJyk7XHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IHdvcmxkQ2xpY2sgPSBJdGVtQWN0aW9uc1tJdGVtc1tzZWxlY3RlZEl0ZW0uaXRlbV0udHlwZV0ud29ybGRDbGlja1xyXG5cdFx0aWYod29ybGRDbGljayA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJDYW5ub3QgcGxhY2Ugc2VsZWN0ZWQgaXRlbVwiKVxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH1cclxuXHJcblx0XHR3b3JsZENsaWNrKHgsIHkpXHJcblx0fVxyXG5cdHdvcmxkQ2xpY2tDaGVjayh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG5cdFx0bGV0IHRpbGVCZWluZ0Jyb2tlbiA9IGdhbWUud29ybGQud29ybGRUaWxlc1tnYW1lLndvcmxkLndpZHRoICogeSArIHhdO1xyXG5cdFx0aWYodHlwZW9mIHRpbGVCZWluZ0Jyb2tlbiA9PT0gJ251bWJlcicpIHtcclxuXHRcdFx0aWYgKHRpbGVCZWluZ0Jyb2tlbiA9PT0gVGlsZVR5cGUuQWlyKSBnYW1lLmJyZWFraW5nID0gZmFsc2U7XHJcblx0XHRcdGVsc2UgZ2FtZS5icmVha2luZyA9IHRydWU7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSXRlbUJhc2Uge1xyXG5cdHdvcmxkQ2xpY2s/OiAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IHZvaWRcclxufVxyXG5cclxuY29uc3QgSXRlbUFjdGlvbnM6IFJlY29yZDxJdGVtQ2F0ZWdvcmllcywgSXRlbUJhc2U+ID0ge1xyXG5cdFtJdGVtQ2F0ZWdvcmllcy5UaWxlXToge1xyXG5cdFx0d29ybGRDbGljayh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG5cdFx0XHQvLyBJZiB0aGUgdGlsZSBpc24ndCBhaXJcclxuXHRcdFx0aWYgKFxyXG5cdFx0XHRcdGdhbWUud29ybGQud29ybGRUaWxlc1tcclxuXHRcdFx0XHRnYW1lLndvcmxkLndpZHRoICogeSArIHhcclxuXHRcdFx0XHRcdF0gIT09IFRpbGVUeXBlLkFpclxyXG5cdFx0XHQpIHtcclxuXHJcblx0XHRcdFx0bGV0IHRpbGVCZWluZ0Jyb2tlbiA9IGdhbWUud29ybGQud29ybGRUaWxlc1tnYW1lLndvcmxkLndpZHRoICogeSArIHhdO1xyXG5cdFx0XHRcdGlmKHR5cGVvZiB0aWxlQmVpbmdCcm9rZW4gPT09ICdudW1iZXInKSB7Ly90aWxlIGlzIHRpbGVcclxuXHRcdFx0XHRcdGlmICghZ2FtZS5icmVha2luZykgcmV0dXJuO1xyXG5cdFx0XHRcdFx0bGV0IHdvcmxkVGlsZUJlaW5nQnJva2VuID0gV29ybGRUaWxlc1t0aWxlQmVpbmdCcm9rZW5dXHJcblx0XHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpPDUqZ2FtZS5wYXJ0aWNsZU11bHRpcGxpZXI7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRpZiAod29ybGRUaWxlQmVpbmdCcm9rZW4gIT09IHVuZGVmaW5lZClcclxuXHRcdFx0XHRcdFx0Z2FtZS5wYXJ0aWNsZXMucHVzaChuZXcgQ29sb3JQYXJ0aWNsZSh3b3JsZFRpbGVCZWluZ0Jyb2tlbi5jb2xvciwgTWF0aC5yYW5kb20oKSowLjIrMC4xLCAxMCwgeCtNYXRoLnJhbmRvbSgpLCB5K01hdGgucmFuZG9tKCksIDAuMiooTWF0aC5yYW5kb20oKS0wLjUpLCAtMC4xNSpNYXRoLnJhbmRvbSgpKSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNvbnNvbGUuaW5mbygnYnJlYWtpbmcnKTtcclxuXHRcdFx0XHRcdGdhbWUuY29ubmVjdGlvbi5lbWl0KFxyXG5cdFx0XHRcdFx0XHQnd29ybGRCcmVha1N0YXJ0JyxcclxuXHRcdFx0XHRcdFx0Z2FtZS53b3JsZC53aWR0aCAqIHkgKyB4XHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0Z2FtZS5jb25uZWN0aW9uLmVtaXQoXHJcblx0XHRcdFx0XHRcdCd3b3JsZEJyZWFrRmluaXNoJ1xyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7Ly90aWxlIGlzIHRpbGUgZW50aXR5XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcInRpbGUgZW50aXR5IGludGVyYWN0XCIpXHJcblx0XHRcdFx0XHRnYW1lLmNvbm5lY3Rpb24uZW1pdChcclxuXHRcdFx0XHRcdFx0J3dvcmxkQnJlYWtTdGFydCcsXHJcblx0XHRcdFx0XHRcdGdhbWUud29ybGQud2lkdGggKiB5ICsgeFxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdGdhbWUuY29ubmVjdGlvbi5lbWl0KFxyXG5cdFx0XHRcdFx0XHQnd29ybGRCcmVha0ZpbmlzaCdcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdC8vaWYgdGhlIHRpbGUgaXMgYWlyIGFuZCB0aGUgZ2FtZSBpcyB0cnlpbmcgdG8gcGxhY2VcclxuXHRcdFx0aWYgKGdhbWUuYnJlYWtpbmcpIHJldHVybjtcclxuXHRcdFx0Y29uc29sZS5pbmZvKCdQbGFjaW5nJyk7XHJcblx0XHRcdGdhbWUuY29ubmVjdGlvbi5lbWl0KFxyXG5cdFx0XHRcdCd3b3JsZFBsYWNlJyxcclxuXHRcdFx0XHRnYW1lLndvcmxkLmludmVudG9yeS5zZWxlY3RlZFNsb3QsXHJcblx0XHRcdFx0eCxcclxuXHRcdFx0XHR5XHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRbSXRlbUNhdGVnb3JpZXMuUmVzb3VyY2VdOiB7fSxcclxuXHRbSXRlbUNhdGVnb3JpZXMuVG9vbF06IHt9LFxyXG5cdFtJdGVtQ2F0ZWdvcmllcy5UaWxlRW50aXR5XToge1xyXG5cdFx0d29ybGRDbGljayh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG5cdFx0XHRsZXQgaXRlbVJlZiA9IEl0ZW1zW2dhbWUud29ybGQuaW52ZW50b3J5Lml0ZW1zW2dhbWUud29ybGQuaW52ZW50b3J5LnNlbGVjdGVkU2xvdF0/Lml0ZW0gfHwgMF07XHJcblx0XHRcdGxldCBvZmZzZXQ6IFtudW1iZXIsIG51bWJlcl0gPSBbMCwgMF1cclxuXHRcdFx0aWYoXCJ0aWxlRW50aXR5T2Zmc2V0XCIgaW4gaXRlbVJlZikge1xyXG5cdFx0XHRcdG9mZnNldCA9IGl0ZW1SZWYudGlsZUVudGl0eU9mZnNldDtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0Z2FtZS5jb25uZWN0aW9uLmVtaXQoXHJcblx0XHRcdFx0J3dvcmxkUGxhY2UnLFxyXG5cdFx0XHRcdGdhbWUud29ybGQuaW52ZW50b3J5LnNlbGVjdGVkU2xvdCxcclxuXHRcdFx0XHR4LFxyXG5cdFx0XHRcdHlcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHR9LFxyXG59IiwiaW1wb3J0IHA1IGZyb20gJ3A1JztcclxuaW1wb3J0IHsgRW50aXRpZXMsIEVudGl0eVBheWxvYWQgfSBmcm9tICcuLi8uLi9nbG9iYWwvRW50aXR5JztcclxuaW1wb3J0IHsgZ2FtZSB9IGZyb20gJy4uL0dhbWUnO1xyXG5pbXBvcnQgeyBTZXJ2ZXJFbnRpdHkgfSBmcm9tICcuLi93b3JsZC9lbnRpdGllcy9TZXJ2ZXJFbnRpdHknO1xyXG4vLyBpbXBvcnQgeyBDb2xvclBhcnRpY2xlIH0gZnJvbSAnLi4vd29ybGQvJztcclxuaW1wb3J0IHsgQW5pbWF0aW9uRnJhbWUsIFBsYXllckFuaW1hdGlvbnMgfSBmcm9tICcuLi9hc3NldHMvQXNzZXRzJztcclxuaW1wb3J0IHsgVGlsZVR5cGUgfSBmcm9tICcuLi8uLi9nbG9iYWwvVGlsZSc7XHJcbmltcG9ydCB7IFdvcmxkVGlsZXMgfSBmcm9tICcuLi93b3JsZC9Xb3JsZFRpbGVzJztcclxuaW1wb3J0IHsgQ29sb3JQYXJ0aWNsZSB9IGZyb20gJy4uL3dvcmxkL3BhcnRpY2xlcy9Db2xvclBhcnRpY2xlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBQbGF5ZXJMb2NhbCBleHRlbmRzIFNlcnZlckVudGl0eSB7XHJcbiAgICAvLyBDb25zdGFudCBkYXRhXHJcbiAgICB3aWR0aDogbnVtYmVyID0gMTIgLyBnYW1lLlRJTEVfV0lEVEg7XHJcbiAgICBoZWlnaHQ6IG51bWJlciA9IDI4IC8gZ2FtZS5USUxFX0hFSUdIVDtcclxuXHJcbiAgICAvLyBTaGFyZWQgZGF0YVxyXG4gICAgbmFtZTogc3RyaW5nO1xyXG5cclxuICAgIC8vIExvY2FsIGRhdGFcclxuICAgIHhWZWw6IG51bWJlciA9IDA7XHJcbiAgICB5VmVsOiBudW1iZXIgPSAwO1xyXG4gICAgc2xpZGVYOiBudW1iZXI7XHJcbiAgICBzbGlkZVk6IG51bWJlcjtcclxuICAgIGludGVycG9sYXRlZFg6IG51bWJlcjtcclxuICAgIGludGVycG9sYXRlZFk6IG51bWJlcjtcclxuXHJcbiAgICBwWDogbnVtYmVyO1xyXG4gICAgcFk6IG51bWJlcjtcclxuICAgIHBYVmVsOiBudW1iZXIgPSAwO1xyXG4gICAgcFlWZWw6IG51bWJlciA9IDA7XHJcblxyXG4gICAgZ3JvdW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHBHcm91bmRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbGxpc2lvbkRhdGE6IGFueTtcclxuICAgIGNsb3Nlc3RDb2xsaXNpb246IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcclxuXHJcbiAgICBtYXNzOiBudW1iZXIgPSB0aGlzLndpZHRoICogdGhpcy5oZWlnaHQ7XHJcblxyXG5cclxuICAgIC8vaW5wdXQgYm9vbGVhbnNcclxuICAgIHJpZ2h0QnV0dG9uOiBib29sZWFuO1xyXG4gICAgbGVmdEJ1dHRvbjogYm9vbGVhbjtcclxuICAgIGp1bXBCdXR0b246IGJvb2xlYW47XHJcblxyXG4gICAgY3VycmVudEFuaW1hdGlvbjogQW5pbWF0aW9uRnJhbWU8dHlwZW9mIFBsYXllckFuaW1hdGlvbnM+ID0gXCJpZGxlXCI7XHJcbiAgICBhbmltRnJhbWU6IG51bWJlciA9IDA7XHJcbiAgICB0aW1lSW5UaGlzQW5pbWF0aW9uRnJhbWUgPSAwO1xyXG4gICAgZmFjaW5nUmlnaHQgPSB0cnVlO1xyXG5cclxuICAgIHRvcENvbGxpc2lvbjogKHR5cGVvZiBXb3JsZFRpbGVzW1RpbGVUeXBlLkFpcl0pID0gV29ybGRUaWxlc1tUaWxlVHlwZS5BaXJdOy8vaGFja3lcclxuICAgIGJvdHRvbUNvbGxpc2lvbjogKHR5cGVvZiBXb3JsZFRpbGVzW1RpbGVUeXBlLkFpcl0pID0gV29ybGRUaWxlc1tUaWxlVHlwZS5BaXJdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGRhdGE6IEVudGl0eVBheWxvYWQ8RW50aXRpZXMuTG9jYWxQbGF5ZXI+XHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcihkYXRhLmlkKVxyXG5cclxuICAgICAgICB0aGlzLm5hbWUgPSBkYXRhLmRhdGEubmFtZTtcclxuXHJcbiAgICAgICAgdGhpcy54ID0gZGF0YS5kYXRhLng7XHJcbiAgICAgICAgdGhpcy55ID0gZGF0YS5kYXRhLnk7XHJcblxyXG4gICAgICAgIHRoaXMucFggPSB0aGlzLng7XHJcbiAgICAgICAgdGhpcy5wWSA9IHRoaXMueTtcclxuXHJcbiAgICAgICAgdGhpcy5pbnRlcnBvbGF0ZWRYID0gdGhpcy54O1xyXG4gICAgICAgIHRoaXMuaW50ZXJwb2xhdGVkWSA9IHRoaXMueTtcclxuXHJcbiAgICAgICAgdGhpcy5jbG9zZXN0Q29sbGlzaW9uID0gWzEsIDAsIEluZmluaXR5XTtcclxuICAgIFxyXG4gICAgICAgIHRoaXMubGVmdEJ1dHRvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmlnaHRCdXR0b24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmp1bXBCdXR0b24gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIodGFyZ2V0OiBwNSwgdXBzY2FsZVNpemU6IG51bWJlcik6IHZvaWQge1xyXG5cclxuICAgICAgICB0aGlzLnRpbWVJblRoaXNBbmltYXRpb25GcmFtZSArPSBnYW1lLmRlbHRhVGltZTtcclxuICAgICAgICBpZih0aGlzLnRpbWVJblRoaXNBbmltYXRpb25GcmFtZT5QbGF5ZXJBbmltYXRpb25zW3RoaXMuY3VycmVudEFuaW1hdGlvbl1bdGhpcy5hbmltRnJhbWVdWzFdKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZUluVGhpc0FuaW1hdGlvbkZyYW1lID0gMDsvL3RoaXMgZG9lcyBpbnRyb2R1Y2Ugc29tZSBzbGlnaHQgaW5hY2N1cmFjaWVzIHZzIHN1YnRyYWN0aW5nIGl0LCBidXQsIHdoZW4geW91IHRhYiBiYWNrIGludG8gdGhlIGJyb3dzZXIgYWZ0ZXIgYmVpbmcgdGFiYmVkIG91dCwgc3VidHJhY3RpbmcgaXQgY2F1c2VzIHNwYXp6aW5nXHJcbiAgICAgICAgICAgIHRoaXMuYW5pbUZyYW1lKys7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYW5pbUZyYW1lPj1QbGF5ZXJBbmltYXRpb25zW3RoaXMuY3VycmVudEFuaW1hdGlvbl0ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1GcmFtZSA9IHRoaXMuYW5pbUZyYW1lJVBsYXllckFuaW1hdGlvbnNbdGhpcy5jdXJyZW50QW5pbWF0aW9uXS5sZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHRhcmdldC5yZWN0KFxyXG4gICAgICAgIC8vICAgICAodGhpcy5pbnRlcnBvbGF0ZWRYICogZ2FtZS5USUxFX1dJRFRIIC1cclxuICAgICAgICAvLyAgICAgICAgIGdhbWUuaW50ZXJwb2xhdGVkQ2FtWCAqIGdhbWUuVElMRV9XSURUSCkgKlxyXG4gICAgICAgIC8vICAgICAgICAgdXBzY2FsZVNpemUsXHJcbiAgICAgICAgLy8gICAgICh0aGlzLmludGVycG9sYXRlZFkgKiBnYW1lLlRJTEVfSEVJR0hUIC1cclxuICAgICAgICAvLyAgICAgICAgIGdhbWUuaW50ZXJwb2xhdGVkQ2FtWSAqIGdhbWUuVElMRV9IRUlHSFQpICpcclxuICAgICAgICAvLyAgICAgICAgIHVwc2NhbGVTaXplLFxyXG4gICAgICAgIC8vICAgICB0aGlzLndpZHRoICogdXBzY2FsZVNpemUgKiBnYW1lLlRJTEVfV0lEVEgsXHJcbiAgICAgICAgLy8gICAgIHRoaXMuaGVpZ2h0ICogdXBzY2FsZVNpemUgKiBnYW1lLlRJTEVfSEVJR0hUXHJcbiAgICAgICAgLy8gKTtcclxuICAgICAgICBQbGF5ZXJBbmltYXRpb25zW3RoaXMuY3VycmVudEFuaW1hdGlvbl1bdGhpcy5hbmltRnJhbWVdWzBdLnJlbmRlclxyXG4gICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgICB0YXJnZXQsXHJcbiAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKCh0aGlzLmludGVycG9sYXRlZFggKiBnYW1lLlRJTEVfV0lEVEggLVxyXG4gICAgICAgICAgICAgICAgICAgIGdhbWUuaW50ZXJwb2xhdGVkQ2FtWCAqIGdhbWUuVElMRV9XSURUSCkgKlxyXG4gICAgICAgICAgICAgICAgdXBzY2FsZVNpemUpLFxyXG4gICAgICAgICAgICAgICAgTWF0aC5yb3VuZCgodGhpcy5pbnRlcnBvbGF0ZWRZICogZ2FtZS5USUxFX0hFSUdIVCAtXHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZS5pbnRlcnBvbGF0ZWRDYW1ZICogZ2FtZS5USUxFX0hFSUdIVCkgKlxyXG4gICAgICAgICAgICAgICAgdXBzY2FsZVNpemUpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53aWR0aCAqIHVwc2NhbGVTaXplICogZ2FtZS5USUxFX1dJRFRILFxyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgKiB1cHNjYWxlU2l6ZSAqIGdhbWUuVElMRV9IRUlHSFRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgUGxheWVyQW5pbWF0aW9uc1t0aGlzLmN1cnJlbnRBbmltYXRpb25dW3RoaXMuYW5pbUZyYW1lXVswXS5yZW5kZXJXb3JsZHNwYWNlUmVmbGVjdGlvblxyXG4gICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmludGVycG9sYXRlZFgsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmludGVycG9sYXRlZFkrdGhpcy5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICB0aGlzLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHRcclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVEYXRhKGRhdGE6IEVudGl0eVBheWxvYWQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZGF0YS50eXBlID09PSBFbnRpdGllcy5QbGF5ZXIpIHRoaXMubmFtZSA9IGRhdGEuZGF0YS5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGtleWJvYXJkSW5wdXQoKSB7XHJcblxyXG4gICAgICAgIHRoaXMueFZlbCArPVxyXG4gICAgICAgICAgICAwLjAyICogKCt0aGlzLnJpZ2h0QnV0dG9uIC0gK3RoaXMubGVmdEJ1dHRvbik7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB0aGlzLmdyb3VuZGVkICYmIHRoaXMuanVtcEJ1dHRvblxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBnYW1lLnNjcmVlbnNoYWtlQW1vdW50ID0gMC41O1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwICogZ2FtZS5wYXJ0aWNsZU11bHRpcGxpZXI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5ib3R0b21Db2xsaXNpb24gIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgICAgICBnYW1lLnBhcnRpY2xlcy5wdXNoKG5ldyBDb2xvclBhcnRpY2xlKHRoaXMuYm90dG9tQ29sbGlzaW9uLmNvbG9yLCAxIC8gOCArIE1hdGgucmFuZG9tKCkgLyA4LCAyMCwgdGhpcy54ICsgdGhpcy53aWR0aCAqIE1hdGgucmFuZG9tKCksIHRoaXMueSArIHRoaXMuaGVpZ2h0LCAwLjIgKiAoTWF0aC5yYW5kb20oKSAtIDAuNSksIDAuMiAqIC1NYXRoLnJhbmRvbSgpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy55VmVsID0gLTEuNTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHlHcmF2aXR5QW5kRHJhZygpIHtcclxuICAgICAgICAvLyB0aGlzIGZ1bmN0aW9uIGNoYW5nZXMgdGhlIG9iamVjdCdzIG5leHQgdGljaydzIHZlbG9jaXR5IGluIGJvdGggdGhlIHggYW5kIHRoZSB5IGRpcmVjdGlvbnNcclxuXHJcbiAgICAgICAgdGhpcy5wWFZlbCA9IHRoaXMueFZlbDtcclxuICAgICAgICB0aGlzLnBZVmVsID0gdGhpcy55VmVsO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5ib3R0b21Db2xsaXNpb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnhWZWwgLT1cclxuICAgICAgICAgICAgICAgIChNYXRoLmFicyh0aGlzLnhWZWwpICogdGhpcy54VmVsICogZ2FtZS5EUkFHX0NPRUZGSUNJRU5UICogdGhpcy53aWR0aCkgLyAvL2FwcGx5IGFpciByZXNpc3RhbmNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hc3M7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy54VmVsIC09XHJcbiAgICAgICAgICAgICAgICAoTWF0aC5hYnModGhpcy54VmVsKSAqIHRoaXMueFZlbCAqIGdhbWUuRFJBR19DT0VGRklDSUVOVCAqICh0aGlzLmJvdHRvbUNvbGxpc2lvbi5mcmljdGlvbikgKiB0aGlzLndpZHRoKSAvIC8vYXBwbHkgYWlyIHJlc2lzdGFuY2UgYW5kIGdyb3VuZCBmcmljdGlvblxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXNzO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnlWZWwgKz0gZ2FtZS5HUkFWSVRZX1NQRUVEO1xyXG4gICAgICAgIHRoaXMueVZlbCAtPVxyXG4gICAgICAgICAgICAoZ2FtZS5hYnModGhpcy55VmVsKSAqIHRoaXMueVZlbCAqIGdhbWUuRFJBR19DT0VGRklDSUVOVCAqIHRoaXMuaGVpZ2h0KSAvXHJcbiAgICAgICAgICAgIHRoaXMubWFzcztcclxuICAgICAgICAvL2lmIG9uIHRoZSBncm91bmQsIG1ha2Ugd2Fsa2luZyBwYXJ0aWNsZXNcclxuICAgICAgICBpZiAodGhpcy5ncm91bmRlZCkge1xyXG4gICAgICAgICAgICAvL2Zvb3RzdGVwc1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhbmRvbWx5VG9JbnQoTWF0aC5hYnModGhpcy54VmVsKSAqIGdhbWUucGFydGljbGVNdWx0aXBsaWVyIC8gMik7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5wYXJ0aWNsZXMucHVzaChuZXcgQ29sb3JQYXJ0aWNsZShcIiNiYmJiYmI0NVwiLCAxIC8gNCArIE1hdGgucmFuZG9tKCkgLyA4LCA1MCwgdGhpcy54ICsgdGhpcy53aWR0aCAvIDIgKyBpIC8gZ2FtZS5wYXJ0aWNsZU11bHRpcGxpZXIsIHRoaXMueSArIHRoaXMuaGVpZ2h0LCAwLCAwLCBmYWxzZSkpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2R1c3RcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYW5kb21seVRvSW50KE1hdGguYWJzKHRoaXMueFZlbCkgKiBnYW1lLnBhcnRpY2xlTXVsdGlwbGllciAvIDIpOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYm90dG9tQ29sbGlzaW9uICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICBnYW1lLnBhcnRpY2xlcy5wdXNoKG5ldyBDb2xvclBhcnRpY2xlKHRoaXMuYm90dG9tQ29sbGlzaW9uLmNvbG9yLCAxIC8gOCArIE1hdGgucmFuZG9tKCkgLyA4LCAxMCwgdGhpcy54ICsgdGhpcy53aWR0aCAvIDIsIHRoaXMueSArIHRoaXMuaGVpZ2h0LCAwLjIgKiAtdGhpcy54VmVsICsgMC4yICogKE1hdGgucmFuZG9tKCkgLSAwLjUpLCAwLjIgKiAtTWF0aC5yYW5kb20oKSwgdHJ1ZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCh0aGlzLnhWZWwpPjAuMDUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QW5pbWF0aW9uID0gXCJ3YWxrXCI7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbUZyYW1lID0gdGhpcy5hbmltRnJhbWUgJSBQbGF5ZXJBbmltYXRpb25zW3RoaXMuY3VycmVudEFuaW1hdGlvbl0ubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2luZ1JpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZigodGhpcy54VmVsKTwtMC4wNSkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRBbmltYXRpb24gPSBcIndhbGtsZWZ0XCI7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjaW5nUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5hbmltRnJhbWUgPSB0aGlzLmFuaW1GcmFtZSAlIFBsYXllckFuaW1hdGlvbnNbdGhpcy5jdXJyZW50QW5pbWF0aW9uXS5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5mYWNpbmdSaWdodCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRBbmltYXRpb24gPSBcImlkbGVcIjtcclxuICAgICAgICAgICAgdGhpcy5hbmltRnJhbWUgPSB0aGlzLmFuaW1GcmFtZSAlIFBsYXllckFuaW1hdGlvbnNbdGhpcy5jdXJyZW50QW5pbWF0aW9uXS5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRBbmltYXRpb24gPSBcImlkbGVsZWZ0XCI7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbUZyYW1lID0gdGhpcy5hbmltRnJhbWUgJSBQbGF5ZXJBbmltYXRpb25zW3RoaXMuY3VycmVudEFuaW1hdGlvbl0ubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaW5kSW50ZXJwb2xhdGVkQ29vcmRpbmF0ZXMoKSB7XHJcbiAgICAgICAgLy8gdGhpcyBmdW5jdGlvbiBlc3NlbnRpYWxseSBtYWtlcyB0aGUgY2hhcmFjdGVyIGxhZyBiZWhpbmQgb25lIHRpY2ssIGJ1dCBtZWFucyB0aGF0IGl0IGdldHMgZGlzcGxheWVkIGF0IHRoZSBtYXhpbXVtIGZyYW1lIHJhdGUuXHJcbiAgICAgICAgaWYgKHRoaXMucFhWZWwgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJwb2xhdGVkWCA9IGdhbWUubWluKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wWCArIHRoaXMucFhWZWwgKiBnYW1lLmFtb3VudFNpbmNlTGFzdFRpY2ssXHJcbiAgICAgICAgICAgICAgICB0aGlzLnhcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmludGVycG9sYXRlZFggPSBnYW1lLm1heChcclxuICAgICAgICAgICAgICAgIHRoaXMucFggKyB0aGlzLnBYVmVsICogZ2FtZS5hbW91bnRTaW5jZUxhc3RUaWNrLFxyXG4gICAgICAgICAgICAgICAgdGhpcy54XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnBZVmVsID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmludGVycG9sYXRlZFkgPSBnYW1lLm1pbihcclxuICAgICAgICAgICAgICAgIHRoaXMucFkgKyB0aGlzLnBZVmVsICogZ2FtZS5hbW91bnRTaW5jZUxhc3RUaWNrLFxyXG4gICAgICAgICAgICAgICAgdGhpcy55XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pbnRlcnBvbGF0ZWRZID0gZ2FtZS5tYXgoXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBZICsgdGhpcy5wWVZlbCAqIGdhbWUuYW1vdW50U2luY2VMYXN0VGljayxcclxuICAgICAgICAgICAgICAgIHRoaXMueVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhcHBseVZlbG9jaXR5QW5kQ29sbGlkZSgpIHtcclxuICAgICAgICB0aGlzLnRvcENvbGxpc2lvbiA9IFdvcmxkVGlsZXNbVGlsZVR5cGUuQWlyXTtcclxuICAgICAgICB0aGlzLmJvdHRvbUNvbGxpc2lvbiA9IFdvcmxkVGlsZXNbVGlsZVR5cGUuQWlyXTtcclxuICAgICAgICB0aGlzLnBYID0gdGhpcy54O1xyXG4gICAgICAgIHRoaXMucFkgPSB0aGlzLnk7XHJcblxyXG4gICAgICAgIHRoaXMucEdyb3VuZGVkID0gdGhpcy5ncm91bmRlZDtcclxuICAgICAgICB0aGlzLmdyb3VuZGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgVGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgdGhlIG9iamVjdCBkb2Vzbid0IHN0YXJ0IGluIGNvbGxpc2lvblxyXG5cclxuICAgICAgICBBbHNvLCBpdCB0YWtlcyBhZHZhbnRhZ2Ugb2YgdGhlIGZhY3QgdGhhdCBhbiBvYmplY3QgY2FuIG9ubHkgY29sbGlkZSBvbmNlIGluIGVhY2ggYXhpcyB3aXRoIHRoZXNlIGF4aXMtYWxpZ25lZCByZWN0YW5nbGVzLlxyXG4gICAgICAgIFRoYXQncyBhIHRvdGFsIG9mIGEgcG9zc2libGUgdHdvIGNvbGxpc2lvbnMsIG9yIGFuIGluaXRpYWwgY29sbGlzaW9uLCBhbmQgYSBzbGlkaW5nIGNvbGxpc2lvbi5cclxuICAgICAgICAqL1xyXG5cclxuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIGluaXRpYWwgY29sbGlzaW9uOlxyXG5cclxuICAgICAgICAvLyBzZXQgdGhlIGNsb3Nlc3QgY29sbGlzaW9uIHRvIG9uZSBpbmZpbml0ZWx5IGZhciBhd2F5LlxyXG4gICAgICAgIHRoaXMuY2xvc2VzdENvbGxpc2lvbiA9IFsxLCAwLCBJbmZpbml0eV07XHJcblxyXG4gICAgICAgIGxldCBtb3N0bHlHb2luZ0hvcml6b250YWxseTogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgLy8gbG9vcCB0aHJvdWdoIGFsbCB0aGUgcG9zc2libGUgdGlsZXMgdGhlIHBoeXNpY3MgYm94IGNvdWxkIGJlIGludGVyc2VjdGluZyB3aXRoXHJcbiAgICAgICAgZm9yIChcclxuICAgICAgICAgICAgbGV0IGkgPSBNYXRoLmZsb29yKGdhbWUubWluKHRoaXMueCwgdGhpcy54ICsgdGhpcy54VmVsKSk7XHJcbiAgICAgICAgICAgIGkgPCBNYXRoLmNlaWwoZ2FtZS5tYXgodGhpcy54LCB0aGlzLnggKyB0aGlzLnhWZWwpICsgdGhpcy53aWR0aCk7XHJcbiAgICAgICAgICAgIGkrK1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBmb3IgKFxyXG4gICAgICAgICAgICAgICAgbGV0IGogPSBNYXRoLmZsb29yKGdhbWUubWluKHRoaXMueSwgdGhpcy55ICsgdGhpcy55VmVsKSk7XHJcbiAgICAgICAgICAgICAgICBqIDwgTWF0aC5jZWlsKGdhbWUubWF4KHRoaXMueSwgdGhpcy55ICsgdGhpcy55VmVsKSArIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGorK1xyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBjdXJyZW50IHRpbGUgaXNuJ3QgYWlyICh2YWx1ZSAwKSwgdGhlbiBjb250aW51ZSB3aXRoIHRoZSBjb2xsaXNpb24gZGV0ZWN0aW9uXHJcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudEJsb2NrOiBUaWxlVHlwZSB8IHN0cmluZyA9IGdhbWUud29ybGQud29ybGRUaWxlc1tqICogZ2FtZS53b3JsZFdpZHRoICsgaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudEJsb2NrICE9PSBUaWxlVHlwZS5BaXIgJiYgdHlwZW9mIGN1cnJlbnRCbG9jayAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGRhdGEgYWJvdXQgdGhlIGNvbGxpc2lvbiBhbmQgc3RvcmUgaXQgaW4gYSB2YXJpYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sbGlzaW9uRGF0YSA9IGdhbWUucmVjdFZzUmF5KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpIC0gdGhpcy53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaiAtIHRoaXMuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndpZHRoICsgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgKyAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy54VmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnlWZWxcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vc3RseUdvaW5nSG9yaXpvbnRhbGx5ID0gTWF0aC5hYnModGhpcy54VmVsKSA+IE1hdGguYWJzKHRoaXMueVZlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbGxpc2lvbkRhdGEgIT09IGZhbHNlKSB7Ly9hIGNvbGxpc2lvbiBoYXBwZW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3Nlc3RDb2xsaXNpb25bMl0gPiB0aGlzLmNvbGxpc2lvbkRhdGFbMl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3Nlc3RDb2xsaXNpb24gPSB0aGlzLmNvbGxpc2lvbkRhdGE7Ly9ob25lc3RseSB0aGlzIGVudGlyZSBjb2xsaXNpb24gc3lzdGVtIGlzIGEgbWVzcyBidXQgaXQgd29yayBzbyBzbyB3aGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jbG9zZXN0Q29sbGlzaW9uWzBdID09PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNsb3Nlc3RDb2xsaXNpb25bMV0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b3BDb2xsaXNpb24gPSBXb3JsZFRpbGVzW2N1cnJlbnRCbG9ja107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvdHRvbUNvbGxpc2lvbiA9IFdvcmxkVGlsZXNbY3VycmVudEJsb2NrXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jbG9zZXN0Q29sbGlzaW9uWzJdID09PSB0aGlzLmNvbGxpc2lvbkRhdGFbMl0gJiYgbW9zdGx5R29pbmdIb3Jpem9udGFsbHkgPT09ICh0aGlzLmNsb3Nlc3RDb2xsaXNpb25bMF0gPT09IDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3Nlc3RDb2xsaXNpb24gPSB0aGlzLmNvbGxpc2lvbkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jbG9zZXN0Q29sbGlzaW9uWzBdID09PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNsb3Nlc3RDb2xsaXNpb25bMV0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b3BDb2xsaXNpb24gPSBXb3JsZFRpbGVzW2N1cnJlbnRCbG9ja107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvdHRvbUNvbGxpc2lvbiA9IFdvcmxkVGlsZXNbY3VycmVudEJsb2NrXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5jbG9zZXN0Q29sbGlzaW9uWzJdICE9PSBJbmZpbml0eSkge1xyXG4gICAgICAgICAgICAvLyB0aGVyZSBoYXMgYmVlbiBhdCBsZWFzdCBvbmUgY29sbGlzaW9uXHJcblxyXG4gICAgICAgICAgICAvLyBnbyB0byB0aGUgcG9pbnQgb2YgY29sbGlzaW9uICh0aGlzIG1ha2VzIGl0IGJlaGF2ZSBhcyBpZiB0aGUgd2FsbHMgYXJlIHN0aWNreSwgYnV0IHdlIHdpbGwgbGF0ZXIgc2xpZGUgYWdhaW5zdCB0aGUgd2FsbHMpXHJcbiAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLnhWZWwgKiB0aGlzLmNsb3Nlc3RDb2xsaXNpb25bMl07XHJcbiAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnlWZWwgKiB0aGlzLmNsb3Nlc3RDb2xsaXNpb25bMl07XHJcbiAgICAgICAgICAgIC8vIHRoZSBjb2xsaXNpb24gaGFwcGVuZWQgZWl0aGVyIG9uIHRoZSB0b3Agb3IgYm90dG9tXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsb3Nlc3RDb2xsaXNpb25bMF0gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNsb3Nlc3RDb2xsaXNpb25bMV0gPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91bmRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgaXQgY29sbGlkZWQgb24gdGhlIGhpZ2hlciBzaWRlLCBpdCBtdXN0IGJlIHRvdWNoaW5nIHRoZSBncm91bmQuIChoaWdoZXIgeSBpcyBkb3duKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5wR3JvdW5kZWQpIHsvL2lmIGl0IGlzbid0IGdyb3VuZGVkIHlldCwgaXQgbXVzdCBiZSBjb2xsaWRpbmcgd2l0aCB0aGUgZ3JvdW5kIGZvciB0aGUgZmlyc3QgdGltZSwgc28gc3VtbW9uIHBhcnRpY2xlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lLnNjcmVlbnNoYWtlQW1vdW50ID0gTWF0aC5hYnModGhpcy55VmVsICogMC43NSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNSAqIGdhbWUucGFydGljbGVNdWx0aXBsaWVyOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuYm90dG9tQ29sbGlzaW9uICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZS5wYXJ0aWNsZXMucHVzaChuZXcgQ29sb3JQYXJ0aWNsZSh0aGlzLmJvdHRvbUNvbGxpc2lvbi5jb2xvciwgMSAvIDggKyBNYXRoLnJhbmRvbSgpIC8gOCwgMjAsIHRoaXMueCArIHRoaXMud2lkdGggKiBNYXRoLnJhbmRvbSgpLCB0aGlzLnkgKyB0aGlzLmhlaWdodCwgMC4yICogKE1hdGgucmFuZG9tKCkgLSAwLjUpLCAwLjIgKiAtTWF0aC5yYW5kb20oKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZS5zY3JlZW5zaGFrZUFtb3VudCA9IE1hdGguYWJzKHRoaXMueVZlbCAqIDAuNzUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNSAqIGdhbWUucGFydGljbGVNdWx0aXBsaWVyOyBpKyspIHsvL2NlaWxpbmcgY29sbGlzaW9uIHBhcnRpY2xlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnRvcENvbGxpc2lvbiAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZS5wYXJ0aWNsZXMucHVzaChuZXcgQ29sb3JQYXJ0aWNsZSh0aGlzLnRvcENvbGxpc2lvbi5jb2xvciwgMSAvIDggKyBNYXRoLnJhbmRvbSgpIC8gOCwgMjAsIHRoaXMueCArIHRoaXMud2lkdGggKiBNYXRoLnJhbmRvbSgpLCB0aGlzLnksIDAuMiAqIChNYXRoLnJhbmRvbSgpIC0gMC41KSwgMC4yICogLU1hdGgucmFuZG9tKCkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnlWZWwgPSAwOyAvLyBzZXQgdGhlIHkgdmVsb2NpdHkgdG8gMCBiZWNhdXNlIHRoZSBvYmplY3QgaGFzIHJ1biBpbnRvIGEgd2FsbCBvbiBpdHMgdG9wIG9yIGJvdHRvbVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZVggPSB0aGlzLnhWZWwgKiAoMSAtIHRoaXMuY2xvc2VzdENvbGxpc2lvblsyXSk7IC8vIHRoaXMgaXMgdGhlIHJlbWFpbmluZyBkaXN0YW5jZSB0byBzbGlkZSBhZnRlciB0aGUgY29sbGlzaW9uXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlWSA9IDA7IC8vIGl0IGRvZXNuJ3Qgc2xpZGUgaW4gdGhlIHkgZGlyZWN0aW9uIGJlY2F1c2UgdGhlcmUncyBhIHdhbGwgXFwoLi0uKS9cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueFZlbCA9IDA7IC8vIHNldCB0aGUgeCB2ZWxvY2l0eSB0byAwIGJlY2F1c2Ugd2FsbCBnbyBvb2ZcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVYID0gMDsgLy8gaXQgZG9lc24ndCBzbGlkZSBpbiB0aGUgeCBkaXJlY3Rpb24gYmVjYXVzZSB0aGVyZSdzIGEgd2FsbCAvKC5fLilcXFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZVkgPSB0aGlzLnlWZWwgKiAoMSAtIHRoaXMuY2xvc2VzdENvbGxpc2lvblsyXSk7IC8vIHRoaXMgaXMgdGhlIHJlbWFpbmluZyBkaXN0YW5jZSB0byBzbGlkZSBhZnRlciB0aGUgY29sbGlzaW9uXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGF0IHRoaXMgcG9pbnQsIHRoZSBvYmplY3QgaXMgdG91Y2hpbmcgaXRzIGZpcnN0IGNvbGxpc2lvbiwgcmVhZHkgdG8gc2xpZGUuICBUaGUgYW1vdW50IGl0IHdhbnRzIHRvIHNsaWRlIGlzIGhlbGQgaW4gdGhlIHRoaXMuc2xpZGVYIGFuZCB0aGlzLnNsaWRlWSB2YXJpYWJsZXMuXHJcblxyXG4gICAgICAgICAgICAvLyB0aGlzIGNhbiBiZSB0cmVhdGVkIGVzc2VudGlhbGx5IHRoZSBzYW1lIGFzIHRoZSBmaXJzdCBjb2xsaXNpb24sIHNvIGEgbG90IG9mIHRoZSBjb2RlIHdpbGwgYmUgcmV1c2VkLlxyXG5cclxuICAgICAgICAgICAgLy8gc2V0IHRoZSBjbG9zZXN0IGNvbGxpc2lvbiB0byBvbmUgaW5maW5pdGVseSBmYXIgYXdheS5cclxuICAgICAgICAgICAgdGhpcy5jbG9zZXN0Q29sbGlzaW9uID0gWzEsIDAsIEluZmluaXR5XTtcclxuXHJcbiAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgdGhlIHBvc3NpYmxlIHRpbGVzIHRoZSBwaHlzaWNzIGJveCBjb3VsZCBiZSBpbnRlcnNlY3Rpbmcgd2l0aFxyXG4gICAgICAgICAgICBmb3IgKFxyXG4gICAgICAgICAgICAgICAgbGV0IGkgPSBNYXRoLmZsb29yKGdhbWUubWluKHRoaXMueCwgdGhpcy54ICsgdGhpcy5zbGlkZVgpKTtcclxuICAgICAgICAgICAgICAgIGkgPCBNYXRoLmNlaWwoZ2FtZS5tYXgodGhpcy54LCB0aGlzLnggKyB0aGlzLnNsaWRlWCkgKyB0aGlzLndpZHRoKTtcclxuICAgICAgICAgICAgICAgIGkrK1xyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGZvciAoXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGogPSBNYXRoLmZsb29yKGdhbWUubWluKHRoaXMueSwgdGhpcy55ICsgdGhpcy5zbGlkZVkpKTtcclxuICAgICAgICAgICAgICAgICAgICBqIDxcclxuICAgICAgICAgICAgICAgICAgICBNYXRoLmNlaWwoZ2FtZS5tYXgodGhpcy55LCB0aGlzLnkgKyB0aGlzLnNsaWRlWSkgKyB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaisrXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudEJsb2NrOiBUaWxlVHlwZSB8IHN0cmluZyA9IGdhbWUud29ybGQud29ybGRUaWxlc1tqICogZ2FtZS53b3JsZFdpZHRoICsgaV07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIGN1cnJlbnQgdGlsZSBpc24ndCBhaXIsIHRoZW4gY29udGludWUgd2l0aCB0aGUgY29sbGlzaW9uIGRldGVjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50QmxvY2sgIT09IFRpbGVUeXBlLkFpciAmJiB0eXBlb2YgY3VycmVudEJsb2NrICE9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgZGF0YSBhYm91dCB0aGUgY29sbGlzaW9uIGFuZCBzdG9yZSBpdCBpbiBhIHZhcmlhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29sbGlzaW9uRGF0YSA9IGdhbWUucmVjdFZzUmF5KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSAtIHRoaXMud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqIC0gdGhpcy5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndpZHRoICsgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0ICsgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVYLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zbGlkZVlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xsaXNpb25EYXRhICE9PSBmYWxzZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZXN0Q29sbGlzaW9uWzJdID4gdGhpcy5jb2xsaXNpb25EYXRhWzJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZXN0Q29sbGlzaW9uID0gdGhpcy5jb2xsaXNpb25EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VzdENvbGxpc2lvblswXSA9PT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jbG9zZXN0Q29sbGlzaW9uWzFdID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9wQ29sbGlzaW9uID0gV29ybGRUaWxlc1tjdXJyZW50QmxvY2tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3R0b21Db2xsaXNpb24gPSBXb3JsZFRpbGVzW2N1cnJlbnRCbG9ja107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpdCBoYXMgY29sbGlkZWQgd2hpbGUgdHJ5aW5nIHRvIHNsaWRlXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsb3Nlc3RDb2xsaXNpb25bMl0gIT09IEluZmluaXR5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5zbGlkZVggKiB0aGlzLmNsb3Nlc3RDb2xsaXNpb25bMl07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy5zbGlkZVkgKiB0aGlzLmNsb3Nlc3RDb2xsaXNpb25bMl07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VzdENvbGxpc2lvblswXSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueVZlbCA9IDA7IC8vIHNldCB0aGUgeSB2ZWxvY2l0eSB0byAwIGJlY2F1c2UgdGhlIG9iamVjdCBoYXMgcnVuIGludG8gYSB3YWxsIG9uIGl0cyB0b3Agb3IgYm90dG9tXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VzdENvbGxpc2lvblsxXSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgaXQgY29sbGlkZWQgb24gdGhlIGhpZ2hlciBzaWRlLCBpdCBtdXN0IGJlIHRvdWNoaW5nIHRoZSBncm91bmQuIChoaWdoZXIgeSBpcyBkb3duKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VuZGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnhWZWwgPSAwOyAvLyBzZXQgdGhlIHggdmVsb2NpdHkgdG8gMCBiZWNhdXNlIHdhbGwgZ28gb29mXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpdCBoYXMgbm90IGNvbGxpZGVkIHdoaWxlIHRyeWluZyB0byBzbGlkZVxyXG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMuc2xpZGVYO1xyXG4gICAgICAgICAgICAgICAgdGhpcy55ICs9IHRoaXMuc2xpZGVZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gdGhlcmUgaGFzIGJlZW4gbm8gY29sbGlzaW9uXHJcbiAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLnhWZWw7XHJcbiAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnlWZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjb2xsaWRlIHdpdGggc2lkZXMgb2YgbWFwXHJcblxyXG4gICAgICAgIGlmICh0aGlzLnggPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMueFZlbCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnggKyB0aGlzLndpZHRoID4gZ2FtZS53b3JsZFdpZHRoKSB7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IGdhbWUud29ybGRXaWR0aCAtIHRoaXMud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMueFZlbCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy55ICsgdGhpcy5oZWlnaHQgPiBnYW1lLndvcmxkSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRoaXMueSA9IGdhbWUud29ybGRIZWlnaHQgLSB0aGlzLmhlaWdodDtcclxuICAgICAgICAgICAgdGhpcy55VmVsID0gMDtcclxuICAgICAgICAgICAgdGhpcy5ncm91bmRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gcmFuZG9tbHlUb0ludChmOiBudW1iZXIpIHtcclxuICAgIGlmIChNYXRoLnJhbmRvbSgpID4gZiAtIE1hdGguZmxvb3IoZikpIHtcclxuICAgICAgICByZXR1cm4gKE1hdGguZmxvb3IoZikpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChNYXRoLmNlaWwoZikpO1xyXG59IiwiaW1wb3J0IHsgUmVuZGVyYWJsZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvUmVuZGVyYWJsZSc7XHJcbmltcG9ydCBwNSBmcm9tICdwNSc7XHJcbmltcG9ydCB7IEF1ZGlvQXNzZXRzLCBVaUFzc2V0cyB9IGZyb20gJy4uL2Fzc2V0cy9Bc3NldHMnO1xyXG5pbXBvcnQgeyBJbWFnZVJlc291cmNlIH0gZnJvbSAnLi4vYXNzZXRzL3Jlc291cmNlcy9JbWFnZVJlc291cmNlJztcclxuaW1wb3J0IHsgRm9udFJlc291cmNlIH0gZnJvbSAnLi4vYXNzZXRzL3Jlc291cmNlcy9Gb250UmVzb3VyY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJ1dHRvbiBpbXBsZW1lbnRzIFJlbmRlcmFibGUge1xyXG5cclxuICAgIGZvbnQ6IEZvbnRSZXNvdXJjZVxyXG4gICAgdHh0OiBzdHJpbmdcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmdcclxuICAgIG9uUHJlc3NlZEN1c3RvbTogRnVuY3Rpb25cclxuICAgIHg6IG51bWJlclxyXG4gICAgeTogbnVtYmVyXHJcbiAgICB3OiBudW1iZXJcclxuICAgIGg6IG51bWJlclxyXG4gICAgaW1hZ2U6IEltYWdlUmVzb3VyY2VcclxuICAgIG1vdXNlSXNPdmVyOiBib29sZWFuXHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgZm9udDogRm9udFJlc291cmNlLFxyXG4gICAgICAgIHR4dDogc3RyaW5nLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsXHJcbiAgICAgICAgeDogbnVtYmVyLFxyXG4gICAgICAgIHk6IG51bWJlcixcclxuICAgICAgICB3OiBudW1iZXIsXHJcbiAgICAgICAgaDogbnVtYmVyLFxyXG4gICAgICAgIG9uUHJlc3NlZEN1c3RvbTogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmZvbnQgPSBmb250O1xyXG4gICAgICAgIHRoaXMudHh0ID0gdHh0XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uXHJcbiAgICAgICAgdGhpcy5vblByZXNzZWRDdXN0b20gPSBvblByZXNzZWRDdXN0b21cclxuICAgICAgICB0aGlzLnggPSB4XHJcbiAgICAgICAgdGhpcy55ID0geVxyXG4gICAgICAgIHRoaXMudyA9IHdcclxuICAgICAgICB0aGlzLmggPSBoXHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IFVpQXNzZXRzLmJ1dHRvbl91bnNlbGVjdGVkO1xyXG4gICAgICAgIHRoaXMubW91c2VJc092ZXIgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIodGFyZ2V0OiBwNSwgdXBzY2FsZVNpemU6IG51bWJlcikge1xyXG4gICAgICAgIC8vIHNldCB0aGUgY29vcmRzIGFuZCBkaW1lbnNpb25zIHRvIHJvdW5kIHRvIHRoZSBuZWFyZXN0IHVuLXVwc2NhbGVkIHBpeGVsXHJcbiAgICAgICAgY29uc3QgeCA9IE1hdGgucm91bmQodGhpcy54IC8gdXBzY2FsZVNpemUpICogdXBzY2FsZVNpemU7XHJcbiAgICAgICAgY29uc3QgeSA9IE1hdGgucm91bmQodGhpcy55IC8gdXBzY2FsZVNpemUpICogdXBzY2FsZVNpemU7XHJcbiAgICAgICAgY29uc3QgdyA9IE1hdGgucm91bmQodGhpcy53IC8gdXBzY2FsZVNpemUpICogdXBzY2FsZVNpemU7XHJcbiAgICAgICAgY29uc3QgaCA9IE1hdGgucm91bmQodGhpcy5oIC8gdXBzY2FsZVNpemUpICogdXBzY2FsZVNpemU7XHJcblxyXG4gICAgICAgIC8vIGNvcm5lcnNcclxuICAgICAgICB0aGlzLmltYWdlLnJlbmRlclBhcnRpYWwodGFyZ2V0LCB4LCB5LCA3ICogdXBzY2FsZVNpemUsIDcgKiB1cHNjYWxlU2l6ZSwgMCwgMCwgNywgNyk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5yZW5kZXJQYXJ0aWFsKHRhcmdldCwgeCArIHcgLSA3ICogdXBzY2FsZVNpemUsIHksIDcgKiB1cHNjYWxlU2l6ZSwgNyAqIHVwc2NhbGVTaXplLCA4LCAwLCA3LCA3KTtcclxuICAgICAgICB0aGlzLmltYWdlLnJlbmRlclBhcnRpYWwodGFyZ2V0LCB4LCB5ICsgaCAtIDcgKiB1cHNjYWxlU2l6ZSwgNyAqIHVwc2NhbGVTaXplLCA3ICogdXBzY2FsZVNpemUsIDAsIDgsIDcsIDcpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UucmVuZGVyUGFydGlhbCh0YXJnZXQsIHggKyB3IC0gNyAqIHVwc2NhbGVTaXplLCB5ICsgaCAtIDcgKiB1cHNjYWxlU2l6ZSwgNyAqIHVwc2NhbGVTaXplLCA3ICogdXBzY2FsZVNpemUsIDgsIDgsIDcsIDcpO1xyXG5cclxuICAgICAgICAvLyB0b3AgYW5kIGJvdHRvbVxyXG4gICAgICAgIHRoaXMuaW1hZ2UucmVuZGVyUGFydGlhbCh0YXJnZXQsIHggKyA3ICogdXBzY2FsZVNpemUsIHksIHcgLSAxNCAqIHVwc2NhbGVTaXplLCA3ICogdXBzY2FsZVNpemUsIDcsIDAsIDEsIDcpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UucmVuZGVyUGFydGlhbCh0YXJnZXQsIHggKyA3ICogdXBzY2FsZVNpemUsIHkgKyBoIC0gNyAqIHVwc2NhbGVTaXplLCB3IC0gMTQgKiB1cHNjYWxlU2l6ZSwgNyAqIHVwc2NhbGVTaXplLCA3LCA4LCAxLCA3KTtcclxuXHJcbiAgICAgICAgLy8gbGVmdCBhbmQgcmlnaHRcclxuICAgICAgICB0aGlzLmltYWdlLnJlbmRlclBhcnRpYWwodGFyZ2V0LCB4LCB5ICsgNyAqIHVwc2NhbGVTaXplLCA3ICogdXBzY2FsZVNpemUsIGggLSAxNCAqIHVwc2NhbGVTaXplLCAwLCA3LCA3LCAxKTtcclxuICAgICAgICB0aGlzLmltYWdlLnJlbmRlclBhcnRpYWwodGFyZ2V0LCB4ICsgdyAtIDcgKiB1cHNjYWxlU2l6ZSwgeSArIDcgKiB1cHNjYWxlU2l6ZSwgNyAqIHVwc2NhbGVTaXplLCBoIC0gMTQgKiB1cHNjYWxlU2l6ZSwgOCwgNywgNywgMSk7XHJcblxyXG4gICAgICAgIC8vIGNlbnRlclxyXG4gICAgICAgIHRoaXMuaW1hZ2UucmVuZGVyUGFydGlhbCh0YXJnZXQsIHggKyA3ICogdXBzY2FsZVNpemUsIHkgKyA3ICogdXBzY2FsZVNpemUsIHcgLSAxNCAqIHVwc2NhbGVTaXplLCBoIC0gMTQgKiB1cHNjYWxlU2l6ZSwgNywgNywgMSwgMSk7XHJcblxyXG4gICAgICAgIHRoaXMuZm9udC5kcmF3VGV4dCh0YXJnZXQsIHRoaXMudHh0LCB4ICsgNiAqIHVwc2NhbGVTaXplLCBNYXRoLnJvdW5kKCh0aGlzLnkgKyB0aGlzLmggLyAyKSAvIHVwc2NhbGVTaXplKSAqIHVwc2NhbGVTaXplIC0gNiAqIHVwc2NhbGVTaXplKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVNb3VzZU92ZXIobW91c2VYOiBudW1iZXIsIG1vdXNlWTogbnVtYmVyKSB7XHJcbiAgICAgICAgLy8gaWYgdGhlIG1vdXNlIHBvc2l0aW9uIGlzIGluc2lkZSB0aGUgYnV0dG9uLCByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIGlmIChtb3VzZVggPiB0aGlzLnggJiYgbW91c2VYIDwgdGhpcy54ICsgdGhpcy53ICYmIG1vdXNlWSA+IHRoaXMueSAmJiBtb3VzZVkgPCB0aGlzLnkgKyB0aGlzLmgpIHtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZUlzT3ZlciA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBVaUFzc2V0cy5idXR0b25fc2VsZWN0ZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlSXNPdmVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBVaUFzc2V0cy5idXR0b25fdW5zZWxlY3RlZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25QcmVzc2VkKCkge1xyXG4gICAgICAgIHRoaXMub25QcmVzc2VkQ3VzdG9tKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJidXR0b24gcHJlc3NlZFwiKTtcclxuICAgICAgICAvL0F1ZGlvQXNzZXRzLnVpLmludmVudG9yeUNsYWNrLnBsYXlSYW5kb20oKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBSZW5kZXJhYmxlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9SZW5kZXJhYmxlJztcclxuaW1wb3J0IHA1IGZyb20gJ3A1JztcclxuaW1wb3J0IHsgS2V5cywgVWlBc3NldHMgfSBmcm9tICcuLi9hc3NldHMvQXNzZXRzJztcclxuaW1wb3J0IHsgSW1hZ2VSZXNvdXJjZSB9IGZyb20gJy4uL2Fzc2V0cy9yZXNvdXJjZXMvSW1hZ2VSZXNvdXJjZSc7XHJcbmltcG9ydCB7IEZvbnRSZXNvdXJjZSB9IGZyb20gJy4uL2Fzc2V0cy9yZXNvdXJjZXMvRm9udFJlc291cmNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBJbnB1dEJveCBpbXBsZW1lbnRzIFJlbmRlcmFibGUge1xyXG5cclxuICAgIGZvbnQ6IEZvbnRSZXNvdXJjZVxyXG4gICAgdHh0OiBzdHJpbmdcclxuICAgIHZhbHVlOiBudW1iZXJcclxuICAgIGtleWJvYXJkOiBib29sZWFuXHJcbiAgICBpbmRleDogbnVtYmVyXHJcbiAgICB4OiBudW1iZXJcclxuICAgIHk6IG51bWJlclxyXG4gICAgdzogbnVtYmVyXHJcbiAgICBoOiBudW1iZXJcclxuICAgIGltYWdlOiBJbWFnZVJlc291cmNlXHJcbiAgICBtb3VzZUlzT3ZlcjogYm9vbGVhblxyXG4gICAgbGlzdGVuaW5nOiBib29sZWFuXHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgZm9udDogRm9udFJlc291cmNlLFxyXG4gICAgICAgIHR4dDogc3RyaW5nLFxyXG4gICAgICAgIGtleWJvYXJkOiBib29sZWFuLFxyXG4gICAgICAgIHZhbHVlOiBudW1iZXIsXHJcbiAgICAgICAgaW5kZXg6IG51bWJlciwvLyB0aGUgaW5kZXggaW4gdGhlIEdhbWUuY29udHJvbHMgYXJyYXkgdGhhdCBpdCBjaGFuZ2VzXHJcbiAgICAgICAgeDogbnVtYmVyLFxyXG4gICAgICAgIHk6IG51bWJlcixcclxuICAgICAgICB3OiBudW1iZXIsXHJcbiAgICAgICAgaDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5mb250ID0gZm9udDtcclxuICAgICAgICB0aGlzLnR4dCA9IHR4dFxyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmtleWJvYXJkID0ga2V5Ym9hcmQ7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMueCA9IHhcclxuICAgICAgICB0aGlzLnkgPSB5XHJcbiAgICAgICAgdGhpcy53ID0gd1xyXG4gICAgICAgIHRoaXMuaCA9IGhcclxuICAgICAgICB0aGlzLmltYWdlID0gVWlBc3NldHMuYnV0dG9uX3Vuc2VsZWN0ZWQ7XHJcbiAgICAgICAgdGhpcy5tb3VzZUlzT3ZlciA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubGlzdGVuaW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHRhcmdldDogcDUsIHVwc2NhbGVTaXplOiBudW1iZXIpIHtcclxuICAgICAgICAvLyBzZXQgdGhlIGNvb3JkcyBhbmQgZGltZW5zaW9ucyB0byByb3VuZCB0byB0aGUgbmVhcmVzdCB1bi11cHNjYWxlZCBwaXhlbFxyXG4gICAgICAgIGNvbnN0IHggPSBNYXRoLnJvdW5kKHRoaXMueCAvIHVwc2NhbGVTaXplKSAqIHVwc2NhbGVTaXplO1xyXG4gICAgICAgIGNvbnN0IHkgPSBNYXRoLnJvdW5kKHRoaXMueSAvIHVwc2NhbGVTaXplKSAqIHVwc2NhbGVTaXplO1xyXG4gICAgICAgIGNvbnN0IHcgPSBNYXRoLnJvdW5kKHRoaXMudyAvIHVwc2NhbGVTaXplKSAqIHVwc2NhbGVTaXplO1xyXG4gICAgICAgIGNvbnN0IGggPSBNYXRoLnJvdW5kKHRoaXMuaCAvIHVwc2NhbGVTaXplKSAqIHVwc2NhbGVTaXplO1xyXG5cclxuICAgICAgICAvLyBjb3JuZXJzXHJcbiAgICAgICAgdGhpcy5pbWFnZS5yZW5kZXJQYXJ0aWFsKHRhcmdldCwgeCwgeSwgNyAqIHVwc2NhbGVTaXplLCA3ICogdXBzY2FsZVNpemUsIDAsIDAsIDcsIDcpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UucmVuZGVyUGFydGlhbCh0YXJnZXQsIHggKyB3IC0gNyAqIHVwc2NhbGVTaXplLCB5LCA3ICogdXBzY2FsZVNpemUsIDcgKiB1cHNjYWxlU2l6ZSwgOCwgMCwgNywgNyk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5yZW5kZXJQYXJ0aWFsKHRhcmdldCwgeCwgeSArIGggLSA3ICogdXBzY2FsZVNpemUsIDcgKiB1cHNjYWxlU2l6ZSwgNyAqIHVwc2NhbGVTaXplLCAwLCA4LCA3LCA3KTtcclxuICAgICAgICB0aGlzLmltYWdlLnJlbmRlclBhcnRpYWwodGFyZ2V0LCB4ICsgdyAtIDcgKiB1cHNjYWxlU2l6ZSwgeSArIGggLSA3ICogdXBzY2FsZVNpemUsIDcgKiB1cHNjYWxlU2l6ZSwgNyAqIHVwc2NhbGVTaXplLCA4LCA4LCA3LCA3KTtcclxuXHJcbiAgICAgICAgLy8gdG9wIGFuZCBib3R0b21cclxuICAgICAgICB0aGlzLmltYWdlLnJlbmRlclBhcnRpYWwodGFyZ2V0LCB4ICsgNyAqIHVwc2NhbGVTaXplLCB5LCB3IC0gMTQgKiB1cHNjYWxlU2l6ZSwgNyAqIHVwc2NhbGVTaXplLCA3LCAwLCAxLCA3KTtcclxuICAgICAgICB0aGlzLmltYWdlLnJlbmRlclBhcnRpYWwodGFyZ2V0LCB4ICsgNyAqIHVwc2NhbGVTaXplLCB5ICsgaCAtIDcgKiB1cHNjYWxlU2l6ZSwgdyAtIDE0ICogdXBzY2FsZVNpemUsIDcgKiB1cHNjYWxlU2l6ZSwgNywgOCwgMSwgNyk7XHJcblxyXG4gICAgICAgIC8vIGxlZnQgYW5kIHJpZ2h0XHJcbiAgICAgICAgdGhpcy5pbWFnZS5yZW5kZXJQYXJ0aWFsKHRhcmdldCwgeCwgeSArIDcgKiB1cHNjYWxlU2l6ZSwgNyAqIHVwc2NhbGVTaXplLCBoIC0gMTQgKiB1cHNjYWxlU2l6ZSwgMCwgNywgNywgMSk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5yZW5kZXJQYXJ0aWFsKHRhcmdldCwgeCArIHcgLSA3ICogdXBzY2FsZVNpemUsIHkgKyA3ICogdXBzY2FsZVNpemUsIDcgKiB1cHNjYWxlU2l6ZSwgaCAtIDE0ICogdXBzY2FsZVNpemUsIDgsIDcsIDcsIDEpO1xyXG5cclxuICAgICAgICAvLyBjZW50ZXJcclxuICAgICAgICB0aGlzLmltYWdlLnJlbmRlclBhcnRpYWwodGFyZ2V0LCB4ICsgNyAqIHVwc2NhbGVTaXplLCB5ICsgNyAqIHVwc2NhbGVTaXplLCB3IC0gMTQgKiB1cHNjYWxlU2l6ZSwgaCAtIDE0ICogdXBzY2FsZVNpemUsIDcsIDcsIDEsIDEpO1xyXG5cclxuICAgICAgICBpZih0aGlzLmxpc3RlbmluZykge1xyXG4gICAgICAgICAgICB0aGlzLmZvbnQuZHJhd1RleHQodGFyZ2V0LCB0aGlzLnR4dCtcIjogY2xpY2sgdG8gY2FuY2VsXCIsIHggKyA2ICogdXBzY2FsZVNpemUsIE1hdGgucm91bmQoKHRoaXMueSArIHRoaXMuaCAvIDIpIC8gdXBzY2FsZVNpemUpICogdXBzY2FsZVNpemUgLSA2ICogdXBzY2FsZVNpemUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYodGhpcy5rZXlib2FyZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb250LmRyYXdUZXh0KHRhcmdldCwgdGhpcy50eHQrXCI6ICAgXCIrS2V5cy5rZXlib2FyZE1hcFt0aGlzLnZhbHVlXSwgeCArIDYgKiB1cHNjYWxlU2l6ZSwgTWF0aC5yb3VuZCgodGhpcy55ICsgdGhpcy5oIC8gMikgLyB1cHNjYWxlU2l6ZSkgKiB1cHNjYWxlU2l6ZSAtIDYgKiB1cHNjYWxlU2l6ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvbnQuZHJhd1RleHQodGFyZ2V0LCB0aGlzLnR4dCtcIjogICBNb3VzZSBcIit0aGlzLnZhbHVlLCB4ICsgNiAqIHVwc2NhbGVTaXplLCBNYXRoLnJvdW5kKCh0aGlzLnkgKyB0aGlzLmggLyAyKSAvIHVwc2NhbGVTaXplKSAqIHVwc2NhbGVTaXplIC0gNiAqIHVwc2NhbGVTaXplKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVNb3VzZU92ZXIobW91c2VYOiBudW1iZXIsIG1vdXNlWTogbnVtYmVyKSB7XHJcbiAgICAgICAgLy8gaWYgdGhlIG1vdXNlIHBvc2l0aW9uIGlzIGluc2lkZSB0aGUgYnV0dG9uLCByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIGlmIChtb3VzZVggPiB0aGlzLnggJiYgbW91c2VYIDwgdGhpcy54ICsgdGhpcy53ICYmIG1vdXNlWSA+IHRoaXMueSAmJiBtb3VzZVkgPCB0aGlzLnkgKyB0aGlzLmgpIHtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZUlzT3ZlciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlSXNPdmVyID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUHJlc3NlZCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImlucHV0IGJveCBwcmVzc2VkXCIpO1xyXG4gICAgICAgIHRoaXMubGlzdGVuaW5nID0gIXRoaXMubGlzdGVuaW5nO1xyXG4gICAgICAgIGlmKHRoaXMubGlzdGVuaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBVaUFzc2V0cy5idXR0b25fc2VsZWN0ZWQ7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IFVpQXNzZXRzLmJ1dHRvbl91bnNlbGVjdGVkO1xyXG4gICAgICAgIC8vIEF1ZGlvQXNzZXRzLnVpLmludmVudG9yeUNsYWNrLnBsYXlSYW5kb20oKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgcDUgZnJvbSAncDUnO1xyXG5pbXBvcnQgeyBSZW5kZXJhYmxlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9SZW5kZXJhYmxlJztcclxuaW1wb3J0IHsgVWlBc3NldHMgfSBmcm9tICcuLi9hc3NldHMvQXNzZXRzJztcclxuaW1wb3J0IHsgRm9udFJlc291cmNlIH0gZnJvbSAnLi4vYXNzZXRzL3Jlc291cmNlcy9Gb250UmVzb3VyY2UnO1xyXG5pbXBvcnQgeyBnYW1lIH0gZnJvbSAnLi4vR2FtZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2xpZGVyIGltcGxlbWVudHMgUmVuZGVyYWJsZSB7XHJcblxyXG4gICAgdmFsdWU6IG51bWJlclxyXG4gICAgbWluOiBudW1iZXJcclxuICAgIG1heDogbnVtYmVyXHJcbiAgICBzdGVwOiBudW1iZXJcclxuICAgIG9uQ2hhbmdlZDogRnVuY3Rpb25cclxuICAgIHg6IG51bWJlclxyXG4gICAgeTogbnVtYmVyXHJcbiAgICB3OiBudW1iZXJcclxuICAgIGg6IG51bWJlclxyXG4gICAgYmVpbmdFZGl0ZWQ6IGJvb2xlYW5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBmb250OiBGb250UmVzb3VyY2UsXHJcbiAgICAgICAgdHh0OiBzdHJpbmcsXHJcbiAgICAgICAgdmFsdWU6bnVtYmVyLFxyXG4gICAgICAgIG1pbjogbnVtYmVyLFxyXG4gICAgICAgIG1heDogbnVtYmVyLFxyXG4gICAgICAgIHN0ZXA6IG51bWJlcixcclxuICAgICAgICB4OiBudW1iZXIsXHJcbiAgICAgICAgeTogbnVtYmVyLFxyXG4gICAgICAgIHc6IG51bWJlcixcclxuICAgICAgICBoOiBudW1iZXIsXHJcbiAgICAgICAgb25DaGFuZ2VkOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxyXG4gICAgICAgIHRoaXMubWluID0gbWluXHJcbiAgICAgICAgdGhpcy5tYXggPSBtYXhcclxuICAgICAgICB0aGlzLnN0ZXAgPSBzdGVwXHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZWQgPSBvbkNoYW5nZWRcclxuICAgICAgICB0aGlzLnggPSB4XHJcbiAgICAgICAgdGhpcy55ID0geVxyXG4gICAgICAgIHRoaXMudyA9IHdcclxuICAgICAgICB0aGlzLmggPSBoXHJcbiAgICAgICAgdGhpcy5iZWluZ0VkaXRlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih0YXJnZXQ6IHA1LCB1cHNjYWxlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgLy8gc2V0IHRoZSBjb29yZHMgYW5kIGRpbWVuc2lvbnMgdG8gcm91bmQgdG8gdGhlIG5lYXJlc3QgdW4tdXBzY2FsZWQgcGl4ZWxcclxuICAgICAgICBjb25zdCB4ID0gTWF0aC5yb3VuZCh0aGlzLngvdXBzY2FsZVNpemUpKnVwc2NhbGVTaXplO1xyXG4gICAgICAgIGNvbnN0IHkgPSBNYXRoLnJvdW5kKCh0aGlzLnkrdGhpcy5oLzIpL3Vwc2NhbGVTaXplKSp1cHNjYWxlU2l6ZTtcclxuICAgICAgICBjb25zdCB3ID0gTWF0aC5yb3VuZCh0aGlzLncvdXBzY2FsZVNpemUpKnVwc2NhbGVTaXplO1xyXG5cclxuICAgICAgICAvLyBsZWZ0IHNpZGUgb2Ygc2xpZGVyIGJhclxyXG4gICAgICAgIFVpQXNzZXRzLnNsaWRlcl9iYXIucmVuZGVyUGFydGlhbCh0YXJnZXQsIHgsIHktMip1cHNjYWxlU2l6ZSwgMip1cHNjYWxlU2l6ZSwgNCp1cHNjYWxlU2l6ZSwgMCwgMCwgMiwgNCk7XHJcbiAgICAgICAgLy8gcmlnaHQgc2lkZSBvZiBzbGlkZXIgYmFyXHJcbiAgICAgICAgVWlBc3NldHMuc2xpZGVyX2Jhci5yZW5kZXJQYXJ0aWFsKHRhcmdldCwgeCt3LTIqdXBzY2FsZVNpemUsIHktMip1cHNjYWxlU2l6ZSwgMip1cHNjYWxlU2l6ZSwgNCp1cHNjYWxlU2l6ZSwgMywgMCwgMiwgNCk7XHJcbiAgICAgICAgLy8gY2VudGVyIG9mIHNsaWRlciBiYXJcclxuICAgICAgICBVaUFzc2V0cy5zbGlkZXJfYmFyLnJlbmRlclBhcnRpYWwodGFyZ2V0LCB4KzIqdXBzY2FsZVNpemUsIHktMip1cHNjYWxlU2l6ZSwgdy00KnVwc2NhbGVTaXplLCA0KnVwc2NhbGVTaXplLCAyLCAwLCAxLCA0KTtcclxuICAgICAgICAvLyBoYW5kbGVcclxuICAgICAgICBVaUFzc2V0cy5zbGlkZXJfaGFuZGxlLnJlbmRlcih0YXJnZXQsIHgrTWF0aC5yb3VuZCgodGhpcy52YWx1ZS10aGlzLm1pbikvKHRoaXMubWF4LXRoaXMubWluKSoody04KnVwc2NhbGVTaXplKS91cHNjYWxlU2l6ZSkqdXBzY2FsZVNpemUsIHktNCp1cHNjYWxlU2l6ZSwgOCp1cHNjYWxlU2l6ZSwgOSp1cHNjYWxlU2l6ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU2xpZGVyUG9zaXRpb24obW91c2VYOiBudW1iZXIpIHtcclxuICAgICAgICBpZih0aGlzLmJlaW5nRWRpdGVkKXtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IE1hdGgubWF4KHRoaXMubWluLCBNYXRoLm1pbih0aGlzLm1heCwgTWF0aC5yb3VuZCgodGhpcy5taW4rKHRoaXMubWF4LXRoaXMubWluKSooKChtb3VzZVgtdGhpcy54LTQqZ2FtZS51cHNjYWxlU2l6ZSkgLyAodGhpcy53LSg4KmdhbWUudXBzY2FsZVNpemUpKSkpKS90aGlzLnN0ZXApKnRoaXMuc3RlcCkpO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBSZW5kZXJhYmxlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9SZW5kZXJhYmxlJztcclxuaW1wb3J0IHA1IGZyb20gJ3A1JztcclxuaW1wb3J0IHsgVWlBc3NldHMgfSBmcm9tICcuLi9hc3NldHMvQXNzZXRzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBVaUZyYW1lIGltcGxlbWVudHMgUmVuZGVyYWJsZSB7XHJcblxyXG4gICAgeDogbnVtYmVyXHJcbiAgICB5OiBudW1iZXJcclxuICAgIHc6IG51bWJlclxyXG4gICAgaDogbnVtYmVyXHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgeDogbnVtYmVyLFxyXG4gICAgICAgIHk6IG51bWJlcixcclxuICAgICAgICB3OiBudW1iZXIsXHJcbiAgICAgICAgaDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy54ID0geFxyXG4gICAgICAgIHRoaXMueSA9IHlcclxuICAgICAgICB0aGlzLncgPSB3XHJcbiAgICAgICAgdGhpcy5oID0gaFxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih0YXJnZXQ6IHA1LCB1cHNjYWxlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgLy8gc2V0IHRoZSBjb29yZHMgYW5kIGRpbWVuc2lvbnMgdG8gcm91bmQgdG8gdGhlIG5lYXJlc3QgdW4tdXBzY2FsZWQgcGl4ZWxcclxuICAgICAgICBjb25zdCB4ID0gTWF0aC5yb3VuZCh0aGlzLngvdXBzY2FsZVNpemUpKnVwc2NhbGVTaXplO1xyXG4gICAgICAgIGNvbnN0IHkgPSBNYXRoLnJvdW5kKHRoaXMueS91cHNjYWxlU2l6ZSkqdXBzY2FsZVNpemU7XHJcbiAgICAgICAgY29uc3QgdyA9IE1hdGgucm91bmQodGhpcy53L3Vwc2NhbGVTaXplKSp1cHNjYWxlU2l6ZTtcclxuICAgICAgICBjb25zdCBoID0gTWF0aC5yb3VuZCh0aGlzLmgvdXBzY2FsZVNpemUpKnVwc2NhbGVTaXplO1xyXG5cclxuICAgICAgICAvLyBjb3JuZXJzXHJcbiAgICAgICAgVWlBc3NldHMudWlfZnJhbWUucmVuZGVyUGFydGlhbCh0YXJnZXQsIHgsIHksIDcqdXBzY2FsZVNpemUsIDcqdXBzY2FsZVNpemUsIDAsIDAsIDcsIDcpO1xyXG4gICAgICAgIFVpQXNzZXRzLnVpX2ZyYW1lLnJlbmRlclBhcnRpYWwodGFyZ2V0LCB4K3ctNyp1cHNjYWxlU2l6ZSwgeSwgNyp1cHNjYWxlU2l6ZSwgNyp1cHNjYWxlU2l6ZSwgOCwgMCwgNywgNyk7XHJcbiAgICAgICAgVWlBc3NldHMudWlfZnJhbWUucmVuZGVyUGFydGlhbCh0YXJnZXQsIHgsIHkraC03KnVwc2NhbGVTaXplLCA3KnVwc2NhbGVTaXplLCA3KnVwc2NhbGVTaXplLCAwLCA4LCA3LCA3KTtcclxuICAgICAgICBVaUFzc2V0cy51aV9mcmFtZS5yZW5kZXJQYXJ0aWFsKHRhcmdldCwgeCt3LTcqdXBzY2FsZVNpemUsIHkraC03KnVwc2NhbGVTaXplLCA3KnVwc2NhbGVTaXplLCA3KnVwc2NhbGVTaXplLCA4LCA4LCA3LCA3KTtcclxuXHJcbiAgICAgICAgLy8gdG9wIGFuZCBib3R0b21cclxuICAgICAgICBVaUFzc2V0cy51aV9mcmFtZS5yZW5kZXJQYXJ0aWFsKHRhcmdldCwgeCs3KnVwc2NhbGVTaXplLCB5LCB3LTE0KnVwc2NhbGVTaXplLCA3KnVwc2NhbGVTaXplLCA3LCAwLCAxLCA3KTtcclxuICAgICAgICBVaUFzc2V0cy51aV9mcmFtZS5yZW5kZXJQYXJ0aWFsKHRhcmdldCwgeCs3KnVwc2NhbGVTaXplLCB5K2gtNyp1cHNjYWxlU2l6ZSwgdy0xNCp1cHNjYWxlU2l6ZSwgNyp1cHNjYWxlU2l6ZSwgNywgOCwgMSwgNyk7XHJcblxyXG4gICAgICAgIC8vIGxlZnQgYW5kIHJpZ2h0XHJcbiAgICAgICAgVWlBc3NldHMudWlfZnJhbWUucmVuZGVyUGFydGlhbCh0YXJnZXQsIHgsIHkrNyp1cHNjYWxlU2l6ZSwgNyp1cHNjYWxlU2l6ZSwgaC0xNCp1cHNjYWxlU2l6ZSwgMCwgNywgNywgMSk7XHJcbiAgICAgICAgVWlBc3NldHMudWlfZnJhbWUucmVuZGVyUGFydGlhbCh0YXJnZXQsIHgrdy03KnVwc2NhbGVTaXplLCB5KzcqdXBzY2FsZVNpemUsIDcqdXBzY2FsZVNpemUsIGgtMTQqdXBzY2FsZVNpemUsIDgsIDcsIDcsIDEpO1xyXG5cclxuICAgICAgICAvLyBjZW50ZXJcclxuICAgICAgICBVaUFzc2V0cy51aV9mcmFtZS5yZW5kZXJQYXJ0aWFsKHRhcmdldCwgeCs3KnVwc2NhbGVTaXplLCB5KzcqdXBzY2FsZVNpemUsIHctMTQqdXBzY2FsZVNpemUsIGgtMTQqdXBzY2FsZVNpemUsIDcsIDcsIDEsIDEpO1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCB7IFJlbmRlcmFibGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL1JlbmRlcmFibGUnO1xyXG5pbXBvcnQgcDUgZnJvbSAncDUnO1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuL0J1dHRvbic7XHJcbmltcG9ydCB7IFNsaWRlciB9IGZyb20gJy4vU2xpZGVyJztcclxuaW1wb3J0IHsgVWlGcmFtZSB9IGZyb20gJy4vVWlGcmFtZSc7XHJcbmltcG9ydCB7IGdhbWUgfSBmcm9tICcuLi9HYW1lJztcclxuaW1wb3J0IHsgSW5wdXRCb3ggfSBmcm9tICcuL0lucHV0Qm94JztcclxuaW1wb3J0IHsgVWlBc3NldHMgfSBmcm9tICcuLi9hc3NldHMvQXNzZXRzJztcclxuaW1wb3J0IHsgRm9udFJlc291cmNlIH0gZnJvbSAnLi4vYXNzZXRzL3Jlc291cmNlcy9Gb250UmVzb3VyY2UnO1xyXG5cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBVaVNjcmVlbiBpbXBsZW1lbnRzIFJlbmRlcmFibGUge1xyXG5cclxuICAgIGJ1dHRvbnM6IEJ1dHRvbltdO1xyXG4gICAgc2xpZGVyczogU2xpZGVyW107XHJcbiAgICBpbnB1dEJveGVzOiBJbnB1dEJveFtdO1xyXG4gICAgc2Nyb2xsPzogbnVtYmVyO1xyXG4gICAgbWluU2Nyb2xsOiBudW1iZXIgPSAwO1xyXG4gICAgbWF4U2Nyb2xsOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGZyYW1lOiBVaUZyYW1lXHJcblxyXG5cclxuICAgIHRpdGxlRm9udDogRm9udFJlc291cmNlXHJcblxyXG4gICAgYWJzdHJhY3QgcmVuZGVyKHRhcmdldDogcDUsIHVwc2NhbGVTaXplOiBudW1iZXIpOiB2b2lkO1xyXG5cclxuICAgIGFic3RyYWN0IHdpbmRvd1VwZGF0ZSgpOiB2b2lkXHJcblxyXG4gICAgbW91c2VQcmVzc2VkKGJ0bjogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYodGhpcy5idXR0b25zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy8gbG9vcCB0aHJvdWdoIGFsbCB0aGUgYnV0dG9ucyBpbiB0aGlzIG1lbnUgYW5kIGlmIHRoZSBtb3VzZSBpcyBvdmVyIHRoZW0sIHRoZW4gY2FsbCB0aGUgYnV0dG9uJ3Mgb25QcmVzc2VkKCkgZnVuY3Rpb24uICBUaGUgb25QcmVzc2VkKCkgZnVuY3Rpb24gaXMgcGFzc2VkIGluIHRocm91Z2ggdGhlIGNvbnN0cnVjdG9yLlxyXG4gICAgICAgICAgICBmb3IoY29uc3QgaSBvZiB0aGlzLmJ1dHRvbnMpIHtcclxuICAgICAgICAgICAgICAgIGlmKGkubW91c2VJc092ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpLm9uUHJlc3NlZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnNsaWRlcnMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyBsb29wIHRocm91Z2ggYWxsIHRoZSBzbGlkZXJzIGFuZCBpbnRlcmFjdCB3aXRoIHRoZW0gYWNjb3JkaW5nbHlcclxuICAgICAgICAgICAgZm9yKGNvbnN0IGkgb2YgdGhpcy5zbGlkZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpLnVwZGF0ZVNsaWRlclBvc2l0aW9uKGdhbWUubW91c2VYKTtcclxuICAgICAgICAgICAgICAgIGlmKGdhbWUubW91c2VYPmkueCAmJiBnYW1lLm1vdXNlWDxpLngraS53ICYmIGdhbWUubW91c2VZPmkueSAmJiBnYW1lLm1vdXNlWTxpLnkraS5oKVxyXG4gICAgICAgICAgICAgICAgICAgIGkuYmVpbmdFZGl0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuaW5wdXRCb3hlcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5pbnB1dEJveGVzKTtcclxuICAgICAgICAgICAgLy8gbG9vcCB0aHJvdWdoIGFsbCB0aGUgaW5wdXQgYm94ZXMgYW5kIGludGVyYWN0IHdpdGggdGhlbSBhY2NvcmRpbmdseVxyXG4gICAgICAgICAgICBmb3IoY29uc3QgaSBvZiB0aGlzLmlucHV0Qm94ZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmKGkubW91c2VJc092ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpLm9uUHJlc3NlZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihpLmxpc3RlbmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGkubGlzdGVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZS5jb250cm9sc1tpLmluZGV4XS5rZXlDb2RlID0gYnRuO1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWUuY29udHJvbHNbaS5pbmRleF0ua2V5Ym9hcmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpLnZhbHVlID0gYnRuO1xyXG4gICAgICAgICAgICAgICAgICAgIGkua2V5Ym9hcmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpLmltYWdlID0gVWlBc3NldHMuYnV0dG9uX3Vuc2VsZWN0ZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW91c2VSZWxlYXNlZCgpIHtcclxuICAgICAgICBpZih0aGlzLnNsaWRlcnMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyBsb29wIHRocm91Z2ggYWxsIHRoZSBzbGlkZXJzIGFuZCBpbnRlcmFjdCB3aXRoIHRoZW0gYWNjb3JkaW5nbHlcclxuICAgICAgICAgICAgZm9yKGNvbnN0IGkgb2YgdGhpcy5zbGlkZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpLmJlaW5nRWRpdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgVWlTY3JlZW4gfSBmcm9tICcuLi9VaVNjcmVlbic7XHJcbmltcG9ydCBwNSBmcm9tICdwNSc7XHJcbmltcG9ydCB7IFVpRnJhbWUgfSBmcm9tICcuLi9VaUZyYW1lJztcclxuaW1wb3J0IHsgZ2FtZSB9IGZyb20gJy4uLy4uL0dhbWUnO1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi9CdXR0b24nO1xyXG5pbXBvcnQgeyBGb250UmVzb3VyY2UgfSBmcm9tICcuLi8uLi9hc3NldHMvcmVzb3VyY2VzL0ZvbnRSZXNvdXJjZSc7XHJcbmltcG9ydCB7IE9wdGlvbnNNZW51IH0gZnJvbSAnLi9PcHRpb25zTWVudSc7XHJcbmltcG9ydCB7IElucHV0Qm94IH0gZnJvbSAnLi4vSW5wdXRCb3gnO1xyXG5pbXBvcnQgeyBDb250cm9sIH0gZnJvbSAnLi4vLi4vaW5wdXQvQ29udHJvbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBDb250cm9sc01lbnUgZXh0ZW5kcyBVaVNjcmVlbiB7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGZvbnQ6IEZvbnRSZXNvdXJjZSwgdGl0bGVGb250OiBGb250UmVzb3VyY2UpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHQvLyBtYWtlIHRoZSBmcmFtZSB3aXRoIHNvbWUgZGVmYXVsdCB2YWx1ZXMuICBUaGVzZSB3aWxsIGxhdGVyIGJlIGNoYW5nZWQgdG8gZml0IHRoZSBzY3JlZW4gc2l6ZS5cclxuXHRcdHRoaXMuZnJhbWUgPSBuZXcgVWlGcmFtZSgwLCAwLCAwLCAwKTtcclxuXHJcblx0XHQvLyBtYWtlIHNvbWUgYnV0dG9ucyB3aXRoIGRlZmF1bHQgcG9zaXRpb25zXHJcblx0XHR0aGlzLmJ1dHRvbnMgPSBbXHJcblx0XHRcdG5ldyBCdXR0b24oZm9udCwgXCJCYWNrXCIsIFwiUmV0dXJuIHRvIHRoZSBvcHRpb25zIG1lbnUuXCIsIDAsIDAsIDAsIDAsICgpID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIm9wdGlvbnMgbWVudVwiKTtcclxuXHRcdFx0XHRnYW1lLmN1cnJlbnRVaSA9IG5ldyBPcHRpb25zTWVudShmb250LCB0aXRsZUZvbnQpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XTtcclxuXHJcblx0XHR0aGlzLmlucHV0Qm94ZXMgPSBbXHJcblx0XHRcdC8vIG5ldyBJbnB1dEJveChmb250LCBcIldhbGsgUmlnaHRcIiwgdHJ1ZSwgNjgsIDAsIDAsIDAsIDAsIDApLFxyXG5cdFx0XHQvLyBuZXcgSW5wdXRCb3goZm9udCwgXCJXYWxrIExlZnRcIiwgdHJ1ZSwgNjUsIDEsIDAsIDAsIDAsIDApLFxyXG5cdFx0XHQvLyBuZXcgSW5wdXRCb3goZm9udCwgXCJKdW1wXCIsIHRydWUsIDMyLCAyLCAwLCAwLCAwLCAwKSxcclxuXHRcdFx0Ly8gbmV3IElucHV0Qm94KGZvbnQsIFwiUGF1c2VcIiwgdHJ1ZSwgMjcsIDMsIDAsIDAsIDAsIDApXHJcblx0XHRdXHJcblxyXG5cdFx0bGV0IGkgPSAwO1xyXG5cdFx0Zm9yIChsZXQgY29udHJvbCBvZiBnYW1lLmNvbnRyb2xzKSB7XHJcblx0XHRcdGkrKztcclxuXHRcdFx0dGhpcy5pbnB1dEJveGVzLnB1c2gobmV3IElucHV0Qm94KGZvbnQsIGNvbnRyb2wuZGVzY3JpcHRpb24sIGNvbnRyb2wua2V5Ym9hcmQsIGNvbnRyb2wua2V5Q29kZSwgaSwgMCwgMCwgMCwgMCkpO1xyXG5cdFx0fVxyXG5cdFx0Ly8gdXBkYXRlIHRoZSBzaXplIG9mIHRoZSBlbGVtZW50cyBiYXNlZCBvbiB0aGUgaW5pdGlhbCBzY3JlZW4gc2l6ZVxyXG5cdFx0dGhpcy53aW5kb3dVcGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdHJlbmRlcih0YXJnZXQ6IHA1LCB1cHNjYWxlU2l6ZTogbnVtYmVyKTogdm9pZCB7XHJcblxyXG5cdFx0Ly8gcmVuZGVyIHRoZSByZWN0YW5ndWxhciBpbWFnZVxyXG5cdFx0dGhpcy5mcmFtZS5yZW5kZXIodGFyZ2V0LCB1cHNjYWxlU2l6ZSk7XHJcblxyXG5cdFx0Ly8gbG9vcCB0aHJvdWdoIHRoZSBidXR0b25zIGFycmF5IGFuZCByZW5kZXIgZWFjaCBvbmUuXHJcblx0XHR0aGlzLmJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xyXG5cdFx0XHRidXR0b24ucmVuZGVyKHRhcmdldCwgdXBzY2FsZVNpemUpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gbG9vcCB0aHJvdWdoIHRoZSBpbnB1dEJveGVzIGFycmF5IGFuZCByZW5kZXIgZWFjaCBvbmUuXHJcblx0XHR0aGlzLmlucHV0Qm94ZXMuZm9yRWFjaChpbnB1dEJveCA9PiB7XHJcblx0XHRcdGlucHV0Qm94LnJlbmRlcih0YXJnZXQsIHVwc2NhbGVTaXplKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0d2luZG93VXBkYXRlKCkge1xyXG5cdFx0Ly8gc2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgZnJhbWVcclxuXHRcdHRoaXMuZnJhbWUueCA9IGdhbWUud2lkdGggLyAyIC0gMjAwIC8gMiAqIGdhbWUudXBzY2FsZVNpemU7Ly8gY2VudGVyIHRoZSBmcmFtZSBpbiB0aGUgY2VudGVyIG9mIHRoZSBzY3JlZW5cclxuXHRcdHRoaXMuZnJhbWUueSA9IGdhbWUuaGVpZ2h0IC8gMiAtIDU2ICogZ2FtZS51cHNjYWxlU2l6ZTtcclxuXHRcdHRoaXMuZnJhbWUudyA9IDIwMCAqIGdhbWUudXBzY2FsZVNpemU7XHJcblx0XHR0aGlzLmZyYW1lLmggPSA0OCAqIGdhbWUudXBzY2FsZVNpemU7XHJcblx0fVxyXG59IiwiaW1wb3J0IHsgVWlTY3JlZW4gfSBmcm9tICcuLi9VaVNjcmVlbic7XHJcbmltcG9ydCBwNSBmcm9tICdwNSc7XHJcbmltcG9ydCB7IFVpRnJhbWUgfSBmcm9tICcuLi9VaUZyYW1lJztcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi4vQnV0dG9uJztcclxuaW1wb3J0IHsgT3B0aW9uc01lbnUgfSBmcm9tICcuL09wdGlvbnNNZW51JztcclxuaW1wb3J0IHsgRm9udFJlc291cmNlIH0gZnJvbSAnLi4vLi4vYXNzZXRzL3Jlc291cmNlcy9Gb250UmVzb3VyY2UnO1xyXG5pbXBvcnQgeyBVaUFzc2V0cyB9IGZyb20gJy4uLy4uL2Fzc2V0cy9Bc3NldHMnO1xyXG5pbXBvcnQgeyBXb3JsZENyZWF0aW9uTWVudSB9IGZyb20gJy4vV29ybGRDcmVhdGlvbk1lbnUnO1xyXG5pbXBvcnQgeyBnYW1lIH0gZnJvbSAnLi4vLi4vR2FtZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWFpbk1lbnUgZXh0ZW5kcyBVaVNjcmVlbiB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZm9udDogRm9udFJlc291cmNlLCB0aXRsZUZvbnQ6IEZvbnRSZXNvdXJjZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIC8vIG1ha2UgdGhlIGZyYW1lIHdpdGggc29tZSBkZWZhdWx0IHZhbHVlcy4gIFRoZXNlIHdpbGwgbGF0ZXIgYmUgY2hhbmdlZCB0byBmaXQgdGhlIHNjcmVlbiBzaXplLlxyXG4gICAgICAgIHRoaXMuZnJhbWUgPSBuZXcgVWlGcmFtZSgwLCAwLCAwLCAwKTtcclxuXHJcbiAgICAgICAgLy8gbWFrZSA0IGJ1dHRvbnMgd2l0aCBkZWZhdWx0IHBvc2l0aW9uc1xyXG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IFtcclxuICAgICAgICAgICAgbmV3IEJ1dHRvbihmb250LCBcIlJlc3VtZSBHYW1lXCIsIFwiS2VlcCBwbGF5aW5nIHdoZXJlIHlvdSBsZWZ0IG9mZi5cIiwgMCwgMCwgMCwgMCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXN1bWUgZ2FtZVwiKTtcclxuICAgICAgICAgICAgICAgIGdhbWUuY3VycmVudFVpID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgbmV3IEJ1dHRvbihmb250LCBcIk5ldyBHYW1lXCIsIFwiQ3JlYXRlcyBhIG5ldyBzZXJ2ZXIgdGhhdCB5b3VyIGZyaWVuZHMgY2FuIGpvaW4uXCIsIDAsIDAsIDAsIDAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibmV3IGdhbWVcIik7XHJcbiAgICAgICAgICAgICAgICBnYW1lLmN1cnJlbnRVaSA9IG5ldyBXb3JsZENyZWF0aW9uTWVudShmb250LCB0aXRsZUZvbnQpO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgbmV3IEJ1dHRvbihmb250LCBcIkpvaW4gR2FtZVwiLCBcIkpvaW4gYSBnYW1lIHdpdGggeW91ciBmcmllbmRzLCBvciBtYWtlIG5ldyBvbmVzLlwiLCAwLCAwLCAwLCAwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImpvaW4gZ2FtZVwiKTtcclxuICAgICAgICAgICAgICAgIGdhbWUuY3VycmVudFVpID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgbmV3IEJ1dHRvbihmb250LCBcIk9wdGlvbnNcIiwgXCJDaGFuZ2UgeW91ciBrZXliaW5kcywgcmVkdWNlIGxhZywgZXRjLlwiLCAwLCAwLCAwLCAwLCAoKSA9PntcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3B0aW9uc1wiKTtcclxuICAgICAgICAgICAgICAgIGdhbWUuY3VycmVudFVpID0gbmV3IE9wdGlvbnNNZW51KGZvbnQsIHRpdGxlRm9udCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBzaXplIG9mIHRoZSBlbGVtZW50cyBiYXNlZCBvbiB0aGUgaW5pdGlhbCBzY3JlZW4gc2l6ZVxyXG4gICAgICAgIHRoaXMud2luZG93VXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHRhcmdldDogcDUsIHVwc2NhbGVTaXplOiBudW1iZXIpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgLy8gcmVuZGVyIHRoZSByZWN0YW5ndWxhciBpbWFnZSB0aGF0IHRoZSB3aG9sZSBtZW51IGlzIG9uXHJcbiAgICAgICAgdGhpcy5mcmFtZS5yZW5kZXIodGFyZ2V0LCB1cHNjYWxlU2l6ZSk7XHJcblxyXG4gICAgICAgIFVpQXNzZXRzLnRpdGxlX2ltYWdlLnJlbmRlcih0YXJnZXQsIE1hdGgucm91bmQodGhpcy5mcmFtZS54L3Vwc2NhbGVTaXplKzEpKnVwc2NhbGVTaXplLCBNYXRoLnJvdW5kKHRoaXMuZnJhbWUueS91cHNjYWxlU2l6ZSs0KSp1cHNjYWxlU2l6ZSwgMjU2KnVwc2NhbGVTaXplLCA0MCp1cHNjYWxlU2l6ZSk7XHJcblxyXG4gICAgICAgIC8vIGxvb3AgdGhyb3VnaCB0aGUgYnV0dG9ucyBhcnJheSBhbmQgcmVuZGVyIGVhY2ggb25lLlxyXG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLmJ1dHRvbnMpIHtcclxuICAgICAgICAgICAgaXRlbS5yZW5kZXIodGFyZ2V0LCB1cHNjYWxlU2l6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3dVcGRhdGUoKSB7XHJcbiAgICAgICAgLy8gc2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgZnJhbWVcclxuICAgICAgICB0aGlzLmZyYW1lLnggPSBnYW1lLndpZHRoLzItMjY0LzIqZ2FtZS51cHNjYWxlU2l6ZTsvLyBjZW50ZXIgdGhlIGZyYW1lIGluIHRoZSBtaWRkbGUgb2YgdGhlIHNjcmVlblxyXG4gICAgICAgIHRoaXMuZnJhbWUueSA9IGdhbWUuaGVpZ2h0LzItNTYqZ2FtZS51cHNjYWxlU2l6ZTtcclxuICAgICAgICB0aGlzLmZyYW1lLncgPSAyNjQqZ2FtZS51cHNjYWxlU2l6ZTtcclxuICAgICAgICB0aGlzLmZyYW1lLmggPSA0OCpnYW1lLnVwc2NhbGVTaXplO1xyXG5cclxuICAgICAgICAvLyBzZXQgdGhlIHBvc2l0aW9ucyBvZiBhbGwgdGhlIGJ1dHRvbnNcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpPDQ7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbnNbaV0ueCA9IGdhbWUud2lkdGgvMi0xOTIvMipnYW1lLnVwc2NhbGVTaXplO1xyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbnNbaV0ueSA9IGdhbWUuaGVpZ2h0LzIrMjAqaSpnYW1lLnVwc2NhbGVTaXplO1xyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbnNbaV0udyA9IDE5MipnYW1lLnVwc2NhbGVTaXplO1xyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbnNbaV0uaCA9IDE2KmdhbWUudXBzY2FsZVNpemU7XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uc1tpXS51cGRhdGVNb3VzZU92ZXIoZ2FtZS5tb3VzZVgsIGdhbWUubW91c2VZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IFVpU2NyZWVuIH0gZnJvbSAnLi4vVWlTY3JlZW4nO1xyXG5pbXBvcnQgcDUgZnJvbSAncDUnO1xyXG5pbXBvcnQgeyBVaUZyYW1lIH0gZnJvbSAnLi4vVWlGcmFtZSc7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4uL0J1dHRvbic7XHJcbmltcG9ydCB7IEZvbnRSZXNvdXJjZSB9IGZyb20gJy4uLy4uL2Fzc2V0cy9yZXNvdXJjZXMvRm9udFJlc291cmNlJztcclxuaW1wb3J0IHsgTWFpbk1lbnUgfSBmcm9tICcuL01haW5NZW51JztcclxuaW1wb3J0IHsgVmlkZW9TZXR0aW5nc01lbnUgfSBmcm9tICcuL1ZpZGVvU2V0dGluZ3NNZW51JztcclxuaW1wb3J0IHsgQ29udHJvbHNNZW51IH0gZnJvbSAnLi9Db250cm9sc01lbnUnO1xyXG5pbXBvcnQgeyBnYW1lIH0gZnJvbSAnLi4vLi4vR2FtZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgT3B0aW9uc01lbnUgZXh0ZW5kcyBVaVNjcmVlbiB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZm9udDogRm9udFJlc291cmNlLCB0aXRsZUZvbnQ6IEZvbnRSZXNvdXJjZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy8gbWFrZSB0aGUgZnJhbWUgd2l0aCBzb21lIGRlZmF1bHQgdmFsdWVzLiAgVGhlc2Ugd2lsbCBsYXRlciBiZSBjaGFuZ2VkIHRvIGZpdCB0aGUgc2NyZWVuIHNpemUuXHJcbiAgICAgICAgdGhpcy5mcmFtZSA9IG5ldyBVaUZyYW1lKDAsIDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMudGl0bGVGb250ID0gdGl0bGVGb250O1xyXG4gICAgICAgIC8vIG1ha2Ugc29tZSBidXR0b25zIHdpdGggZGVmYXVsdCBwb3NpdGlvbnNcclxuICAgICAgICB0aGlzLmJ1dHRvbnMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBCdXR0b24oZm9udCwgXCJWaWRlbyBTZXR0aW5nc1wiLCBcIkNoYW5nZSB0aGUgYmFsYW5jZSBiZXR3ZWVuIHBlcmZvcm1hbmNlIGFuZCBmaWRlbGl0eS5cIiwgMCwgMCwgMCwgMCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWRlbyBzZXR0aW5nc1wiKTtcclxuICAgICAgICAgICAgICAgIGdhbWUuY3VycmVudFVpID0gbmV3IFZpZGVvU2V0dGluZ3NNZW51KGZvbnQsIHRpdGxlRm9udCk7XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBuZXcgQnV0dG9uKGZvbnQsIFwiQ29udHJvbHNcIiwgXCJDaGFuZ2UgeW91ciBrZXliaW5kcy5cIiwgMCwgMCwgMCwgMCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb250cm9sIG1lbnVcIik7XHJcbiAgICAgICAgICAgICAgICBnYW1lLmN1cnJlbnRVaSA9IG5ldyBDb250cm9sc01lbnUoZm9udCwgdGl0bGVGb250KTtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIG5ldyBCdXR0b24oZm9udCwgXCJBdWRpbyBTZXR0aW5nc1wiLCBcIkNoYW5nZSB0aGUgdm9sdW1lIG9mIGRpZmZlcmVudCBzb3VuZHMuXCIsIDAsIDAsIDAsIDAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYXVkaW8gbWVudVwiKTtcclxuICAgICAgICAgICAgICAgIGdhbWUuY3VycmVudFVpID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgbmV3IEJ1dHRvbihmb250LCBcIkJhY2tcIiwgXCJSZXR1cm4gdG8gdGhlIG1haW4gbWVudS5cIiwgMCwgMCwgMCwgMCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtYWluIG1lbnVcIik7XHJcbiAgICAgICAgICAgICAgICBnYW1lLmN1cnJlbnRVaSA9IG5ldyBNYWluTWVudShmb250LCB0aXRsZUZvbnQpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBzaXplIG9mIHRoZSBlbGVtZW50cyBiYXNlZCBvbiB0aGUgaW5pdGlhbCBzY3JlZW4gc2l6ZVxyXG4gICAgICAgIHRoaXMud2luZG93VXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHRhcmdldDogcDUsIHVwc2NhbGVTaXplOiBudW1iZXIpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgLy8gcmVuZGVyIHRoZSByZWN0YW5ndWxhciBpbWFnZSB0aGF0IHRoZSB3aG9sZSBtZW51IGlzIG9uXHJcbiAgICAgICAgdGhpcy5mcmFtZS5yZW5kZXIodGFyZ2V0LCB1cHNjYWxlU2l6ZSk7XHJcblxyXG4gICAgICAgIC8vIGxvb3AgdGhyb3VnaCB0aGUgYnV0dG9ucyBhcnJheSBhbmQgcmVuZGVyIGVhY2ggb25lLlxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5yZW5kZXIodGFyZ2V0LCB1cHNjYWxlU2l6ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudGl0bGVGb250LmRyYXdUZXh0KHRhcmdldCwgXCJPcHRpb25zXCIsIHRoaXMuZnJhbWUueCArIDU0KmdhbWUudXBzY2FsZVNpemUsIHRoaXMuZnJhbWUueSArIDE2KmdhbWUudXBzY2FsZVNpemUpXHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93VXBkYXRlKCkge1xyXG4gICAgICAgIC8vIHNldCB0aGUgcG9zaXRpb24gb2YgdGhlIGZyYW1lXHJcbiAgICAgICAgdGhpcy5mcmFtZS54ID0gZ2FtZS53aWR0aC8yLTIwMC8yKmdhbWUudXBzY2FsZVNpemU7Ly8gY2VudGVyIHRoZSBmcmFtZSBpbiB0aGUgY2VudGVyIG9mIHRoZSBzY3JlZW5cclxuICAgICAgICB0aGlzLmZyYW1lLnkgPSBnYW1lLmhlaWdodC8yLTU2KmdhbWUudXBzY2FsZVNpemU7XHJcbiAgICAgICAgdGhpcy5mcmFtZS53ID0gMjAwKmdhbWUudXBzY2FsZVNpemU7XHJcbiAgICAgICAgdGhpcy5mcmFtZS5oID0gNDgqZ2FtZS51cHNjYWxlU2l6ZTtcclxuXHJcbiAgICAgICAgLy8gc2V0IHRoZSBwb3NpdGlvbnMgb2YgYWxsIHRoZSBidXR0b25zXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaTw0OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5idXR0b25zW2ldLnggPSBnYW1lLndpZHRoLzItMTkyLzIqZ2FtZS51cHNjYWxlU2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5idXR0b25zW2ldLnkgPSBnYW1lLmhlaWdodC8yKzIwKmkqZ2FtZS51cHNjYWxlU2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5idXR0b25zW2ldLncgPSAxOTIqZ2FtZS51cHNjYWxlU2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5idXR0b25zW2ldLmggPSAxNipnYW1lLnVwc2NhbGVTaXplO1xyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbnNbaV0udXBkYXRlTW91c2VPdmVyKGdhbWUubW91c2VYLCBnYW1lLm1vdXNlWSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IFVpU2NyZWVuIH0gZnJvbSAnLi4vVWlTY3JlZW4nO1xyXG5pbXBvcnQgcDUgZnJvbSAncDUnO1xyXG5pbXBvcnQgeyBVaUZyYW1lIH0gZnJvbSAnLi4vVWlGcmFtZSc7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4uL0J1dHRvbic7XHJcbmltcG9ydCB7IE9wdGlvbnNNZW51IH0gZnJvbSAnLi9PcHRpb25zTWVudSc7XHJcbmltcG9ydCB7IEZvbnRSZXNvdXJjZSB9IGZyb20gJy4uLy4uL2Fzc2V0cy9yZXNvdXJjZXMvRm9udFJlc291cmNlJztcclxuaW1wb3J0IHsgTWFpbk1lbnUgfSBmcm9tICcuL01haW5NZW51JztcclxuaW1wb3J0IHsgZ2FtZSB9IGZyb20gJy4uLy4uL0dhbWUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhdXNlTWVudSBleHRlbmRzIFVpU2NyZWVuIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihmb250OiBGb250UmVzb3VyY2UsIHRpdGxlRm9udDogRm9udFJlc291cmNlKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgLy8gbWFrZSB0aGUgZnJhbWUgd2l0aCBzb21lIGRlZmF1bHQgdmFsdWVzLiAgVGhlc2Ugd2lsbCBsYXRlciBiZSBjaGFuZ2VkIHRvIGZpdCB0aGUgc2NyZWVuIHNpemUuXHJcbiAgICAgICAgdGhpcy5mcmFtZSA9IG5ldyBVaUZyYW1lKDAsIDAsIDAsIDApO1xyXG5cclxuICAgICAgICB0aGlzLnRpdGxlRm9udCA9IHRpdGxlRm9udDtcclxuXHJcbiAgICAgICAgLy8gbWFrZSA0IGJ1dHRvbnMgd2l0aCBkZWZhdWx0IHBvc2l0U2lvbnNcclxuICAgICAgICB0aGlzLmJ1dHRvbnMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBCdXR0b24oZm9udCwgXCJSZXN1bWUgZ2FtZVwiLCBcIkdvIGJhY2sgdG8gdGhlIGdhbWUuXCIsIDAsIDAsIDAsIDAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGdhbWUuY3VycmVudFVpID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgbmV3IEJ1dHRvbihmb250LCBcIk9wdGlvbnNcIiwgXCJDaGFuZ2UgeW91ciBrZXliaW5kcywgcmVkdWNlIGxhZywgZXRjLlwiLCAwLCAwLCAwLCAwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnYW1lLmN1cnJlbnRVaSA9IG5ldyBPcHRpb25zTWVudShmb250LCB0aXRsZUZvbnQpO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgbmV3IEJ1dHRvbihmb250LCBcIkxlYXZlIGdhbWVcIiwgXCJHbyBiYWNrIHRvIE1haW4gTWVudVwiLCAwLCAwLCAwLCAwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnYW1lLmN1cnJlbnRVaSA9IG5ldyBNYWluTWVudShmb250LCB0aXRsZUZvbnQpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgc2l6ZSBvZiB0aGUgZWxlbWVudHMgYmFzZWQgb24gdGhlIGluaXRpYWwgc2NyZWVuIHNpemVcclxuICAgICAgICB0aGlzLndpbmRvd1VwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZW5kZXIodGFyZ2V0OiBwNSwgdXBzY2FsZVNpemU6IG51bWJlcik6IHZvaWQge1xyXG5cclxuICAgICAgICAvLyByZW5kZXIgdGhlIHJlY3Rhbmd1bGFyIGltYWdlIHRoYXQgdGhlIHdob2xlIG1lbnUgaXMgb25cclxuICAgICAgICB0aGlzLmZyYW1lLnJlbmRlcih0YXJnZXQsIHVwc2NhbGVTaXplKTtcclxuXHJcbiAgICAgICAgLy8gbG9vcCB0aHJvdWdoIHRoZSBidXR0b25zIGFycmF5IGFuZCByZW5kZXIgZWFjaCBvbmUuXHJcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuYnV0dG9ucykge1xyXG4gICAgICAgICAgICBpdGVtLnJlbmRlcih0YXJnZXQsIHVwc2NhbGVTaXplKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudGl0bGVGb250LmRyYXdUZXh0KHRhcmdldCwgXCJQYXVzZWRcIiwgdGhpcy5mcmFtZS54ICsgNTQqZ2FtZS51cHNjYWxlU2l6ZSwgdGhpcy5mcmFtZS55ICsgMTYqZ2FtZS51cHNjYWxlU2l6ZSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93VXBkYXRlKCkge1xyXG4gICAgICAgIC8vIHNldCB0aGUgcG9zaXRpb24gb2YgdGhlIGZyYW1lXHJcbiAgICAgICAgdGhpcy5mcmFtZS54ID0gZ2FtZS53aWR0aC8yLTIwMC8yKmdhbWUudXBzY2FsZVNpemU7Ly8gY2VudGVyIHRoZSBmcmFtZSBpbiB0aGUgbWlkZGxlIG9mIHRoZSBzY3JlZW5cclxuICAgICAgICB0aGlzLmZyYW1lLnkgPSBnYW1lLmhlaWdodC8yLTcyKmdhbWUudXBzY2FsZVNpemU7XHJcbiAgICAgICAgdGhpcy5mcmFtZS53ID0gMjAwKmdhbWUudXBzY2FsZVNpemU7XHJcbiAgICAgICAgdGhpcy5mcmFtZS5oID0gNTQqZ2FtZS51cHNjYWxlU2l6ZTtcclxuXHJcbiAgICAgICAgLy8gc2V0IHRoZSBwb3NpdGlvbnMgb2YgYWxsIHRoZSBidXR0b25zXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaTwzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5idXR0b25zW2ldLnggPSBnYW1lLndpZHRoLzItMTkyLzIqZ2FtZS51cHNjYWxlU2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5idXR0b25zW2ldLnkgPSBnYW1lLmhlaWdodC8yKzIwKmkqZ2FtZS51cHNjYWxlU2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5idXR0b25zW2ldLncgPSAxOTIqZ2FtZS51cHNjYWxlU2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5idXR0b25zW2ldLmggPSAxNipnYW1lLnVwc2NhbGVTaXplO1xyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbnNbaV0udXBkYXRlTW91c2VPdmVyKGdhbWUubW91c2VYLCBnYW1lLm1vdXNlWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBVaVNjcmVlbiB9IGZyb20gJy4uL1VpU2NyZWVuJztcclxuaW1wb3J0IHA1IGZyb20gJ3A1JztcclxuaW1wb3J0IHsgVWlGcmFtZSB9IGZyb20gJy4uL1VpRnJhbWUnO1xyXG5pbXBvcnQgeyBnYW1lIH0gZnJvbSAnLi4vLi4vR2FtZSc7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4uL0J1dHRvbic7XHJcbmltcG9ydCB7IEZvbnRSZXNvdXJjZSB9IGZyb20gJy4uLy4uL2Fzc2V0cy9yZXNvdXJjZXMvRm9udFJlc291cmNlJztcclxuaW1wb3J0IHsgT3B0aW9uc01lbnUgfSBmcm9tICcuL09wdGlvbnNNZW51JztcclxuXHJcbmV4cG9ydCBjbGFzcyBWaWRlb1NldHRpbmdzTWVudSBleHRlbmRzIFVpU2NyZWVuIHtcclxuXHJcblx0Y29uc3RydWN0b3IoZm9udDogRm9udFJlc291cmNlLCB0aXRsZUZvbnQ6IEZvbnRSZXNvdXJjZSkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdC8vIG1ha2UgdGhlIGZyYW1lIHdpdGggc29tZSBkZWZhdWx0IHZhbHVlcy4gIFRoZXNlIHdpbGwgbGF0ZXIgYmUgY2hhbmdlZCB0byBmaXQgdGhlIHNjcmVlbiBzaXplLlxyXG5cdFx0dGhpcy5mcmFtZSA9IG5ldyBVaUZyYW1lKDAsIDAsIDAsIDApO1xyXG5cclxuXHJcblx0XHRpZihnYW1lLnNreU1vZCA9PT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRnYW1lLnNreU1vZCA9IDI7XHJcblxyXG5cdFx0aWYoZ2FtZS5za3lUb2dnbGUgPT09IHVuZGVmaW5lZClcclxuXHRcdFx0Z2FtZS5za3lUb2dnbGUgPSB0cnVlO1xyXG5cclxuXHRcdGlmKGdhbWUucGFydGljbGVNdWx0aXBsaWVyID09PSB1bmRlZmluZWQpXHJcblx0XHRcdGdhbWUucGFydGljbGVNdWx0aXBsaWVyID0gMTtcclxuXHJcblx0XHRsZXQgdGVtcFNreU1vZGVUZXh0O1xyXG5cclxuXHRcdGlmKGdhbWUuc2t5TW9kPT09Mikge1xyXG5cdFx0XHR0ZW1wU2t5TW9kZVRleHQgPSBcIkhhbGYgRnJhbWVyYXRlXCI7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKGdhbWUuc2t5TW9kPT09MSkge1xyXG5cdFx0XHR0ZW1wU2t5TW9kZVRleHQgPSBcIkZ1bGwgRnJhbWVyYXRlXCI7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGVtcFNreU1vZGVUZXh0ID0gXCJTb2xpZCBDb2xvclwiO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB0ZW1wUGFydGljbGVUZXh0O1xyXG5cclxuXHRcdGlmKGdhbWUucGFydGljbGVNdWx0aXBsaWVyPT09Mikge1xyXG5cdFx0XHR0ZW1wUGFydGljbGVUZXh0ID0gXCJEb3VibGVcIjtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoZ2FtZS5wYXJ0aWNsZU11bHRpcGxpZXI9PT0xKSB7XHJcblx0XHRcdHRlbXBQYXJ0aWNsZVRleHQgPSBcIk5vcm1hbFwiO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRlbXBQYXJ0aWNsZVRleHQgPSBcIk1pbmltYWxcIjtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0Ly8gbWFrZSBzb21lIGJ1dHRvbnMgd2l0aCBkZWZhdWx0IHBvc2l0aW9uc1xyXG5cdFx0dGhpcy5idXR0b25zID0gW1xyXG5cdFx0XHRuZXcgQnV0dG9uKGZvbnQsIGBTa3k6ICR7dGVtcFNreU1vZGVUZXh0fWAsIFwiQ2hhbmdlIHRoZSBhcHBlYXJhbmNlIG9mIHRoZSBza3kuXCIsIDAsIDAsIDAsIDAsICgpID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcInNreSB0b2dnbGVcIik7XHJcblx0XHRcdFx0aWYodGhpcy5idXR0b25zWzBdLnR4dCA9PT0gXCJTa3k6IEhhbGYgRnJhbWVyYXRlXCIpe1xyXG5cdFx0XHRcdFx0dGhpcy5idXR0b25zWzBdLnR4dCA9IFwiU2t5OiBGdWxsIEZyYW1lcmF0ZVwiO1xyXG5cdFx0XHRcdFx0Z2FtZS5za3lNb2QgPSAxO1xyXG5cdFx0XHRcdFx0Z2FtZS5za3lUb2dnbGUgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmKHRoaXMuYnV0dG9uc1swXS50eHQgPT09IFwiU2t5OiBGdWxsIEZyYW1lcmF0ZVwiKSB7XHJcblx0XHRcdFx0XHR0aGlzLmJ1dHRvbnNbMF0udHh0ID0gXCJTa3k6IFNvbGlkIENvbG9yXCI7XHJcblx0XHRcdFx0XHRnYW1lLnNreVRvZ2dsZSA9IGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuYnV0dG9uc1swXS50eHQgPSBcIlNreTogSGFsZiBGcmFtZXJhdGVcIjtcclxuXHRcdFx0XHRcdGdhbWUuc2t5TW9kID0gMjtcclxuXHRcdFx0XHRcdGdhbWUuc2t5VG9nZ2xlID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pLFxyXG5cdFx0XHRuZXcgQnV0dG9uKGZvbnQsIGBQYXJ0aWNsZXM6ICR7dGVtcFBhcnRpY2xlVGV4dH1gLCBcIkNoYW5nZSB0aGUgYW1vdW50IG9mIHBhcnRpY2xlc1wiLCAwLCAwLCAwLCAwLCAoKSA9PiB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJwYXJ0aWNsZXNcIik7XHJcblx0XHRcdFx0aWYodGhpcy5idXR0b25zWzFdLnR4dCA9PT0gXCJQYXJ0aWNsZXM6IE5vcm1hbFwiKXtcclxuXHRcdFx0XHRcdHRoaXMuYnV0dG9uc1sxXS50eHQgPSBcIlBhcnRpY2xlczogRG91YmxlXCI7XHJcblx0XHRcdFx0XHRnYW1lLnBhcnRpY2xlTXVsdGlwbGllciA9IDI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYodGhpcy5idXR0b25zWzFdLnR4dCA9PT0gXCJQYXJ0aWNsZXM6IERvdWJsZVwiKSB7XHJcblx0XHRcdFx0XHR0aGlzLmJ1dHRvbnNbMV0udHh0ID0gXCJQYXJ0aWNsZXM6IE1pbmltYWxcIjtcclxuXHRcdFx0XHRcdGdhbWUucGFydGljbGVNdWx0aXBsaWVyID0gMC41O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuYnV0dG9uc1sxXS50eHQgPSBcIlBhcnRpY2xlczogTm9ybWFsXCI7XHJcblx0XHRcdFx0XHRnYW1lLnBhcnRpY2xlTXVsdGlwbGllciA9IDE7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KSxcclxuXHRcdFx0bmV3IEJ1dHRvbihmb250LCBcIkJhY2tcIiwgXCJSZXR1cm4gdG8gdGhlIG1haW4gbWVudS5cIiwgMCwgMCwgMCwgMCwgKCkgPT4ge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwibWFpbiBtZW51XCIpO1xyXG5cdFx0XHRcdGdhbWUuY3VycmVudFVpID0gbmV3IE9wdGlvbnNNZW51KGZvbnQsIHRpdGxlRm9udCk7XHJcblx0XHRcdH0pXHJcblx0XHRdO1xyXG5cdFx0Ly8gdXBkYXRlIHRoZSBzaXplIG9mIHRoZSBlbGVtZW50cyBiYXNlZCBvbiB0aGUgaW5pdGlhbCBzY3JlZW4gc2l6ZVxyXG5cdFx0dGhpcy53aW5kb3dVcGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdHJlbmRlcih0YXJnZXQ6IHA1LCB1cHNjYWxlU2l6ZTogbnVtYmVyKTogdm9pZCB7XHJcblxyXG5cdFx0Ly8gcmVuZGVyIHRoZSByZWN0YW5ndWxhciBpbWFnZVxyXG5cdFx0dGhpcy5mcmFtZS5yZW5kZXIodGFyZ2V0LCB1cHNjYWxlU2l6ZSk7XHJcblxyXG5cdFx0Ly8gbG9vcCB0aHJvdWdoIHRoZSBidXR0b25zIGFycmF5IGFuZCByZW5kZXIgZWFjaCBvbmUuXHJcblx0XHR0aGlzLmJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xyXG5cdFx0XHRidXR0b24ucmVuZGVyKHRhcmdldCwgdXBzY2FsZVNpemUpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHR3aW5kb3dVcGRhdGUoKSB7XHJcblx0XHQvLyBzZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBmcmFtZVxyXG5cdFx0dGhpcy5mcmFtZS54ID0gZ2FtZS53aWR0aCAvIDIgLSAyMDAgLyAyICogZ2FtZS51cHNjYWxlU2l6ZTsvLyBjZW50ZXIgdGhlIGZyYW1lIGluIHRoZSBjZW50ZXIgb2YgdGhlIHNjcmVlblxyXG5cdFx0dGhpcy5mcmFtZS55ID0gZ2FtZS5oZWlnaHQgLyAyIC0gNTYgKiBnYW1lLnVwc2NhbGVTaXplO1xyXG5cdFx0dGhpcy5mcmFtZS53ID0gMjAwICogZ2FtZS51cHNjYWxlU2l6ZTtcclxuXHRcdHRoaXMuZnJhbWUuaCA9IDQ4ICogZ2FtZS51cHNjYWxlU2l6ZTtcclxuXHJcblx0XHQvLyBzZXQgdGhlIHBvc2l0aW9ucyBvZiBhbGwgdGhlIGJ1dHRvbnNcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcblx0XHRcdHRoaXMuYnV0dG9uc1tpXS54ID0gZ2FtZS53aWR0aCAvIDIgLSAxOTIgLyAyICogZ2FtZS51cHNjYWxlU2l6ZTtcclxuXHRcdFx0dGhpcy5idXR0b25zW2ldLnkgPSBnYW1lLmhlaWdodCAvIDIgKyAyMCAqIGkgKiBnYW1lLnVwc2NhbGVTaXplO1xyXG5cdFx0XHR0aGlzLmJ1dHRvbnNbaV0udyA9IDE5MiAqIGdhbWUudXBzY2FsZVNpemU7XHJcblx0XHRcdHRoaXMuYnV0dG9uc1tpXS5oID0gMTYgKiBnYW1lLnVwc2NhbGVTaXplO1xyXG5cdFx0XHR0aGlzLmJ1dHRvbnNbaV0udXBkYXRlTW91c2VPdmVyKGdhbWUubW91c2VYLCBnYW1lLm1vdXNlWSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxufSIsImltcG9ydCB7IFVpU2NyZWVuIH0gZnJvbSAnLi4vVWlTY3JlZW4nO1xyXG5pbXBvcnQgcDUgZnJvbSAncDUnO1xyXG5pbXBvcnQgeyBVaUZyYW1lIH0gZnJvbSAnLi4vVWlGcmFtZSc7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4uL0J1dHRvbic7XHJcbmltcG9ydCB7IEZvbnRSZXNvdXJjZSB9IGZyb20gJy4uLy4uL2Fzc2V0cy9yZXNvdXJjZXMvRm9udFJlc291cmNlJztcclxuaW1wb3J0IHsgTWFpbk1lbnUgfSBmcm9tICcuL01haW5NZW51JztcclxuaW1wb3J0IHsgV29ybGRPcHRpb25zTWVudSB9IGZyb20gJy4vV29ybGRPcHRpb25zTWVudSc7XHJcbmltcG9ydCB7IGdhbWUgfSBmcm9tICcuLi8uLi9HYW1lJztcclxuXHJcbmV4cG9ydCBjbGFzcyBXb3JsZENyZWF0aW9uTWVudSBleHRlbmRzIFVpU2NyZWVuIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihmb250OiBGb250UmVzb3VyY2UsIHRpdGxlRm9udDogRm9udFJlc291cmNlKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvLyBtYWtlIHRoZSBmcmFtZSB3aXRoIHNvbWUgZGVmYXVsdCB2YWx1ZXMuICBUaGVzZSB3aWxsIGxhdGVyIGJlIGNoYW5nZWQgdG8gZml0IHRoZSBzY3JlZW4gc2l6ZS5cclxuICAgICAgICB0aGlzLmZyYW1lID0gbmV3IFVpRnJhbWUoMCwgMCwgMCwgMCk7XHJcblxyXG4gICAgICAgIHRoaXMudGl0bGVGb250ID0gdGl0bGVGb250O1xyXG4gICAgICAgIC8vIG1ha2Ugc29tZSBidXR0b25zIHdpdGggZGVmYXVsdCBwb3NpdGlvbnNcclxuICAgICAgICBpZiAoZ2FtZS5zZXJ2ZXJWaXNpYmlsaXR5ID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIGdhbWUuc2VydmVyVmlzaWJpbGl0eSA9IFwiUHVibGljXCI7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IFtcclxuICAgICAgICAgICAgbmV3IEJ1dHRvbihmb250LCBgU2VydmVyIFZpc2liaWxpdHk6ICR7Z2FtZS5zZXJ2ZXJWaXNpYmlsaXR5fWAsIFwiQ2hhbmdlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBzZXJ2ZXJcIiwgMCwgMCwgMCwgMCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYnV0dG9uc1swXS50eHQgPT09IFwiU2VydmVyIFZpc2liaWxpdHk6IFB1YmxpY1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZS5zZXJ2ZXJWaXNpYmlsaXR5ID0gXCJVbmxpc3RlZFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uc1swXS50eHQgPSBcIlNlcnZlciBWaXNpYmlsaXR5OiBVbmxpc3RlZFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5idXR0b25zWzBdLnR4dCA9PT0gXCJTZXJ2ZXIgVmlzaWJpbGl0eTogVW5saXN0ZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWUuc2VydmVyVmlzaWJpbGl0eSA9IFwiUHJpdmF0ZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uc1swXS50eHQgPSBcIlNlcnZlciBWaXNpYmlsaXR5OiBQcml2YXRlXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lLnNlcnZlclZpc2liaWxpdHkgPSBcIlB1YmxpY1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uc1swXS50eHQgPSBcIlNlcnZlciBWaXNpYmlsaXR5OiBQdWJsaWNcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIG5ldyBCdXR0b24oZm9udCwgXCJXb3JsZCBPcHRpb25zXCIsIFwiQ2hhbmdlIGhvdyB5b3VyIHdvcmxkIGxvb2tzIGFuZCBnZW5lcmF0ZXMuXCIsIDAsIDAsIDAsIDAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid29ybGQgbWVudVwiKTtcclxuICAgICAgICAgICAgICAgIGdhbWUuY3VycmVudFVpID0gbmV3IFdvcmxkT3B0aW9uc01lbnUoZm9udCwgdGl0bGVGb250KTtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIG5ldyBCdXR0b24oZm9udCwgXCJCYWNrXCIsIFwiUmV0dXJuIHRvIHRoZSBtYWluIG1lbnUuXCIsIDAsIDAsIDAsIDAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibWFpbiBtZW51XCIpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5jdXJyZW50VWkgPSBuZXcgTWFpbk1lbnUoZm9udCwgdGl0bGVGb250KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICBdO1xyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgc2l6ZSBvZiB0aGUgZWxlbWVudHMgYmFzZWQgb24gdGhlIGluaXRpYWwgc2NyZWVuIHNpemVcclxuICAgICAgICB0aGlzLndpbmRvd1VwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih0YXJnZXQ6IHA1LCB1cHNjYWxlU2l6ZTogbnVtYmVyKTogdm9pZCB7XHJcblxyXG4gICAgICAgIC8vIHJlbmRlciB0aGUgcmVjdGFuZ3VsYXIgaW1hZ2UgdGhhdCB0aGUgd2hvbGUgbWVudSBpcyBvblxyXG4gICAgICAgIHRoaXMuZnJhbWUucmVuZGVyKHRhcmdldCwgdXBzY2FsZVNpemUpO1xyXG5cclxuICAgICAgICAvLyBsb29wIHRocm91Z2ggdGhlIGJ1dHRvbnMgYXJyYXkgYW5kIHJlbmRlciBlYWNoIG9uZS5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xyXG4gICAgICAgICAgICBidXR0b24ucmVuZGVyKHRhcmdldCwgdXBzY2FsZVNpemUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnRpdGxlRm9udC5kcmF3VGV4dCh0YXJnZXQsIFwiQ3JlYXRlIFdvcmxkXCIsIHRoaXMuZnJhbWUueCArIDMwKmdhbWUudXBzY2FsZVNpemUsIHRoaXMuZnJhbWUueSArIDE2KmdhbWUudXBzY2FsZVNpemUpXHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93VXBkYXRlKCkge1xyXG4gICAgICAgIC8vIHNldCB0aGUgcG9zaXRpb24gb2YgdGhlIGZyYW1lXHJcbiAgICAgICAgdGhpcy5mcmFtZS54ID0gZ2FtZS53aWR0aCAvIDIgLSAyMDAgLyAyICogZ2FtZS51cHNjYWxlU2l6ZTsvLyBjZW50ZXIgdGhlIGZyYW1lIGluIHRoZSBjZW50ZXIgb2YgdGhlIHNjcmVlblxyXG4gICAgICAgIHRoaXMuZnJhbWUueSA9IGdhbWUuaGVpZ2h0IC8gMiAtIDU2ICogZ2FtZS51cHNjYWxlU2l6ZTtcclxuICAgICAgICB0aGlzLmZyYW1lLncgPSAyMDAgKiBnYW1lLnVwc2NhbGVTaXplO1xyXG4gICAgICAgIHRoaXMuZnJhbWUuaCA9IDQ4ICogZ2FtZS51cHNjYWxlU2l6ZTtcclxuXHJcbiAgICAgICAgLy8gc2V0IHRoZSBwb3NpdGlvbnMgb2YgYWxsIHRoZSBidXR0b25zXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5idXR0b25zW2ldLnggPSBnYW1lLndpZHRoIC8gMiAtIDE5MiAvIDIgKiBnYW1lLnVwc2NhbGVTaXplO1xyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbnNbaV0ueSA9IGdhbWUuaGVpZ2h0IC8gMiArIDIwICogaSAqIGdhbWUudXBzY2FsZVNpemU7XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uc1tpXS53ID0gMTkyICogZ2FtZS51cHNjYWxlU2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5idXR0b25zW2ldLmggPSAxNiAqIGdhbWUudXBzY2FsZVNpemU7XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uc1tpXS51cGRhdGVNb3VzZU92ZXIoZ2FtZS5tb3VzZVgsIGdhbWUubW91c2VZKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgVWlTY3JlZW4gfSBmcm9tICcuLi9VaVNjcmVlbic7XHJcbmltcG9ydCBwNSBmcm9tICdwNSc7XHJcbmltcG9ydCB7IFVpRnJhbWUgfSBmcm9tICcuLi9VaUZyYW1lJztcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi4vQnV0dG9uJztcclxuaW1wb3J0IHsgRm9udFJlc291cmNlIH0gZnJvbSAnLi4vLi4vYXNzZXRzL3Jlc291cmNlcy9Gb250UmVzb3VyY2UnO1xyXG5pbXBvcnQgeyBXb3JsZENyZWF0aW9uTWVudSB9IGZyb20gJy4vV29ybGRDcmVhdGlvbk1lbnUnO1xyXG5pbXBvcnQgeyBTbGlkZXIgfSBmcm9tICcuLi9TbGlkZXInO1xyXG5pbXBvcnQgeyBnYW1lIH0gZnJvbSAnLi4vLi4vR2FtZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgV29ybGRPcHRpb25zTWVudSBleHRlbmRzIFVpU2NyZWVuIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihmb250OiBGb250UmVzb3VyY2UsIHRpdGxlRm9udDogRm9udFJlc291cmNlKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvLyBtYWtlIHRoZSBmcmFtZSB3aXRoIHNvbWUgZGVmYXVsdCB2YWx1ZXMuICBUaGVzZSB3aWxsIGxhdGVyIGJlIGNoYW5nZWQgdG8gZml0IHRoZSBzY3JlZW4gc2l6ZS5cclxuICAgICAgICB0aGlzLmZyYW1lID0gbmV3IFVpRnJhbWUoMCwgMCwgMCwgMCk7XHJcblxyXG4gICAgICAgIHRoaXMudGl0bGVGb250ID0gdGl0bGVGb250XHJcblxyXG4gICAgICAgIC8vIG1ha2Ugc29tZSBidXR0b25zIHdpdGggZGVmYXVsdCBwb3NpdGlvbnNcclxuICAgICAgICBpZihnYW1lLndvcmxkQnVtcGluZXNzID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIGdhbWUud29ybGRCdW1waW5lc3MgPSAxO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IHRlbXBXb3JsZEJ1bXBpbmVzc1RleHQ7XHJcblxyXG4gICAgICAgIGlmKGdhbWUud29ybGRCdW1waW5lc3M9PT0xKSB7XHJcbiAgICAgICAgICAgIHRlbXBXb3JsZEJ1bXBpbmVzc1RleHQgPSBcIk5vcm1hbFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGdhbWUud29ybGRCdW1waW5lc3M9PT0wKSB7XHJcbiAgICAgICAgICAgIHRlbXBXb3JsZEJ1bXBpbmVzc1RleHQgPSBcIlN1cGVyZmxhdFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGVtcFdvcmxkQnVtcGluZXNzVGV4dCA9IFwiQW1wbGlmaWVkXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IFtcclxuICAgICAgICAgICAgbmV3IEJ1dHRvbihmb250LCBgV29ybGQgQnVtcGluZXNzOiAke3RlbXBXb3JsZEJ1bXBpbmVzc1RleHR9YCwgXCJDaGFuZ2UgdGhlIGludGVuc2l0eSBvZiB0aGUgd29ybGQncyBidW1wcy5cIiwgMCwgMCwgMCwgMCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5idXR0b25zWzBdLnR4dCA9PT0gXCJXb3JsZCBCdW1waW5lc3M6IE5vcm1hbFwiKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbnNbMF0udHh0ID0gXCJXb3JsZCBCdW1waW5lc3M6IEFtcGxpZmllZFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWUud29ybGRCdW1waW5lc3MgPSAzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLmJ1dHRvbnNbMF0udHh0ID09PSBcIldvcmxkIEJ1bXBpbmVzczogQW1wbGlmaWVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbnNbMF0udHh0ID0gXCJXb3JsZCBCdW1waW5lc3M6IFN1cGVyZmxhdFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWUud29ybGRCdW1waW5lc3MgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25zWzBdLnR4dCA9IFwiV29ybGQgQnVtcGluZXNzOiBOb3JtYWxcIjtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lLndvcmxkQnVtcGluZXNzID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIG5ldyBCdXR0b24oZm9udCwgXCJCYWNrXCIsIFwiUmV0dXJuIHRvIHRoZSBtYWluIG1lbnUuXCIsIDAsIDAsIDAsIDAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibWFpbiBtZW51XCIpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5jdXJyZW50VWkgPSBuZXcgV29ybGRDcmVhdGlvbk1lbnUoZm9udCwgdGl0bGVGb250KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuc2xpZGVycyA9IFtcclxuICAgICAgICAgICAgbmV3IFNsaWRlcihmb250LCBcIldpZHRoXCIsIDUxMiwgNjQsIDIwNDgsIDY0LCAwLCAwLCAwLCAwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkV2lkdGggPSB0aGlzLnNsaWRlcnNbMF0udmFsdWU7XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBuZXcgU2xpZGVyKGZvbnQsIFwiSGVpZ2h0XCIsIDY0LCA2NCwgNTEyLCAxNiwgMCwgMCwgMCwgMCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZEhlaWdodCA9IHRoaXMuc2xpZGVyc1sxXS52YWx1ZTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICBdO1xyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgc2l6ZSBvZiB0aGUgZWxlbWVudHMgYmFzZWQgb24gdGhlIGluaXRpYWwgc2NyZWVuIHNpemVcclxuICAgICAgICB0aGlzLndpbmRvd1VwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih0YXJnZXQ6IHA1LCB1cHNjYWxlU2l6ZTogbnVtYmVyKTogdm9pZCB7XHJcblxyXG4gICAgICAgIC8vIHJlbmRlciB0aGUgcmVjdGFuZ3VsYXIgaW1hZ2UgdGhhdCB0aGUgd2hvbGUgbWVudSBpcyBvblxyXG4gICAgICAgIHRoaXMuZnJhbWUucmVuZGVyKHRhcmdldCwgdXBzY2FsZVNpemUpO1xyXG5cclxuICAgICAgICAvLyBsb29wIHRocm91Z2ggdGhlIGJ1dHRvbnMgYXJyYXkgYW5kIHJlbmRlciBlYWNoIG9uZS5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xyXG4gICAgICAgICAgICBidXR0b24ucmVuZGVyKHRhcmdldCwgdXBzY2FsZVNpemUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBsb29wIHRocm91Z2ggdGhlIHNsaWRlcnMgYXJyYXkgYW5kIHJlbmRlciBlYWNoIG9uZS5cclxuICAgICAgICB0aGlzLnNsaWRlcnMuZm9yRWFjaChzbGlkZXIgPT4ge1xyXG4gICAgICAgICAgICBzbGlkZXIucmVuZGVyKHRhcmdldCwgdXBzY2FsZVNpemUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnRpdGxlRm9udC5kcmF3VGV4dCh0YXJnZXQsIFwiV29ybGQgT3B0aW9uc1wiLCB0aGlzLmZyYW1lLnggKyAzMCpnYW1lLnVwc2NhbGVTaXplLCB0aGlzLmZyYW1lLnkgKyAxNipnYW1lLnVwc2NhbGVTaXplKVxyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvd1VwZGF0ZSgpIHtcclxuICAgICAgICAvLyBzZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBmcmFtZVxyXG4gICAgICAgIHRoaXMuZnJhbWUueCA9IGdhbWUud2lkdGgvMi0yMDAvMipnYW1lLnVwc2NhbGVTaXplOy8vIGNlbnRlciB0aGUgZnJhbWUgaW4gdGhlIGNlbnRlciBvZiB0aGUgc2NyZWVuXHJcbiAgICAgICAgdGhpcy5mcmFtZS55ID0gZ2FtZS5oZWlnaHQvMi01NipnYW1lLnVwc2NhbGVTaXplO1xyXG4gICAgICAgIHRoaXMuZnJhbWUudyA9IDIwMCpnYW1lLnVwc2NhbGVTaXplO1xyXG4gICAgICAgIHRoaXMuZnJhbWUuaCA9IDQ4KmdhbWUudXBzY2FsZVNpemU7XHJcblxyXG4gICAgICAgIC8vIHNldCB0aGUgcG9zaXRpb25zIG9mIGFsbCB0aGUgYnV0dG9uc1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGk8MjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uc1tpXS54ID0gZ2FtZS53aWR0aC8yLTE5Mi8yKmdhbWUudXBzY2FsZVNpemU7XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uc1tpXS55ID0gZ2FtZS5oZWlnaHQvMis2MCppKmdhbWUudXBzY2FsZVNpemU7XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uc1tpXS53ID0gMTkyKmdhbWUudXBzY2FsZVNpemU7XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uc1tpXS5oID0gMTYqZ2FtZS51cHNjYWxlU2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5idXR0b25zW2ldLnVwZGF0ZU1vdXNlT3ZlcihnYW1lLm1vdXNlWCwgZ2FtZS5tb3VzZVkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc2V0IHRoZSBwb3NpdGlvbnMgb2YgYWxsIHRoZSBzbGlkZXJzXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaTwyOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXJzW2ldLnggPSBnYW1lLndpZHRoLzItMTkyLzIqZ2FtZS51cHNjYWxlU2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXJzW2ldLnkgPSBnYW1lLmhlaWdodC8yKzIwKmdhbWUudXBzY2FsZVNpemUrMjAqaSpnYW1lLnVwc2NhbGVTaXplO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlcnNbaV0udyA9IDE5MipnYW1lLnVwc2NhbGVTaXplO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlcnNbaV0uaCA9IDE2KmdhbWUudXBzY2FsZVNpemU7XHJcbiAgICAgICAgICAgIGlmKGdhbWUubW91c2VJc1ByZXNzZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlcnNbaV0udXBkYXRlU2xpZGVyUG9zaXRpb24oZ2FtZS5tb3VzZVgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgUDUgZnJvbSAncDUnO1xyXG5pbXBvcnQgeyBUaWNrYWJsZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvVGlja2FibGUnO1xyXG5pbXBvcnQgeyBSZW5kZXJhYmxlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9SZW5kZXJhYmxlJztcclxuaW1wb3J0IHsgZ2FtZSwgR2FtZSB9IGZyb20gJy4uL0dhbWUnO1xyXG5pbXBvcnQgeyBQbGF5ZXJMb2NhbCB9IGZyb20gJy4uL3BsYXllci9QbGF5ZXJMb2NhbCc7XHJcbmltcG9ydCB7IFNlcnZlckVudGl0eSB9IGZyb20gJy4vZW50aXRpZXMvU2VydmVyRW50aXR5JztcclxuaW1wb3J0IHsgU25hcHNob3RJbnRlcnBvbGF0aW9uIH0gZnJvbSAnQGdlY2tvcy5pby9zbmFwc2hvdC1pbnRlcnBvbGF0aW9uJztcclxuaW1wb3J0IHsgRW50aXR5LCBTbmFwc2hvdCB9IGZyb20gJ0BnZWNrb3MuaW8vc25hcHNob3QtaW50ZXJwb2xhdGlvbi9saWIvdHlwZXMnO1xyXG5pbXBvcnQgeyBXb3JsZFRpbGVzIH0gZnJvbSAnLi9Xb3JsZFRpbGVzJztcclxuaW1wb3J0IHsgVGlsZVR5cGUgfSBmcm9tICcuLi8uLi9nbG9iYWwvVGlsZSc7XHJcbmltcG9ydCB7IEludmVudG9yeSB9IGZyb20gJy4uL3BsYXllci9JbnZlbnRvcnknO1xyXG5pbXBvcnQgeyBUaWxlRW50aXR5UGF5bG9hZCB9IGZyb20gJy4uLy4uL2dsb2JhbC9UaWxlRW50aXR5JztcclxuaW1wb3J0IHsgQ2xpZW50VGlsZUVudGl0eSB9IGZyb20gJy4vZW50aXRpZXMvVGlsZUVudGl0eSc7XHJcbmltcG9ydCB7IFdvcmxkQXNzZXRzIH0gZnJvbSAnLi4vYXNzZXRzL0Fzc2V0cyc7XHJcblxyXG5leHBvcnQgY2xhc3MgV29ybGQgaW1wbGVtZW50cyBUaWNrYWJsZSwgUmVuZGVyYWJsZSB7XHJcblx0d2lkdGg6IG51bWJlcjsgLy8gd2lkdGggb2YgdGhlIHdvcmxkIGluIHRpbGVzXHJcblx0aGVpZ2h0OiBudW1iZXI7IC8vIGhlaWdodCBvZiB0aGUgd29ybGQgaW4gdGlsZXNcclxuXHJcblx0dGlsZUxheWVyOiBQNS5HcmFwaGljczsgLy8gVGlsZSBsYXllciBncmFwaGljXHJcblxyXG5cdHdvcmxkVGlsZXM6IChUaWxlVHlwZSB8IHN0cmluZylbXTsgLy8gbnVtYmVyIGZvciBlYWNoIHRpbGVzIGluIHRoZSB3b3JsZCBleDogWzEsIDEsIDAsIDEsIDIsIDAsIDAsIDEuLi4gIF0gbWVhbnMgc25vdywgc25vdywgYWlyLCBzbm93LCBpY2UsIGFpciwgYWlyLCBzbm93Li4uICBzdHJpbmcgaXMgaWQgZm9yIHRpbGUgZW50aXR5IG9jY3VweWluZyB0aGF0IHRpbGVcclxuXHJcblx0cGxheWVyOiBQbGF5ZXJMb2NhbDtcclxuXHJcblx0aW52ZW50b3J5OiBJbnZlbnRvcnk7XHJcblxyXG5cdGVudGl0aWVzOiB7IFtpZDogc3RyaW5nXTogU2VydmVyRW50aXR5IH0gPSB7fTtcclxuXHJcblx0dGlsZUVudGl0eVBheWxvYWRzOiB7IFtpZDogc3RyaW5nXTogVGlsZUVudGl0eVBheWxvYWQgfTtcclxuXHR0aWxlRW50aXRpZXM6IHsgW2lkOiBzdHJpbmddOiBDbGllbnRUaWxlRW50aXR5IH07XHJcblxyXG5cdHNuYXBzaG90SW50ZXJwb2xhdGlvbjogU25hcHNob3RJbnRlcnBvbGF0aW9uO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHdpZHRoOiBudW1iZXIsXHJcblx0XHRoZWlnaHQ6IG51bWJlcixcclxuXHRcdHRpbGVzOiAoVGlsZVR5cGUgfCBzdHJpbmcpW10sXHJcblx0XHR0aWxlRW50aXRpZXM6IHsgW2lkOiBzdHJpbmddOiBDbGllbnRUaWxlRW50aXR5IH0sXHJcblx0KSB7XHJcblx0XHQvLyBJbml0aWFsaXplIHRoZSB3b3JsZCB3aXRoIHRoZSB0aWxlcyBhbmQgZGltZW5zaW9ucyBmcm9tIHRoZSBzZXJ2ZXJcclxuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcclxuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cdFx0dGhpcy53b3JsZFRpbGVzID0gdGlsZXM7XHJcblx0XHR0aGlzLnRpbGVFbnRpdGllcyA9IHRpbGVFbnRpdGllcztcclxuXHJcblx0XHR0aGlzLnNuYXBzaG90SW50ZXJwb2xhdGlvbiA9IG5ldyBTbmFwc2hvdEludGVycG9sYXRpb24oKTtcclxuXHRcdHRoaXMuc25hcHNob3RJbnRlcnBvbGF0aW9uLmludGVycG9sYXRpb25CdWZmZXIuc2V0KFxyXG5cdFx0XHQoMTAwMCAvIGdhbWUubmV0TWFuYWdlci5wbGF5ZXJUaWNrUmF0ZSkgKiAyLFxyXG5cdFx0KTtcclxuXHJcblx0XHQvLyBkZWZpbmUgdGhlIHA1LkdyYXBoaWNzIG9iamVjdHMgdGhhdCBob2xkIGFuIGltYWdlIG9mIHRoZSB0aWxlcyBvZiB0aGUgd29ybGQuICBUaGVzZSBhY3Qgc29ydCBvZiBsaWtlIGEgdmlydHVhbCBjYW52YXMgYW5kIGNhbiBiZSBkcmF3biBvbiBqdXN0IGxpa2UgYSBub3JtYWwgY2FudmFzIGJ5IHVzaW5nIHRpbGVMYXllci5yZWN0KCk7LCB0aWxlTGF5ZXIuZWxsaXBzZSgpOywgdGlsZUxheWVyLmZpbGwoKTssIGV0Yy5cclxuXHRcdHRoaXMudGlsZUxheWVyID0gZ2FtZS5jcmVhdGVHcmFwaGljcyhcclxuXHRcdFx0dGhpcy53aWR0aCAqIGdhbWUuVElMRV9XSURUSCxcclxuXHRcdFx0dGhpcy5oZWlnaHQgKiBnYW1lLlRJTEVfSEVJR0hULFxyXG5cdFx0KTtcclxuXHRcdHRoaXMubG9hZFdvcmxkKCk7XHJcblx0fVxyXG5cclxuXHR0aWNrKGdhbWU6IEdhbWUpIHtcclxuXHRcdGlmICh0aGlzLnBsYXllciAhPT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRnYW1lLmNvbm5lY3Rpb24uZW1pdCgncGxheWVyVXBkYXRlJywgdGhpcy5wbGF5ZXIueCwgdGhpcy5wbGF5ZXIueSk7XHJcblx0fVxyXG5cclxuXHRyZW5kZXIodGFyZ2V0OiBQNSwgdXBzY2FsZVNpemU6IG51bWJlcikge1xyXG5cdFx0Ly8gZHJhdyB0aGUgdGlsZXMgbGF5ZXIgb250byB0aGUgc2NyZWVuXHJcblx0XHR0YXJnZXQuaW1hZ2UoXHJcblx0XHRcdHRoaXMudGlsZUxheWVyLFxyXG5cdFx0XHQwLFxyXG5cdFx0XHQwLFxyXG5cdFx0XHQoZ2FtZS53aWR0aCAvIHVwc2NhbGVTaXplKSAqIHVwc2NhbGVTaXplLFxyXG5cdFx0XHQoZ2FtZS5oZWlnaHQgLyB1cHNjYWxlU2l6ZSkgKiB1cHNjYWxlU2l6ZSxcclxuXHRcdFx0Z2FtZS5pbnRlcnBvbGF0ZWRDYW1YICogZ2FtZS5USUxFX1dJRFRILFxyXG5cdFx0XHRnYW1lLmludGVycG9sYXRlZENhbVkgKiBnYW1lLlRJTEVfV0lEVEgsXHJcblx0XHRcdGdhbWUud2lkdGggLyB1cHNjYWxlU2l6ZSxcclxuXHRcdFx0Z2FtZS5oZWlnaHQgLyB1cHNjYWxlU2l6ZSxcclxuXHRcdCk7XHJcblxyXG5cdFx0dGhpcy5yZW5kZXJQbGF5ZXJzKHRhcmdldCwgdXBzY2FsZVNpemUpO1xyXG5cclxuXHRcdHRhcmdldC5zdHJva2UoMCk7XHJcblx0XHR0YXJnZXQuc3Ryb2tlV2VpZ2h0KDQpO1xyXG5cdFx0dGFyZ2V0Lm5vRmlsbCgpO1xyXG5cdFx0dGFyZ2V0LnJlY3QodGFyZ2V0LndpZHRoIC0gdGhpcy53aWR0aCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG5cclxuXHRcdHRhcmdldC5pbWFnZShcclxuXHRcdFx0dGhpcy50aWxlTGF5ZXIsXHJcblx0XHRcdHRhcmdldC53aWR0aCAtIHRoaXMud2lkdGgsXHJcblx0XHRcdDAsXHJcblx0XHRcdHRoaXMud2lkdGgsXHJcblx0XHRcdHRoaXMuaGVpZ2h0LFxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZVBsYXllcnMoc25hcHNob3Q6IFNuYXBzaG90KSB7XHJcblx0XHR0aGlzLnNuYXBzaG90SW50ZXJwb2xhdGlvbi5zbmFwc2hvdC5hZGQoc25hcHNob3QpO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlVGlsZSh0aWxlSW5kZXg6IG51bWJlciwgdGlsZTogVGlsZVR5cGUpIHtcclxuXHRcdC8vIFVwZGF0ZSB0aGUgdGlsZSBhbmQgdGhlIDQgbmVpZ2hib3VyaW5nIHRpbGVzXHJcblx0XHR0aGlzLndvcmxkVGlsZXNbdGlsZUluZGV4XSA9IHRpbGU7XHJcblxyXG5cdFx0Ly8gZXJhc2UgdGhlIGJyb2tlbiB0aWxlcyBhbmQgaXRzIHN1cnJvdW5kaW5nIHRpbGVzIGlmIHRoZXkncmUgdGlsZXNcclxuXHRcdHRoaXMudGlsZUxheWVyLmVyYXNlKCk7XHJcblx0XHR0aGlzLnRpbGVMYXllci5ub1N0cm9rZSgpO1xyXG5cdFx0dGhpcy50aWxlTGF5ZXIucmVjdChcclxuXHRcdFx0Ly9jZW50ZXJcclxuXHRcdFx0KHRpbGVJbmRleCAlIHRoaXMud2lkdGgpICogZ2FtZS5USUxFX1dJRFRILFxyXG5cdFx0XHRNYXRoLmZsb29yKHRpbGVJbmRleCAvIHRoaXMud2lkdGgpICogZ2FtZS5USUxFX0hFSUdIVCxcclxuXHRcdFx0Z2FtZS5USUxFX1dJRFRILFxyXG5cdFx0XHRnYW1lLlRJTEVfSEVJR0hULFxyXG5cdFx0KTtcclxuXHJcblx0XHRpZiAoXHJcblx0XHRcdHRpbGVJbmRleCAtIDEgPj0gMCAmJlxyXG5cdFx0XHR0eXBlb2YgdGhpcy53b3JsZFRpbGVzW3RpbGVJbmRleCAtIDFdICE9PSAnc3RyaW5nJyAmJlxyXG5cdFx0XHR0aGlzLndvcmxkVGlsZXNbdGlsZUluZGV4IC0gMV0gIT09IFRpbGVUeXBlLkFpclxyXG5cdFx0KSB7XHJcblx0XHRcdHRoaXMudGlsZUxheWVyLnJlY3QoXHJcblx0XHRcdFx0Ly9sZWZ0XHJcblx0XHRcdFx0KCh0aWxlSW5kZXggJSB0aGlzLndpZHRoKSAtIDEpICogZ2FtZS5USUxFX1dJRFRILFxyXG5cdFx0XHRcdE1hdGguZmxvb3IodGlsZUluZGV4IC8gdGhpcy53aWR0aCkgKiBnYW1lLlRJTEVfSEVJR0hULFxyXG5cdFx0XHRcdGdhbWUuVElMRV9XSURUSCxcclxuXHRcdFx0XHRnYW1lLlRJTEVfSEVJR0hULFxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChcclxuXHRcdFx0dGlsZUluZGV4ICsgMSA8IHRoaXMud2lkdGggKiB0aGlzLmhlaWdodCAmJlxyXG5cdFx0XHR0eXBlb2YgdGhpcy53b3JsZFRpbGVzW3RpbGVJbmRleCArIDFdICE9PSAnc3RyaW5nJyAmJlxyXG5cdFx0XHR0aGlzLndvcmxkVGlsZXNbdGlsZUluZGV4ICsgMV0gIT09IFRpbGVUeXBlLkFpclxyXG5cdFx0KSB7XHJcblx0XHRcdHRoaXMudGlsZUxheWVyLnJlY3QoXHJcblx0XHRcdFx0Ly9yaWdodFxyXG5cdFx0XHRcdCgodGlsZUluZGV4ICUgdGhpcy53aWR0aCkgLSAxKSAqIGdhbWUuVElMRV9XSURUSCxcclxuXHRcdFx0XHRNYXRoLmZsb29yKHRpbGVJbmRleCAvIHRoaXMud2lkdGgpICogZ2FtZS5USUxFX0hFSUdIVCxcclxuXHRcdFx0XHRnYW1lLlRJTEVfV0lEVEgsXHJcblx0XHRcdFx0Z2FtZS5USUxFX0hFSUdIVCxcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoXHJcblx0XHRcdHRpbGVJbmRleCAtIHRoaXMud2lkdGggPj0gMCAmJlxyXG5cdFx0XHR0eXBlb2YgdGhpcy53b3JsZFRpbGVzW3RpbGVJbmRleCAtIHRoaXMud2lkdGhdICE9PSAnc3RyaW5nJyAmJlxyXG5cdFx0XHR0aGlzLndvcmxkVGlsZXNbdGlsZUluZGV4IC0gdGhpcy53aWR0aF0gIT09IFRpbGVUeXBlLkFpclxyXG5cdFx0KSB7XHJcblx0XHRcdHRoaXMudGlsZUxheWVyLnJlY3QoXHJcblx0XHRcdFx0Ly90b3BcclxuXHRcdFx0XHQodGlsZUluZGV4ICUgdGhpcy53aWR0aCkgKiBnYW1lLlRJTEVfV0lEVEgsXHJcblx0XHRcdFx0KE1hdGguZmxvb3IodGlsZUluZGV4IC8gdGhpcy53aWR0aCkgLSAxKSAqIGdhbWUuVElMRV9IRUlHSFQsXHJcblx0XHRcdFx0Z2FtZS5USUxFX1dJRFRILFxyXG5cdFx0XHRcdGdhbWUuVElMRV9IRUlHSFQsXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRpZiAoXHJcblx0XHRcdHRpbGVJbmRleCArIHRoaXMud2lkdGggPCB0aGlzLndpZHRoICogdGhpcy5oZWlnaHQgJiZcclxuXHRcdFx0dHlwZW9mIHRoaXMud29ybGRUaWxlc1t0aWxlSW5kZXggKyB0aGlzLndpZHRoXSAhPT0gJ3N0cmluZycgJiZcclxuXHRcdFx0dGhpcy53b3JsZFRpbGVzW3RpbGVJbmRleCArIHRoaXMud2lkdGhdICE9PSBUaWxlVHlwZS5BaXJcclxuXHRcdCkge1xyXG5cdFx0XHR0aGlzLnRpbGVMYXllci5yZWN0KFxyXG5cdFx0XHRcdC8vYm90dG9tXHJcblx0XHRcdFx0KHRpbGVJbmRleCAlIHRoaXMud2lkdGgpICogZ2FtZS5USUxFX1dJRFRILFxyXG5cdFx0XHRcdChNYXRoLmZsb29yKHRpbGVJbmRleCAvIHRoaXMud2lkdGgpICsgMSkgKiBnYW1lLlRJTEVfSEVJR0hULFxyXG5cdFx0XHRcdGdhbWUuVElMRV9XSURUSCxcclxuXHRcdFx0XHRnYW1lLlRJTEVfSEVJR0hULFxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy50aWxlTGF5ZXIubm9FcmFzZSgpO1xyXG5cclxuXHRcdC8vIHJlZHJhdyB0aGUgbmVpZ2hib3JpbmcgdGlsZXNcclxuXHRcdHRoaXMuZHJhd1RpbGUodGlsZUluZGV4KTtcclxuXHRcdHRoaXMuZHJhd1RpbGUodGlsZUluZGV4ICsgdGhpcy53aWR0aCk7XHJcblx0XHR0aGlzLmRyYXdUaWxlKHRpbGVJbmRleCAtIDEpO1xyXG5cdFx0dGhpcy5kcmF3VGlsZSh0aWxlSW5kZXggLSB0aGlzLndpZHRoKTtcclxuXHRcdHRoaXMuZHJhd1RpbGUodGlsZUluZGV4ICsgMSk7XHJcblx0fVxyXG5cclxuXHRyZW5kZXJQbGF5ZXJzKHRhcmdldDogUDUsIHVwc2NhbGVTaXplOiBudW1iZXIpIHtcclxuXHRcdC8vIENhbGN1bGF0ZSB0aGUgaW50ZXJwb2xhdGVkIHBvc2l0aW9uIG9mIGFsbCB1cGRhdGVkIGVudGl0aWVzXHJcblx0XHRjb25zdCBwb3NpdGlvblN0YXRlczogeyBbaWQ6IHN0cmluZ106IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSB9ID0ge307XHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCBjYWxjdWxhdGVkU25hcHNob3QgPVxyXG5cdFx0XHRcdHRoaXMuc25hcHNob3RJbnRlcnBvbGF0aW9uLmNhbGNJbnRlcnBvbGF0aW9uKCd4IHknKTtcclxuXHRcdFx0aWYgKCFjYWxjdWxhdGVkU25hcHNob3QpIHJldHVybjtcclxuXHJcblx0XHRcdGNvbnN0IHN0YXRlID0gY2FsY3VsYXRlZFNuYXBzaG90LnN0YXRlO1xyXG5cdFx0XHRpZiAoIXN0YXRlKSByZXR1cm47XHJcblxyXG5cdFx0XHQvLyBUaGUgbmV3IHBvc2l0aW9ucyBvZiBlbnRpdGllcyBhcyBvYmplY3RcclxuXHRcdFx0c3RhdGUuZm9yRWFjaCgoeyBpZCwgeCwgeSB9OiBFbnRpdHkgJiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0pID0+IHtcclxuXHRcdFx0XHRwb3NpdGlvblN0YXRlc1tpZF0gPSB7IHgsIHkgfTtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGNhdGNoIChlKSB7fVxyXG5cclxuXHRcdC8vIFJlbmRlciBlYWNoIGVudGl0eSBpbiByYW5kb20gb3JkZXJcclxuXHRcdE9iamVjdC5lbnRyaWVzKHRoaXMuZW50aXRpZXMpLmZvckVhY2goXHJcblx0XHRcdChlbnRpdHk6IFtzdHJpbmcsIFNlcnZlckVudGl0eV0pID0+IHtcclxuXHRcdFx0XHRjb25zdCB1cGRhdGVkUG9zaXRpb24gPSBwb3NpdGlvblN0YXRlc1tlbnRpdHlbMF1dO1xyXG5cdFx0XHRcdGlmICh1cGRhdGVkUG9zaXRpb24gIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0ZW50aXR5WzFdLnggPSB1cGRhdGVkUG9zaXRpb24ueDtcclxuXHRcdFx0XHRcdGVudGl0eVsxXS55ID0gdXBkYXRlZFBvc2l0aW9uLnk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRlbnRpdHlbMV0ucmVuZGVyKHRhcmdldCwgdXBzY2FsZVNpemUpO1xyXG5cdFx0XHR9LFxyXG5cdFx0KTtcclxuXHJcblx0XHQvLyBSZW5kZXIgdGhlIHBsYXllciBvbiB0b3BcclxuXHRcdGlmICh0aGlzLnBsYXllciAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMucGxheWVyLmZpbmRJbnRlcnBvbGF0ZWRDb29yZGluYXRlcygpO1xyXG5cdFx0XHR0aGlzLnBsYXllci5yZW5kZXIodGFyZ2V0LCB1cHNjYWxlU2l6ZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRsb2FkV29ybGQoKSB7XHJcblx0XHR0aGlzLnRpbGVMYXllci5ub1N0cm9rZSgpO1xyXG5cdFx0dGhpcy50aWxlTGF5ZXIuZmlsbCgyNTUsIDAsIDApO1xyXG5cdFx0Zm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmhlaWdodDsgeCsrKSB7XHJcblx0XHRcdC8veCBhbmQgeSBhcmUgc3dpdGNoZWQgZm9yIHNvbWUgc3R1cGlkIHJlYXNvblxyXG5cdFx0XHQvLyBpIHdpbGwgYmUgdGhlIHkgcG9zaXRpb24gb2YgdGlsZXMgYmVpbmcgZHJhd25cclxuXHRcdFx0Zm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLndpZHRoOyB5KyspIHtcclxuXHRcdFx0XHRjb25zdCB0aWxlVmFsID0gdGhpcy53b3JsZFRpbGVzW3ggKiB0aGlzLndpZHRoICsgeV07XHJcblxyXG5cdFx0XHRcdGlmICh0eXBlb2YgdGlsZVZhbCA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLnRpbGVFbnRpdGllcyA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ3RpbGUgZW50aXR5IGFycmF5IGlzIHVuZGVmaW5lZCcpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmICh0aGlzLnRpbGVFbnRpdGllc1t0aWxlVmFsXSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXHJcblx0XHRcdFx0XHRcdFx0J3RpbGUgZW50aXR5ICcgKyB0aWxlVmFsICsgJyBpcyB1bmRlZmluZWQnLFxyXG5cdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGNvbnN0IHRvcExlZnQgPSBNYXRoLm1pbihcclxuXHRcdFx0XHRcdFx0Li4udGhpcy50aWxlRW50aXRpZXNbdGlsZVZhbF0uY292ZXJlZFRpbGVzLFxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdGlmICh4ICogdGhpcy53aWR0aCArIHkgPT09IHRvcExlZnQpIHtcclxuXHRcdFx0XHRcdFx0Ly9yZW5kZXIgdGlsZSBlbnRpdHkgaW1hZ2VcclxuXHRcdFx0XHRcdFx0bGV0IGltZyA9XHJcblx0XHRcdFx0XHRcdFx0V29ybGRBc3NldHMudGlsZUVudGl0aWVzW1xyXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy50aWxlRW50aXRpZXNbdGlsZVZhbF0udHlwZV9cclxuXHRcdFx0XHRcdFx0XHRdW3RoaXMudGlsZUVudGl0aWVzW3RpbGVWYWxdLmFuaW1GcmFtZV07XHJcblx0XHRcdFx0XHRcdGltZy5yZW5kZXIoXHJcblx0XHRcdFx0XHRcdFx0dGhpcy50aWxlTGF5ZXIsXHJcblx0XHRcdFx0XHRcdFx0eSAqIGdhbWUuVElMRV9XSURUSCxcclxuXHRcdFx0XHRcdFx0XHR4ICogZ2FtZS5USUxFX0hFSUdIVCxcclxuXHRcdFx0XHRcdFx0XHRpbWcuaW1hZ2Uud2lkdGgsXHJcblx0XHRcdFx0XHRcdFx0aW1nLmltYWdlLmhlaWdodCxcclxuXHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coYEFscmVhZHkgcmVuZGVyZWQgJHt0aWxlVmFsfWApO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAodGlsZVZhbCAhPT0gVGlsZVR5cGUuQWlyKSB7XHJcblx0XHRcdFx0XHQvLyBEcmF3IHRoZSBjb3JyZWN0IGltYWdlIGZvciB0aGUgdGlsZXMgb250byB0aGUgdGlsZXMgbGF5ZXJcclxuXHRcdFx0XHRcdGNvbnN0IHRpbGUgPSBXb3JsZFRpbGVzW3RpbGVWYWxdO1xyXG5cclxuXHRcdFx0XHRcdGlmICh0aWxlID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0XHRcdGlmICh0aWxlLmNvbm5lY3RlZCAmJiAncmVuZGVyVGlsZScgaW4gdGlsZS50ZXh0dXJlKSB7XHJcblx0XHRcdFx0XHRcdC8vIFJlbmRlciBjb25uZWN0ZWQgdGlsZXNcclxuXHRcdFx0XHRcdFx0dGlsZS50ZXh0dXJlLnJlbmRlclRpbGUoXHJcblx0XHRcdFx0XHRcdFx0dGhpcy5maW5kVGlsZXNldEluZGV4KFxyXG5cdFx0XHRcdFx0XHRcdFx0eCxcclxuXHRcdFx0XHRcdFx0XHRcdHksXHJcblx0XHRcdFx0XHRcdFx0XHR0aWxlVmFsLFxyXG5cdFx0XHRcdFx0XHRcdFx0V29ybGRUaWxlc1t0aWxlVmFsXT8uYW55Q29ubmVjdGlvbixcclxuXHRcdFx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0XHRcdHRoaXMudGlsZUxheWVyLFxyXG5cdFx0XHRcdFx0XHRcdHkgKiBnYW1lLlRJTEVfV0lEVEgsXHJcblx0XHRcdFx0XHRcdFx0eCAqIGdhbWUuVElMRV9IRUlHSFQsXHJcblx0XHRcdFx0XHRcdFx0Z2FtZS5USUxFX1dJRFRILFxyXG5cdFx0XHRcdFx0XHRcdGdhbWUuVElMRV9IRUlHSFQsXHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQvLyBSZW5kZXIgbm9uLWNvbm5lY3RlZCB0aWxlc1xyXG5cdFx0XHRcdFx0XHR0aWxlLnRleHR1cmUucmVuZGVyKFxyXG5cdFx0XHRcdFx0XHRcdHRoaXMudGlsZUxheWVyLFxyXG5cdFx0XHRcdFx0XHRcdHkgKiBnYW1lLlRJTEVfV0lEVEgsXHJcblx0XHRcdFx0XHRcdFx0eCAqIGdhbWUuVElMRV9IRUlHSFQsXHJcblx0XHRcdFx0XHRcdFx0Z2FtZS5USUxFX1dJRFRILFxyXG5cdFx0XHRcdFx0XHRcdGdhbWUuVElMRV9IRUlHSFQsXHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRkcmF3VGlsZSh0aWxlSW5kZXg6IG51bWJlcikge1xyXG5cdFx0Y29uc3QgeCA9IHRpbGVJbmRleCAlIHRoaXMud2lkdGg7XHJcblx0XHRjb25zdCB5ID0gTWF0aC5mbG9vcih0aWxlSW5kZXggLyB0aGlzLndpZHRoKTtcclxuXHJcblx0XHRpZiAodGhpcy53b3JsZFRpbGVzW3RpbGVJbmRleF0gIT09IFRpbGVUeXBlLkFpcikge1xyXG5cdFx0XHQvLyBEcmF3IHRoZSBjb3JyZWN0IGltYWdlIGZvciB0aGUgdGlsZXMgb250byB0aGUgdGlsZXMgbGF5ZXJcclxuXHJcblx0XHRcdGNvbnN0IHRpbGVWYWwgPSB0aGlzLndvcmxkVGlsZXNbdGlsZUluZGV4XTtcclxuXHJcblx0XHRcdGlmICh0eXBlb2YgdGlsZVZhbCA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRpZiAodGhpcy50aWxlRW50aXRpZXNbdGlsZVZhbF0gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcigndGlsZSBlbnRpdHkgJyArIHRpbGVWYWwgKyAnIGlzIHVuZGVmaW5lZCcpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Y29uc3QgdG9wTGVmdCA9IE1hdGgubWluKFxyXG5cdFx0XHRcdFx0Li4udGhpcy50aWxlRW50aXRpZXNbdGlsZVZhbF0uY292ZXJlZFRpbGVzLFxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdFx0aWYgKHRpbGVJbmRleCA9PT0gdG9wTGVmdCkge1xyXG5cdFx0XHRcdFx0Ly9yZW5kZXIgdGlsZSBlbnRpdHkgaW1hZ2VcclxuXHRcdFx0XHRcdC8vdGhpcy50aWxlRW50aXRpZXNbdGlsZVZhbF0ucmVuZGVyKHRpbGVMYXllciwgeCo4LCB5KjgpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKGBBbHJlYWR5IHJlbmRlcmVkICR7dGlsZVZhbH1gKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb25zdCB0aWxlID0gV29ybGRUaWxlc1t0aWxlVmFsXTtcclxuXHJcblx0XHRcdC8vIGlmIHRoZSB0aWxlcyBpcyBvZmYtc2NyZWVuXHJcblx0XHRcdGlmICh0aWxlID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aWxlLmNvbm5lY3RlZCAmJiAncmVuZGVyVGlsZScgaW4gdGlsZS50ZXh0dXJlKSB7XHJcblx0XHRcdFx0bGV0IHRvcFRpbGVCb29sID0gZmFsc2U7XHJcblx0XHRcdFx0bGV0IGxlZnRUaWxlQm9vbCA9IGZhbHNlO1xyXG5cdFx0XHRcdGxldCBib3R0b21UaWxlQm9vbCA9IGZhbHNlO1xyXG5cdFx0XHRcdGxldCByaWdodFRpbGVCb29sID0gZmFsc2U7XHJcblx0XHRcdFx0aWYgKHRpbGUuYW55Q29ubmVjdGlvbikge1xyXG5cdFx0XHRcdFx0Ly8gdGVzdCBpZiB0aGUgbmVpZ2hib3JpbmcgdGlsZXMgYXJlIHNvbGlkXHJcblx0XHRcdFx0XHR0b3BUaWxlQm9vbCA9XHJcblx0XHRcdFx0XHRcdHggPT09IDAgfHxcclxuXHRcdFx0XHRcdFx0KHRoaXMud29ybGRUaWxlc1soeSAtIDEpICogdGhpcy53aWR0aCArIHhdICE9PVxyXG5cdFx0XHRcdFx0XHRcdFRpbGVUeXBlLkFpciAmJlxyXG5cdFx0XHRcdFx0XHRcdHR5cGVvZiB0aGlzLndvcmxkVGlsZXNbKHkgLSAxKSAqIHRoaXMud2lkdGggKyB4XSAhPT1cclxuXHRcdFx0XHRcdFx0XHRcdCdzdHJpbmcnKTtcclxuXHRcdFx0XHRcdGxlZnRUaWxlQm9vbCA9XHJcblx0XHRcdFx0XHRcdHkgPT09IDAgfHxcclxuXHRcdFx0XHRcdFx0KHRoaXMud29ybGRUaWxlc1t5ICogdGhpcy53aWR0aCArIHggLSAxXSAhPT1cclxuXHRcdFx0XHRcdFx0XHRUaWxlVHlwZS5BaXIgJiZcclxuXHRcdFx0XHRcdFx0XHR0eXBlb2YgdGhpcy53b3JsZFRpbGVzW3kgKiB0aGlzLndpZHRoICsgeCAtIDFdICE9PVxyXG5cdFx0XHRcdFx0XHRcdFx0J3N0cmluZycpO1xyXG5cdFx0XHRcdFx0Ym90dG9tVGlsZUJvb2wgPVxyXG5cdFx0XHRcdFx0XHR4ID09PSB0aGlzLmhlaWdodCAtIDEgfHxcclxuXHRcdFx0XHRcdFx0KHRoaXMud29ybGRUaWxlc1soeSArIDEpICogdGhpcy53aWR0aCArIHhdICE9PVxyXG5cdFx0XHRcdFx0XHRcdFRpbGVUeXBlLkFpciAmJlxyXG5cdFx0XHRcdFx0XHRcdHR5cGVvZiB0aGlzLndvcmxkVGlsZXNbKHkgKyAxKSAqIHRoaXMud2lkdGggKyB4XSAhPT1cclxuXHRcdFx0XHRcdFx0XHRcdCdzdHJpbmcnKTtcclxuXHRcdFx0XHRcdHJpZ2h0VGlsZUJvb2wgPVxyXG5cdFx0XHRcdFx0XHR5ID09PSB0aGlzLndpZHRoIC0gMSB8fFxyXG5cdFx0XHRcdFx0XHQodGhpcy53b3JsZFRpbGVzW3kgKiB0aGlzLndpZHRoICsgeCArIDFdICE9PVxyXG5cdFx0XHRcdFx0XHRcdFRpbGVUeXBlLkFpciAmJlxyXG5cdFx0XHRcdFx0XHRcdHR5cGVvZiB0aGlzLndvcmxkVGlsZXNbeSAqIHRoaXMud2lkdGggKyB4ICsgMV0gIT09XHJcblx0XHRcdFx0XHRcdFx0XHQnc3RyaW5nJyk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coW1wiYm9yaW5nXCIsIGxlZnRUaWxlQm9vbCwgYm90dG9tVGlsZUJvb2wsIHRoaXMud29ybGRUaWxlc1t4ICogdGhpcy53aWR0aCArIHkgKyAxXSwgdG9wVGlsZUJvb2xdKVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyB0ZXN0IGlmIHRoZSBuZWlnaGJvcmluZyB0aWxlcyBhcmUgdGhlIHNhbWUgdGlsZVxyXG5cdFx0XHRcdFx0dG9wVGlsZUJvb2wgPVxyXG5cdFx0XHRcdFx0XHR4ID09PSAwIHx8XHJcblx0XHRcdFx0XHRcdHRoaXMud29ybGRUaWxlc1soeSAtIDEpICogdGhpcy53aWR0aCArIHhdID09PSB0aWxlVmFsO1xyXG5cdFx0XHRcdFx0bGVmdFRpbGVCb29sID1cclxuXHRcdFx0XHRcdFx0eSA9PT0gMCB8fFxyXG5cdFx0XHRcdFx0XHR0aGlzLndvcmxkVGlsZXNbeSAqIHRoaXMud2lkdGggKyB4IC0gMV0gPT09IHRpbGVWYWw7XHJcblx0XHRcdFx0XHRib3R0b21UaWxlQm9vbCA9XHJcblx0XHRcdFx0XHRcdHggPT09IHRoaXMuaGVpZ2h0IC0gMSB8fFxyXG5cdFx0XHRcdFx0XHR0aGlzLndvcmxkVGlsZXNbKHkgKyAxKSAqIHRoaXMud2lkdGggKyB4XSA9PT0gdGlsZVZhbDtcclxuXHRcdFx0XHRcdHJpZ2h0VGlsZUJvb2wgPVxyXG5cdFx0XHRcdFx0XHR5ID09PSB0aGlzLndpZHRoIC0gMSB8fFxyXG5cdFx0XHRcdFx0XHR0aGlzLndvcmxkVGlsZXNbeSAqIHRoaXMud2lkdGggKyB4ICsgMV0gPT09IHRpbGVWYWw7XHJcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKFtcImZhbmN5XCIsIGxlZnRUaWxlQm9vbCwgYm90dG9tVGlsZUJvb2wsIHJpZ2h0VGlsZUJvb2wsIHRvcFRpbGVCb29sXSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy53b3JsZFRpbGVzW3RpbGVJbmRleCArIDFdICE9PSBUaWxlVHlwZS5BaXI7XHJcblxyXG5cdFx0XHRcdC8vIGNvbnZlcnQgNCBkaWdpdCBiaW5hcnkgbnVtYmVyIHRvIGJhc2UgMTBcclxuXHRcdFx0XHRjb25zdCB0aWxlU2V0SW5kZXggPVxyXG5cdFx0XHRcdFx0OCAqICt0b3BUaWxlQm9vbCArXHJcblx0XHRcdFx0XHQ0ICogK3JpZ2h0VGlsZUJvb2wgK1xyXG5cdFx0XHRcdFx0MiAqICtib3R0b21UaWxlQm9vbCArXHJcblx0XHRcdFx0XHQrbGVmdFRpbGVCb29sO1xyXG5cclxuXHRcdFx0XHQvLyBSZW5kZXIgY29ubmVjdGVkIHRpbGVzXHJcblx0XHRcdFx0dGlsZS50ZXh0dXJlLnJlbmRlclRpbGUoXHJcblx0XHRcdFx0XHR0aWxlU2V0SW5kZXgsXHJcblx0XHRcdFx0XHR0aGlzLnRpbGVMYXllcixcclxuXHRcdFx0XHRcdHggKiBnYW1lLlRJTEVfV0lEVEgsXHJcblx0XHRcdFx0XHR5ICogZ2FtZS5USUxFX0hFSUdIVCxcclxuXHRcdFx0XHRcdGdhbWUuVElMRV9XSURUSCxcclxuXHRcdFx0XHRcdGdhbWUuVElMRV9IRUlHSFQsXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fSBlbHNlIGlmICghdGlsZS5jb25uZWN0ZWQpIHtcclxuXHRcdFx0XHQvLyBSZW5kZXIgbm9uLWNvbm5lY3RlZCB0aWxlc1xyXG5cdFx0XHRcdHRpbGUudGV4dHVyZS5yZW5kZXIoXHJcblx0XHRcdFx0XHR0aGlzLnRpbGVMYXllcixcclxuXHRcdFx0XHRcdHggKiBnYW1lLlRJTEVfV0lEVEgsXHJcblx0XHRcdFx0XHR5ICogZ2FtZS5USUxFX0hFSUdIVCxcclxuXHRcdFx0XHRcdGdhbWUuVElMRV9XSURUSCxcclxuXHRcdFx0XHRcdGdhbWUuVElMRV9IRUlHSFQsXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZmluZFRpbGVzZXRJbmRleChcclxuXHRcdHg6IG51bWJlcixcclxuXHRcdHk6IG51bWJlcixcclxuXHRcdHRpbGVWYWw6IFRpbGVUeXBlLFxyXG5cdFx0YW55Q29ubmVjdGlvbj86IGJvb2xlYW4sXHJcblx0KSB7XHJcblx0XHRsZXQgdG9wVGlsZUJvb2wgPSBmYWxzZTtcclxuXHRcdGxldCBsZWZ0VGlsZUJvb2wgPSBmYWxzZTtcclxuXHRcdGxldCBib3R0b21UaWxlQm9vbCA9IGZhbHNlO1xyXG5cdFx0bGV0IHJpZ2h0VGlsZUJvb2wgPSBmYWxzZTtcclxuXHRcdGlmIChhbnlDb25uZWN0aW9uKSB7XHJcblx0XHRcdC8vIHRlc3QgaWYgdGhlIG5laWdoYm9yaW5nIHRpbGVzIGFyZSBzb2xpZFxyXG5cdFx0XHR0b3BUaWxlQm9vbCA9XHJcblx0XHRcdFx0eCA9PT0gMCB8fFxyXG5cdFx0XHRcdCh0aGlzLndvcmxkVGlsZXNbKHggLSAxKSAqIHRoaXMud2lkdGggKyB5XSAhPT0gVGlsZVR5cGUuQWlyICYmLy94IGFuZCB5IGFwcGVhciB0byBiZSBzd2l0Y2hlZFxyXG5cdFx0XHRcdFx0dHlwZW9mIHRoaXMud29ybGRUaWxlc1soeCAtIDEpICogdGhpcy53aWR0aCArIHldID09XHJcblx0XHRcdFx0XHRcdCdudW1iZXInKTtcclxuXHRcdFx0bGVmdFRpbGVCb29sID1cclxuXHRcdFx0XHR5ID09PSAwIHx8XHJcblx0XHRcdFx0KHRoaXMud29ybGRUaWxlc1t4ICogdGhpcy53aWR0aCArIHkgLSAxXSAhPT0gVGlsZVR5cGUuQWlyICYmXHJcblx0XHRcdFx0XHR0eXBlb2YgdGhpcy53b3JsZFRpbGVzW3ggKiB0aGlzLndpZHRoICsgeSAtIDFdID09XHJcblx0XHRcdFx0XHRcdCdudW1iZXInKTtcclxuXHRcdFx0Ym90dG9tVGlsZUJvb2wgPVxyXG5cdFx0XHRcdHggPT09IHRoaXMuaGVpZ2h0IC0gMSB8fFxyXG5cdFx0XHRcdCh0aGlzLndvcmxkVGlsZXNbKHggKyAxKSAqIHRoaXMud2lkdGggKyB5XSAhPT0gVGlsZVR5cGUuQWlyICYmXHJcblx0XHRcdFx0XHR0eXBlb2YgdGhpcy53b3JsZFRpbGVzWyh4ICsgMSkgKiB0aGlzLndpZHRoICsgeV0gPT1cclxuXHRcdFx0XHRcdFx0J251bWJlcicpO1xyXG5cdFx0XHRyaWdodFRpbGVCb29sID1cclxuXHRcdFx0XHR5ID09PSB0aGlzLndpZHRoIC0gMSB8fFxyXG5cdFx0XHRcdCh0aGlzLndvcmxkVGlsZXNbeCAqIHRoaXMud2lkdGggKyB5ICsgMV0gIT09IFRpbGVUeXBlLkFpciAmJlxyXG5cdFx0XHRcdFx0dHlwZW9mIHRoaXMud29ybGRUaWxlc1t4ICogdGhpcy53aWR0aCArIHkgKyAxXSA9PVxyXG5cdFx0XHRcdFx0XHQnbnVtYmVyJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyB0ZXN0IGlmIHRoZSBuZWlnaGJvcmluZyB0aWxlcyBhcmUgdGhlIHNhbWUgdGlsZVxyXG5cdFx0XHR0b3BUaWxlQm9vbCA9XHJcblx0XHRcdFx0eCA9PT0gMCB8fFxyXG5cdFx0XHRcdHRoaXMud29ybGRUaWxlc1soeCAtIDEpICogdGhpcy53aWR0aCArIHldID09PSB0aWxlVmFsO1xyXG5cdFx0XHRsZWZ0VGlsZUJvb2wgPVxyXG5cdFx0XHRcdHkgPT09IDAgfHwgdGhpcy53b3JsZFRpbGVzW3ggKiB0aGlzLndpZHRoICsgeSAtIDFdID09PSB0aWxlVmFsO1xyXG5cdFx0XHRib3R0b21UaWxlQm9vbCA9XHJcblx0XHRcdFx0eCA9PT0gdGhpcy5oZWlnaHQgLSAxIHx8XHJcblx0XHRcdFx0dGhpcy53b3JsZFRpbGVzWyh4ICsgMSkgKiB0aGlzLndpZHRoICsgeV0gPT09IHRpbGVWYWw7XHJcblx0XHRcdHJpZ2h0VGlsZUJvb2wgPVxyXG5cdFx0XHRcdHkgPT09IHRoaXMud2lkdGggLSAxIHx8XHJcblx0XHRcdFx0dGhpcy53b3JsZFRpbGVzW3ggKiB0aGlzLndpZHRoICsgeSArIDFdID09PSB0aWxlVmFsO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGNvbnZlcnQgNCBkaWdpdCBiaW5hcnkgbnVtYmVyIHRvIGJhc2UgMTBcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDggKiArdG9wVGlsZUJvb2wgK1xyXG5cdFx0XHQ0ICogK3JpZ2h0VGlsZUJvb2wgK1xyXG5cdFx0XHQyICogK2JvdHRvbVRpbGVCb29sICtcclxuXHRcdFx0K2xlZnRUaWxlQm9vbFxyXG5cdFx0KTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW1hZ2VSZXNvdXJjZSB9IGZyb20gJy4uL2Fzc2V0cy9yZXNvdXJjZXMvSW1hZ2VSZXNvdXJjZSc7XHJcbmltcG9ydCB7IFdvcmxkQXNzZXRzIH0gZnJvbSAnLi4vYXNzZXRzL0Fzc2V0cyc7XHJcbmltcG9ydCB7IFRpbGVSZXNvdXJjZSB9IGZyb20gJy4uL2Fzc2V0cy9yZXNvdXJjZXMvVGlsZVJlc291cmNlJztcclxuaW1wb3J0IHsgVGlsZVR5cGUgfSBmcm9tICcuLi8uLi9nbG9iYWwvVGlsZSc7XHJcbmltcG9ydCB7IFRpbGVFbnRpdGllcyB9IGZyb20gJy4uLy4uL2dsb2JhbC9UaWxlRW50aXR5JztcclxuaW1wb3J0IHsgSXRlbVR5cGUgfSBmcm9tICcuLi8uLi9nbG9iYWwvSW52ZW50b3J5JztcclxuXHJcbmV4cG9ydCB0eXBlIFRpbGUgPSB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICB0ZXh0dXJlOiBJbWFnZVJlc291cmNlIHwgVGlsZVJlc291cmNlO1xyXG4gICAgY29ubmVjdGVkPzogYm9vbGVhbjtcclxuICAgIGFueUNvbm5lY3Rpb24/OiBib29sZWFuO1xyXG4gICAgY29sb3I6IHN0cmluZztcclxuICAgIGZyaWN0aW9uOiBudW1iZXI7XHJcbiAgICByZWZsZWN0aXZpdHk6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgVGlsZUVudGl0eVJlbmRlckRhdGEgPSB7XHJcbiAgICB0ZXh0dXJlOiBJbWFnZVJlc291cmNlIHwgVGlsZVJlc291cmNlO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgV29ybGRUaWxlczogUmVjb3JkPFRpbGVUeXBlLCBUaWxlIHwgdW5kZWZpbmVkPiA9IHtcclxuICAgIFtUaWxlVHlwZS5BaXJdOiB1bmRlZmluZWQsXHJcbiAgICBbVGlsZVR5cGUuU25vd106IHtcclxuICAgICAgICBuYW1lOiAnc25vdycsXHJcbiAgICAgICAgdGV4dHVyZTogV29ybGRBc3NldHMubWlkZGxlZ3JvdW5kLnRpbGVzZXRfc25vdyxcclxuICAgICAgICBjb25uZWN0ZWQ6IHRydWUsXHJcbiAgICAgICAgYW55Q29ubmVjdGlvbjogdHJ1ZSxcclxuICAgICAgICBjb2xvcjogXCIjY2FmYWZjXCIsXHJcbiAgICAgICAgZnJpY3Rpb246IDIsXHJcbiAgICAgICAgcmVmbGVjdGl2aXR5OiA1MC8vdGhpcyByZWZsZWN0aXZpdHkgYWN0dWFsbHkgZG9lcyBub3RoaW5nIGFuZCBpbnN0ZWFkIHJlZmxlY3Rpdml0eSBjYW4gYmUgY2hhbmdlZCBpbnNpZGUgUmVmbGVjdGVkSW1hZ2VSZXNvdXJjZS50c1xyXG4gICAgfSxcclxuICAgIFtUaWxlVHlwZS5JY2VdOiB7XHJcbiAgICAgICAgbmFtZTogJ2ljZScsXHJcbiAgICAgICAgdGV4dHVyZTogV29ybGRBc3NldHMubWlkZGxlZ3JvdW5kLnRpbGVzZXRfaWNlLFxyXG4gICAgICAgIGNvbm5lY3RlZDogdHJ1ZSxcclxuICAgICAgICBhbnlDb25uZWN0aW9uOiB0cnVlLFxyXG4gICAgICAgIGNvbG9yOiBcIiM3NmFkYzRcIixcclxuICAgICAgICBmcmljdGlvbjogMS41LFxyXG4gICAgICAgIHJlZmxlY3Rpdml0eTogMTUwXHJcbiAgICB9LFxyXG4gICAgW1RpbGVUeXBlLkRpcnRdOiB7XHJcbiAgICAgICAgbmFtZTogJ2RpcnQnLFxyXG4gICAgICAgIHRleHR1cmU6IFdvcmxkQXNzZXRzLm1pZGRsZWdyb3VuZC50aWxlc2V0X2RpcnQsXHJcbiAgICAgICAgY29ubmVjdGVkOiB0cnVlLFxyXG4gICAgICAgIGFueUNvbm5lY3Rpb246IHRydWUsXHJcbiAgICAgICAgY29sb3I6IFwiIzRhMmUxZVwiLFxyXG4gICAgICAgIGZyaWN0aW9uOiA0LFxyXG4gICAgICAgIHJlZmxlY3Rpdml0eTogMFxyXG4gICAgfSxcclxuICAgIFtUaWxlVHlwZS5TdG9uZTBdOiB7XHJcbiAgICAgICAgbmFtZTogJ3JhdyBzdG9uZScsXHJcbiAgICAgICAgdGV4dHVyZTogV29ybGRBc3NldHMubWlkZGxlZ3JvdW5kLnRpbGVzZXRfc3RvbmUwLFxyXG4gICAgICAgIGNvbm5lY3RlZDogdHJ1ZSxcclxuICAgICAgICBhbnlDb25uZWN0aW9uOiB0cnVlLFxyXG4gICAgICAgIGNvbG9yOiBcIiM0MTQyNDVcIixcclxuICAgICAgICBmcmljdGlvbjogMyxcclxuICAgICAgICByZWZsZWN0aXZpdHk6IDEwXHJcbiAgICB9LFxyXG4gICAgW1RpbGVUeXBlLlN0b25lMV06IHtcclxuICAgICAgICBuYW1lOiAnc3RvbmUgdGllciAxJyxcclxuICAgICAgICB0ZXh0dXJlOiBXb3JsZEFzc2V0cy5taWRkbGVncm91bmQudGlsZXNldF9zdG9uZTEsXHJcbiAgICAgICAgY29ubmVjdGVkOiB0cnVlLFxyXG4gICAgICAgIGFueUNvbm5lY3Rpb246IHRydWUsXHJcbiAgICAgICAgY29sb3I6IFwiIzMxMzIzYlwiLFxyXG4gICAgICAgIGZyaWN0aW9uOiAzLFxyXG4gICAgICAgIHJlZmxlY3Rpdml0eTogMTVcclxuICAgIH0sXHJcbiAgICBbVGlsZVR5cGUuU3RvbmUyXToge1xyXG4gICAgICAgIG5hbWU6ICdzdG9uZSB0aWVyIDInLFxyXG4gICAgICAgIHRleHR1cmU6IFdvcmxkQXNzZXRzLm1pZGRsZWdyb3VuZC50aWxlc2V0X3N0b25lMixcclxuICAgICAgICBjb25uZWN0ZWQ6IHRydWUsXHJcbiAgICAgICAgYW55Q29ubmVjdGlvbjogdHJ1ZSxcclxuICAgICAgICBjb2xvcjogXCIjMzEzMjNiXCIsLy9UT0RPIGNoYW5nZSB0aGVzZSBjb2xvcnMgdG8gYmUgbW9yZSBhY2N1cmF0ZVxyXG4gICAgICAgIGZyaWN0aW9uOiAzLFxyXG4gICAgICAgIHJlZmxlY3Rpdml0eTogMTdcclxuICAgIH0sXHJcbiAgICBbVGlsZVR5cGUuU3RvbmUzXToge1xyXG4gICAgICAgIG5hbWU6ICdzdG9uZSB0aWVyIDMnLFxyXG4gICAgICAgIHRleHR1cmU6IFdvcmxkQXNzZXRzLm1pZGRsZWdyb3VuZC50aWxlc2V0X3N0b25lMyxcclxuICAgICAgICBjb25uZWN0ZWQ6IHRydWUsXHJcbiAgICAgICAgYW55Q29ubmVjdGlvbjogdHJ1ZSxcclxuICAgICAgICBjb2xvcjogXCIjMzEzMjNiXCIsXHJcbiAgICAgICAgZnJpY3Rpb246IDMsXHJcbiAgICAgICAgcmVmbGVjdGl2aXR5OiAxOVxyXG4gICAgfSxcclxuICAgIFtUaWxlVHlwZS5TdG9uZTRdOiB7XHJcbiAgICAgICAgbmFtZTogJ3N0b25lIHRpZXIgNCcsXHJcbiAgICAgICAgdGV4dHVyZTogV29ybGRBc3NldHMubWlkZGxlZ3JvdW5kLnRpbGVzZXRfc3RvbmU0LFxyXG4gICAgICAgIGNvbm5lY3RlZDogdHJ1ZSxcclxuICAgICAgICBhbnlDb25uZWN0aW9uOiB0cnVlLFxyXG4gICAgICAgIGNvbG9yOiBcIiMzMTMyM2JcIixcclxuICAgICAgICBmcmljdGlvbjogMyxcclxuICAgICAgICByZWZsZWN0aXZpdHk6IDIxXHJcbiAgICB9LFxyXG4gICAgW1RpbGVUeXBlLlN0b25lNV06IHtcclxuICAgICAgICBuYW1lOiAnc3RvbmUgdGllciA1JyxcclxuICAgICAgICB0ZXh0dXJlOiBXb3JsZEFzc2V0cy5taWRkbGVncm91bmQudGlsZXNldF9zdG9uZTUsXHJcbiAgICAgICAgY29ubmVjdGVkOiB0cnVlLFxyXG4gICAgICAgIGFueUNvbm5lY3Rpb246IHRydWUsXHJcbiAgICAgICAgY29sb3I6IFwiIzMxMzIzYlwiLFxyXG4gICAgICAgIGZyaWN0aW9uOiAzLFxyXG4gICAgICAgIHJlZmxlY3Rpdml0eTogMjNcclxuICAgIH0sXHJcbiAgICBbVGlsZVR5cGUuU3RvbmU2XToge1xyXG4gICAgICAgIG5hbWU6ICdzdG9uZSB0aWVyIDYnLFxyXG4gICAgICAgIHRleHR1cmU6IFdvcmxkQXNzZXRzLm1pZGRsZWdyb3VuZC50aWxlc2V0X3N0b25lNixcclxuICAgICAgICBjb25uZWN0ZWQ6IHRydWUsXHJcbiAgICAgICAgYW55Q29ubmVjdGlvbjogdHJ1ZSxcclxuICAgICAgICBjb2xvcjogXCIjMzEzMjNiXCIsXHJcbiAgICAgICAgZnJpY3Rpb246IDMsXHJcbiAgICAgICAgcmVmbGVjdGl2aXR5OiAyNVxyXG4gICAgfSxcclxuICAgIFtUaWxlVHlwZS5TdG9uZTddOiB7XHJcbiAgICAgICAgbmFtZTogJ3N0b25lIHRpZXIgNycsXHJcbiAgICAgICAgdGV4dHVyZTogV29ybGRBc3NldHMubWlkZGxlZ3JvdW5kLnRpbGVzZXRfc3RvbmU3LFxyXG4gICAgICAgIGNvbm5lY3RlZDogdHJ1ZSxcclxuICAgICAgICBhbnlDb25uZWN0aW9uOiB0cnVlLFxyXG4gICAgICAgIGNvbG9yOiBcIiMzMTMyM2JcIixcclxuICAgICAgICBmcmljdGlvbjogMyxcclxuICAgICAgICByZWZsZWN0aXZpdHk6IDI3XHJcbiAgICB9LFxyXG4gICAgW1RpbGVUeXBlLlN0b25lOF06IHtcclxuICAgICAgICBuYW1lOiAnc3RvbmUgdGllciA4JyxcclxuICAgICAgICB0ZXh0dXJlOiBXb3JsZEFzc2V0cy5taWRkbGVncm91bmQudGlsZXNldF9zdG9uZTgsXHJcbiAgICAgICAgY29ubmVjdGVkOiB0cnVlLFxyXG4gICAgICAgIGFueUNvbm5lY3Rpb246IHRydWUsXHJcbiAgICAgICAgY29sb3I6IFwiIzMxMzIzYlwiLFxyXG4gICAgICAgIGZyaWN0aW9uOiAzLFxyXG4gICAgICAgIHJlZmxlY3Rpdml0eTogMjlcclxuICAgIH0sXHJcbiAgICBbVGlsZVR5cGUuU3RvbmU5XToge1xyXG4gICAgICAgIG5hbWU6ICdzdG9uZSB0aWVyIDknLFxyXG4gICAgICAgIHRleHR1cmU6IFdvcmxkQXNzZXRzLm1pZGRsZWdyb3VuZC50aWxlc2V0X3N0b25lOSxcclxuICAgICAgICBjb25uZWN0ZWQ6IHRydWUsXHJcbiAgICAgICAgYW55Q29ubmVjdGlvbjogdHJ1ZSxcclxuICAgICAgICBjb2xvcjogXCIjMzEzMjNiXCIsXHJcbiAgICAgICAgZnJpY3Rpb246IDMsXHJcbiAgICAgICAgcmVmbGVjdGl2aXR5OiAzMVxyXG4gICAgfSxcclxuICAgIFtUaWxlVHlwZS5UaW5dOiB7XHJcbiAgICAgICAgbmFtZTogJ3RpbiBvcmUnLFxyXG4gICAgICAgIHRleHR1cmU6IFdvcmxkQXNzZXRzLm1pZGRsZWdyb3VuZC50aWxlc2V0X3RpbixcclxuICAgICAgICBjb25uZWN0ZWQ6IHRydWUsXHJcbiAgICAgICAgYW55Q29ubmVjdGlvbjogZmFsc2UsXHJcbiAgICAgICAgY29sb3I6IFwiIzMxMzIzYlwiLFxyXG4gICAgICAgIGZyaWN0aW9uOiAzLFxyXG4gICAgICAgIHJlZmxlY3Rpdml0eTogMTBcclxuICAgIH0sXHJcbiAgICBbVGlsZVR5cGUuQWx1bWludW1dOiB7XHJcbiAgICAgICAgbmFtZTogJ2FsdW1pbnVtIG9yZScsXHJcbiAgICAgICAgdGV4dHVyZTogV29ybGRBc3NldHMubWlkZGxlZ3JvdW5kLnRpbGVzZXRfYWx1bWludW0sXHJcbiAgICAgICAgY29ubmVjdGVkOiB0cnVlLFxyXG4gICAgICAgIGFueUNvbm5lY3Rpb246IGZhbHNlLFxyXG4gICAgICAgIGNvbG9yOiBcIiMzMTMyM2JcIixcclxuICAgICAgICBmcmljdGlvbjogMyxcclxuICAgICAgICByZWZsZWN0aXZpdHk6IDE3XHJcbiAgICB9LFxyXG4gICAgW1RpbGVUeXBlLkdvbGRdOiB7XHJcbiAgICAgICAgbmFtZTogJ2dvbGQgb3JlJyxcclxuICAgICAgICB0ZXh0dXJlOiBXb3JsZEFzc2V0cy5taWRkbGVncm91bmQudGlsZXNldF9nb2xkLFxyXG4gICAgICAgIGNvbm5lY3RlZDogdHJ1ZSxcclxuICAgICAgICBhbnlDb25uZWN0aW9uOiBmYWxzZSxcclxuICAgICAgICBjb2xvcjogXCIjMzEzMjNiXCIsXHJcbiAgICAgICAgZnJpY3Rpb246IDMsXHJcbiAgICAgICAgcmVmbGVjdGl2aXR5OiAyMVxyXG4gICAgfSxcclxuICAgIFtUaWxlVHlwZS5UaXRhbml1bV06IHtcclxuICAgICAgICBuYW1lOiAndGl0YW5pdW0gb3JlJyxcclxuICAgICAgICB0ZXh0dXJlOiBXb3JsZEFzc2V0cy5taWRkbGVncm91bmQudGlsZXNldF90aXRhbml1bSxcclxuICAgICAgICBjb25uZWN0ZWQ6IHRydWUsXHJcbiAgICAgICAgYW55Q29ubmVjdGlvbjogZmFsc2UsXHJcbiAgICAgICAgY29sb3I6IFwiIzMxMzIzYlwiLFxyXG4gICAgICAgIGZyaWN0aW9uOiAzLFxyXG4gICAgICAgIHJlZmxlY3Rpdml0eTogMjVcclxuICAgIH0sXHJcbiAgICBbVGlsZVR5cGUuR3JhcGVdOiB7XHJcbiAgICAgICAgbmFtZTogJ2dyYXBlIG9yZScsXHJcbiAgICAgICAgdGV4dHVyZTogV29ybGRBc3NldHMubWlkZGxlZ3JvdW5kLnRpbGVzZXRfZ3JhcGUsXHJcbiAgICAgICAgY29ubmVjdGVkOiB0cnVlLFxyXG4gICAgICAgIGFueUNvbm5lY3Rpb246IGZhbHNlLFxyXG4gICAgICAgIGNvbG9yOiBcIiMzMTMyM2JcIixcclxuICAgICAgICBmcmljdGlvbjogMyxcclxuICAgICAgICByZWZsZWN0aXZpdHk6IDI5XHJcbiAgICB9LFxyXG4gICAgW1RpbGVUeXBlLldvb2QwXToge1xyXG4gICAgICAgIG5hbWU6ICdyYXcgd29vZCcsXHJcbiAgICAgICAgdGV4dHVyZTogV29ybGRBc3NldHMubWlkZGxlZ3JvdW5kLnRpbGVzZXRfd29vZDAsXHJcbiAgICAgICAgY29ubmVjdGVkOiBmYWxzZSxcclxuICAgICAgICBhbnlDb25uZWN0aW9uOiB0cnVlLFxyXG4gICAgICAgIGNvbG9yOiBcIiNhNzcxNDVcIixcclxuICAgICAgICBmcmljdGlvbjogMyxcclxuICAgICAgICByZWZsZWN0aXZpdHk6IDVcclxuICAgIH0sXHJcbiAgICBbVGlsZVR5cGUuV29vZDFdOiB7XHJcbiAgICAgICAgbmFtZTogJ3dvb2QgdGllciAxJyxcclxuICAgICAgICB0ZXh0dXJlOiBXb3JsZEFzc2V0cy5taWRkbGVncm91bmQudGlsZXNldF93b29kMSxcclxuICAgICAgICBjb25uZWN0ZWQ6IHRydWUsXHJcbiAgICAgICAgYW55Q29ubmVjdGlvbjogdHJ1ZSxcclxuICAgICAgICBjb2xvcjogXCIjYTc3MTQ1XCIsXHJcbiAgICAgICAgZnJpY3Rpb246IDMsXHJcbiAgICAgICAgcmVmbGVjdGl2aXR5OiA1XHJcbiAgICB9LFxyXG4gICAgW1RpbGVUeXBlLldvb2QyXToge1xyXG4gICAgICAgIG5hbWU6ICd3b29kIHRpZXIgMicsXHJcbiAgICAgICAgdGV4dHVyZTogV29ybGRBc3NldHMubWlkZGxlZ3JvdW5kLnRpbGVzZXRfd29vZDIsXHJcbiAgICAgICAgY29ubmVjdGVkOiB0cnVlLFxyXG4gICAgICAgIGFueUNvbm5lY3Rpb246IHRydWUsXHJcbiAgICAgICAgY29sb3I6IFwiI2E3NzE0NVwiLFxyXG4gICAgICAgIGZyaWN0aW9uOiAzLFxyXG4gICAgICAgIHJlZmxlY3Rpdml0eTogNVxyXG4gICAgfSxcclxuICAgIFtUaWxlVHlwZS5Xb29kM106IHtcclxuICAgICAgICBuYW1lOiAnd29vZCB0aWVyIDMnLFxyXG4gICAgICAgIHRleHR1cmU6IFdvcmxkQXNzZXRzLm1pZGRsZWdyb3VuZC50aWxlc2V0X3dvb2QzLFxyXG4gICAgICAgIGNvbm5lY3RlZDogdHJ1ZSxcclxuICAgICAgICBhbnlDb25uZWN0aW9uOiB0cnVlLFxyXG4gICAgICAgIGNvbG9yOiBcIiNhNzcxNDVcIixcclxuICAgICAgICBmcmljdGlvbjogMyxcclxuICAgICAgICByZWZsZWN0aXZpdHk6IDVcclxuICAgIH0sXHJcbiAgICBbVGlsZVR5cGUuV29vZDRdOiB7XHJcbiAgICAgICAgbmFtZTogJ3dvb2QgdGllciA0JyxcclxuICAgICAgICB0ZXh0dXJlOiBXb3JsZEFzc2V0cy5taWRkbGVncm91bmQudGlsZXNldF93b29kNCxcclxuICAgICAgICBjb25uZWN0ZWQ6IHRydWUsXHJcbiAgICAgICAgYW55Q29ubmVjdGlvbjogdHJ1ZSxcclxuICAgICAgICBjb2xvcjogXCIjYTc3MTQ1XCIsXHJcbiAgICAgICAgZnJpY3Rpb246IDMsXHJcbiAgICAgICAgcmVmbGVjdGl2aXR5OiA1XHJcbiAgICB9LFxyXG4gICAgW1RpbGVUeXBlLldvb2Q1XToge1xyXG4gICAgICAgIG5hbWU6ICd3b29kIHRpZXIgNScsXHJcbiAgICAgICAgdGV4dHVyZTogV29ybGRBc3NldHMubWlkZGxlZ3JvdW5kLnRpbGVzZXRfd29vZDUsXHJcbiAgICAgICAgY29ubmVjdGVkOiB0cnVlLFxyXG4gICAgICAgIGFueUNvbm5lY3Rpb246IHRydWUsXHJcbiAgICAgICAgY29sb3I6IFwiI2E3NzE0NVwiLFxyXG4gICAgICAgIGZyaWN0aW9uOiAzLFxyXG4gICAgICAgIHJlZmxlY3Rpdml0eTogNVxyXG4gICAgfSxcclxuICAgIFtUaWxlVHlwZS5Xb29kNl06IHtcclxuICAgICAgICBuYW1lOiAnd29vZCB0aWVyIDYnLFxyXG4gICAgICAgIHRleHR1cmU6IFdvcmxkQXNzZXRzLm1pZGRsZWdyb3VuZC50aWxlc2V0X3dvb2Q2LFxyXG4gICAgICAgIGNvbm5lY3RlZDogdHJ1ZSxcclxuICAgICAgICBhbnlDb25uZWN0aW9uOiB0cnVlLFxyXG4gICAgICAgIGNvbG9yOiBcIiNhNzcxNDVcIixcclxuICAgICAgICBmcmljdGlvbjogMyxcclxuICAgICAgICByZWZsZWN0aXZpdHk6IDVcclxuICAgIH0sXHJcbiAgICBbVGlsZVR5cGUuV29vZDddOiB7XHJcbiAgICAgICAgbmFtZTogJ3dvb2QgdGllciA3JyxcclxuICAgICAgICB0ZXh0dXJlOiBXb3JsZEFzc2V0cy5taWRkbGVncm91bmQudGlsZXNldF93b29kNyxcclxuICAgICAgICBjb25uZWN0ZWQ6IHRydWUsXHJcbiAgICAgICAgYW55Q29ubmVjdGlvbjogdHJ1ZSxcclxuICAgICAgICBjb2xvcjogXCIjYTc3MTQ1XCIsXHJcbiAgICAgICAgZnJpY3Rpb246IDMsXHJcbiAgICAgICAgcmVmbGVjdGl2aXR5OiA1XHJcbiAgICB9LFxyXG4gICAgW1RpbGVUeXBlLldvb2Q4XToge1xyXG4gICAgICAgIG5hbWU6ICd3b29kIHRpZXIgOCcsXHJcbiAgICAgICAgdGV4dHVyZTogV29ybGRBc3NldHMubWlkZGxlZ3JvdW5kLnRpbGVzZXRfd29vZDgsXHJcbiAgICAgICAgY29ubmVjdGVkOiB0cnVlLFxyXG4gICAgICAgIGFueUNvbm5lY3Rpb246IHRydWUsXHJcbiAgICAgICAgY29sb3I6IFwiI2E3NzE0NVwiLFxyXG4gICAgICAgIGZyaWN0aW9uOiAzLFxyXG4gICAgICAgIHJlZmxlY3Rpdml0eTogNVxyXG4gICAgfSxcclxuICAgIFtUaWxlVHlwZS5Xb29kOV06IHtcclxuICAgICAgICBuYW1lOiAnd29vZCB0aWVyIDknLFxyXG4gICAgICAgIHRleHR1cmU6IFdvcmxkQXNzZXRzLm1pZGRsZWdyb3VuZC50aWxlc2V0X3dvb2Q5LFxyXG4gICAgICAgIGNvbm5lY3RlZDogdHJ1ZSxcclxuICAgICAgICBhbnlDb25uZWN0aW9uOiB0cnVlLFxyXG4gICAgICAgIGNvbG9yOiBcIiNhNzcxNDVcIixcclxuICAgICAgICBmcmljdGlvbjogMyxcclxuICAgICAgICByZWZsZWN0aXZpdHk6IDVcclxuICAgIH0sXHJcbn07XHJcblxyXG4vLyBleHBvcnQgY29uc3QgVGlsZUVudGl0aWVzUmVuZGVyRGF0YTogUmVjb3JkPFRpbGVFbnRpdGllcywgVGlsZUVudGl0eVJlbmRlckRhdGE+ID0ge1xyXG4gICAgLy8gW1RpbGVFbnRpdGllcy5UaWVyMURyaWxsXToge1xyXG4gICAgICAgIC8vIHRleHR1cmU6IHVuZGVmaW5lZFxyXG4gICAgLy8gfSxcclxuICAgIC8vIFtUaWxlRW50aXRpZXMuVGllcjJEcmlsbF06IHtcclxuICAgICAgICAvLyB0ZXh0dXJlOiB1bmRlZmluZWRcclxuICAgIC8vIH1cclxuLy8gfSIsImltcG9ydCB7IEVudGl0aWVzIH0gZnJvbSAnLi4vLi4vLi4vZ2xvYmFsL0VudGl0eSc7XHJcbmltcG9ydCB7IFBsYXllckVudGl0eSB9IGZyb20gJy4vUGxheWVyRW50aXR5JztcclxuaW1wb3J0IHsgSXRlbUVudGl0eSB9IGZyb20gJy4vSXRlbUVudGl0eSc7XHJcblxyXG5leHBvcnQgY29uc3QgRW50aXR5Q2xhc3NlczogUmVjb3JkPEVudGl0aWVzLCBhbnk+ID0ge1xyXG4gICAgW0VudGl0aWVzLkxvY2FsUGxheWVyXTogdW5kZWZpbmVkLFxyXG4gICAgW0VudGl0aWVzLlBsYXllcl06IFBsYXllckVudGl0eSxcclxuICAgIFtFbnRpdGllcy5JdGVtXTogSXRlbUVudGl0eSxcclxufTtcclxuIiwiaW1wb3J0IHA1IGZyb20gJ3A1JztcclxuaW1wb3J0IHsgU2VydmVyRW50aXR5IH0gZnJvbSAnLi9TZXJ2ZXJFbnRpdHknO1xyXG5pbXBvcnQgeyBFbnRpdGllcywgRW50aXR5UGF5bG9hZCB9IGZyb20gJy4uLy4uLy4uL2dsb2JhbC9FbnRpdHknO1xyXG5pbXBvcnQgeyBJdGVtcywgSXRlbVR5cGUgfSBmcm9tICcuLi8uLi8uLi9nbG9iYWwvSW52ZW50b3J5JztcclxuaW1wb3J0IHsgSXRlbUFzc2V0cyB9IGZyb20gJy4uLy4uL2Fzc2V0cy9Bc3NldHMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEl0ZW1FbnRpdHkgZXh0ZW5kcyBTZXJ2ZXJFbnRpdHkge1xyXG4gICAgaXRlbTogSXRlbVR5cGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGF5bG9hZDogRW50aXR5UGF5bG9hZDxFbnRpdGllcy5JdGVtPikge1xyXG4gICAgICAgIHN1cGVyKHBheWxvYWQuaWQpO1xyXG5cclxuICAgICAgICB0aGlzLml0ZW0gPSBwYXlsb2FkLmRhdGEuaXRlbTtcclxuICAgICAgICB0aGlzLnggPSBwYXlsb2FkLmRhdGEueDtcclxuICAgICAgICB0aGlzLnkgPSBwYXlsb2FkLmRhdGEueTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIodGFyZ2V0OiBwNSwgdXBzY2FsZVNpemU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGFzc2V0ID0gSXRlbUFzc2V0c1t0aGlzLml0ZW1dO1xyXG4gICAgICAgIGlmIChhc3NldCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGFzc2V0LnJlbmRlcih0YXJnZXQsIHRoaXMueCwgdGhpcy55LCA4LCA4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRGF0YShkYXRhOiBFbnRpdHlQYXlsb2FkPEVudGl0aWVzLkl0ZW0+KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pdGVtID0gZGF0YS5kYXRhLml0ZW07XHJcbiAgICAgICAgdGhpcy54ID0gZGF0YS5kYXRhLng7XHJcbiAgICAgICAgdGhpcy55ID0gZGF0YS5kYXRhLnk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHA1IGZyb20gJ3A1JztcclxuaW1wb3J0IHsgU2VydmVyRW50aXR5IH0gZnJvbSAnLi9TZXJ2ZXJFbnRpdHknO1xyXG5pbXBvcnQgeyBFbnRpdGllcywgRW50aXR5UGF5bG9hZCB9IGZyb20gJy4uLy4uLy4uL2dsb2JhbC9FbnRpdHknO1xyXG5pbXBvcnQgeyBnYW1lIH0gZnJvbSAnLi4vLi4vR2FtZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgUGxheWVyRW50aXR5IGV4dGVuZHMgU2VydmVyRW50aXR5IHtcclxuICAgIHdpZHRoOiBudW1iZXIgPSAxMiAvIGdhbWUuVElMRV9XSURUSDtcclxuICAgIGhlaWdodDogbnVtYmVyID0gMjAgLyBnYW1lLlRJTEVfSEVJR0hUO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IEVudGl0eVBheWxvYWQpIHtcclxuICAgICAgICBzdXBlcihkYXRhLmlkKTtcclxuICAgICAgICBpZiAoZGF0YS50eXBlID09PSBFbnRpdGllcy5QbGF5ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5uYW1lID0gZGF0YS5kYXRhLm5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZURhdGEoZGF0YTogRW50aXR5UGF5bG9hZCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChkYXRhLnR5cGUgPT09IEVudGl0aWVzLlBsYXllcikge1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBkYXRhLmRhdGEubmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHRhcmdldDogcDUsIHVwc2NhbGVTaXplOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0YXJnZXQuZmlsbCgwLCAyNTUsIDApO1xyXG5cclxuICAgICAgICB0YXJnZXQucmVjdChcclxuICAgICAgICAgICAgKHRoaXMueCAqIGdhbWUuVElMRV9XSURUSCAtXHJcbiAgICAgICAgICAgICAgICBnYW1lLmludGVycG9sYXRlZENhbVggKiBnYW1lLlRJTEVfV0lEVEgpICpcclxuICAgICAgICAgICAgICAgIHVwc2NhbGVTaXplLFxyXG4gICAgICAgICAgICAodGhpcy55ICogZ2FtZS5USUxFX0hFSUdIVCAtXHJcbiAgICAgICAgICAgICAgICBnYW1lLmludGVycG9sYXRlZENhbVkgKiBnYW1lLlRJTEVfSEVJR0hUKSAqXHJcbiAgICAgICAgICAgICAgICB1cHNjYWxlU2l6ZSxcclxuICAgICAgICAgICAgdGhpcy53aWR0aCAqIHVwc2NhbGVTaXplICogZ2FtZS5USUxFX1dJRFRILFxyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCAqIHVwc2NhbGVTaXplICogZ2FtZS5USUxFX0hFSUdIVFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy8gUmVuZGVyIHRoZSBpdGVtIHF1YW50aXR5IGxhYmVsXHJcbiAgICAgICAgdGFyZ2V0LmZpbGwoMCk7XHJcblxyXG4gICAgICAgIHRhcmdldC5ub1N0cm9rZSgpO1xyXG5cclxuICAgICAgICB0YXJnZXQudGV4dFNpemUoNSAqIHVwc2NhbGVTaXplKTtcclxuICAgICAgICB0YXJnZXQudGV4dEFsaWduKHRhcmdldC5DRU5URVIsIHRhcmdldC5UT1ApO1xyXG5cclxuICAgICAgICB0YXJnZXQudGV4dChcclxuICAgICAgICAgICAgdGhpcy5uYW1lLFxyXG4gICAgICAgICAgICAodGhpcy54ICogZ2FtZS5USUxFX1dJRFRIIC1cclxuICAgICAgICAgICAgICAgIGdhbWUuaW50ZXJwb2xhdGVkQ2FtWCAqIGdhbWUuVElMRV9XSURUSCArXHJcbiAgICAgICAgICAgICAgICAodGhpcy53aWR0aCAqIGdhbWUuVElMRV9XSURUSCkgLyAyKSAqXHJcbiAgICAgICAgICAgICAgICB1cHNjYWxlU2l6ZSxcclxuICAgICAgICAgICAgKHRoaXMueSAqIGdhbWUuVElMRV9IRUlHSFQgLVxyXG4gICAgICAgICAgICAgICAgZ2FtZS5pbnRlcnBvbGF0ZWRDYW1ZICogZ2FtZS5USUxFX0hFSUdIVCAtXHJcbiAgICAgICAgICAgICAgICAodGhpcy5oZWlnaHQgKiBnYW1lLlRJTEVfV0lEVEgpIC8gMi41KSAqXHJcbiAgICAgICAgICAgICAgICB1cHNjYWxlU2l6ZVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHA1IGZyb20gJ3A1JztcclxuaW1wb3J0IHsgUmVuZGVyYWJsZSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvUmVuZGVyYWJsZSc7XHJcbmltcG9ydCB7IEVudGl0eVBheWxvYWQgfSBmcm9tICcuLi8uLi8uLi9nbG9iYWwvRW50aXR5JztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTZXJ2ZXJFbnRpdHkgaW1wbGVtZW50cyBSZW5kZXJhYmxlIHtcclxuICAgIGVudGl0eUlkOiBzdHJpbmc7XHJcblxyXG4gICAgeDogbnVtYmVyID0gMDtcclxuICAgIHk6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGVudGl0eUlkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmVudGl0eUlkID0gZW50aXR5SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgYWJzdHJhY3QgdXBkYXRlRGF0YShkYXRhOiBFbnRpdHlQYXlsb2FkKTogdm9pZDtcclxuXHJcbiAgICBhYnN0cmFjdCByZW5kZXIodGFyZ2V0OiBwNSwgdXBzY2FsZVNpemU6IG51bWJlcik6IHZvaWQ7XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIENsaWVudFRpbGVFbnRpdHkge1xyXG4gICAgY292ZXJlZFRpbGVzOiBudW1iZXJbXVxyXG4gICAgaWQ6IHN0cmluZ1xyXG4gICAgdHlwZV86IG51bWJlclxyXG4gICAgZGF0YTogb2JqZWN0XHJcbiAgICBhbmltRnJhbWU6IG51bWJlclxyXG4gICAgYW5pbWF0ZTogYm9vbGVhblxyXG59XHJcbmV4cG9ydCBjb25zdCBUaWxlRW50aXR5QW5pbWF0aW9ucyA9IFtcclxuICAgIGZhbHNlLC8vdHJlZVxyXG5cdHRydWUsLy9kcmlsbFxyXG5cdHRydWUsLy9kcmlsbFxyXG5cdHRydWUsLy9kcmlsbFxyXG5cdHRydWUsLy9kcmlsbFxyXG5cdHRydWUsLy9kcmlsbFxyXG5cdGZhbHNlLC8vY3JhZnRpbmcgYmVuY2hcclxuXHRmYWxzZSwvL3BsYW50ZWQgc2VlZFxyXG5dIiwiaW1wb3J0IHsgZ2FtZSB9IGZyb20gXCIuLi8uLi9HYW1lXCI7XHJcbmltcG9ydCB7IFBhcnRpY2xlIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvUGFydGljbGVcIjtcclxuaW1wb3J0IFNpbXBsZXhOb2lzZSBmcm9tIFwic2ltcGxleC1ub2lzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbG9yUGFydGljbGUgaW1wbGVtZW50cyBQYXJ0aWNsZSB7XHJcbiAgICBjb2xvcjogc3RyaW5nXHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbiAgICBzaXplOiBudW1iZXI7XHJcbiAgICB4VmVsOiBudW1iZXI7XHJcbiAgICB5VmVsOiBudW1iZXI7XHJcbiAgICBncmF2aXR5OiBib29sZWFuO1xyXG4gICAgd2luZDogYm9vbGVhbjtcclxuICAgIGFnZTogbnVtYmVyO1xyXG4gICAgbGlmZXNwYW46IG51bWJlcjtcclxuICAgIG5vaXNlOiBTaW1wbGV4Tm9pc2VcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb2xvcjogc3RyaW5nLCBzaXplOiBudW1iZXIsIGxpZmVzcGFuOiBudW1iZXIsIHg6IG51bWJlciwgeTogbnVtYmVyLCB4VmVsPzogbnVtYmVyLCB5VmVsPzogbnVtYmVyLCBncmF2aXR5PzogYm9vbGVhbiwgd2luZD86IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMueFZlbCA9IHhWZWwgfHwgMDtcclxuICAgICAgICB0aGlzLnlWZWwgPSB5VmVsIHx8IDA7XHJcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICAgICAgICB0aGlzLmdyYXZpdHkgPSB0cnVlOy8vdXNpbmcgdGhlIG9yIG1vZGlmaWVyIHdpdGggYm9vbGVhbnMgY2F1c2VzIGJ1Z3M7IHRoZXJlJ3MgcHJvYmFibHkgYSBiZXR0ZXIgd2F5IHRvIGRvIHRoaXNcclxuICAgICAgICBpZiAoZ3Jhdml0eSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aGlzLmdyYXZpdHkgPSBncmF2aXR5O1xyXG5cclxuICAgICAgICB0aGlzLndpbmQgPSBmYWxzZTsvL3VzaW5nIHRoZSBvciBtb2RpZmllciB3aXRoIGJvb2xlYW5zIGNhdXNlcyBidWdzOyB0aGVyZSdzIHByb2JhYmx5IGEgYmV0dGVyIHdheSB0byBkbyB0aGlzXHJcbiAgICAgICAgaWYgKHdpbmQgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhpcy53aW5kID0gd2luZDtcclxuICAgICAgICB0aGlzLmFnZSA9IDA7XHJcbiAgICAgICAgdGhpcy5saWZlc3BhbiA9IGxpZmVzcGFuO1xyXG4gICAgICAgIHRoaXMubm9pc2UgPSBuZXcgU2ltcGxleE5vaXNlKFwiYXNkZmFzZGZhc2RmYXNcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHRhcmdldDogaW1wb3J0KFwicDVcIiksIHVwc2NhbGVTaXplOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5hZ2UgLyB0aGlzLmxpZmVzcGFuIDwgMC44KSB7Ly9pZiBpdCdzIHVuZGVyIDgwJSBvZiB0aGUgcGFydGljbGUncyBsaWZlc3BhbiwgZHJhdyBub3JtYWxseSB3aXRob3V0IGZhZGVcclxuICAgICAgICAgICAgdGFyZ2V0LmZpbGwodGhpcy5jb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Ugey8vdGhpcyBtZWFucyB0aGF0IHRoZSBwYXJ0aWNsZSBpcyBhbG1vc3QgZ29pbmcgdG8gYmUgZGVsZXRlZCwgc28gZmFkaW5nIGlzIG5lY2Vzc2FyeVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb2xvci5sZW5ndGggPT09IDcpIHsvL2lmIHRoZXJlIGlzIG5vIHRyYW5zcGFyZW5jeSBieSBkZWZhdWx0LCBqdXN0IG1hcCB0aGUgdGhpbmdzXHJcbiAgICAgICAgICAgICAgICBsZXQgdHJhbnNwYXJlbmN5U3RyaW5nID0gTWF0aC5yb3VuZCgyNTUgKiAoLTUgKiAodGhpcy5hZ2UgLyB0aGlzLmxpZmVzcGFuKSArIDUpKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDAsIDIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRyYW5zcGFyZW5jeVN0cmluZz09PXVuZGVmaW5lZCB8fCB0cmFuc3BhcmVuY3lTdHJpbmcubGVuZ3RoPT09dW5kZWZpbmVkKS8vY2F0Y2ggd2hhdCBjb3VsZCBiZSBhbiBpbmZpbml0ZSBsb29wIG9yIGp1c3QgYW4gZXJyb3JcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGB1bmRlZmluZWQgdHJhbnNwYXJlbmN5IHN0cmluZyBvbiBwYXJ0aWNsZWBcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUodHJhbnNwYXJlbmN5U3RyaW5nLmxlbmd0aDwyKSB7Ly9tYWtlIHN1cmUgaXQncyAyIGNoYXJhY3RlcnMgbG9uZzsgdGhpcyBzdG9wcyB0aGUgY29tcHV0ZXIgZnJvbSBpbnRlcnByZXRpbmcgI2ZmIGZmIGZmIDUgYXMgI2ZmIGZmIGZmIDU1IGluc3RlYWQgb2YgI2ZmIGZmIGZmIDA1XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwYXJlbmN5U3RyaW5nID0gXCIwXCIrdHJhbnNwYXJlbmN5U3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LmZpbGwodGhpcy5jb2xvci5zdWJzdHJpbmcoMCwgNykgKyB0cmFuc3BhcmVuY3lTdHJpbmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Ugey8vaWYgdGhlcmUgaXMgdHJhbnNwYXJlbmN5LCBtdWx0aXBseVxyXG4gICAgICAgICAgICAgICAgbGV0IHRyYW5zcGFyZW5jeVN0cmluZyA9IE1hdGgucm91bmQocGFyc2VJbnQodGhpcy5jb2xvci5zdWJzdHJpbmcoNywgOSksIDE2KSAqICgtNSAqICh0aGlzLmFnZSAvIHRoaXMubGlmZXNwYW4pICsgNSkpLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMCwgMik7XHJcbiAgICAgICAgICAgICAgICBpZiAodHJhbnNwYXJlbmN5U3RyaW5nPT09dW5kZWZpbmVkIHx8IHRyYW5zcGFyZW5jeVN0cmluZy5sZW5ndGg9PT11bmRlZmluZWQpLy9jYXRjaCB3aGF0IGNvdWxkIGJlIGFuIGluZmluaXRlIGxvb3Agb3IganVzdCBhbiBlcnJvclxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgYHVuZGVmaW5lZCB0cmFuc3BhcmVuY3kgc3RyaW5nIG9uIHBhcnRpY2xlYFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSh0cmFuc3BhcmVuY3lTdHJpbmcubGVuZ3RoPDIpIHsvL21ha2Ugc3VyZSBpdCdzIDIgY2hhcmFjdGVycyBsb25nOyB0aGlzIHN0b3BzIHRoZSBjb21wdXRlciBmcm9tIGludGVycHJldGluZyAjZmYgZmYgZmYgNSBhcyAjZmYgZmYgZmYgNTUgaW5zdGVhZCBvZiAjZmYgZmYgZmYgMDVcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BhcmVuY3lTdHJpbmcgPSBcIjBcIit0cmFuc3BhcmVuY3lTdHJpbmc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuZmlsbCh0aGlzLmNvbG9yLnN1YnN0cmluZygwLCA3KSArIHRyYW5zcGFyZW5jeVN0cmluZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9kcmF3IGEgcmVjdGFuZ2xlIGNlbnRlcmVkIG9uIHRoZSB4IGFuZCB5IHBvc2l0aW9uIGZpbGxlZCB3aXRoIHRoZSBjb2xvciBvZiB0aGUgb2JqZWN0XHJcbiAgICAgICAgdGFyZ2V0LnJlY3QoXHJcbiAgICAgICAgICAgICgtdGhpcy5zaXplIC8gMiArIHRoaXMueCAqIGdhbWUuVElMRV9XSURUSCAtXHJcbiAgICAgICAgICAgICAgICBnYW1lLmludGVycG9sYXRlZENhbVggKiBnYW1lLlRJTEVfV0lEVEgpICpcclxuICAgICAgICAgICAgdXBzY2FsZVNpemUsXHJcbiAgICAgICAgICAgICgtdGhpcy5zaXplIC8gMiArIHRoaXMueSAqIGdhbWUuVElMRV9IRUlHSFQgLVxyXG4gICAgICAgICAgICAgICAgZ2FtZS5pbnRlcnBvbGF0ZWRDYW1ZICogZ2FtZS5USUxFX0hFSUdIVCkgKlxyXG4gICAgICAgICAgICB1cHNjYWxlU2l6ZSxcclxuICAgICAgICAgICAgdGhpcy5zaXplICogdXBzY2FsZVNpemUgKiBnYW1lLlRJTEVfV0lEVEgsXHJcbiAgICAgICAgICAgIHRoaXMuc2l6ZSAqIHVwc2NhbGVTaXplICogZ2FtZS5USUxFX0hFSUdIVFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgdGljaygpIHtcclxuICAgICAgICB0aGlzLmFnZSsrO1xyXG4gICAgICAgIHRoaXMueCArPSB0aGlzLnhWZWw7XHJcbiAgICAgICAgdGhpcy55ICs9IHRoaXMueVZlbDtcclxuICAgICAgICB0aGlzLnhWZWwgLT0gKE1hdGguYWJzKHRoaXMueFZlbCkgKiB0aGlzLnhWZWwgKiBnYW1lLkRSQUdfQ09FRkZJQ0lFTlQgKiB0aGlzLnNpemUpOy8vYXNzdW1pbmcgY29uc3RhbnQgbWFzcyBmb3IgZWFjaCBwYXJ0aWNsZVxyXG4gICAgICAgIGlmICh0aGlzLmdyYXZpdHkpIHtcclxuICAgICAgICAgICAgdGhpcy55VmVsICs9IGdhbWUuR1JBVklUWV9TUEVFRDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMud2luZCkge1xyXG4gICAgICAgICAgICB0aGlzLnhWZWwgKz0gdGhpcy5ub2lzZS5ub2lzZTJEKHRoaXMueC8xMCwgdGhpcy55LzEwKS80MFxyXG4gICAgICAgICAgICB0aGlzLnlWZWwgKz0gdGhpcy5ub2lzZS5ub2lzZTJEKHRoaXMueS8xMCwgdGhpcy54LzEwKS80MFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnlWZWwgLT0gKE1hdGguYWJzKHRoaXMueVZlbCkgKiB0aGlzLnlWZWwgKiBnYW1lLkRSQUdfQ09FRkZJQ0lFTlQgKiB0aGlzLnNpemUpO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IEludmVudG9yeVBheWxvYWQsIEl0ZW1UeXBlIH0gZnJvbSAnLi9JbnZlbnRvcnknO1xyXG5cclxuZXhwb3J0IGVudW0gRW50aXRpZXMge1xyXG5cdExvY2FsUGxheWVyLFxyXG5cdFBsYXllcixcclxuXHRJdGVtLFxyXG59XHJcblxyXG50eXBlIERhdGFQYWlyczxULCBLIGV4dGVuZHMga2V5b2YgVCA9IGtleW9mIFQ+ID0gSyBleHRlbmRzIGtleW9mIFRcclxuXHQ/IHsgdHlwZTogSzsgZGF0YTogVFtLXSB9XHJcblx0OiBuZXZlcjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRW50aXRpZXNEYXRhIHtcclxuXHRbRW50aXRpZXMuTG9jYWxQbGF5ZXJdOiB7XHJcblx0XHRuYW1lOiBzdHJpbmc7XHJcblx0XHR4OiBudW1iZXI7XHJcblx0XHR5OiBudW1iZXI7XHJcblx0fTtcclxuXHRbRW50aXRpZXMuUGxheWVyXTogeyBuYW1lOiBzdHJpbmcgfTtcclxuXHRbRW50aXRpZXMuSXRlbV06IHsgaXRlbTogSXRlbVR5cGU7IHg6IG51bWJlcjsgeTogbnVtYmVyIH07XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEVudGl0eURhdGE8VCBleHRlbmRzIEVudGl0aWVzID0ga2V5b2YgRW50aXRpZXNEYXRhPiA9IERhdGFQYWlyczxcclxuXHRFbnRpdGllc0RhdGEsXHJcblx0VFxyXG4+O1xyXG5cclxuZXhwb3J0IHR5cGUgRW50aXR5UGF5bG9hZDxUIGV4dGVuZHMgRW50aXRpZXMgPSBrZXlvZiBFbnRpdGllc0RhdGE+ID1cclxuXHRFbnRpdHlEYXRhPFQ+ICYgeyBpZDogc3RyaW5nIH07XHJcbiIsImltcG9ydCB7IFRpbGVUeXBlIH0gZnJvbSAnLi9UaWxlJztcclxuaW1wb3J0IHsgVGlsZUVudGl0aWVzIH0gZnJvbSAnLi9UaWxlRW50aXR5JztcclxuXHJcbnR5cGUgRGF0YVBhaXJzPFQsIEsgZXh0ZW5kcyBrZXlvZiBUID0ga2V5b2YgVD4gPSBLIGV4dGVuZHMga2V5b2YgVFxyXG5cdD8geyB0eXBlOiBLIH0gJiBUW0tdXHJcblx0OiBuZXZlcjtcclxuXHJcbmNvbnN0IGl0ZW1UeXBlRGF0YSA9IDxELCBUIGV4dGVuZHMgUmVjb3JkPEl0ZW1UeXBlLCBEYXRhUGFpcnM8Q2F0ZWdvcnlEYXRhPj4+KFxyXG5cdGRhdGE6IFQsXHJcbik6IFQgPT4gZGF0YTtcclxuXHJcbmV4cG9ydCBlbnVtIEl0ZW1DYXRlZ29yaWVzIHtcclxuXHRUaWxlLFxyXG5cdFJlc291cmNlLFxyXG5cdFRvb2wsXHJcblx0VGlsZUVudGl0eSxcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQ2F0ZWdvcnlEYXRhID0ge1xyXG5cdFtJdGVtQ2F0ZWdvcmllcy5UaWxlXTogeyBwbGFjZWRUaWxlOiBUaWxlVHlwZSwgbWF4U3RhY2tTaXplPzogbnVtYmVyfTtcclxuXHRbSXRlbUNhdGVnb3JpZXMuUmVzb3VyY2VdOiB7fTtcclxuXHRbSXRlbUNhdGVnb3JpZXMuVG9vbF06IHsgYnJlYWthYmxlVGlsZXM6IFRpbGVUeXBlW119O1xyXG5cdFtJdGVtQ2F0ZWdvcmllcy5UaWxlRW50aXR5XTogeyBwbGFjZWRUaWxlRW50aXR5OiBudW1iZXIsIHRpbGVFbnRpdHlPZmZzZXQ/OiBbbnVtYmVyLCBudW1iZXJdfTtcclxufTtcclxuXHJcbmV4cG9ydCBlbnVtIEl0ZW1UeXBlIHtcclxuXHRTbm93QmxvY2ssXHJcblx0SWNlQmxvY2ssXHJcblx0RGlydEJsb2NrLFxyXG5cdFN0b25lMEJsb2NrLFxyXG5cdFN0b25lMUJsb2NrLFxyXG5cdFN0b25lMkJsb2NrLFxyXG5cdFN0b25lM0Jsb2NrLFxyXG5cdFN0b25lNEJsb2NrLFxyXG5cdFN0b25lNUJsb2NrLFxyXG5cdFN0b25lNkJsb2NrLFxyXG5cdFN0b25lN0Jsb2NrLFxyXG5cdFN0b25lOEJsb2NrLFxyXG5cdFN0b25lOUJsb2NrLFxyXG5cdFRpbkJsb2NrLFxyXG5cdEFsdW1pbnVtQmxvY2ssXHJcblx0R29sZEJsb2NrLFxyXG5cdFRpdGFuaXVtQmxvY2ssXHJcblx0R3JhcGVCbG9jayxcclxuXHRXb29kMEJsb2NrLFxyXG5cdFdvb2QxQmxvY2ssXHJcblx0V29vZDJCbG9jayxcclxuXHRXb29kM0Jsb2NrLFxyXG5cdFdvb2Q0QmxvY2ssXHJcblx0V29vZDVCbG9jayxcclxuXHRXb29kNkJsb2NrLFxyXG5cdFdvb2Q3QmxvY2ssXHJcblx0V29vZDhCbG9jayxcclxuXHRXb29kOUJsb2NrLFxyXG5cdFNlZWQsXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEl0ZW1TdGFjayA9IHtcclxuXHRxdWFudGl0eTogbnVtYmVyO1xyXG5cdGl0ZW06IEl0ZW1UeXBlO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IEl0ZW1zID0gaXRlbVR5cGVEYXRhKHtcclxuXHRbSXRlbVR5cGUuU25vd0Jsb2NrXToge1xyXG5cdFx0dHlwZTogSXRlbUNhdGVnb3JpZXMuVGlsZSxcclxuXHRcdHBsYWNlZFRpbGU6IFRpbGVUeXBlLlNub3csXHJcblx0fSxcclxuXHRbSXRlbVR5cGUuSWNlQmxvY2tdOiB7XHJcblx0XHR0eXBlOiBJdGVtQ2F0ZWdvcmllcy5UaWxlLFxyXG5cdFx0cGxhY2VkVGlsZTogVGlsZVR5cGUuSWNlLFxyXG5cdH0sXHJcblx0W0l0ZW1UeXBlLkRpcnRCbG9ja106IHtcclxuXHRcdHR5cGU6IEl0ZW1DYXRlZ29yaWVzLlRpbGUsXHJcblx0XHRwbGFjZWRUaWxlOiBUaWxlVHlwZS5EaXJ0LFxyXG5cdH0sXHJcblx0W0l0ZW1UeXBlLlN0b25lMEJsb2NrXToge1xyXG5cdFx0dHlwZTogSXRlbUNhdGVnb3JpZXMuVGlsZSxcclxuXHRcdHBsYWNlZFRpbGU6IFRpbGVUeXBlLlN0b25lMCxcclxuXHR9LFxyXG5cdFtJdGVtVHlwZS5TdG9uZTFCbG9ja106IHtcclxuXHRcdHR5cGU6IEl0ZW1DYXRlZ29yaWVzLlRpbGUsXHJcblx0XHRwbGFjZWRUaWxlOiBUaWxlVHlwZS5TdG9uZTEsXHJcblx0fSxcclxuXHRbSXRlbVR5cGUuU3RvbmUyQmxvY2tdOiB7XHJcblx0XHR0eXBlOiBJdGVtQ2F0ZWdvcmllcy5UaWxlLFxyXG5cdFx0cGxhY2VkVGlsZTogVGlsZVR5cGUuU3RvbmUyLFxyXG5cdH0sXHJcblx0W0l0ZW1UeXBlLlN0b25lM0Jsb2NrXToge1xyXG5cdFx0dHlwZTogSXRlbUNhdGVnb3JpZXMuVGlsZSxcclxuXHRcdHBsYWNlZFRpbGU6IFRpbGVUeXBlLlN0b25lMyxcclxuXHR9LFxyXG5cdFtJdGVtVHlwZS5TdG9uZTRCbG9ja106IHtcclxuXHRcdHR5cGU6IEl0ZW1DYXRlZ29yaWVzLlRpbGUsXHJcblx0XHRwbGFjZWRUaWxlOiBUaWxlVHlwZS5TdG9uZTQsXHJcblx0fSxcclxuXHRbSXRlbVR5cGUuU3RvbmU1QmxvY2tdOiB7XHJcblx0XHR0eXBlOiBJdGVtQ2F0ZWdvcmllcy5UaWxlLFxyXG5cdFx0cGxhY2VkVGlsZTogVGlsZVR5cGUuU3RvbmU1LFxyXG5cdH0sXHJcblx0W0l0ZW1UeXBlLlN0b25lNkJsb2NrXToge1xyXG5cdFx0dHlwZTogSXRlbUNhdGVnb3JpZXMuVGlsZSxcclxuXHRcdHBsYWNlZFRpbGU6IFRpbGVUeXBlLlN0b25lNixcclxuXHR9LFxyXG5cdFtJdGVtVHlwZS5TdG9uZTdCbG9ja106IHtcclxuXHRcdHR5cGU6IEl0ZW1DYXRlZ29yaWVzLlRpbGUsXHJcblx0XHRwbGFjZWRUaWxlOiBUaWxlVHlwZS5TdG9uZTcsXHJcblx0fSxcclxuXHRbSXRlbVR5cGUuU3RvbmU4QmxvY2tdOiB7XHJcblx0XHR0eXBlOiBJdGVtQ2F0ZWdvcmllcy5UaWxlLFxyXG5cdFx0cGxhY2VkVGlsZTogVGlsZVR5cGUuU3RvbmU4LFxyXG5cdH0sXHJcblx0W0l0ZW1UeXBlLlN0b25lOUJsb2NrXToge1xyXG5cdFx0dHlwZTogSXRlbUNhdGVnb3JpZXMuVGlsZSxcclxuXHRcdHBsYWNlZFRpbGU6IFRpbGVUeXBlLlN0b25lOSxcclxuXHR9LFxyXG5cdFtJdGVtVHlwZS5UaW5CbG9ja106IHtcclxuXHRcdHR5cGU6IEl0ZW1DYXRlZ29yaWVzLlRpbGUsXHJcblx0XHRwbGFjZWRUaWxlOiBUaWxlVHlwZS5UaW4sXHJcblx0fSxcclxuXHRbSXRlbVR5cGUuQWx1bWludW1CbG9ja106IHtcclxuXHRcdHR5cGU6IEl0ZW1DYXRlZ29yaWVzLlRpbGUsXHJcblx0XHRwbGFjZWRUaWxlOiBUaWxlVHlwZS5BbHVtaW51bSxcclxuXHR9LFxyXG5cdFtJdGVtVHlwZS5Hb2xkQmxvY2tdOiB7XHJcblx0XHR0eXBlOiBJdGVtQ2F0ZWdvcmllcy5UaWxlLFxyXG5cdFx0cGxhY2VkVGlsZTogVGlsZVR5cGUuR29sZCxcclxuXHR9LFxyXG5cdFtJdGVtVHlwZS5UaXRhbml1bUJsb2NrXToge1xyXG5cdFx0dHlwZTogSXRlbUNhdGVnb3JpZXMuVGlsZSxcclxuXHRcdHBsYWNlZFRpbGU6IFRpbGVUeXBlLlRpdGFuaXVtLFxyXG5cdH0sXHJcblx0W0l0ZW1UeXBlLkdyYXBlQmxvY2tdOiB7XHJcblx0XHR0eXBlOiBJdGVtQ2F0ZWdvcmllcy5UaWxlLFxyXG5cdFx0cGxhY2VkVGlsZTogVGlsZVR5cGUuR3JhcGUsXHJcblx0fSxcclxuXHRbSXRlbVR5cGUuV29vZDBCbG9ja106IHtcclxuXHRcdHR5cGU6IEl0ZW1DYXRlZ29yaWVzLlRpbGUsXHJcblx0XHRwbGFjZWRUaWxlOiBUaWxlVHlwZS5Xb29kMCxcclxuXHR9LFxyXG5cdFtJdGVtVHlwZS5Xb29kMUJsb2NrXToge1xyXG5cdFx0dHlwZTogSXRlbUNhdGVnb3JpZXMuVGlsZSxcclxuXHRcdHBsYWNlZFRpbGU6IFRpbGVUeXBlLldvb2QxLFxyXG5cdH0sXHJcblx0W0l0ZW1UeXBlLldvb2QyQmxvY2tdOiB7XHJcblx0XHR0eXBlOiBJdGVtQ2F0ZWdvcmllcy5UaWxlLFxyXG5cdFx0cGxhY2VkVGlsZTogVGlsZVR5cGUuV29vZDIsXHJcblx0fSxcclxuXHRbSXRlbVR5cGUuV29vZDNCbG9ja106IHtcclxuXHRcdHR5cGU6IEl0ZW1DYXRlZ29yaWVzLlRpbGUsXHJcblx0XHRwbGFjZWRUaWxlOiBUaWxlVHlwZS5Xb29kMyxcclxuXHR9LFxyXG5cdFtJdGVtVHlwZS5Xb29kNEJsb2NrXToge1xyXG5cdFx0dHlwZTogSXRlbUNhdGVnb3JpZXMuVGlsZSxcclxuXHRcdHBsYWNlZFRpbGU6IFRpbGVUeXBlLldvb2Q0LFxyXG5cdH0sXHJcblx0W0l0ZW1UeXBlLldvb2Q1QmxvY2tdOiB7XHJcblx0XHR0eXBlOiBJdGVtQ2F0ZWdvcmllcy5UaWxlLFxyXG5cdFx0cGxhY2VkVGlsZTogVGlsZVR5cGUuV29vZDUsXHJcblx0fSxcclxuXHRbSXRlbVR5cGUuV29vZDZCbG9ja106IHtcclxuXHRcdHR5cGU6IEl0ZW1DYXRlZ29yaWVzLlRpbGUsXHJcblx0XHRwbGFjZWRUaWxlOiBUaWxlVHlwZS5Xb29kNixcclxuXHR9LFxyXG5cdFtJdGVtVHlwZS5Xb29kN0Jsb2NrXToge1xyXG5cdFx0dHlwZTogSXRlbUNhdGVnb3JpZXMuVGlsZSxcclxuXHRcdHBsYWNlZFRpbGU6IFRpbGVUeXBlLldvb2Q3LFxyXG5cdH0sXHJcblx0W0l0ZW1UeXBlLldvb2Q4QmxvY2tdOiB7XHJcblx0XHR0eXBlOiBJdGVtQ2F0ZWdvcmllcy5UaWxlLFxyXG5cdFx0cGxhY2VkVGlsZTogVGlsZVR5cGUuV29vZDgsXHJcblx0fSxcclxuXHRbSXRlbVR5cGUuV29vZDlCbG9ja106IHtcclxuXHRcdHR5cGU6IEl0ZW1DYXRlZ29yaWVzLlRpbGUsXHJcblx0XHRwbGFjZWRUaWxlOiBUaWxlVHlwZS5Xb29kOSxcclxuXHR9LFxyXG5cdFtJdGVtVHlwZS5TZWVkXToge1xyXG5cdFx0dHlwZTogSXRlbUNhdGVnb3JpZXMuVGlsZUVudGl0eSxcclxuXHRcdHBsYWNlZFRpbGVFbnRpdHk6IFRpbGVFbnRpdGllcy5TZWVkLFxyXG5cdFx0dGlsZUVudGl0eU9mZnNldDogWy0xLCAtNl0sXHJcblx0fSxcclxuXHQvLyBbSXRlbVR5cGUuVGluUGlja2F4ZV06IHtcclxuXHQvLyBcdHR5cGU6IEl0ZW1DYXRlZ29yaWVzLlRvb2wsXHJcblx0Ly8gXHRicmVha2FibGVUaWxlczogW1RpbGVUeXBlLlNub3csIFRpbGVUeXBlLkljZSwgVGlsZVR5cGUuRGlydCwgVGlsZVR5cGUuV29vZDAsIFRpbGVUeXBlLlN0b25lMCwgVGlsZVR5cGUuU3RvbmUxLCBUaWxlVHlwZS5UaW4sIFRpbGVUeXBlLkFsdW1pbnVtXVxyXG5cdC8vIH1cclxufSk7XHJcblxyXG5leHBvcnQgdHlwZSBJbnZlbnRvcnlVcGRhdGVQYXlsb2FkID0ge1xyXG5cdHNsb3Q6IG51bWJlcjtcclxuXHRpdGVtOiBJdGVtU3RhY2sgfCB1bmRlZmluZWQ7XHJcbn1bXTtcclxuXHJcbmV4cG9ydCB0eXBlIEludmVudG9yeVBheWxvYWQgPSB7XHJcblx0aXRlbXM6IChJdGVtU3RhY2sgfCB1bmRlZmluZWQpW107XHJcblxyXG5cdHdpZHRoOiBudW1iZXI7XHJcblx0aGVpZ2h0OiBudW1iZXI7XHJcbn07XHJcbiIsImV4cG9ydCBlbnVtIFRpbGVUeXBlIHtcclxuXHRBaXIsXHJcblx0U25vdyxcclxuXHRJY2UsXHJcblx0RGlydCxcclxuXHRTdG9uZTAsXHJcblx0U3RvbmUxLFxyXG5cdFN0b25lMixcclxuXHRTdG9uZTMsXHJcblx0U3RvbmU0LFxyXG5cdFN0b25lNSxcclxuXHRTdG9uZTYsXHJcblx0U3RvbmU3LFxyXG5cdFN0b25lOCxcclxuXHRTdG9uZTksXHJcblx0VGluLFxyXG5cdEFsdW1pbnVtLFxyXG5cdEdvbGQsXHJcblx0VGl0YW5pdW0sXHJcblx0R3JhcGUsXHJcblx0V29vZDAsXHJcblx0V29vZDEsXHJcblx0V29vZDIsXHJcblx0V29vZDMsXHJcblx0V29vZDQsXHJcblx0V29vZDUsXHJcblx0V29vZDYsXHJcblx0V29vZDcsXHJcblx0V29vZDgsXHJcblx0V29vZDksXHJcbn0iLCJleHBvcnQgZW51bSBUaWxlRW50aXRpZXMge1xyXG5cdFRyZWUsXHJcblx0VGllcjFEcmlsbCxcclxuXHRUaWVyMkRyaWxsLFxyXG5cdFRpZXIzRHJpbGwsXHJcblx0VGllcjREcmlsbCxcclxuXHRUaWVyNURyaWxsLFxyXG5cdENyYWZ0aW5nQmVuY2gsXHJcblx0U2VlZCxcclxufVxyXG5cclxudHlwZSBEYXRhUGFpcnM8VCwgSyBleHRlbmRzIGtleW9mIFQgPSBrZXlvZiBUPiA9IEsgZXh0ZW5kcyBrZXlvZiBUXHJcblx0PyB7IHR5cGVfOiBLOyBkYXRhOiBUW0tdIH1cclxuXHQ6IG5ldmVyO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUaWxlRW50aXRpZXNEYXRhIHtcclxuXHRbVGlsZUVudGl0aWVzLlRyZWVdOiB7IHdvb2RDb3VudDogbnVtYmVyOyBzZWVkQ291bnQ6IG51bWJlciB9O1xyXG5cdFtUaWxlRW50aXRpZXMuVGllcjFEcmlsbF06IHsgIH07XHJcblx0W1RpbGVFbnRpdGllcy5UaWVyMkRyaWxsXTogeyAgfTtcclxuXHRbVGlsZUVudGl0aWVzLlRpZXIzRHJpbGxdOiB7ICB9O1xyXG5cdFtUaWxlRW50aXRpZXMuVGllcjREcmlsbF06IHsgIH07XHJcblx0W1RpbGVFbnRpdGllcy5UaWVyNURyaWxsXTogeyAgfTtcclxuXHRbVGlsZUVudGl0aWVzLkNyYWZ0aW5nQmVuY2hdOiB7ICB9O1xyXG5cdFtUaWxlRW50aXRpZXMuU2VlZF06IHsgIH07XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFRpbGVFbnRpdHlEYXRhID0gRGF0YVBhaXJzPFRpbGVFbnRpdGllc0RhdGE+ICYge31cclxuXHJcbmV4cG9ydCB0eXBlIFRpbGVFbnRpdHlQYXlsb2FkID0ge1xyXG5cdGlkOiBzdHJpbmc7XHJcblx0Y292ZXJlZFRpbGVzOiBudW1iZXJbXTtcclxuXHRwYXlsb2FkOiBUaWxlRW50aXR5RGF0YTtcclxufTtcclxuXHJcbmV4cG9ydCBlbnVtIFRpbGVFbnRpdHlUZXh0dXJlcyB7XHJcblx0VHJlZTEsXHJcblx0VHJlZTIsXHJcblx0VHJlZTMsXHJcblx0VHJlZTQsXHJcblx0VHJlZTUsXHJcblx0VHJlZTYsXHJcblx0VHJlZTcsXHJcblx0VHJlZTgsXHJcblx0VHJlZTksXHJcblx0VHJlZTEwLFxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua3Nub3dlZF9pblwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtzbm93ZWRfaW5cIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcIm1vZHVsZXMtbWFpblwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9jbGllbnQvR2FtZS50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9