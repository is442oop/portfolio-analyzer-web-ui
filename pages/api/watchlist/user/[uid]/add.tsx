import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// This endpoint gets details of a portfolio given its id
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "PUT") {
        try {
            const { uid } = req.query;
            const response = await axios.put(
                `${process.env.API_URL}/api/watchlist/user/${uid}/add`,
                req.body,
            );
            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }
}
