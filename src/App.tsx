import { Application, extend } from "@pixi/react";
import { Container, Graphics } from "pixi.js";
import TitleScene from "./scenes/TitleScene";
import GameScene from "./scenes/GameScene";
import { useReducer } from "react";
import { sceneReducer } from "./reducers/sceneReducer";
import PauseScene from "./scenes/PauseScene";

extend({
	Container,
	Graphics,
});

function App() {
	const [state, dispatch] = useReducer(sceneReducer, {
		titleSceneActive: true,
		gameSceneActive: false,
		pauseSceneActive: false,
	});

	console.log(state);

	return (
		<Application width={640} height={480}>
			<TitleScene visible={state.titleSceneActive} coordinator={dispatch} />
			<GameScene visible={state.gameSceneActive} coordinator={dispatch} />
			<PauseScene visible={state.pauseSceneActive} coordinator={dispatch} />
		</Application>
	);
}

export default App;
