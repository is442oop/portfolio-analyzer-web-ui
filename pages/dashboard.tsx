import { DashboardHeader } from "@/components/DashboardHeader";
import { Layout } from "@/components/Layout";
import PortfolioHistoryChart from "@/components/PortfolioHistoryChart";
import AssetTable from "@/components/AssetTable";
import { useState } from "react";
import { useQuery } from "react-query";
import AssetAllocationChart from "@/components/AssetAllocationChart";

const dashboard = () => {
    const [portfolioData, setPortfolioData] = useState({
        currentBalance: 10000,
        previousBalance: 9900, // 24hrs ago balance
    });
    const { data, isLoading } = useQuery("data", async () => {
        const response = await fetch("/api/users/test/assets");
        const assets = await response.json();
        return assets;
    });
    return (
        <Layout>
            <div className="h-fit min-h-screen py-10 pl-0 pr-10 sm:p-10">
                <DashboardHeader portfolioData={portfolioData} />
                <div className="flex flex-col gap-3 lg:flex-row">
                    <PortfolioHistoryChart />
                    <AssetAllocationChart isIndividualPortfolio={false} />
                </div>
                <div className="mt-12 text-xl font-semibold">Holdings</div>
                {data && <AssetTable data={data} isLoading={isLoading} />}
            </div>
        </Layout>
    );
};

export default dashboard;
