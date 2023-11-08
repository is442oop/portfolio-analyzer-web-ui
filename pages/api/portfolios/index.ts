import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "POST") {
        try {
            const response = await axios.post(
                `${process.env.API_URL}/api/portfolios`,
                req.body,
            );
            res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
