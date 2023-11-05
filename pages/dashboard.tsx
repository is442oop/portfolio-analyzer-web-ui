import { AssetAllocationChart } from "@/components/AssetAllocationChart";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Layout } from "@/components/Layout";
import PortfolioHistoryChart from "@/components/PortfolioHistoryChart";
import AssetTable from "@/components/AssetTable";

const dashboard = () => {
    return (
        <Layout>
            <div className="h-screen py-10 pl-0 pr-10 sm:p-10">
                <DashboardHeader />
                <div className="flex flex-col gap-3 lg:flex-row">
                    <PortfolioHistoryChart />
                    <AssetAllocationChart />
                </div>
                <div className="mt-12 text-xl font-semibold">Holdings</div>
                <AssetTable />
            </div>
        </Layout>
    );
};

export default dashboard;
