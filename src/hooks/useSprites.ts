import { Assets } from "pixi.js";
import { useEffect, useState } from "react";

type Options = {
    bundles: string[];
};

export function useSprites({ bundles }: Options) {
    const [sprites, setSprites] = useState(null);
    const [items, setItems] = useState(null);

    useEffect(() => {
        Assets.loadBundle(bundles).then((a) => {
            console.log(a);
            setSprites(a.bundle.sprites.textures);
            setItems(a.bundle.items.textures);
        });
    }, []);

    return { sprites, items };
}
