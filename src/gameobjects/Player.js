export class Player extends Phaser.Physics.Matter.Sprite {

    scene;

    speed = 5;
    isOnFloor = false;

    spaceKey;
    downKey;
    leftKey;
    rightKey;

    constructor({ scene, x = 0, y = 0 }) {
        super(scene.matter.world, x, y, Player.assets.atlas.key, "idle");
        this.scene = scene;
        this.scene.add.existing(this);
    }

    start () {
        this.spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.downKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        this.leftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.rightKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        this.setOnCollide(_ => { this.isOnFloor = true })
        this.setFixedRotation()
    }

    update (time, delta) {

        if (this.spaceKey.isDown) {
            if (!this.isOnFloor) { return }
            this.isOnFloor = false
            this.setVelocityY(-this.speed)
            this.play('player-jumping', true)
        }

        if (!this.leftKey.isDown && !this.rightKey.isDown) {
            this.setVelocityX(0)
            if (this.isOnFloor) {
                this.play("player-idle", true)
            }
        }

        if (this.leftKey.isDown) {
            this.setVelocityX(-this.speed)
            this.setFlipX(true)
            if (this.isOnFloor) {
                this.play('player-running', true)
            }
        }
        if (this.rightKey.isDown) {
            this.setVelocityX(this.speed)
            this.setFlipX(false)
            if (this.isOnFloor) {
                this.play('player-running', true)
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