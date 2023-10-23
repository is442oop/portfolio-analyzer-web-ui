import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Asset[]>,
) {
    const assets = [
        {
            ticker: "BTC",
            name: "Bitcoin",
            logoUrl:
                "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
            balance: 1.0,
            price: 28000.9,
            price24hDeltaPercentage: 0.23,
        },
        {
            ticker: "BNB",
            name: "BNB",
            logoUrl:
                "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
            balance: 41,
            price: 210.3,
            price24hDeltaPercentage: 0.23,
        },
        {
            ticker: "SOL",
            name: "Solana",
            logoUrl:
                "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png",
            balance: 134,
            price: 24.9,
            price24hDeltaPercentage: 0.23,
        },
        {
            ticker: "ETH",
            name: "Ethereum",
            logoUrl:
                "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
            balance: 1.2,
            price: 1553.9,
            price24hDeltaPercentage: 0.23,
        },
        {
            ticker: "XRP",
            name: "XRP",
            logoUrl:
                "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png",
            balance: 5122,
            price: 0.489,
            price24hDeltaPercentage: 0.23,
        },
        {
            ticker: "ADA",
            name: "Cardano",
            logoUrl:
                "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png",
            balance: 12423,
            price: 0.2423,
            price24hDeltaPercentage: 0.23,
        },
    ];
    res.status(200).json(
        assets.map((asset) => {
            const value = asset.balance * asset.price;
            return { ...asset, value };
        }),
    );
}
