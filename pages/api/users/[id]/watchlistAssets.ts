import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<WatchlistAsset[]>,
) {
    const { id } = req.query;
    let toRet: TickerPriceData[] = [];

    try {
        const watchlistAssetPriceMapPromise = axios
            .get(`${process.env.API_URL}/api/watchlist/user/${id}/prices`)
            .then(async (r) => {
                return await r.data.watchlistAssetPriceMap;
            });
        const watchlistTickersPromise = axios
            .get(`${process.env.API_URL}/api/watchlist/user/${id}`)
            .then(async (r) => {
                return await r.data.watchlist_assets;
            });

        const [watchlistAssetPriceMap, watchlistTickers] = await Promise.all([
            watchlistAssetPriceMapPromise,
            watchlistTickersPromise,
        ]);

        for (let i = 0; i < watchlistTickers.length; i++) {
            let ticker = watchlistTickers[i];
            let tickerdata = watchlistAssetPriceMap[i][ticker];
            const timeSeries60minArray = Object.values(
                tickerdata["AssetIntraday"],
            ) as number[];
            const timeSeries7days = timeSeries60minArray.slice(0, 168);
            const percent24h =
                (timeSeries60minArray[0] - timeSeries60minArray[15]) /
                timeSeries60minArray[15];
            const percent7d =
                (timeSeries60minArray[0] - timeSeries60minArray[111]) /
                timeSeries60minArray[111];
            const price = tickerdata["Global Quote Price"];
            const volume24h = Number(tickerdata["Global Quote Volume"]);
            const marketCap = Number(
                tickerdata["AssetOverview MarketCapitalization"],
            );
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
            }),
        );
    } catch (error) {
        console.log(error);
    }
}
