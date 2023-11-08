import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<WatchlistAsset[]>,
) {
    // TODO: convert this to a POST request and pass in the tickers as a body when "add ticker" logic is ready
    const watchlistTickers = [
        "AAPL",
        "MSFT",
        "GOOG",
        "GOOGL",
        "AMZN",
        "NVDA",
        "META",
    ];
    const assets = [];
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

    const promises = watchlistTickers.map(async (ticker) => {
        const intraday = await fetch(
            `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=60min&outputsize=full&apikey=${apiKey}`,
        );
        const intradaydata = await intraday.json();
        const rates = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`,
        );
        const ratesdata = await rates.json();
        const companyInfo = await fetch(
            `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`,
        );
        const companyInfoData = await companyInfo.json();

        const timeSeries60min = intradaydata["Time Series (60min)"];
        const timeSeries60minArray = Object.values(
            timeSeries60min,
        ) as TimeSeriesData[];
        const timeSeries7days = timeSeries60minArray.slice(0, 113);
        const percent24h =
            (timeSeries60minArray[0]["4. close"] -
                timeSeries60minArray[16]["4. close"]) /
            timeSeries60minArray[16]["4. close"];
        const percent7d =
            (timeSeries60minArray[0]["4. close"] -
                timeSeries60minArray[112]["4. close"]) /
            timeSeries60minArray[112]["4. close"];
        const price = ratesdata["Global Quote"]["05. price"];
        const volume24h = Number(ratesdata["Global Quote"]["06. volume"]);
        const marketCap = Number(companyInfoData["MarketCapitalization"]);
        const name = companyInfoData["Name"];
        const chartData = (
            Object.values(timeSeries7days) as { "4. close": number }[]
        )
            .map((item) => ({
                value: item["4. close"],
            }))
            .reverse();

        return {
            ticker: ticker,
            name: name,
            price: price,
            price24hDeltaPercentage: percent24h,
            price7dDeltaPercentage: percent7d,
            marketCap: marketCap,
            volume24h: volume24h,
            sparkline: chartData,
        };
    });

    const results = await Promise.all(promises);
    assets.push(...results);
    res.status(200).json(
        assets.map((assets) => {
            return { ...assets };
        }),
    );
}
