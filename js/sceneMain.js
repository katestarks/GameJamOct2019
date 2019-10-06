class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {

        this.load.image('hero', 'images/hero.png');
        this.load.image('star', 'images/star.png')
        this.load.image('background', 'images/background.png')
        this.load.image('foreground', 'images/black_layer.png')
        this.load.image('mask', 'images/light-mask.png')
    }
    create() {

        console.log(this)

        var background = this.add.image(0, 0, 'background')
        background.scaleX = this.game.config.width / background.scaleX 
        background.scaleY = this.game.config.height / background.scaleY 

        // vars to set obj in the center of the game screen
        this.centerX = this.game.config.width/2;
        this.centerY = this.game.config.height/2;

        // placing hero in the center of the screen
        this.hero = this.physics.add.sprite(this.centerX, this.centerY, 'hero');

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
        console.log(this.foreground.mask)


        // collider between hero and edge of the scene
        this.hero.body.collideWorldBounds = true;

        // generate keyboard keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // placing light 'switch' on screen
        this.lightswitch = this.physics.add.sprite(50, 50, 'star');

        // Lightswitch scale and initial alpha
        this.lightswitch.setScale(2);
        this.setLightToAlpha(this.distanceFromHero(this.lightswitch), 250)

        this.physics.add.overlap(this.hero, this.lightswitch, this.turnOnLight, null, this);
        this.pressedLightSwitch = false
    }

    update() {
        // let the hero moves (stop if key in not pushed)
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

        // If moving diagonally, limit the speed to the same as if you were moving along only one axis
        if(this.hero.body.velocity.x && this.hero.body.velocity.y) {
            this.hero.body.velocity.x *= Math.SQRT1_2
            this.hero.body.velocity.y *= Math.SQRT1_2
        }

        // If hero is moving in any direction
        if (this.hero.body.velocity.x || this.hero.body.velocity.y) {
            this.setLightToAlpha(this.distanceFromHero(this.lightswitch), 250)
            this.foreground.mask.bitmapMask.x = this.hero.x
            this.foreground.mask.bitmapMask.y = this.hero.y
        }
    }

    distanceFromHero(el) 
    {
        let xCoord = Math.abs(el.body.x - this.hero.body.x)
        let yCoord = Math.abs(el.body.y - this.hero.body.y)

        return xCoord + yCoord
    }

    setLightToAlpha(distance, scale) {
        let alpha = 1 - (distance/scale)
        if (alpha < 0) {
            alpha = 0
        }
        this.lightswitch.alpha = alpha
    }

    turnOnLight() {
        if (!this.pressedLightSwitch) {
            this.tweens.add({
                targets: this.spotlight,
                alpha: 1,
                duration: 2000,
                ease: 'Sine.easeIn',
                onComplete: () => {this.tweens.add({
                    targets: this.spotlight,
                    alpha: 0,
                    duration: 10000,
                    ease: 'Sine.easeIn',
                    onComplete: () => this.pressedLightSwitch = false
                })}
            });
            this.pressedLightSwitch = true
        }
        // The above sort of works, but I would rather the spotlight get bigger, than brighter
        // if (!this.pressedLightSwitch) {
        //     this.tweens.add({
        //         targets: this.foreground.mask.bitmapMask,
        //         scale: 1,
        //         duration: 2000,
        //         ease: 'Sine.easeIn',
        //         onComplete: () => {this.tweens.add({
        //             targets: this.foreground.mask.bitmapMask,
        //             scale: 0,
        //             duration: 10000,
        //             ease: 'Sine.easeIn',
        //         })}
        //     });
        //     this.pressedLightSwitch = true
        // }
    }
}
