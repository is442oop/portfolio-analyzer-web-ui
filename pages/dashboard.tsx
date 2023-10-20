import { AssetAllocationChart } from "@/components/AssetAllocationChart";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Layout } from "@/components/Layout";
import PortfolioHistoryChart from "@/components/PortfolioHistoryChart";
import AssetTable from "@/components/AssetTable";

const dashboard = () => {
    return (
        <Layout>
            <DashboardHeader />
            <div className="flex flex-col gap-3 lg:flex-row">
                <PortfolioHistoryChart />
                <AssetAllocationChart />
            </div>
            <div className="mt-12 text-xl font-semibold">Holdings</div>
            <AssetTable />
        </Layout>
    );
};

export default dashboard;
