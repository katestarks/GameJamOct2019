class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
        this.load.image('hero', 'images/hero.png');
    }
    create() {

        // vars to set obj in the center of the game screen
        this.centerX = game.config.width/2;
        this.centerY = game.config.height/2;

        // placing hero in the center of the screen
        this.hero = this.physics.add.sprite(this.centerX, this.centerY, 'hero');

        // collider between hero and edge of the scene
        this.hero.body.collideWorldBounds = true;

        // generate keyboard keys
        this.cursors = this.input.keyboard.createCursorKeys();

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
        
    }
    customFunctions() {
        //  our custom functions to call them when we need
    }
}