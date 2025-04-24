export default function assetLoader (ctx, { assets }) {

    if (assets.atlas) {
        ctx.load.atlas(
            assets.atlas.key,
            assets.atlas.textureURL,
            assets.atlas.atlasDataURL
        );
    }

    if (assets.animations) {
        ctx.load.animation(
            assets.animations.key,
            assets.animations.jsonURL
        );
    }
}