class SceneMain extends Phaser.Scene {
    
    constructor() {
        super('SceneMain');
    }
    preload() {

        // Images
        this.load.spritesheet('hero', 'images/heroSheet.png', {
            frameWidth: 627, frameHeight: 625
        });
        this.load.image('light', 'images/lightbulb.png');
        this.load.image('background', 'images/background.png')
        this.load.image('foreground', 'images/black_layer.png')
        this.load.image('mask', 'images/light-mask.png')
		this.load.image('door', 'images/door.png');
        this.load.image('wall', 'images/wall.png');
        this.load.image('floor', 'images/floor.png');
        this.load.image('trigger_floor', 'images/trigger_floor.png');
        
        // Sound effects
        this.load.audio('lightSwitch', 'sound_effects/light_switch.mp3')
        this.load.audio('backgroundMusic', 'sounds/background.mp3');
        this.load.audio('lightOnMusic', 'sounds/happy_music.mp3');
    }

    create() {        
        this.levelCounter = 0;
                
        this.buildMap(levels, this.levelCounter);
    }

    update() {
        // Moving the character on key press or setting velocity to 0 if no press.
        if (this.cursors.left.isDown && !this.cursors.right.isDown) {
            this.hero.setVelocityX(-160);
        } else if (!this.cursors.left.isDown && this.cursors.right.isDown){
            this.hero.setVelocityX(160);
        } else {
            this.hero.setVelocityX(0);
        }
        if (this.cursors.up.isDown && !this.cursors.down.isDown) {
            this.hero.setVelocityY(-160);
        } else if (!this.cursors.up.isDown && this.cursors.down.isDown){
            this.hero.setVelocityY(160);
        } else {
            this.hero.setVelocityY(0);
        }

        if (!this.cursors.left.isDown && !this.cursors.right.isDown && 
            !this.cursors.up.isDown && !this.cursors.down.isDown){
            this.hero.anims.play('stop', true);
        }

        //Applying animations to key presses
        if (this.cursors.left.isDown ) {
            this.hero.anims.play('left', true);
        } else if (this.cursors.right.isDown){
            this.hero.anims.play('right', true);
        } 
        if (this.cursors.up.isDown && !this.cursors.left.isDown && !this.cursors.right.isDown) {
            this.hero.anims.play('up', true);
        } else if (this.cursors.down.isDown && !this.cursors.left.isDown && !this.cursors.right.isDown){
            this.hero.anims.play('down', true);
        }

        if (!this.cursors.left.isDown && !this.cursors.right.isDown &&
            !this.cursors.up.isDown && !this.cursors.down.isDown){
            this.hero.anims.play('stop', true);
        }

        // If moving diagonally, limit the speed to the same as if you were moving along only one axis
        if(this.hero.body.velocity.x && this.hero.body.velocity.y) {
            this.hero.body.velocity.x *= Math.SQRT1_2
            this.hero.body.velocity.y *= Math.SQRT1_2
        }

        let distance = this.distanceFromHero(this.light)
        if (this.pressedLightSwitch && this.lightTurningOff === null && distance > 85) {
            this.pressedLightSwitch = false
            this.pressingLightSwitch = false
            // this.turnOffLight({onDuration: 20000})
        }

        // If hero is moving in any direction
        if (this.hero.body.velocity.x || this.hero.body.velocity.y) {
            this.setLightToAlpha(distance, 200)
            this.foreground.mask.bitmapMask.x = this.hero.x
            this.foreground.mask.bitmapMask.y = this.hero.y
        }

    }

    distanceFromHero(el) 
    {
        let xCoord = Math.abs(el.body.x - this.hero.body.x)
        let yCoord = Math.abs(el.body.y - this.hero.body.y)

        return Math.sqrt(xCoord**2 + yCoord**2)
    }

    setLightToAlpha(distance, scale) {
        let alpha = 1 - (distance/scale)
        if (alpha < 0) {
            alpha = 0
        }
        this.light.alpha = alpha
    }

