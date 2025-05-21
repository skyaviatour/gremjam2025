import { useContext } from "react";
import {
    GameStateContext,
    GameStateDispatchContext,
} from "../context/gameStateContext";

export function useGameState() {
    const gameState = useContext(GameStateContext);
    const gameDispatch = useContext(GameStateDispatchContext);

    return { gameState, gameDispatch };
}
