var game;
window.onload = function () {

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
        scene: [SceneMain]
    }

    var game = new Phaser.Game(config);

}