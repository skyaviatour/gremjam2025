import { useApplication } from "@pixi/react";
import { Graphics, Rectangle, Sprite, Text, Texture } from "pixi.js";
import { useCallback, useEffect, useRef, useState, type Dispatch } from "react";
import type { SceneAction } from "../reducers/sceneReducer";
import { useGraphics } from "../hooks/useGraphics";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSprites } from "../hooks/useSprites";

type Props = {
    visible?: boolean;
    coordinator: Dispatch<SceneAction>;
};

// TODO: maybe changing the coordinator to a state machine would make more sense
// linking execution just to visibility doesn't make sense in some cases
// for example, execution of the entering animation happens while in the starting
// screen, but it wouldn't make sense to pause/reset it based on visibility, otherwise
// pausing would break everything
export default function GameScene({ visible, coordinator }: Props) {
    const { app } = useApplication();
    const [grem1, setGrem1] = useState(Texture.EMPTY);
    const grem1Ref = useRef<Sprite>(null);
    const [gremState, setGremState] = useState<
        "entering" | "exiting" | "idle" | null
    >("entering");
    const textRef = useRef<Text>(null);
    const [nextButtonStrokeWidth, setNextButtonStrokeWidth] = useState(2);
    const [nextButtonBackground, setNextButtonBackground] = useState(0x202020);
    const { sprites } = useSprites({
        bundles: ["bundle"],
    });

    const getRandomSprite = useCallback(() => {
        if (!sprites) return Texture.EMPTY;
        const keys = Object.keys(sprites);
        return sprites[keys[Math.floor(Math.random() * keys.length)]];
    }, [sprites]);

    useGSAP(() => {
        if (grem1Ref.current) {
            if (gremState === "entering") {
                gsap.to(grem1Ref.current, {
                    x: 400,
                    y: 400,
                    duration: 2,
                    delay: 1,
                    ease: "expo.out",
                    onComplete: () => {
                        setGremState("idle");
                    },
                });
            } else if (gremState === "exiting") {
                gsap.to(grem1Ref.current, {
                    x: -150,
                    y: 400,
                    duration: 2,
                    delay: 0.15,
                    ease: "expo.out",
                    onComplete: () => {
                        setGrem1(getRandomSprite());
                        setGremState("entering");
                    },
                });
            }
        }

        // this doesn't work OOTB with canvas text. review
        if (textRef.current) {
            gsap.to(textRef.current, {
                duration: 5,
                text: "Lorem ipsum algo mas no se auhoounf aowf oawhf owefoijfo ijwfo hoowjoihpiuafh oiwheof ihaweof hwo",
            });
        }
    }, [grem1Ref, gremState]);

    useEffect(() => {
        if (sprites && grem1 === Texture.EMPTY) {
            setGrem1(getRandomSprite());
        }
    }, [grem1, sprites]);

    // TODO: abstract the whole pause buton?
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

    const nextButtonBackgroundDraw = useCallback(
        (g: Graphics) => {
            g.clear();
            g.setFillStyle(nextButtonBackground);
            g.setStrokeStyle({ color: 0xfefefe, width: nextButtonStrokeWidth });
            g.roundRect(0, 0, 100, 40, 6);
            g.pivot.set(50, 20);
            g.fill();
            g.stroke();
        },
        [nextButtonStrokeWidth, nextButtonBackground],
    );
    const nextButtonClickHandler = useCallback(() => {
        if (gremState !== "idle") return;
        setGremState("exiting");
    }, [gremState]);

    const tableDraw = useGraphics({
        color: 0x402101,
        width: 300,
        height: 100,
        radius: 1,
    });

    const textBoxBackgroundDraw = useCallback((g: Graphics) => {
        g.clear();
        g.setFillStyle(0x202020);
        g.roundRect(
            0,
            0,
            (app.canvas.width * 11) / 12,
            app.canvas.height / 2,
            4,
        );
        g.fill();
    }, []);

    const pauseButtonClickHandler = useCallback((_ev: MouseEvent) => {
        coordinator({ name: "swapScene", value: "pauseSceneActive" });
    }, []);

    return (
        <pixiContainer
            visible={visible ?? true}
            hitArea={new Rectangle(0, 0, app.canvas.width, app.canvas.height)}
            style={{ fill: 0x00ff00 }}
        >
            <pixiContainer x={20} y={20}>
                <pixiGraphics
                    pivot={{ x: 0, y: 0 }}
                    draw={textBoxBackgroundDraw}
                />
                <pixiText
                    ref={textRef}
                    x={20}
                    y={20}
                    text={""}
                    style={{
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: (app.canvas.width * 11) / 12 - 20,
                    }}
                />
            </pixiContainer>
            <pixiContainer>
                <pixiSprite
                    ref={grem1Ref}
                    x={-150}
                    y={400}
                    anchor={0.5}
                    texture={grem1}
                />
            </pixiContainer>
            <pixiContainer
                interactive={true}
                x={(app.canvas.width * 7) / 8}
                y={(app.canvas.height * 7) / 8}
                onClick={pauseButtonClickHandler}
            >
                <pixiGraphics draw={pauseButtonBackgroundDraw} />
                <pixiGraphics x={-15} draw={pauseButtonForegroundDraw} />
                <pixiGraphics x={15} draw={pauseButtonForegroundDraw} />
            </pixiContainer>
            <pixiGraphics
                x={app.canvas.width / 2}
                y={480}
                zIndex={2}
                draw={tableDraw}
            />
            <pixiContainer
                x={(app.canvas.width * 7) / 8}
                y={(app.canvas.height * 8) / 12}
                eventMode="static"
                onClick={nextButtonClickHandler}
                onMouseEnter={() => {
                    setNextButtonStrokeWidth(4);
                    setNextButtonBackground(0x303030);
                }}
                onMouseLeave={() => {
                    setNextButtonStrokeWidth(2);
                    setNextButtonBackground(0x202020);
                }}
                onMouseDown={() => setNextButtonBackground(0x606060)}
                onMouseUp={() => setNextButtonBackground(0x202020)}
            >
                <pixiGraphics draw={nextButtonBackgroundDraw} />
                <pixiText anchor={0.5} text="Next" style={{ fill: "white" }} />
            </pixiContainer>
        </pixiContainer>
    );
}
