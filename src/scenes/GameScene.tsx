import { useApplication, useTick } from "@pixi/react";
import { Assets, Rectangle, Sprite, Texture, type Graphics } from "pixi.js";
import { useCallback, useEffect, useRef, useState, type Dispatch } from "react";
import type { SceneAction } from "../reducers/sceneReducer";

type Props = {
	visible?: boolean;
	coordinator: Dispatch<SceneAction>;
};

export default function GameScene({ visible, coordinator }: Props) {
	const { app } = useApplication();
	const [elapsed, setElapsed] = useState(0);
	const [grem1, setGrem1] = useState(Texture.EMPTY);
	const grem1Ref = useRef<Sprite>(null);
	const [grem2, setGrem2] = useState(Texture.EMPTY);
	const grem2Ref = useRef<Sprite>(null);
	const [grem3, setGrem3] = useState(Texture.EMPTY);
	const grem3Ref = useRef<Sprite>(null);

	const pauseButtonBackgroundDraw = useCallback((g: Graphics) => {
		g.clear();
		g.setFillStyle(0x101010);
		g.roundRect(0, 0, 80, 80, 8);
		g.fill();
		g.pivot.set(40, 40);
	}, []);

	const pauseButtonForegroundDraw = useCallback((g: Graphics) => {
		g.clear();
		g.setFillStyle(0x303030);
		g.roundRect(0, 0, 20, 60);
		g.fill();
		g.pivot.set(10, 30);
	}, []);

	const pauseButtonClickHandler = useCallback((_ev: MouseEvent) => {
		coordinator({ name: "swapScene", value: "pauseSceneActive" });
	}, []);

	const pointerMoveHandler = (ev: MouseEvent) => {
		if (grem3Ref.current) {
			grem3Ref.current.position.copyFrom(ev.global);
		}
	};

	useEffect(() => {
		Assets.load("/sprites/spritesheet.json").then((a) => {
			console.log(a);
			if (grem1 === Texture.EMPTY) setGrem1(a.textures["grem1.png"]);

			if (grem2 === Texture.EMPTY) setGrem2(a.textures["grem2.png"]);

			if (grem3 === Texture.EMPTY) setGrem3(a.textures["grem3.png"]);
		});
	}, [grem1, grem2, grem3]);

	useTick({
		callback(ticker) {
			setElapsed((cur) => (cur += ticker.deltaTime));
			ticker.maxFPS = 60;
			if (grem1Ref.current)
				grem1Ref.current.x = 200 + Math.cos(elapsed / 25) * 100;
			if (grem2Ref.current) grem2Ref.current.angle += ticker.deltaTime * 4;
		},
		isEnabled: visible,
	});

	return (
		<pixiContainer
			onMouseMove={pointerMoveHandler}
			visible={visible ?? true}
			hitArea={new Rectangle(0, 0, app.canvas.width, app.canvas.height)}
			style={{ fill: 0x00ff00 }}
		>
			<pixiContainer>
				<pixiSprite
					ref={grem1Ref}
					anchor={0.5}
					x={100}
					y={50}
					scale={0.5}
					texture={grem1}
				/>
				<pixiSprite
					ref={grem2Ref}
					anchor={0.5}
					x={100}
					y={150}
					scale={0.5}
					texture={grem2}
				/>
				<pixiSprite
					ref={grem3Ref}
					anchor={0.5}
					x={100}
					y={250}
					scale={0.5}
					texture={grem3}
				/>
			</pixiContainer>
			<pixiContainer
				interactive={true}
				x={(app.canvas.width * 7) / 8}
				y={app.canvas.height / 8}
				onClick={pauseButtonClickHandler}
			>
				<pixiGraphics draw={pauseButtonBackgroundDraw} />
				<pixiGraphics x={-15} draw={pauseButtonForegroundDraw} />
				<pixiGraphics x={15} draw={pauseButtonForegroundDraw} />
			</pixiContainer>
		</pixiContainer>
	);
}
