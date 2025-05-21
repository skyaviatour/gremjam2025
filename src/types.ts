import type { Texture } from "pixi.js";

export type Item = {
    name: string;
    description: string;
    category: string;
    rarity: string; // TODO: reduce with enum
    sprite: Texture;
};

export type ItemInInventory = {
    item: Item;
    purchaseCost: number; // ?
};
