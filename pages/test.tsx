import { Layout } from "@/components/Layout";
import React from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { PortfolioModal } from "@/components/PortfolioModal";

const test = () => {
    return (
        <>
            <Layout>

                {/* <DashboardHeader/> */}
                <PortfolioModal/>
                {/* <button onClick={(e)=> console.log("hello")}>onClick</button> */}
                
            </Layout>

        </>
    );
};

export default test;
