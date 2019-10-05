class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
        // load our images or sounds
        this.load.image('sprite', 'assets/sprite.png');
    }
    create() {
        console.log("Ready!");
        //  define our objects
        const player = this.physics.add.sprite(150, 150, 'sprite');
        player.setCollideWorldBounds(true);
    }
    update() {
        //  constant running loop
    }
    customFunctions() {
        //  our custom functions to call them when we need
    }
}