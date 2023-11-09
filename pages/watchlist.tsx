import { Layout } from "@/components/Layout";
import UserWatchlist from "@/components/UserWatchlist";
import { WatchlistModal } from "@/components/WatchlistModal";
import { Button } from "@/components/ui/Button";
import React from "react";
import PerspectiveViewer from "@/components/PerspectiveViewer";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

type Ticker = {
    value: string;
    label: string;
    ticker: string;
};

const watchlist = ({
    userId,
    tickers,
}: {
    userId: string;
    tickers: Ticker[];
}) => {
    return (
        <Layout>
            <div className="flex h-fit min-h-screen flex-col py-10 pl-0 pr-10 sm:p-10">
                <div className="flex items-center justify-between rounded-lg bg-white py-4">
                    <h2 className="text-2xl font-semibold text-primary">
                        Watchlist
                    </h2>
                    {/* TODO add ticker logic */}
                    <WatchlistModal tickers={tickers} userId={userId} />
                </div>
                <div className="flex grow flex-col space-y-10 pt-2">
                    <UserWatchlist userId={userId} />
                    <PerspectiveViewer />
                </div>
            </div>
        </Layout>
    );
};

export default watchlist;

export const getServerSideProps = async (context: any) => {
    const supabase = createPagesServerClient(context);
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();
    if (error || !user)
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };
    const tickers: Ticker[] = [
        {
            value: "apple",
            label: "Apple",
            ticker: "AAPL",
        },
        {
            value: "microsoft",
            label: "Microsoft",
            ticker: "MSFT",
        },
        {
            value: "alphabet inc.",
            label: "Alphabet Inc.",
            ticker: "GOOGL",
        },
        {
            value: "amazon",
            label: "Amazon",
            ticker: "AMZN",
        },
        {
            value: "nvidia",
            label: "Nvidia",
            ticker: "NVDA",
        },
        {
            value: "meta",
            label: "Meta",
            ticker: "META",
        },
        {
            value: "berkshire hathaway inc.",
            label: "Berkshire Hathaway Inc.",
            ticker: "BRK.B",
        },
        {
            value: "tesla",
            label: "Tesla",
            ticker: "TSLA",
        },
        {
            value: "eli lilly and company",
            label: "Eli Lilly and Company",
            ticker: "LLY",
        },
        {
            value: "visa inc.",
            label: "Visa Inc.",
            ticker: "V",
        },
        {
            value: "unitedhealth group incorporated",
            label: "UnitedHealth Group Incorporated",
            ticker: "UNH",
        },
        {
            value: "taiwan semiconductor manufacturing company limited",
            label: "Taiwan Semiconductor Manufacturing Company Limited",
            ticker: "TSM",
        },
        {
            value: "walmart inc.",
            label: "Walmart Inc.",
            ticker: "WMT",
        },
        {
            value: "novo nordisk a/s",
            label: "Novo Nordisk A/S",
            ticker: "NVO",
        },
        {
            value: "exxon mobil corporation",
            label: "Exxon Mobil Corporation",
            ticker: "XOM",
        },
        {
            value: "jpmorgan chase & co.",
            label: "JPMorgan Chase & Co.",
            ticker: "JPM",
        },
        {
            value: "johnson & johnson",
            label: "Johnson & Johnson",
            ticker: "JNJ",
        },
        {
            value: "broadcom inc.",
            label: "Broadcom Inc.",
            ticker: "AVGO",
        },
        {
            value: "mastercard incorporated",
            label: "Mastercard Incorporated",
            ticker: "MA",
        },
        {
            value: "the procter & gamble company",
            label: "The Procter & Gamble Company",
            ticker: "PG",
        },
        {
            value: "oracle corporation",
            label: "Oracle Corporation",
            ticker: "ORCL",
        },
        {
            value: "the home depot, inc.",
            label: "The Home Depot, Inc.",
            ticker: "HD",
        },
        {
            value: "chevron corporation",
            label: "Chevron Corporation",
            ticker: "CVX",
        },
        {
            value: "merck & co., inc.",
            label: "Merck & Co., Inc.",
            ticker: "MRK",
        },
        {
            value: "adobe inc.",
            label: "Adobe Inc.",
            ticker: "ADBE",
        },
        {
            value: "toyota motor corporation",
            label: "Toyota Motor Corporation",
            ticker: "TM",
        },
        {
            value: "asml holding n.v.",
            label: "ASML Holding N.V. ",
            ticker: "ASML",
        },
        {
            value: "abbvie inc.",
            label: "AbbVie Inc.",
            ticker: "ABBV",
        },
        {
            value: "costco wholesale corporation",
            label: "Costco Wholesale Corporation",
            ticker: "COST",
        },
        {
            value: "the coca-cola company",
            label: "The Coca-Cola Company",
            ticker: "KO",
        },
        {
            value: "pepsico, inc.",
            label: "PepsiCo, Inc.",
            ticker: "PEP",
        },
        {
            value: "bank of america corporation",
            label: "Bank of America Corporation",
            ticker: "BAC",
        },
        {
            value: "shell plc",
            label: "Shell plc",
            ticker: "SHEL",
        },
        {
            value: "alibaba group holding limited",
            label: "Alibaba Group Holding Limited",
            ticker: "BABA",
        },
        {
            value: "fomento cconómico mexicano, sab de cv",
            label: "Fomento Económico Mexicano, SAB de CV",
            ticker: "FMX",
        },
        {
            value: "cisco systems, inc.",
            label: "Cisco Systems, Inc.",
            ticker: "CSCO",
        },
        {
            value: "salesforce, inc.",
            label: "Salesforce, Inc.",
            ticker: "CRM",
        },
        {
            value: "astrazeneca plc",
            label: "AstraZeneca PLC",
            ticker: "AZN",
        },
        {
            value: "accenture plc",
            label: "Accenture PLC",
            ticker: "ACN",
        },
        {
            value: "mcdonald's corporation",
            label: "McDonald's Corporation",
            ticker: "MCD",
        },
        {
            value: "linde plc",
            label: "Linde PLC",
            ticker: "LIN",
        },
        {
            value: "novartis ag",
            label: "Novartis AG",
            ticker: "NVS",
        },
        {
            value: "netflix, inc.",
            label: "Netflix, Inc.",
            ticker: "NFLX",
        },
        {
            value: "advanced micro devices, inc.",
            label: "Advanced Micro Devices, Inc.",
            ticker: "AMD",
        },
        {
            value: "comcast corporation",
            label: "Comcast Corporation",
            ticker: "CMCSA",
        },
        {
            value: "pfizer inc.",
            label: "Pfizer Inc.",
            ticker: "PFE",
        },
        {
            value: "thermo fisher scientific inc.",
            label: "Thermo Fisher Scientific Inc.",
            ticker: "TMO",
        },
        {
            value: "t-mobile us, inc.",
            label: "T-Mobile US, Inc.",
            ticker: "TMUS",
        },
        {
            value: "abbott laboratories",
            label: "Abbott Laboratories",
            ticker: "ABT",
        },
        {
            value: "nike, inc.",
            label: "NIKE, Inc.",
            ticker: "NKE",
        },
        {
            value: "invesco qqq trust series 1",
            label: "Invesco QQQ Trust Series 1",
            ticker: "QQQ",
        },
        {
            value: "spdr s&p 500 etf trust",
            label: "SPDR S&P 500 ETF Trust",
            ticker: "SPY",
        },
    ];
    return {
        props: {
            userId: user.id,
            tickers,
        },
    };
};
