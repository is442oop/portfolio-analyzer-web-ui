import { DashboardHeader } from "@/components/DashboardHeader";
import { Layout } from "@/components/Layout";
import PortfolioHistoryChart from "@/components/PortfolioHistoryChart";
import React from "react";

const dashboard = () => {
    return (
        <>
            <Layout>
                <main>
                    <DashboardHeader />
                    <PortfolioHistoryChart />
                </main>
            </Layout>
        </>
    );
};

export default dashboard;
