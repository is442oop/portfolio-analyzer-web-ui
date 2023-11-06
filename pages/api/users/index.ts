import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Missing email" });
    }

    const response = await axios.post(`${process.env.API_URL}/api/users`, {
        email,
        username: email,
    });
    res.status(response.status).json(response.data);
}
