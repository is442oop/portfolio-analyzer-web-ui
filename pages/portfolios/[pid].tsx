import { useEffect, useState } from "react";
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

const IndividualPortfolio = () => {
    const router = useRouter();
    const [selectedPeriod, setSelectedPeriod] = useState("7");
    const { portfolioDetails, isPortfolioDetailsLoading } =
        usePortfolioDetails();

    const [currentBalance, setCurrentBalance] = useState<number>();

    const {
        data: individualPortfolioAssets,
        isLoading: individualPortfolioAssetsLoading,
    } = useQuery(
        "individualPortfolioAssets",
        async () => {
            const response = await fetch(
                `/api/portfolios/assets/${router.query.pid}`,
            );
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

    // historical data for portfolio
    const {
        data: portfolioAssetHistory,
        isLoading: portfolioAssetListLoading,
        refetch: refetchHistory,
    } = useQuery(
        "portfolioAssetHistory",
        async () => {
            console.log(router.query.pid);

            const response = await fetch(
                `/api/portfolios/${router.query.pid}/balance?duration=${
                    selectedPeriod === "1" ? "2" : selectedPeriod
                }`,
            );
            const res = await response.json();
            console.log(res);

            return res.portfolioHistoryData;
        },
        // {
        //     enabled: !!router.query.pid,
        // },
    );

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
                        edit={true}
                        currentBalance={currentBalance!}
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
                                    portfolioAssetListLoading={
                                        portfolioAssetListLoading
                                    }
                                />
                                <AssetAllocationChart
                                    isIndividualPortfolio={true}
                                    pid={parseInt(router.query.pid as string)}
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
