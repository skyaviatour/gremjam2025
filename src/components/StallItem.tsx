import "@pixi/layout";
import "@pixi/layout/react";
import { Container, Point, type Texture } from "pixi.js";
import { useGraphics } from "../hooks/useGraphics";
import { ALL_ITEMS } from "../items";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
    item: Texture;
};

export default function StallItem({ item }: Props) {
    const TABLE_WIDTH = 300;
    const TABLE_HEIGHT = 100;
    const [randomX, setRandomX] = useState(
        Math.round(Math.random() * TABLE_WIDTH) - 150,
    );
    const [randomY, setRandomY] = useState(
        Math.round(Math.random() * TABLE_HEIGHT) - 50,
    );

    useEffect(() => {
        setRandomX(Math.round(Math.random() * TABLE_WIDTH) - 150);
        setRandomY(Math.round(Math.random() * TABLE_HEIGHT) - 50);
    }, [item]);
    const parentRef = useRef<Container>(null);
    const [detailsVisible, setDetailsVisible] = useState(false);
    const itemDetails = ALL_ITEMS[item.label];
    const backgroundDraw = useGraphics({
        color: 0x101010,
        height: 150,
        width: 250,
        radius: 8,
        pivot: new Point(0, 0),
    });

    return (
        <>
            <pixiContainer
                visible={detailsVisible}
                x={-125}
                ref={parentRef}
                y={-350}
            >
                <pixiGraphics draw={backgroundDraw} />
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
            <pixiSprite
                pivot={{ x: 0, y: 0 }}
                x={randomX}
                y={randomY}
                texture={item}
                onMouseEnter={useCallback(() => setDetailsVisible(true), [])}
                onMouseLeave={useCallback(() => setDetailsVisible(false), [])}
            />
        </>
    );
}
