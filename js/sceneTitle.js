class SceneTitle extends Phaser.Scene {

    constructor() {
        super('SceneTitle');
    }

    preload() {
        this.load.image('logo', 'images/logo.png');
        this.load.image('play', 'images/play_button.png');
    }

    create() {
        // create and display grid
        this.alignGrid = new AlignGrid({rows: 11, cols: 11, scene: this});
        // this.alignGrid.showNumbers();

        // place the resized logo on the screen 
        var title = this.add.image(0, 0, 'logo');
        title.displayWidth = game.config.width * 0.9;
        this.alignGrid.placeAtIndex(49, title);

        // place the resized button
        var playButton = this.physics.add.image(50, 50, 'play');
        playButton.displayWidth = game.config.width * 0.3;
        playButton.displayHeight = game.config.height * 0.1;
        this.alignGrid.placeAtIndex(93, playButton);

        // make the button clickable and run the game (SceneMain)
        playButton.setInteractive();
        this.input.on('gameobjectdown',this.startGame, this);
    }

    update() {
    }

    startGame() {
        this.scene.start('SceneMain');
    }
}