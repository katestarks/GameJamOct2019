var game;

window.onload = () => {

    var config = {
        type: Phaser.AUTO,
        width: 600,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 0},
                debug: true
            }
        },
        parent: 'phaser-game',
        scene: [SceneMain]
    };

    game = new Phaser.Game(config);

}