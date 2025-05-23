export type Item = {
    name: string;
    description: string;
    category: string;
    rarity: string; // TODO: reduce with enum
};

export type ItemInInventory = {
    item: Item;
    purchaseCost: number; // ?
};
