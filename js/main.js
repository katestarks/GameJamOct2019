var game;

window.onload = () => {

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


    game = new Phaser.Game(config);

}
