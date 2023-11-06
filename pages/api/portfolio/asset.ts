// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method == 'POST') {
        const { portfolioId, assetTicker, price, quantity } = req.body;
        console.log(portfolioId);
        console.log(assetTicker);
        console.log(price);
        console.log(quantity);
    
      const response = await axios.post(`${process.env.API_URL}/api/portfolio/asset`, {
          portfolioId: portfolioId,
          assetTicker: assetTicker,
          price: price,
          quantity: quantity,
      });
      const data = response.data;
      console.log(response);
      return res.status(200).json(data);
    }
}
