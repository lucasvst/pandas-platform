import { Physics } from "phaser";

export class Panda extends Physics.Arcade.Sprite {

    scene;

    spaceKey;
    downKey;
    leftKey;
    rightKey;

    constructor({ scene }) {
        super(scene, 100, 100, Panda.assets.atlas.key, "idle");
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    start () {
        this.spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.downKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        this.leftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.rightKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        this.spaceKey.on('down', () => {
            if (!this.body.onFloor()) { return }
            this.body.setVelocityY(-150)
        })

        this.downKey.on('down', () => {
            this.body.setVelocityY(150)
        })

        this.leftKey.on('down', () => {
            this.body.setVelocityX(-150)
            this.setFlipX(true)
            this.play('panda-running', true)
        })

        this.rightKey.on('down', () => {
            this.body.setVelocityX(150)
            this.setFlipX(false)
            this.play('panda-running', true)
        })
    }

    update (time, delta) {
        if (!this.body.onFloor()) {
            this.setFrame('jumping')
        }
        if (!this.leftKey.isDown && !this.rightKey.isDown) {
            this.setVelocityX(0)
            if (this.body.onFloor()) {
                this.stop().setFrame("idle")
            }
        }
    }

}

Panda.assets = {
    atlas: {
        key: "panda_atlas",
        textureURL: "panda/panda.png",
        atlasDataURL: "panda/panda_atlas.json"
    },
    animations: {
        key: "panda_anim",
        jsonURL: "panda/panda_anim.json"
    }
}