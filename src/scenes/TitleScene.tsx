import { useApplication } from "@pixi/react";
import { useCallback, type Dispatch } from "react";
import type { SceneAction } from "../reducers/sceneReducer";
import { useGraphics } from "../hooks/useGraphics";

type Props = {
    visible?: boolean;
    coordinator: Dispatch<SceneAction>;
};

export default function TitleScene({ visible, coordinator }: Props) {
    const { app } = useApplication();

    const labelDrawCallback = useGraphics({
        color: 0x1e1e1e,
        width: 150,
        height: 50,
        radius: 6,
    });

    const buttonDrawCallback = useGraphics({
        color: 0x1e1e1e,
        width: 100,
        height: 50,
        radius: 8,
    });

    const buttonClickHandler = useCallback((_event: MouseEvent) => {
        coordinator({ name: "swapScene", value: "gameSceneActive" });
    }, []);

    return (
        <pixiContainer renderable={visible ?? true} isRenderGroup>
            <pixiContainer x={app.canvas.width / 2} y={app.canvas.height / 4}>
                <pixiGraphics
                    draw={labelDrawCallback}
                    pivot={{ x: 75, y: 25 }}
                />
                <pixiText
                    anchor={{ x: 0.5, y: 0.5 }}
                    x={0}
                    y={0}
                    text={"Gremgame"}
                    style={{
                        fontFamily: "Verdana",
                        fontSize: 24,
                        fill: 0xff0000,
                    }}
                />
            </pixiContainer>
            <pixiContainer
                x={app.canvas.width / 2}
                y={(app.canvas.height * 3) / 4}
                interactive={true}
                onClick={buttonClickHandler}
            >
                <pixiGraphics
                    draw={buttonDrawCallback}
                    pivot={{ x: 50, y: 25 }}
                />
                <pixiText
                    text={"Start"}
                    anchor={{ x: 0.5, y: 0.5 }}
                    style={{
                        fontFamily: "Verdana",
                        fontSize: 20,
                        fill: 0xff0000,
                    }}
                />
            </pixiContainer>
        </pixiContainer>
    );
}
