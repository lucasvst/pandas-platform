import { Game } from "phaser";

import { MainScene } from "./scenes/MainScene";

// More information about config: https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    parent: "phaser-container",
    width: 960,
    height: 540,
    backgroundColor: "#5E81A2",
    pixelArt: true,
    roundPixel: true,
    max: {
        width: 800,
        height: 600,
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "matter",
        matter: {
            gravity: { y: 1 },
            // debug: true,
        }
    },
    scene: [
        MainScene,
    ]
};

new Game(config);