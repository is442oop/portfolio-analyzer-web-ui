import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// This endpoint gets allocation of assets based on tickers for a given portfolio id
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "GET") {
        try {
            const { id } = req.query;
            const response = await axios.get(
                `${process.env.API_URL}/api/users/${id}/portfolios/allocation/ticker`,
            );

            // format the percentage to * 100 and round to 2 decimal places
            response.data.forEach((element: any) => {
                element.percentage = parseFloat(
                    (element.percentage * 100).toFixed(2),
                );
            });
            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }
}
