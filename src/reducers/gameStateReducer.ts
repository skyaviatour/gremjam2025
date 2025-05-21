import type { Item, ItemInInventory } from "../types";

type GameState = {
    gold: number;
    items: ItemInInventory[];
};
type GameStateAction = {
    name: "buyItem";
    item: Item;
    cost: number;
};

export function gameStateReducer(
    state: GameState,
    action: GameStateAction,
): GameState {
    switch (action.name) {
        case "buyItem": {
            return {
                gold: state.gold - action.cost,
                items: [
                    ...state.items,
                    { item: action.item, purchaseCost: action.cost },
                ],
            };
        }
    }
}
