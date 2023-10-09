import { AssetAllocationChart } from "@/components/AssetAllocationChart";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Layout } from "@/components/Layout";
import PortfolioHistoryChart from "@/components/PortfolioHistoryChart";
import React from "react";

const dashboard = () => {
    return (
        <>
            <Layout>
                <main className="space-y-5">
                    <DashboardHeader />
                    <div className="flex flex-col gap-3 lg:flex-row">
                        <PortfolioHistoryChart />
                        <AssetAllocationChart />
                    </div>
                </main>
            </Layout>
        </>
    );
};

export default dashboard;
