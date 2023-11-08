import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// This endpoint gets all assets for a user
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "GET") {
        try {
            const { id } = req.query;
            const response = await axios.get(
                `${process.env.API_URL}/api/portfolio/asset/user/${id}`,
            );
            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}
