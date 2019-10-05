var game;
window.onload = function () {

    var config = {
        type: Phaser.AUTO,
        width: 600,
        height: 600,
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
        scene: [SceneMain, GameOverScene, TitleScene]
    };


    var game = new Phaser.Game(config);

}