    turnLightOn(durationParam) {
        let onDuration;
        if (arguments.length == 0) {
            onDuration = 10000;
        } else {
            onDuration = durationParam;
        }
        if (!this.isLightOn) {
            this.lightSwitchSound.play();
            this.backgroundMusic.stop();
            this.lightOnMusic.play();
            this.tweens.add({
                targets: this.spotlight,
                alpha: 1,
                duration: 500,
                ease: 'Sine.easeIn',
                onComplete: () => {
                    this.tweens.add({
                        targets: this.spotlight,
                        alpha: 0,
                        duration: onDuration,
                        ease: 'Sine.easeIn',
                        onComplete: () => {
                            this.turnLightOff();
                        }
                    })
                }
            });
            this.isLightOn = true;
            this.isDoorAvailable = true;
        }
    }

    turnLightOff() {
        if (this.isLightOn) {
            this.lightSwitchSound.play();
            this.backgroundMusic.play();
            this.lightOnMusic.stop();
            this.spotlight.alpha = 0;
            this.isLightOn = false;
        }
    }

    // turnOffLight(options = {}) {
    //     let onDuration = 10000
    //     if ('onDuration' in options) {
    //         onDuration = options.onDuration
    //     }
    //     // if (!this.pressingLightSwitch && !this.lightTriggeringOff) {
    //         if (this.lightTurningOff && !this.lightTriggeringOff) {
    //             this.cancelLightAnimations()
    //             this.lightTriggeringOff = this.tweens.add({
    //                 targets: this.spotlight,
    //                 alpha: 0,
    //                 duration: onDuration,
    //                 ease: 'Quart.easeIn',
    //                 onComplete: () => {
    //                     this.lightTriggeringOff = true;
    //                     this.pressedLightSwitch = false
    //                     this.lightSwitchSound.play()
    //                 }
    //             })
    //             this.tweens.add({
    //                 targets: this.lightOnMusic,
    //                 volume: 0,
    //                 duration: onDuration,
    //                 ease: 'Quart.easeIn'
    //             });
    //             this.tweens.add({
    //                 targets: this.backgroundMusic,
    //                 volume: 0.8,
    //                 duration: onDuration,
    //                 ease: 'Quart.easeIn'
    //             })
    //         } else {
    //             this.cancelLightAnimations()
    //             this.lightTurningOff = this.tweens.add({
    //                 targets: this.spotlight,
    //                 alpha: 0,
    //                 duration: onDuration,
    //                 ease: 'Quart.easeIn',
    //                 onComplete: () => {
    //                     this.lightTurningOff = null;
    //                     this.pressedLightSwitch = false
    //                     this.lightSwitchSound.play()
    //                 }
    //             })
    //             this.tweens.add({
    //                 targets: this.lightOnMusic,
    //                 volume: 0,
    //                 duration: onDuration,
    //                 ease: 'Quart.easeIn'
    //             });
    //             this.tweens.add({
    //                 targets: this.backgroundMusic,
    //                 volume: 0.8,
    //                 duration: onDuration,
    //                 ease: 'Quart.easeIn'
    //             })
    //         // }
    //     }
    // }

