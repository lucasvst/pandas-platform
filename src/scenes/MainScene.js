import { Scene } from "phaser";

import assetLoader from "./../core/assetLoader"

import { Panda } from "./../gameobjects/Panda";

export class MainScene extends Scene {

    panda;
    floor;

    spaceKey;
    leftKey;
    rightKey;

    constructor() {
        super("MainScene");
    }

    preload() {
        this.load.setPath("assets");
        this.load.image("floor", "floor.png");

        assetLoader(this, Panda)
    }

    create() {

        this.panda = new Panda({ scene: this });
        this.panda.start()

        this.floor = this.physics.add.staticSprite(400, 500, 'floor');
        this.floor.setScale(2).refreshBody()

        this.physics.add.collider(this.panda, this.floor);

        this.cameras.main.startFollow(this.panda);
    }

    update (time, delta) {
        this.panda.update()
    }

}