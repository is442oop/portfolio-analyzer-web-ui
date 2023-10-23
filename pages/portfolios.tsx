import { AddTransactionModal } from "@/components/AddTransactionModal";
import { Layout } from "@/components/Layout";
import React from "react";

const portfolios = () => {
    return (
        <Layout>
            <main
                className={`flex min-h-screen flex-col items-center justify-between p-10 text-5xl text-primary`}
            >
                Portfolios Page
                <AddTransactionModal />
            </main>
            
        </Layout>
    );
};

export default portfolios;