    buildMap = (levels, levelCounter) => {

        var background = this.add.image(0, 0, 'background')
        background.scaleX = this.game.config.width / background.scaleX 
        background.scaleY = this.game.config.height / background.scaleY 

        // vars to set obj in the center of the game screen
        this.centerX = this.game.config.width/2;
        this.centerY = this.game.config.height/2;


        // generate keyboard keys
        this.cursors = this.input.keyboard.createCursorKeys();


        // create grid on the game scene
        this.gridConfig = {rows: 10, cols: 10, scene: this};
        this.alignGrid = new AlignGrid(this.gridConfig);

        // let the grid visible with index number
        this.alignGrid.show();
        this.alignGrid.showNumbers();

        this.touchedLight = false;
        // Attention future people - do this for a dynamic group of sprites with collision
        this.wallGroup  = this.physics.add.group();
        this.wallGroup.enableBody = true;
        this.wallGroup.physicsBodyType = Phaser.Physics.ARCADE;

        // placing sprites in the center of the screen
        this.door = this.physics.add.sprite(this.centerX, this.centerY, 'door');
        this.door.setScale(0.25);
        this.door.setDepth(1)
        this.light = this.physics.add.sprite(this.centerX, this.centerY, 'light');

        // placing hero in the center of the screen
        this.hero = this.physics.add.sprite(this.centerX, this.centerY, 'hero');
        this.hero.setScale(0.07)
        this.hero.setDepth(11)

        // Standard floor tiles
        this.floorGroup  = this.physics.add.group();

        // Trigger floor tiles that will switch off the light
        this.triggerFloorGroup  = this.physics.add.group();
        this.triggerFloorGroup.enableBody = true;
        this.triggerFloorGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.physics.add.overlap(this.hero, this.triggerFloorGroup, () => {
            this.turnLightOff();
        });

        // collider between hero and edge of the scene
        this.hero.body.collideWorldBounds = true;

        // add animation to hero movement
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('hero', { start: 3, end: 4 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('hero', { start: 1, end: 2 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('hero', { start: 7, end: 8 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('hero', { start: 5, end: 6 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'stop',
            frames: [ { key: 'hero', frame: 0 } ],
            frameRate: 20
        });
        
        // generate game screen from bi-dimensional array on sceneMap
        let count = 0;
        let wall;
        let floor;
        let trigger_floor;
        levels[levelCounter].forEach(row => {
            row.forEach(position => {
                floor = this.floorGroup.create(this.centerX, this.centerY, 'floor').setScale(this.alignGrid.scaleToTileSize());
                floor.body.immovable = true;
                this.alignGrid.placeAtIndex(count, floor);

                switch(position) {
                    case 't':
                        trigger_floor = this.triggerFloorGroup.create(this.centerX, this.centerY, 'trigger_floor').setScale(this.alignGrid.scaleToTileSize());
                        trigger_floor.body.immovable = true;
                        this.alignGrid.placeAtIndex(count, trigger_floor);
                        break;
                    case 'w':
                            // Attention future people - do this for a dynamic group of sprites with collision
                            wall = this.wallGroup.create(this.centerX, this.centerY, 'wall');
                            wall.setScale(0.25)
                            wall.body.immovable = true;
                            this.alignGrid.placeAtIndex(count, wall);
                        break;
                    case 'd':
                        this.alignGrid.placeAtIndex(count, this.door);
                        break;
                    case 'l':
                        this.alignGrid.placeAtIndex(count, this.light);
                        break;
                    case 'h':
                        this.alignGrid.placeAtIndex(count, this.hero);
                        break;
                }
                count++;
            })
        })

        // Darkness rectangle
        this.foreground = this.add.image(0, 0, 'foreground')
        this.foreground.scaleX = this.game.config.width / this.foreground.scaleX
        this.foreground.scaleY = this.game.config.height / this.foreground.scaleY
        this.foreground.setDepth(5);
        
        this.spotlight = this.make.sprite({
            x: 300,
            y: 300,
            key: 'mask',
            add: false
        });
        this.spotlight.alpha = 0

        this.foreground.mask = new Phaser.Display.Masks.BitmapMask(this, this.spotlight)
        this.foreground.mask.invertAlpha = true
        this.foreground.mask.bitmapMask.scale = 3

        // Attention future people - do this for a dynamic group of sprites with collision
        this.physics.add.collider(this.wallGroup, this.hero)

        this.physics.add.overlap(this.hero, this.door, this.nextLevel)

        // Lightswitch scale and initial alpha
        this.light.setScale(0.2);
        this.setLightToAlpha(this.distanceFromHero(this.light), 250)
        // Lightswitch scale and initial alpha and depth
        this.light.setDepth(10)
        this.light.alpha = 0;


        this.physics.add.overlap(this.hero, this.light, () => this.turnLightOn(), null, this);

        this.lightSwitchSound = this.sound.add('lightSwitch')

        this.backgroundMusic = this.sound.add('backgroundMusic', {loop: true, volume: 0.8});
        this.backgroundMusic.play();

        this.lightOnMusic = this.sound.add('lightOnMusic', {loop: true, volume: 0.8});
        
    }

    nextLevel = () => {
        if(this.isDoorAvailable) {
            this.levelCounter++;
            if(this.levelCounter >= levels.length) {
                this.levelCounter = 0
            }
            this.wallGroup.clear(true, true);
            this.hero.destroy();
            this.light.destroy();
            this.door.destroy();
            this.foreground.destroy();
            this.backgroundMusic.destroy();
            this.lightOnMusic.destroy();
            this.isLightOn = false;
            this.isDoorAvailable = false;
            this.buildMap(levels, this.levelCounter)
        }
    }
}
