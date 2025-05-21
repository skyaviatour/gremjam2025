import { useApplication } from "@pixi/react";
import { useGraphics } from "../hooks/useGraphics";

type Props = {
    onClick: (_ev: MouseEvent) => void;
};

export default function PauseButton({ onClick }: Props) {
    const { app } = useApplication();
    const pauseButtonBackgroundDraw = useGraphics({
        color: 0x101010,
        width: 80,
        height: 80,
        radius: 8,
    });
    const pauseButtonForegroundDraw = useGraphics({
        color: 0x303030,
        width: 20,
        height: 60,
    });
    return (
        <pixiContainer
            interactive={true}
            x={(app.canvas.width * 7) / 8}
            y={(app.canvas.height * 7) / 8}
            onClick={onClick}
        >
            <pixiGraphics draw={pauseButtonBackgroundDraw} />
            <pixiGraphics x={-15} draw={pauseButtonForegroundDraw} />
            <pixiGraphics x={15} draw={pauseButtonForegroundDraw} />
        </pixiContainer>
    );
}
