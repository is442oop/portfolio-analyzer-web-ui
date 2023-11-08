import { use, useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { DashboardHeader } from "@/components/DashboardHeader";
import { TransactionModal } from "@/components/TransactionModal";
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
}: {
    pid: string;
    userId: string;
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
    // useEffect(() => {
    //     console.log(router.query.id);
    //     if (router.query.id !== undefined) setIsLoading(false);
    // }, [router.query.id]);
    console.log(pid);
    // historical data for portfolio
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
            console.log(res);

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

                            <TransactionModal />
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
                                <TransactionModal />
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
    console.log(session);
    if (error || !session)
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };

    const { pid } = context.query;
    return {
        props: {
            pid,
            userId: user.id,
        },
    };
};
