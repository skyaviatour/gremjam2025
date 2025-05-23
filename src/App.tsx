import "@pixi/layout/devtools";
import { Application, extend } from "@pixi/react";
import { Assets, Container, Graphics, Sprite, Text } from "pixi.js";
import TitleScene from "./scenes/TitleScene";
import GameScene from "./scenes/GameScene";
import { useEffect, useReducer } from "react";
import { sceneReducer } from "./reducers/sceneReducer";
import PauseScene from "./scenes/PauseScene";
import { GameContext } from "./context/gameStateContext";

extend({
    Text,
    Container,
    Graphics,
    Sprite,
});

function App() {
    const [state, dispatch] = useReducer(sceneReducer, {
        gameScene: { status: "inactive" },
        pauseScene: { status: "inactive" },
        titleScene: { status: "active" },
    });

    useEffect(() => {
        Assets.init({ basePath: "assets", manifest: "/assets/manifest.json" });
        Assets.backgroundLoadBundle(["bundle"]);
    }, []);

    return (
        <GameContext>
            <Application width={800} height={600} background="#3f3f3f">
                <TitleScene
                    status={state.titleScene.status}
                    coordinator={dispatch}
                />
                <GameScene
                    status={state.gameScene.status}
                    coordinator={dispatch}
                />
                <PauseScene
                    status={state.pauseScene.status}
                    coordinator={dispatch}
                />
            </Application>
        </GameContext>
    );
}

export default App;
