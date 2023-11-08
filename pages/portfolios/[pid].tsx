import { use, useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Ticker, TransactionModal } from "@/components/TransactionModal";
import PortfolioHistoryChart from "@/components/PortfolioHistoryChart";
import AssetTable from "@/components/AssetTable";
import { Icons } from "@/components/ui/Icons";
import { usePortfolioDetails } from "@/hooks/usePortfolioDetails";
import AssetAllocationChart from "@/components/AssetAllocationChart";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { User, createPagesServerClient } from "@supabase/auth-helpers-nextjs";

const IndividualPortfolio = ({
    pid,
    userId,
    tickers,
}: {
    pid: string;
    userId: string;
    tickers: Ticker[];
}) => {
    const router = useRouter();
    const [selectedPeriod, setSelectedPeriod] = useState("7");
    const { portfolioDetails, isPortfolioDetailsLoading } =
        usePortfolioDetails();
    const [latestPrices, setLatestPrices] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [currentBalance, setCurrentBalance] = useState<number>();

    const {
        data: individualPortfolioAssets,
        isLoading: individualPortfolioAssetsLoading,
    } = useQuery(
        "individualPortfolioAssets",
        async () => {
            const response = await fetch(`/api/portfolios/assets/${pid}`);
            const res = await response.json();
            return res.portfolioAssetList;
        },
        {
            onSuccess: (individualPortfolioAssets) => {
                individualPortfolioAssets?.forEach(
                    (portfolio: PortfolioResponse) => {
                        portfolio.value = portfolio.quantity * portfolio.price;
                    },
                );

                // get balance for current portfolio
                const initialValue = 0;
                const currentBalance = individualPortfolioAssets?.reduce(
                    (accumulator: number, currentValue: PortfolioResponse) => {
                        return accumulator + currentValue.value;
                    },
                    initialValue,
                );
                setCurrentBalance(currentBalance);
            },
            enabled: !!router.isReady,
        },
    );
    const {
        data: portfolioAssetHistory,
        isLoading: portfolioAssetListLoading,
        refetch: refetchHistory,
    } = useQuery(
        "portfolioAssetHistory",
        async () => {
            const response = await fetch(
                `/api/portfolios/${pid}/balance?duration=${
                    selectedPeriod === "1" ? "2" : selectedPeriod
                }`,
            );
            const res = await response.json();
            return res.portfolioHistoryData;
        },
        {
            onSuccess: async (portfolioAssetHistory) => {
                if (portfolioAssetHistory !== undefined) {
                    setLatestPrices(
                        portfolioAssetHistory[portfolioAssetHistory?.length - 1]
                            .balance,
                    );
                }
            },
            enabled: !!router.query.pid,
        },
    );

    useEffect(() => {
        if (router.isReady) refetchHistory();
    }, [router.isReady]);

    useEffect(() => {
        refetchHistory();
    }, [selectedPeriod]);

    return (
        <Layout>
            <div className="h-fit min-h-screen py-10 pl-0 pr-10 sm:p-10">
                {isPortfolioDetailsLoading && (
                    <Icons.spinner className="mx-auto my-10 animate-spin text-primary" />
                )}
                {portfolioDetails && (
                    <DashboardHeader
                        userId={userId}
                        portfolioAssets={individualPortfolioAssets!}
                        balance={currentBalance!}
                        edit={true}
                        latestPrices={latestPrices!}
                        portfolioName={portfolioDetails.portfolioName}
                        portfolioDesc={portfolioDetails.description}
                    />
                )}
                {!individualPortfolioAssets ||
                    (individualPortfolioAssets.length === 0 && (
                        <div className="my-auto flex h-fit flex-col items-center justify-center gap-y-3 pt-20">
                            <div className="space-y-1 text-center">
                                <h1 className="font-semibold">
                                    This portfolio needs some final touches ...
                                </h1>
                                <h2 className="text-gray-400">
                                    Add a ticker to get started
                                </h2>
                            </div>

                            <TransactionModal tickers={tickers} />
                        </div>
                    ))}
                {individualPortfolioAssets &&
                    individualPortfolioAssets.length !== 0 && (
                        <div>
                            <div className="flex flex-col gap-3 xl:flex-row">
                                <PortfolioHistoryChart
                                    portfolioAssetHistory={
                                        portfolioAssetHistory
                                    }
                                    setSelectedPeriod={setSelectedPeriod}
                                    selectedPeriod={selectedPeriod}
                                    portfolioAssetListLoading={isLoading}
                                />

                                <AssetAllocationChart
                                    userId={userId}
                                    isIndividualPortfolio={true}
                                    pid={pid}
                                />
                            </div>
                            <div className="mt-12 flex items-center justify-between pb-5">
                                <div className="text-xl font-semibold">
                                    Holdings
                                </div>
                                <TransactionModal tickers={tickers} />
                            </div>
                            <AssetTable
                                data={individualPortfolioAssets}
                                isLoading={individualPortfolioAssetsLoading}
                            />
                        </div>
                    )}
            </div>
        </Layout>
    );
};

export default IndividualPortfolio;

export const getServerSideProps = async (context: any) => {
    const supabase = createPagesServerClient(context);
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();
    if (error || !session)
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };

    const { pid } = context.query;

    const supportedTickers: Ticker[] = [
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
    const tickers = await Promise.all(
        supportedTickers.map(async (t) => {
            const response = await fetch(
                `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${t.ticker}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`,
            );
            const data = await response.json();
            const price = data["Global Quote"]["05. price"];
            t.price = parseFloat(price) ?? 0;
            return t;
        }),
    );
    return {
        props: {
            pid,
            userId: session.user.id,
            tickers,
        },
    };
};
