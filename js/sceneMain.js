class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }

    // getYFromIndex = index =>  Math.floor(index / 10);

    // getXFromIndex = index => index - (Math.floor(index / 10) * 10);

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

        // placing hero in the center of the screen
        this.hero = this.physics.add.sprite(this.centerX, this.centerY, 'Hero');
        this.door = this.physics.add.sprite(this.centerX, this.centerY, 'Door');
        this.light = this.physics.add.sprite(this.centerX, this.centerY, 'Light');
        this.wall = this.physics.add.staticGroup();
        
        // this.physics.add.collider(this.wall, this.hero, this.hitWall());

        // collider between hero and edge of the scene
        this.hero.body.collideWorldBounds = true;

        // generate keyboard keys
        this.cursors = this.input.keyboard.createCursorKeys();

        this.gridConfig = {rows: 10, cols: 10, scene: this};
        this.alignGrid = new AlignGrid(this.gridConfig);
        this.alignGrid.show();
        this.alignGrid.showNumbers();



        let count = 0;
        levels.levelTwo.forEach(row => {
            row.forEach(position => {
                // if (count > 0) {

                // } else {
                switch(position) {
                    case 'f':
                        break;
                    case 'w':
                        this.wall.create(this.centerX, this.centerY, 'Wall');
                        this.alignGrid.placeAtIndex(count, this.wall);
                        this.physics.add.collider(this.wall, this.hero);
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
    
    hitWall() {
        console.log('boom');
    }
}