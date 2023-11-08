import { DashboardHeader } from "@/components/DashboardHeader";
import { Layout } from "@/components/Layout";
import PortfolioHistoryChart from "@/components/PortfolioHistoryChart";
import AssetTable from "@/components/AssetTable";
import { use, useEffect, useState } from "react";
import { useQuery } from "react-query";
import AssetAllocationChart from "@/components/AssetAllocationChart";
import PortfolioList from "@/components/PortfolioList";
import { useSessionDetails } from "@/hooks/useSessionDetails";
import { Icons } from "@/components/ui/Icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const dashboard = () => {
    const [currentBalance, setCurrentBalance] = useState<number>(0);
    const [selectedPeriod, setSelectedPeriod] = useState("7");
    const userDetails = useSessionDetails();
    const userId = userDetails?.id;
    // const { data, isLoading } = useQuery("data", async () => {
    //     const response = await fetch("/api/users/test/assets");
    //     const assets = await response.json();
    //     return assets;
    // });

    const { data: allAssetsList, isLoading: allAssetsListLoading } = useQuery(
        "allAssetsList",
        async () => {
            const response = await fetch(
                "/api/portfolios/assets/user/d988bdd8-e569-4026-970a-dd6c286ebe6d",
            );
            const assets = await response.json();
            return assets.portfolioAssetList;
        },
    );

    if (allAssetsList) console.log(allAssetsList);
    const { data: portfolioObj, isLoading: portfolioObjLoading } = useQuery(
        "portfolioList",
        async () => {
            const response = await fetch(`/api/users/${userId}/portfolios`);
            const portfolioList = await response.json();
            return portfolioList;
        },
        {
            enabled: !!userId,
        },
    );

    const {
        data: portfolioAssetHistory,
        isLoading: portfolioAssetListLoading,
        refetch: refetchHistory,
    } = useQuery(
        "portfolioAssetHistory",
        async () => {
            console.log(userId);
            // await new Promise((resolve) => setTimeout(resolve, 1000));
            const response = await fetch(
                `/api/users/d988bdd8-e569-4026-970a-dd6c286ebe6d/portfolios/balance?duration=${selectedPeriod}`,
            );
            const res = await response.json();
            return res.overallPortfolioHistoryData;
        },
        {
            onSuccess: async (portfolioAssetHistory) => {
                console.log(portfolioAssetHistory);
                if (portfolioAssetHistory !== undefined) {
                    setCurrentBalance(
                        portfolioAssetHistory[portfolioAssetHistory?.length - 1]
                            .balance,
                    );
                }
            },
            enabled: !!selectedPeriod,
        },
    );

    useEffect(
        () => console.log("current Balcne", currentBalance),
        [currentBalance],
    );

    useEffect(() => {
        refetchHistory();
    }, [selectedPeriod]);

    if (portfolioAssetHistory) console.log(portfolioAssetHistory);
    return (
        <Layout>
            <div className="h-fit min-h-screen space-y-10 py-10 pl-0 pr-10 sm:p-10">
                <div>
                    <DashboardHeader currentBalance={currentBalance!} />
                    <div className="flex flex-col gap-1 xl:flex-row xl:justify-center">
                        <PortfolioHistoryChart
                            portfolioAssetHistory={portfolioAssetHistory}
                            setSelectedPeriod={setSelectedPeriod}
                            selectedPeriod={selectedPeriod}
                            portfolioAssetListLoading={
                                portfolioAssetListLoading
                            }
                        />

                        <AssetAllocationChart isIndividualPortfolio={false} />
                    </div>
                </div>
                <div>
                    <div className="mt-12 text-xl font-semibold">Holdings</div>
                    {allAssetsList && (
                        <AssetTable
                            data={allAssetsList}
                            isLoading={allAssetsListLoading}
                        />
                    )}
                </div>
                {portfolioObj && (
                    <PortfolioList
                        id={userId!}
                        portfolioList={portfolioObj.portfolioList}
                    />
                )}
            </div>
        </Layout>
    );
};

export default dashboard;
