import { Scene } from "phaser";

import assetLoader from "./../core/assetLoader"

import { Player } from "./../gameobjects/Player";

export class MainScene extends Scene {

    player;
    ground;
    map;

    constructor() {
        super("MainScene");
    }

    preload() {
        this.load.setBaseURL(import.meta.env.VITE_BASE_URL || "/");
        this.load.setPath("assets");

        this.load.tilemapTiledJSON('stage', 'tiles/stage_1.json');
        this.load.image('tiles', 'tiles/pixel_art.png');

        assetLoader(this, Player)
    }

    create() {

        this.map = this.make.tilemap({ key: 'stage' });
        const tileset = this.map.addTilesetImage('pixel_art', 'tiles');

        this.ground = this.map.createLayer('ground', tileset);
        this.ground.setCollisionByProperty({ collides: true });

        this.matter.world.convertTilemapLayer(this.ground);

        this.matter.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        const objectsLayer = this.map.getObjectLayer('objects');
        objectsLayer.objects.forEach((obj) => {
            if (obj.name === 'player-spawn') {
                if (this.player) { return; }
                this.player = new Player({
                    scene: this,
                    x: obj.x - (obj.width * 0.5),
                    y: obj.y - obj.height
                });
                this.player.start()
                this.cameras.main.startFollow(this.player);
            }
        });

        this.debugGraphics = this.add.graphics();
        this.drawDebug();
    }

    update (time, delta) {
        this.player.update()
    }

    drawDebug () {
        // this.debugGraphics.clear();
        // this.map.renderDebug(this.debugGraphics, { tileColor: null });
    }

}