import { extend, useApplication } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import { useCallback, type Dispatch } from "react";
import type { SceneAction } from "../reducers/sceneReducer";

extend({ Text, Container, Graphics });

type Props = {
	visible?: boolean;
	coordinator: Dispatch<SceneAction>;
};

export default function TitleScene({ visible, coordinator }: Props) {
	const { app } = useApplication();

	const labelDrawCallback = useCallback((graphics: Graphics) => {
		graphics.clear();
		graphics.setFillStyle({ color: 0x1e1e1e });
		graphics.roundRect(0, 0, 150, 50, 6);
		graphics.fill();
	}, []);

	const buttonDrawCallback = useCallback((graphics: Graphics) => {
		graphics.clear();
		graphics.setFillStyle({ color: 0x1e1e1e });
		graphics.roundRect(0, 0, 100, 50, 8);
		graphics.fill();
	}, []);

	const buttonClickHandler = useCallback((_event: MouseEvent) => {
		coordinator({ name: "swapScene", value: "gameSceneActive" });
	}, []);

	return (
		<pixiContainer visible={visible ?? true}>
			<pixiContainer x={app.canvas.width / 2} y={app.canvas.height / 4}>
				<pixiGraphics draw={labelDrawCallback} pivot={{ x: 75, y: 25 }} />
				<pixiText
					anchor={{ x: 0.5, y: 0.5 }}
					x={0}
					y={0}
					text={"Gremgame"}
					style={{ fontFamily: "Verdana", fontSize: 24, fill: 0xff0000 }}
				/>
			</pixiContainer>
			<pixiContainer
				x={app.canvas.width / 2}
				y={(app.canvas.height * 3) / 4}
				interactive={true}
				onClick={buttonClickHandler}
			>
				<pixiGraphics draw={buttonDrawCallback} pivot={{ x: 50, y: 25 }} />
				<pixiText
					text={"Start"}
					anchor={{ x: 0.5, y: 0.5 }}
					style={{ fontFamily: "Verdana", fontSize: 20, fill: 0xff0000 }}
				/>
			</pixiContainer>
		</pixiContainer>
	);
}
