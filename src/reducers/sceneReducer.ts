export type SceneStatus = "active" | "paused" | "inactive";

type Scene = {
    status: SceneStatus;
};

export type SceneState = {
    titleScene: Scene;
    gameScene: Scene;
    pauseScene: Scene;
};
export type SceneAction =
    | {
          name: "swapScene";
          sceneName: keyof SceneState;
          previousScene: keyof SceneState;
      }
    | {
          name: "pause";
          currentScene: keyof SceneState;
      }
    | {
          name: "unpause";
      };

export function sceneReducer(
    state: SceneState,
    action: SceneAction,
): SceneState {
    switch (action.name) {
        case "swapScene": {
            return {
                ...state,
                [action.sceneName]: { status: "active" },
                [action.previousScene]: { status: "inactive" },
            };
        }
        case "pause": {
            return {
                ...state,
                [action.currentScene]: { status: "paused" },
                pauseScene: { status: "active" },
            };
        }
        case "unpause": {
            const [pausedScene, _] = Object.entries(state).find(
                (x) => x[1].status === "paused",
            );
            return {
                ...state,
                [pausedScene]: { status: "active" },
                pauseScene: { status: "inactive" },
            };
        }
    }
}
