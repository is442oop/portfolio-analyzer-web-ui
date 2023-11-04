import React, { useState } from "react";
import { useRouter } from "next/router";
import { Layout } from "@/components/Layout";
import { DashboardHeader } from "@/components/DashboardHeader";
import { TransactionModal } from "@/components/TransactionModal";
import PortfolioHistoryChart from "@/components/PortfolioHistoryChart";
import { AssetAllocationChart } from "@/components/AssetAllocationChart";
import AssetTable from "@/components/AssetTable";
import { useQuery } from "react-query";
import { Icons } from "@/components/ui/Icons";

const IndividualPortfolio = () => {
    const router = useRouter();
    const pid = router.query.pid;
    // TODO: get portfolio balance from db
    const [individualPortfolioData, setIndividualPortfolioData] = useState({
        currentBalance: 0,
        previousBalance: 0, // 24hrs ago balance
    });
    // TODO: get portfolio assets from db
    const [individualPortfolioAssets, setIndividualPortfolioAssets] = useState<
        Asset[]
    >([
        {
            ticker: "BTC",
            name: "Bitcoin",
            logoUrl:
                "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
            balance: 1.0,
            price: 28000.9,
            price24hDeltaPercentage: 0.23,
            value: 28000.9,
        },
        {
            ticker: "BNB",
            name: "BNB",
            logoUrl:
                "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
            balance: 41,
            price: 210.3,
            price24hDeltaPercentage: 0.23,
            value: 210.3 * 41,
        },
    ]);

    const { data: portfolioDetails, isLoading: isPortfolioDetailsLoading } =
        useQuery(
            "portfolioDetails",
            async () => {
                const response = await fetch(`/api/portfolio/${pid}`);
                const portfolioDetails = await response.json();
                return portfolioDetails;
            },
            { enabled: router.isReady },
        );

    // const { data, isLoading: tableData } = useQuery("data", async () => {
    //     const response = await fetch("/api/users/test/assets");
    //     const assets = await response.json();
    //     return assets;
    // });
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
                {individualPortfolioAssets.length === 0 ? (
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
                ) : (
                    <div>
                        <div className="flex flex-col gap-3 lg:flex-row">
                            <PortfolioHistoryChart />
                            <AssetAllocationChart />
                        </div>
                        <div className="mt-12 text-xl font-semibold">
                            Holdings
                        </div>
                        {/* <AssetTable
                            data={individualPortfolioAssets}
                            isLoading={tableData}
                        /> */}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default IndividualPortfolio;
