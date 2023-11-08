import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// This endpoint gets all portfolios of a given user
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { pid, duration } = req.query;
        // const balance = URLSearchParams;
        const response = await axios.get(
            `${
                process.env.API_URL
            }/api/portfolios/${pid}/balance?duration=${parseInt(
                duration as string,
            )}`,
        );
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(200).json({ message: error });
    }
}
