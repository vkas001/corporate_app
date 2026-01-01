import { MarketCategory } from "@/types/market";

export const marketPrices: MarketCategory[] = [
    {
        id: "eggs",
        name: "Eggs",
        columns: ["Per Piece", "Per Crate", "Per Carton"],
        items: [
            {
                type: "Small",
                prices: [
                    { unit: "Per Piece", price: 18 },
                    { unit: "Per Crate", price: 200 },
                    { unit: "Per Carton", price: 550 },
                ],
            },
            {
                type: "Medium",
                prices: [
                    { unit: "Per Piece", price: 19 },
                    { unit: "Per Crate", price: 250 },
                    { unit: "Per Carton", price: 600 }
                ],
            },
            {
                type: "Large",
                prices: [
                    { unit: "Per Piece", price: 20 },
                    { unit: "Per Crate", price: 300 },
                    { unit: "Per Carton", price: 700 }
                ],
            },
        ],
    },

    {
        id: "chicken",
        name: "Chicken",
        columns: ["Per Kg", "Per Piece"],
        items: [
            {
                type: "Local",
                prices: [
                    { unit: "Per Kg", price: 45 },
                    { unit: "Per Piece", price: 1200 },
                ],
            },
            {
                type: "Imported",
                prices: [
                    { unit: "Per Kg", price: 60 },
                    { unit: "Per Piece", price: 1500 },
                ],
            },
        ],
    },

    {
        id: "chicks",
        name: "Chicks",
        columns: ["Per Piece", "Per Dozen", "Per Hundred", "Per Thousand"],
        items: [
            {
                type: "Local",
                prices: [
                    { unit: "Per Piece", price: 10 },
                    { unit: "Per Dozen", price: 100 },
                    { unit: "Per Hundred", price: 900 },
                    { unit: "Per Thousand", price: 8500 },
                ],
            },
            {
                type: "Imported",
                prices: [
                    { unit: "Per Piece", price: 15 },
                    { unit: "Per Dozen", price: 140 },
                    { unit: "Per Hundred", price: 1300 },
                    { unit: "Per Thousand", price: 12000 },
                ],
            },
            {
                type: "Broiler",
                prices: [
                    { unit: "Per Piece", price: 20 },
                    { unit: "Per Dozen", price: 140 },
                    { unit: "Per Hundred", price: 1300 },
                    { unit: "Per Thousand", price: 12000 },
                ],
            },
            {
                type: "Feed",
                prices: [
                    { unit: "Per Sack", price: 1000 },
                    { unit: "Per Dozen Sack", price: 10000 },
                    { unit: "Per Hundred Sack", price: 90000 },
                    { unit: "Per Thousand Sack", price: 800000 },
                ],
            }
        ],
    }
];