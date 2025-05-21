import { useCallback, type Dispatch } from "react";
import type { SceneAction } from "../reducers/sceneReducer";
import { Point } from "pixi.js";
import { useApplication } from "@pixi/react";
import { useGraphics } from "../hooks/useGraphics";

type Props = {
    visible?: boolean;
    coordinator: Dispatch<SceneAction>;
};

export default function PauseScene({ visible, coordinator }: Props) {
    const { app } = useApplication();
    const unpauseButtonBackgroundDraw = useGraphics({
        color: 0x101010,
        width: 120,
        height: 40,
        radius: 8,
        pivot: new Point(60, 20),
    });

    const unpauseButtonClickHandler = useCallback((_ev: MouseEvent) => {
        coordinator({ name: "swapScene", value: "gameSceneActive" });
    }, []);

    return (
        <pixiContainer visible={visible} isRenderGroup>
            <pixiText
                anchor={0.5}
                x={app.canvas.width / 2}
                y={app.canvas.height / 6}
                text="Paused"
                style={{ fontSize: 36, fill: 0xff0000 }}
            />
            <pixiContainer
                x={app.canvas.width / 2}
                y={(app.canvas.height * 5) / 6}
                interactive={true}
                onClick={unpauseButtonClickHandler}
            >
                <pixiGraphics draw={unpauseButtonBackgroundDraw} />
                <pixiText
                    anchor={0.5}
                    text="Continue"
                    style={{ fontSize: 24, fill: 0xff0000 }}
                />
            </pixiContainer>
        </pixiContainer>
    );
}
