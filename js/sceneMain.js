class SceneMain extends Phaser.Scene {
    
    constructor() {
        super('SceneMain');
    }

    preload() {
        this.load.image('Hero', 'images/hero.png');
        this.load.image('Door', 'images/door.png');
        this.load.image('Light', 'images/light.png');
        this.load.image('Wall', 'images/wall.png');
    }

    create() {
        // vars to set obj in the center of the game screen
        this.centerX = game.config.width/2;
        this.centerY = game.config.height/2;

        // placing sprites in the center of the screen
        this.hero = this.physics.add.sprite(this.centerX, this.centerY, 'Hero');
        this.door = this.physics.add.sprite(this.centerX, this.centerY, 'Door');
        this.light = this.physics.add.sprite(this.centerX, this.centerY, 'Light');

        // Attention future people - do this for a dynamic group of sprites with collision
        this.wallGroup  = this.physics.add.group();
        this.wallGroup.enableBody = true;
        this.wallGroup.physicsBodyType = Phaser.Physics.ARCADE;

        // collider between hero and edge of the scene
        this.hero.body.collideWorldBounds = true;

        // generate keyboard keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // create grid on the game scene
        this.gridConfig = {rows: 10, cols: 10, scene: this};
        this.alignGrid = new AlignGrid(this.gridConfig);

        // let the grid visible with index number
        this.alignGrid.show();
        this.alignGrid.showNumbers();

        // generate game screen from bi-dimensional array on sceneMap
        let count = 0;
        let wall;
        levels.levelTwo.forEach(row => {
            row.forEach(position => {
                switch(position) {
                    case 'f':
                        break;
                    case 'w':
                            // Attention future people - do this for a dynamic group of sprites with collision
                            wall = this.wallGroup.create(this.centerX, this.centerY, 'Wall');
                            wall.body.immovable = true;
                            this.alignGrid.placeAtIndex(count, wall);
                        break;
                    case 'd':
                        this.alignGrid.placeAtIndex(count, this.door);
                        break;
                    case 't':
                        this.alignGrid.placeAtIndex(count, this.light);
                        break;
                    case 'h':
                        this.alignGrid.placeAtIndex(count, this.hero);
                        break;
                }
                count++;
            })
        })
        // Attention future people - do this for a dynamic group of sprites with collision
        this.physics.add.collider(this.wallGroup, this.hero)
    }

    update() {
        // let the hero moves (stop if key in not pushed)
        if (this.cursors.left.isDown && !this.cursors.right.isDown) {
            this.hero.setVelocityX(-160);
        } else if (!this.cursors.left.isDown && this.cursors.right.isDown){
            this.hero.setVelocityX(160);
        } else {
            this.hero.setVelocityX(0);
        }
        if (this.cursors.up.isDown && !this.cursors.down.isDown) {
            this.hero.setVelocityY(-160);
        } else if (!this.cursors.up.isDown && this.cursors.down.isDown){
            this.hero.setVelocityY(160);
        } else {
            this.hero.setVelocityY(0);
        }
        // If moving diagonally, limit the speed to the same as if you were moving along only one axis
        if(this.hero.body.velocity.x && this.hero.body.velocity.y) {
            this.hero.body.velocity.x *= Math.SQRT1_2
            this.hero.body.velocity.y *= Math.SQRT1_2
        }
    }
}