import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// This endpoint gets all portfolios of a given user
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { id } = req.query;
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/portfolios`,
        );
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}
