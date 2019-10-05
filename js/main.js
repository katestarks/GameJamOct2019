var game;

window.onload = () => {

    var config = {
        type: Phaser.AUTO,
        width: 480,
        height: 640,
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
        parent: 'phaser-game',
        physics: {
            default: 'arcade',
            arcade: {
                debug: true
            }
        },
        scene: [SceneMain, NextScene]
    };

    game = new Phaser.Game(config);

}
