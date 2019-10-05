var game;
window.onload = function () {

    var config = {
        type: Phaser.AUTO,
        width: 1024,
        height: 576,
        parent: 'phaser-game',
        scene: [SceneMain]
    };

    var game = new Phaser.Game(config);

}