import { Scene } from "phaser";

import assetLoader from "./../core/assetLoader"

import { Panda } from "./../gameobjects/Panda";

export class MainScene extends Scene {

    panda;
    ground;
    map;

    constructor() {
        super("MainScene");
    }

    preload() {
        this.load.setPath("assets");

        this.load.tilemapTiledJSON('stage', 'tiles/stage_1.json');
        this.load.image('tiles', 'tiles/pixel_art.png');

        assetLoader(this, Panda)
    }

    create() {

        this.panda = new Panda({ scene: this });
        this.panda.start()
        this.cameras.main.startFollow(this.panda);

        this.map = this.make.tilemap({ key: 'stage' });
        const tileset = this.map.addTilesetImage('pixel_art', 'tiles');

        this.ground = this.map.createLayer('ground', tileset);
        this.ground.setCollisionByProperty({ collides: true });

        this.physics.add.collider(this.panda, this.ground);

        this.debugGraphics = this.add.graphics();
        this.drawDebug();
    }

    update (time, delta) {
        this.panda.update()
    }

    drawDebug () {
        this.debugGraphics.clear();
        this.map.renderDebug(this.debugGraphics, { tileColor: null });
    }

}