import { useApplication } from "@pixi/react";
import type { Graphics } from "pixi.js";
import { useCallback, type Dispatch } from "react";
import type { SceneAction } from "../reducers/sceneReducer";

type Props = {
	visible?: boolean;
	coordinator: Dispatch<SceneAction>;
};

export default function GameScene({ visible, coordinator }: Props) {
	const { app } = useApplication();
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
	return (
		<pixiContainer visible={visible ?? true}>
			<pixiContainer x={app.canvas.width / 2} y={app.canvas.height / 4}>
				<pixiText
					anchor={0.5}
					text="you are in the game now grats"
					style={{ fontSize: 40, fill: 0xff0000 }}
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
