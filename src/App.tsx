import { Application, extend } from "@pixi/react";
import { BitmapText, Container, Graphics, Sprite } from "pixi.js";
import TitleScene from "./scenes/TitleScene";
import GameScene from "./scenes/GameScene";
import { useReducer } from "react";
import { sceneReducer } from "./reducers/sceneReducer";
import PauseScene from "./scenes/PauseScene";

extend({
	Container,
	Graphics,
	Sprite,
	BitmapText,
});

function App() {
	const [state, dispatch] = useReducer(sceneReducer, {
		titleSceneActive: true,
		gameSceneActive: false,
		pauseSceneActive: false,
	});

	return (
		<Application
			width={800}
			height={600}
			background="#3f3f3f"
			eventMode="static"
		>
			<TitleScene visible={state.titleSceneActive} coordinator={dispatch} />
			<GameScene visible={state.gameSceneActive} coordinator={dispatch} />
			<PauseScene visible={state.pauseSceneActive} coordinator={dispatch} />
		</Application>
	);
}

export default App;
