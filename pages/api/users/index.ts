import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    const { id, email, username } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Missing email" });
    }

    const response = await axios.post(`${process.env.API_URL}/api/users`, {
        id,
        email,
        username,
    });
    res.status(response.status).json(response.data);
}
