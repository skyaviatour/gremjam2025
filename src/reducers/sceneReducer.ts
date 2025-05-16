export type SceneState = {
	titleSceneActive: boolean;
	gameSceneActive: boolean;
	pauseSceneActive: boolean;
};
export type SceneAction = {
	name: "swapScene";
	value: keyof SceneState;
};

export function sceneReducer(
	state: SceneState,
	action: SceneAction,
): SceneState {
	switch (action.name) {
		case "swapScene": {
			const newState = Object.keys(state).reduce((acc, cur) => {
				return { ...acc, [cur]: cur === action.value ? true : false };
			}, {}) as SceneState;
			console.log(newState);
			return newState;
		}
	}
}
