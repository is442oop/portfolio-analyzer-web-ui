import { DashboardHeader } from "@/components/DashboardHeader";
import { Layout } from "@/components/Layout";
import React from "react";

const dashboard = () => {
    return (
        <>
            <Layout>
                <main
                    // className={`text-primary flex min-h-screen flex-col items-center justify-between p-10 text-5xl`}
                >
                    {/* Dashboard Page */}
                    <DashboardHeader/>
                </main>
                
            </Layout>

        </>
    );
};

export default dashboard;
