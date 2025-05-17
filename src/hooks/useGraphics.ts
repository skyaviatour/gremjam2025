import type { FillInput, Graphics } from "pixi.js";
import { useCallback } from "react";

type Options = {
	color: FillInput;
	height: number;
	width: number;
	radius?: number;
};

export function useGraphics(options: Options) {
	const cb = useCallback((g: Graphics) => {
		g.clear();
		g.setFillStyle(options.color);
		g.roundRect(0, 0, options.width, options.height, options.radius);
		g.fill();
		g.pivot.set(options.width / 2, options.height / 2);
	}, []);
	return cb;
}
