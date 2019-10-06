var game;

window.onload = () => {

    var config = {
        type: Phaser.AUTO,
        width: 600,
        height: 600,
        parent: 'phaser-game',
        physics: {
            default: 'arcade',
            arcade: {
                debug: true
            }
        },
        scene: [SceneTitle, SceneMain]
    }

    game = new Phaser.Game(config);

}