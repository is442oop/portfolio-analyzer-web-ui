import { DashboardHeader } from "@/components/DashboardHeader";
import { Layout } from "@/components/Layout";
import React from "react";

const dashboard = () => {
    return (
        <>
            <Layout>
                <main>
                    <DashboardHeader />
                </main>
            </Layout>
        </>
    );
};

export default dashboard;
