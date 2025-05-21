import type { FillInput, Graphics, Point, StrokeInput } from "pixi.js";
import { useCallback } from "react";

type Options = {
    color: FillInput;
    height: number;
    width: number;
    radius?: number;
    pivot?: Point;
    stroke?: StrokeInput;
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
            if (options.stroke != null) {
                g.setStrokeStyle(options.stroke);
                g.stroke();
            }
        },
        [options],
    );
    return cb;
}
