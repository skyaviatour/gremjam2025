import "@pixi/layout";
import "@pixi/layout/react";
import { Container, Point, Rectangle, Texture } from "pixi.js";
import { useGraphics } from "../hooks/useGraphics";
import { ALL_ITEMS } from "../items";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { GameStateContext } from "../context/gameStateContext";
import { useApplication } from "@pixi/react";

type Props = {
    item: Texture;
};

export default function StallItem({ item }: Props) {
    const TABLE_WIDTH = 300;
    const TABLE_HEIGHT = 100;

    const { app } = useApplication();

    const [priceInputOpen, setPriceInputOpen] = useState(false);
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [offer, setOffer] = useState(0);
    const [randomX, setRandomX] = useState(
        Math.round(Math.random() * TABLE_WIDTH) - 150,
    );
    const [randomY, setRandomY] = useState(
        Math.round(Math.random() * TABLE_HEIGHT) - 50,
    );

    const parentRef = useRef<Container>(null);
    const priceParentRef = useRef<Container>(null);

    const gameState = use(GameStateContext);

    useEffect(() => {
        setRandomX(Math.round(Math.random() * TABLE_WIDTH) - 150);
        setRandomY(Math.round(Math.random() * TABLE_HEIGHT) - 50);
    }, [item]);

    const itemDetails = ALL_ITEMS[item.label];

    const itemDetailsBackgroundDraw = useGraphics({
        color: 0x101010,
        height: 150,
        width: 250,
        radius: 8,
        pivot: new Point(0, 0),
    });
    const goldCounterBackgroundDraw = useGraphics({
        color: 0x101010,
        height: 40,
        width: 40,
        radius: 6,
    });
    const priceDismissHandler = useCallback(
        (ev: MouseEvent) => {
            if (priceParentRef.current == null) return;
            const c = priceParentRef.current;
            const clickedInside = c.getBounds().containsPoint(ev.x, ev.y);
            if (!clickedInside) setPriceInputOpen(false);
        },
        [priceParentRef],
    );

    return (
        <>
            <pixiContainer
                visible={detailsVisible || priceInputOpen}
                ref={parentRef}
                x={-125}
                y={-350}
            >
                <pixiGraphics draw={itemDetailsBackgroundDraw} />
                <pixiText
                    text={itemDetails.name}
                    y={10}
                    x={10}
                    style={{
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: parentRef.current?.width - 20,
                    }}
                />
                <pixiText
                    text={itemDetails.rarity}
                    y={40}
                    x={10}
                    style={{
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: parentRef.current?.width - 20,
                    }}
                />
                <pixiText
                    text={itemDetails.description}
                    y={70}
                    x={10}
                    style={{
                        fill: "white",
                        wordWrap: true,
                        wordWrapWidth: parentRef.current?.width - 20,
                    }}
                />
            </pixiContainer>
            <pixiContainer
                ref={priceParentRef}
                visible={priceInputOpen}
                x={-100}
                y={-150}
                eventMode="static"
                hitArea={
                    new Rectangle(
                        -priceParentRef.current?.getGlobalPosition().x,
                        -priceParentRef.current?.getGlobalPosition().y,
                        app.canvas.width,
                        app.canvas.height,
                    )
                }
                onClick={priceDismissHandler}
            >
                <pixiContainer
                    zIndex={2}
                    eventMode="static"
                    onClick={useCallback(
                        () => setOffer((prev) => Math.max(0, prev - 10)),
                        [],
                    )}
                >
                    <pixiGraphics draw={goldCounterBackgroundDraw} />
                    <pixiText
                        anchor={0.5}
                        text="-10"
                        style={{ fill: "white" }}
                    />
                </pixiContainer>
                <pixiContainer
                    x={45}
                    zIndex={2}
                    eventMode="static"
                    onClick={useCallback(
                        () => setOffer((prev) => Math.max(0, prev - 1)),
                        [],
                    )}
                >
                    <pixiGraphics draw={goldCounterBackgroundDraw} />
                    <pixiText
                        anchor={0.5}
                        text="-1"
                        style={{ fill: "white" }}
                    />
                </pixiContainer>
                <pixiText
                    anchor={0.5}
                    x={100}
                    text={offer}
                    style={{ fill: "white" }}
                />
                <pixiContainer
                    x={150}
                    zIndex={2}
                    eventMode="static"
                    onClick={useCallback(
                        () =>
                            setOffer((prev) =>
                                Math.min(gameState?.gold, prev + 1),
                            ),
                        [gameState],
                    )}
                >
                    <pixiGraphics draw={goldCounterBackgroundDraw} />
                    <pixiText
                        anchor={0.5}
                        text="+1"
                        style={{ fill: "white" }}
                    />
                </pixiContainer>
                <pixiContainer
                    x={195}
                    zIndex={2}
                    eventMode="static"
                    onClick={useCallback(
                        () =>
                            setOffer((prev) =>
                                Math.min(gameState?.gold, prev + 10),
                            ),
                        [gameState],
                    )}
                >
                    <pixiGraphics draw={goldCounterBackgroundDraw} />
                    <pixiText
                        anchor={0.5}
                        text="+10"
                        style={{ fill: "white" }}
                    />
                </pixiContainer>
            </pixiContainer>
            <pixiSprite
                pivot={{ x: 0, y: 0 }}
                x={randomX}
                y={randomY}
                texture={item}
                eventMode="static"
                onPointerDown={useCallback(
                    () => setPriceInputOpen(!priceInputOpen),
                    [priceInputOpen],
                )}
                onMouseEnter={useCallback(() => setDetailsVisible(true), [])}
                onMouseLeave={useCallback(() => setDetailsVisible(false), [])}
            />
        </>
    );
}
