import { useApplication } from "@pixi/react";
import { Point, Sprite, Text, Texture } from "pixi.js";
import {
    use,
    useCallback,
    useEffect,
    useRef,
    useState,
    type Dispatch,
} from "react";
import type { SceneAction, SceneStatus } from "../reducers/sceneReducer";
import { useGraphics } from "../hooks/useGraphics";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSprites } from "../hooks/useSprites";
import PauseButton from "../components/PauseButton";
import StallItem from "../components/StallItem";
import { GameStateContext } from "../context/gameStateContext";

type Props = {
    status: SceneStatus;
    coordinator: Dispatch<SceneAction>;
};

// TODO: maybe changing the coordinator to a state machine would make more sense
// linking execution just to visibility doesn't make sense in some cases
// for example, execution of the entering animation happens while in the starting
// screen, but it wouldn't make sense to pause/reset it based on visibility, otherwise
// pausing would break everything
export default function GameScene({ status, coordinator }: Props) {
    const { app } = useApplication();

    const [grem1, setGrem1] = useState(Texture.EMPTY);
    const [stallItems, setStallItems] = useState<Texture[]>([]);
    const [nextButtonStrokeWidth, setNextButtonStrokeWidth] = useState(2);
    const [nextButtonBackground, setNextButtonBackground] = useState(0x202020);
    const [stallItemsVisible, setStallItemsVisible] = useState(false);
    const [gremState, setGremState] = useState<
        "entering" | "exiting" | "idle" | null
    >("idle");
    const gameState = use(GameStateContext);

    const grem1Ref = useRef<Sprite>(null);
    const textRef = useRef<Text>(null);

    const { sprites, items } = useSprites({
        bundles: ["bundle"],
    });

    const getRandomSprite = useCallback(() => {
        if (!sprites) return Texture.EMPTY;
        const keys = Object.keys(sprites);
        return sprites[keys[Math.floor(Math.random() * keys.length)]];
    }, [sprites]);

    const getRandomItems = useCallback(() => {
        if (!items) return [];
        const keys = Object.keys(items);
        const ret: Texture[] = [];
        for (let i = 0; i < 5; i++) {
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            ret.push(items[randomKey]);
        }

        return ret;
    }, [items]);

    useGSAP(() => {
        if (!(grem1Ref.current && textRef.current)) return;

        if (gremState === "entering") {
            gsap.to(grem1Ref.current, {
                x: 400,
                y: 400,
                duration: 2,
                delay: 1,
                ease: "expo.out",
                onComplete: () => {
                    setGremState("idle");
                    setStallItems(getRandomItems());
                    setStallItemsVisible(true);
                },
            });
        } else if (gremState === "exiting") {
            gsap.to(grem1Ref.current, {
                x: -150,
                y: 400,
                duration: 2,
                delay: 0.15,
                ease: "expo.out",
                onStart: () => {
                    setStallItemsVisible(false);
                },
                onComplete: () => {
                    setGrem1(getRandomSprite());
                    setGremState("entering");
                },
            });
        }

        // this doesn't work OOTB with canvas text. review
        gsap.to(textRef.current, {
            duration: 5,
            text: "Lorem ipsum algo mas no se auhoounf aowf oawhf owefoijfo ijwfo hoowjoihpiuafh oiwheof ihaweof hwo",
        });
    }, [grem1Ref, gremState, textRef]);

    useEffect(() => {
        if (sprites && grem1 === Texture.EMPTY) {
            setGrem1(getRandomSprite());
            setStallItems(getRandomItems());
        }
    }, [grem1, sprites]);

    useEffect(() => {
        if (status === "active") {
            setGremState("entering");
            setStallItems(getRandomItems());
        }
    }, [status]);

    const nextButtonBackgroundDraw = useGraphics({
        color: nextButtonBackground,
        width: 100,
        height: 40,
        radius: 6,
        stroke: { color: 0xfefefe, width: nextButtonStrokeWidth },
    });
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

    const textBoxBackgroundDraw = useGraphics({
        color: 0x202020,
        width: (app.canvas.width * 9) / 12,
        height: app.canvas.height / 4,
        pivot: new Point(0, 0),
        radius: 4,
    });

    const pauseButtonClickHandler = useCallback((_ev: MouseEvent) => {
        coordinator({ name: "pause", currentScene: "gameScene" });
    }, []);

    return (
        <pixiContainer
            renderable={status === "active"}
            style={{ fill: 0x00ff00 }}
            isRenderGroup
        >
            <pixiContainer>
                <pixiGraphics x={10} y={10} draw={textBoxBackgroundDraw} />
                <pixiText
                    ref={textRef}
                    x={30}
                    y={30}
                    text={""}
                    style={{
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: (app.canvas.width * 9) / 12 - 20,
                    }}
                />
            </pixiContainer>
            <pixiContainer x={(app.canvas.width * 8) / 10} y={40}>
                <pixiText
                    style={{ fill: "white" }}
                    text={gameState?.gold ?? "zero somehow"}
                />
                <pixiText style={{ fill: "white" }} y={40} text={"inventory"} />
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
            <PauseButton onClick={pauseButtonClickHandler} />
            {stallItems.length > 0 ? (
                <pixiContainer
                    x={app.canvas.width / 2}
                    y={480}
                    zIndex={3}
                    visible={stallItemsVisible}
                >
                    <StallItem item={stallItems[0]} />
                </pixiContainer>
            ) : null}
            <pixiGraphics
                label="Table"
                x={app.canvas.width / 2}
                y={480}
                zIndex={2}
                draw={tableDraw}
            />
            <pixiContainer
                label="Next Button"
                x={(app.canvas.width * 7) / 8}
                y={(app.canvas.height * 8) / 12}
                eventMode="static"
                onClick={nextButtonClickHandler}
                onMouseEnter={useCallback(() => {
                    setNextButtonStrokeWidth(4);
                    setNextButtonBackground(0x303030);
                }, [])}
                onMouseLeave={useCallback(() => {
                    setNextButtonStrokeWidth(2);
                    setNextButtonBackground(0x202020);
                }, [])}
                onMouseDown={useCallback(
                    () => setNextButtonBackground(0x606060),
                    [],
                )}
                onMouseUp={useCallback(
                    () => setNextButtonBackground(0x202020),
                    [],
                )}
            >
                <pixiGraphics draw={nextButtonBackgroundDraw} />
                <pixiText anchor={0.5} text="Next" style={{ fill: "white" }} />
            </pixiContainer>
        </pixiContainer>
    );
}
