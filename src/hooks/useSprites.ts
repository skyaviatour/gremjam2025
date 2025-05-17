import { Assets } from "pixi.js";
import { useEffect, useState } from "react";

export function useSprites() {
    const [sprites, setSprites] = useState(null);

    useEffect(() => {
        Assets.load("/sprites/spritesheet.json").then((a) =>
            setSprites(a.textures),
        );
    });

    return { sprites };
}
