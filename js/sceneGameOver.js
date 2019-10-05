class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene')
    }
    preload() {

        this.load.image('star', 'images/star.png');
    }
    create() {

        // vars to set obj in the center of the game screen
        this.centerX = this.game.config.width/2;
        this.centerY = this.game.config.height/2;

        // placing star in the center of the screen
        this.star = this.physics.add.sprite(this.centerX, this.centerY, 'star');

        this.input.on('pointerdown', () => this.scene.start('TitleScene'))

    }
    update(){

    }
}