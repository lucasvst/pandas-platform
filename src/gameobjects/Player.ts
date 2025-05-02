const footSensorFactory = (
    sprite: Phaser.Physics.Matter.Sprite,
    scene: Phaser.Scene
) => {

    const { width, height, x, y } = sprite.getBounds()

    const playerWidth = width * .6

    const sensorWidth = width * .6;
    const sensorHeight = 5;

    const mainBodyShape = scene.matter.bodies.rectangle(
        x,
        y,
        playerWidth,
        height,
        {
            label: 'mainBody'
        }
    )

    const footSensor = scene.matter.bodies.rectangle(
        x,
        y + (height / 2) - (sensorHeight / 2),
        sensorWidth,
        sensorHeight,
        {
            isSensor: true,
            label: 'footSensor',
            density: 0.0001,
        }
    )

    const compoundBody = sprite.scene.matter.body.create({
        parts: [mainBodyShape, footSensor],
        inertia: Infinity,
        friction: 0.001,
        frictionStatic: 0.1,
        frictionAir: 0.0,
    })

    sprite.setExistingBody(compoundBody, true)

    return footSensor
}

export class Player extends Phaser.Physics.Matter.Sprite {

    static assets

    scene;

    footSensor;
    groundContacts = 0;

    speed = 5;
    isOnFloor;

    spaceKey;
    downKey;
    leftKey;
    rightKey;

    constructor({ scene, x = 0, y = 0 }) {

        super(scene.matter.world, x, y, Player.assets.atlas.key, "idle");

        this.scene = scene;
        this.scene.add.existing(this);

        this.footSensor = footSensorFactory(this, this.scene);

        this.setFixedRotation()
    }

    start () {

        this.spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.downKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        this.leftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.rightKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        this.scene.matter.world.on('collisionstart', this.handleCollisionStart, this);
        this.scene.matter.world.on('collisionend', this.handleCollisionEnd, this);

        this.play("player-idle");
    }

    update (time, delta) {

        if (!this.isOnFloor) {
            this.play('player-jumping', true)
        }

        if (this.spaceKey.isDown) {
            if (!this.isOnFloor) { return }
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

    handleCollisionStart(event) {

        const pairs = event.pairs;

        for (let i = 0; i < pairs.length; i++) {

            const pair = pairs[i];

            if (pair.bodyA === this.footSensor || pair.bodyB === this.footSensor) {

                const otherBody = (pair.bodyA === this.footSensor) ? pair.bodyB : pair.bodyA;

                if (!otherBody.isSensor && pair.collision.normal.y > 0) {
                    this.groundContacts++;
                    this.isOnFloor = (this.groundContacts > 0);
                }
            }
        }
    }

    handleCollisionEnd(event) {

        const pairs = event.pairs;

        for (let i = 0; i < pairs.length; i++) {

            const pair = pairs[i];

             if (pair.bodyA === this.footSensor || pair.bodyB === this.footSensor) {

                const otherBody = (pair.bodyA === this.footSensor) ? pair.bodyB : pair.bodyA;

                if (!otherBody.isSensor) {
                    this.groundContacts--;
                    this.groundContacts = Math.max(0, this.groundContacts);
                    this.isOnFloor = (this.groundContacts > 0);
                }
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