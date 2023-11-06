import React, { useState } from "react";
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
    const { portfolioDetails, isPortfolioDetailsLoading } =
        usePortfolioDetails();

    // TODO: get portfolio balance from db
    const [individualPortfolioData, setIndividualPortfolioData] = useState<any>(
        {
            currentBalance: 0,
            previousBalance: 0, // 24hrs ago balance
        },
    );

    const {
        data: individualPortfolioAssets,
        isLoading: individualPortfolioAssetsLoading,
    } = useQuery(
        "individualPortfolioAssets",
        async () => {
            const response = await fetch(
                `/api/portfolio/assets/${router.query.pid}`,
            );
            const res = await response.json();

            return res.portfolioAssetList;
        },
        {
            enabled: !!router.query.pid,
        },
    );

    if (individualPortfolioAssets) {
        individualPortfolioAssets.forEach((portfolio: PortfolioResponse) => {
            portfolio.value = portfolio.quantity * portfolio.averagePrice;
        });
        console.log(individualPortfolioAssets);
    }
    return (
        <Layout>
            <div className="h-fit min-h-screen py-10 pl-0 pr-10 sm:p-10">
                {isPortfolioDetailsLoading && (
                    <Icons.spinner className="mx-auto my-10 animate-spin text-primary" />
                )}
                {portfolioDetails && (
                    <DashboardHeader
                        edit={true}
                        portfolioData={individualPortfolioData}
                        portfolioName={portfolioDetails.portfolioName}
                        portfolioDesc={portfolioDetails.description}
                    />
                )}
                {individualPortfolioAssets &&
                    individualPortfolioAssets.length === 0 && (
                        <div className="my-auto flex h-fit flex-col items-center justify-center gap-y-3 pt-20">
                            <div className="space-y-1 text-center">
                                <h1 className="font-semibold">
                                    This portfolio needs some final touches ...
                                </h1>
                                <h2 className="text-gray-400">
                                    Add an asset to get started
                                </h2>
                            </div>

                            <TransactionModal />
                        </div>
                    )}
                {individualPortfolioAssets && (
                    <div className="p-4">
                        <div className="flex flex-col gap-3 lg:flex-row">
                            <PortfolioHistoryChart />
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
