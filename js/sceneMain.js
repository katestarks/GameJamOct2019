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
        

        // Sound effects
        this.load.audio('lightSwitch', 'sound_effects/light_switch.mp3')
        this.load.audio('backgroundMusic', 'sounds/background.mp3');
        this.load.audio('lightOnMusic', 'sounds/happy_music.mp3');

    }

    create() {
        var background = this.add.image(0, 0, 'background')
        background.scaleX = this.game.config.width / background.scaleX 
        background.scaleY = this.game.config.height / background.scaleY 

        // vars to set obj in the center of the game screen
        this.centerX = this.game.config.width/2;
        this.centerY = this.game.config.height/2;

        // Attention future people - do this for a dynamic group of sprites with collision
        this.wallGroup  = this.physics.add.group();
        this.wallGroup.enableBody = true;
        this.wallGroup.physicsBodyType = Phaser.Physics.ARCADE;

        // placing sprites in the center of the screen
        this.door = this.physics.add.sprite(this.centerX, this.centerY, 'door');
        this.light = this.physics.add.sprite(this.centerX, this.centerY, 'light');

        // placing hero in the center of the screen
        this.hero = this.physics.add.sprite(this.centerX, this.centerY, 'hero');
        this.hero.setScale(0.1)

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

        // generate keyboard keys
        this.cursors = this.input.keyboard.createCursorKeys();


        // create grid on the game scene
        this.gridConfig = {rows: 10, cols: 10, scene: this};
        this.alignGrid = new AlignGrid(this.gridConfig);

        // let the grid visible with index number
        this.alignGrid.show();
        this.alignGrid.showNumbers();

        // generate game screen from bi-dimensional array on sceneMap
        let count = 0;
        let wall;
        levels.levelTwo.forEach(row => {
            row.forEach(position => {
                switch(position) {
                    case 'f':
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
                    case 't':
                        this.alignGrid.placeAtIndex(count, this.light);
                        break;
                    case 'h':
                        this.alignGrid.placeAtIndex(count, this.hero);
                        break;
                }
                count++;
            })
        })

        //CREATE ALL ASSETS ABOVE THIS LINE

        // Darkness rectangle
        this.foreground = this.add.image(0, 0, 'foreground')
        this.foreground.scaleX = this.game.config.width / this.foreground.scaleX
        this.foreground.scaleY = this.game.config.height / this.foreground.scaleY
        
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

        // Lightswitch scale and initial alpha
        this.light.setScale(0.2);
        this.setLightToAlpha(this.distanceFromHero(this.light), 250)


        this.physics.add.overlap(this.hero, this.light, () => this.turnOnLight(), null, this);
        this.pressedLightSwitch = false

        this.lightSwitchSound = this.sound.add('lightSwitch')

        this.backgroundMusic = this.sound.add('backgroundMusic', {loop: true, volume: 0.5});
        this.backgroundMusic.play();

        this.lightOnMusic = this.sound.add('lightOnMusic', {loop: true, volume: 0});
        
    }

    update() {
        // let the hero moves (stop if key in not pushed)
        if (this.cursors.left.isDown && !this.cursors.right.isDown) {
            this.hero.setVelocityX(-160);
            this.hero.anims.play('left', true); 
        } else if (!this.cursors.left.isDown && this.cursors.right.isDown){
            this.hero.setVelocityX(160);
            this.hero.anims.play('right', true); 
        } else {
            this.hero.setVelocityX(0);
        }
        if (this.cursors.up.isDown && !this.cursors.down.isDown) {
            this.hero.setVelocityY(-160);
            this.hero.anims.play('up', true); 
        } else if (!this.cursors.up.isDown && this.cursors.down.isDown){
            this.hero.setVelocityY(160);
            this.hero.anims.play('down', true); 
        } else {
            this.hero.setVelocityY(0);
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

        // If hero is moving in any direction
        if (this.hero.body.velocity.x || this.hero.body.velocity.y) {
            let distance = this.distanceFromHero(this.light)
            this.setLightToAlpha(distance, 200)
            this.foreground.mask.bitmapMask.x = this.hero.x
            this.foreground.mask.bitmapMask.y = this.hero.y
            if (this.pressedLightSwitch && distance > 85) {
                this.pressingLightSwitch = false
                this.turnOffLight({onDuration: 5000})
            }
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

    turnOnLight(options = {}) {
        this.pressingLightSwitch = true
        if (!this.pressedLightSwitch) {
            this.lightSwitchSound.play();
            this.backgroundMusic.volume = 0;
            this.lightOnMusic.volume = 0.8;
            this.lightOnMusic.play();
            this.tweens.add({
                targets: this.spotlight,
                alpha: 1,
                duration: 500,
                ease: 'Sine.easeIn'
            });
            this.pressedLightSwitch = true
        }
    }

    turnOffLight(options = {}) {
        let onDuration = 10000
        if ('onDuration' in options) {
            onDuration = options.onDuration
        }
        if (!this.pressingLightSwitch) {
            this.tweens.add({
                targets: this.spotlight,
                alpha: 0,
                duration: onDuration,
                ease: 'Quart.easeIn',
                onComplete: () => {
                    this.pressedLightSwitch = false
                    this.lightSwitchSound.play()
                }
            });
            this.tweens.add({
                targets: this.lightOnMusic,
                volume: 0,
                duration: onDuration,
                ease: 'Quart.easeIn'
            });
            this.tweens.add({
                targets: this.backgroundMusic,
                volume: 0.8,
                duration: onDuration,
                ease: 'Quart.easeIn'
            })
        }
    }
}
