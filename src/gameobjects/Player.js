import { Physics } from "phaser";

export class Player extends Physics.Arcade.Sprite {

    scene;

    spaceKey;
    downKey;
    leftKey;
    rightKey;

    constructor({ scene }) {
        super(scene, 100, 100, Player.assets.atlas.key, "idle");
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
            this.play('player-running', true)
        })

        this.rightKey.on('down', () => {
            this.body.setVelocityX(150)
            this.setFlipX(false)
            this.play('player-running', true)
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

Player.assets = {
    atlas: {
        key: "player_atlas",
        textureURL: "player/player.png",
        atlasDataURL: "player/player_atlas.json"
    },
    animations: {
        key: "player_anim",
        jsonURL: "player/player_anim.json"
    }
}