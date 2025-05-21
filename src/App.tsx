import "@pixi/layout/devtools";
import { Application, extend } from "@pixi/react";
import { Assets, Container, Graphics, Sprite, Text } from "pixi.js";
import TitleScene from "./scenes/TitleScene";
import GameScene from "./scenes/GameScene";
import { useEffect, useReducer } from "react";
import { sceneReducer } from "./reducers/sceneReducer";
import PauseScene from "./scenes/PauseScene";

extend({
    Text,
    Container,
    Graphics,
    Sprite,
});

function App() {
    const [state, dispatch] = useReducer(sceneReducer, {
        titleSceneActive: true,
        gameSceneActive: false,
        pauseSceneActive: false,
    });

    useEffect(() => {
        Assets.init({ basePath: "assets", manifest: "/assets/manifest.json" });
        Assets.backgroundLoadBundle(["bundle"]);
    }, []);

    return (
        <Application
            width={800}
            height={600}
            background="#3f3f3f"
            eventMode="static"
        >
            <TitleScene
                visible={state.titleSceneActive}
                coordinator={dispatch}
            />
            <GameScene visible={state.gameSceneActive} coordinator={dispatch} />
            <PauseScene
                visible={state.pauseSceneActive}
                coordinator={dispatch}
            />
        </Application>
    );
}

export default App;
