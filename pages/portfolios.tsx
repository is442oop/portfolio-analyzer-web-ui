import { Layout } from "@/components/Layout";
import React from "react";
import { PortfolioModal } from "@/components/PortfolioModal";

const portfolios = () => {
    return (
        <Layout>
            <main
                className={`flex min-h-screen flex-col items-center justify-between p-10 text-5xl text-primary`}
            >
                Portfolios Page
            </main>
        </Layout>
    );
};

export default portfolios;
