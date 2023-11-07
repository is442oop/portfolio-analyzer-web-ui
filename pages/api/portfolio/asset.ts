import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    if (req.method == "POST") {
        const { portfolioId, assetTicker, price, quantity } = req.body;

        const response = await axios.post(
            `${process.env.API_URL}/api/portfolio/asset`,
            {
                portfolioId: portfolioId,
                assetTicker: assetTicker,
                price: price,
                quantity: quantity,
            },
        );
        console.log(response.data);
        return res.status(200).json(response.data);
    }
}