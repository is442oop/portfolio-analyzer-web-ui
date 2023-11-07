import { DashboardHeader } from "@/components/DashboardHeader";
import { Layout } from "@/components/Layout";
import PortfolioHistoryChart from "@/components/PortfolioHistoryChart";
import AssetTable from "@/components/AssetTable";
import { useState } from "react";
import { useQuery } from "react-query";
import AssetAllocationChart from "@/components/AssetAllocationChart";
import PortfolioList from "@/components/PortfolioList";
import { useSessionDetails } from "@/hooks/useSessionDetails";

const dashboard = () => {
    const [currentBalance, setCurrentBalance] = useState(10000);
    const userDetails = useSessionDetails();
    const userId = userDetails?.id;
    // const { data, isLoading } = useQuery("data", async () => {
    //     const response = await fetch("/api/users/test/assets");
    //     const assets = await response.json();
    //     return assets;
    // });

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
    return (
        <Layout>
            <div className="h-fit min-h-screen space-y-10 py-10 pl-0 pr-10 sm:p-10">
                <div>
                    <DashboardHeader currentBalance={currentBalance} />
                    <div className="flex flex-col gap-1 xl:flex-row xl:justify-center">
                        <PortfolioHistoryChart />
                        <AssetAllocationChart isIndividualPortfolio={false} />
                    </div>
                </div>
                <div>
                    <div className="mt-12 text-xl font-semibold">Holdings</div>
                    {/* {data && <AssetTable data={data} isLoading={isLoading} />} */}
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
