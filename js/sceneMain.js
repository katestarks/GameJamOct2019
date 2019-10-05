class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {

        this.load.image('hero', 'images/hero.png');
        this.load.image('star', 'images/star.png')
    }
    create() {

        // vars to set obj in the center of the game screen
        this.centerX = game.config.width/2;
        this.centerY = game.config.height/2;

        // placing light 'switch' on screen
        this.lightswitch = this.physics.add.sprite(50, 0, 'star');


        //CREATE ALL ASSETS ABOVE THIS LINE

        // Darkness rectangle


        // placing hero in the center of the screen
        this.hero = this.physics.add.sprite(this.centerX, this.centerY, 'hero');

        // collider between hero and edge of the scene
        this.hero.body.collideWorldBounds = true;

        // generate keyboard keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // collider between lightswitch and edge of the scene
        this.lightswitch.body.collideWorldBounds = true;
        this.lightswitch.setScale(2);

    }
    update() {

        // let the hero moves (stop if key in not pushed)
        if (this.cursors.left.isDown) {
            this.hero.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.hero.setVelocityX(160);
        } else if (this.cursors.up.isDown) {
            this.hero.setVelocityY(-160);
        } else if (this.cursors.down.isDown) {
            this.hero.setVelocityY(160)
        } else {
            this.hero.setVelocityX(0);
            this.hero.setVelocityY(0);
        }
        
        this.setLightToAlpha(this.distanceFromHero(this.lightswitch), 250)
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

}
