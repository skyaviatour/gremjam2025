import type { FillInput, Graphics, Point } from "pixi.js";
import { useCallback } from "react";

type Options = {
    color: FillInput;
    height: number;
    width: number;
    radius?: number;
    pivot?: Point;
};

export function useGraphics(options: Options) {
    const cb = useCallback(
        (g: Graphics) => {
            g.clear();
            g.setFillStyle(options.color);
            g.roundRect(0, 0, options.width, options.height, options.radius);
            g.fill();
            g.pivot.set(
                options.pivot?.x ?? options.width / 2,
                options.pivot?.y ?? options.height / 2,
            );
        },
        [options],
    );
    return cb;
}
