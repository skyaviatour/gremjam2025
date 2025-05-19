// .assetpack.js
import { pixiPipes } from '@assetpack/core/pixi';

export default {
    entry: './assets',
    output: './public/assets',
    pipes: [
        ...pixiPipes({}),
    ],
};