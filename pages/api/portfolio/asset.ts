import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == "POST") {
        try {
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

            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }

    if (req.method == "DELETE") {
        try {
            console.log(req.body);

            const response = await axios.delete(
                `${process.env.API_URL}/api/portfolio/asset/delete`,
                {
                    data: req.body,
                },
            );
            console.log(response.data);
            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }
}
