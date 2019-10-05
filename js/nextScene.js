class NextScene extends Phaser.Scene {
    constructor() {
        super('NextScene')
    }
    preload() {

        this.load.image('star', 'assets/star.png');
    }
    create() {

        // vars to set obj in the center of the game screen
        this.centerX = game.config.width/2;
        this.centerY = game.config.height/2;

        // placing star in the center of the screen
        this.star = this.physics.add.sprite(this.centerX, this.centerY, 'star');

        this.input.on('pointerdown', () => this.scene.start('SceneMain'))

    }
    update(){

    }
}
