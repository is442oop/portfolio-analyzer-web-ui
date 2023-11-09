import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<WatchlistAsset[]>,
) {
    const { id } = req.query;
    const assets = [];
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

    let watchlistTickers = [];
    let toRet: TickerPriceData[] = [];

    try {
        const response = await axios.get(`${process.env.API_URL}/api/watchlist/user/${id}/prices`);
        const data = await response.data["watchlistAssetPriceMap"];
        const responseTicker = await axios.get(`${process.env.API_URL}/api/watchlist/user/${id}`);
        const dataTicker = await responseTicker.data;
        watchlistTickers = dataTicker.watchlist_assets;

            for (let i = 0; i < watchlistTickers.length; i++) {
                let ticker = watchlistTickers[i];
                let tickerdata = data[i][ticker];
                const timeSeries60minArray = Object.values(
                    tickerdata["AssetIntraday"]
                ) as number[];
                
                const timeSeries7days = timeSeries60minArray.slice(0, 113);
                const percent24h = (timeSeries60minArray[0] - timeSeries60minArray[16]) / timeSeries60minArray[16];
                const percent7d = (timeSeries60minArray[0] - timeSeries60minArray[111]) / timeSeries60minArray[111];
                console.log("7 DAYS:" + percent7d);
                console.log(timeSeries60minArray[111]);
                const price = tickerdata["Global Quote Price"];
                const volume24h = Number(tickerdata["Global Quote Volume"]);
                const marketCap = Number(tickerdata["AssetOverview MarketCapitalization"]);
                const name = tickerdata["AssetOverview Name"];
                const chartData = timeSeries7days
                    .map((item) => ({
                        value: item,
                    }))
                    .reverse();

                toRet.push({
                    ticker: ticker,
                    name: name,
                    price: price,
                    price24hDeltaPercentage: percent24h,
                    price7dDeltaPercentage: percent7d,
                    marketCap: marketCap,
                    volume24h: volume24h,
                    sparkline: chartData,
                });
            }
        // }
        res.status(200).json(
            toRet.map((toRet) => {
                return { ...toRet };
            })
        );
    } catch (error) {
        console.log(error);
    }
}
