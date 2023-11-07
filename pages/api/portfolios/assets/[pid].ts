import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// This endpoint gets details of a portfolio given its id
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "GET") {
        try {
            const { pid } = req.query;
            const response = await axios.get(
                `${process.env.API_URL}/api/portfolios/${pid}/assets`,
            );
            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(200).json({ portfolioAssetList: [] });
        }
    }
}
