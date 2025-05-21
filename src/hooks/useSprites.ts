import { Assets } from "pixi.js";
import { useEffect, useState } from "react";

type Options = {
    bundles: string[];
};

export function useSprites({ bundles }: Options) {
    const [sprites, setSprites] = useState(null);
    const [items, setItems] = useState(null);

    useEffect(() => {
        if (bundles.length === 0) return;

        Assets.loadBundle(bundles).then((a) => {
            if (Object.keys(a).length === 0) return;

            setSprites(a.bundle.sprites.textures);
            setItems(a.bundle.items.textures);
        });
    }, [bundles]);

    return { sprites, items };
}
