import { createContext, useReducer, type PropsWithChildren } from "react";
import { type GameState, gameStateReducer } from "../reducers/gameStateReducer";

export const GameStateContext = createContext<GameState | null>(null);
export const GameStateDispatchContext = createContext(null);

export function GameContext({ children }: PropsWithChildren<{}>) {
    const [state, dispatch] = useReducer(gameStateReducer, {
        gold: 500,
        itemsInInventory: [],
    });

    return (
        <GameStateContext.Provider value={state}>
            <GameStateDispatchContext value={dispatch}>
                {children}
            </GameStateDispatchContext>
        </GameStateContext.Provider>
    );
}
