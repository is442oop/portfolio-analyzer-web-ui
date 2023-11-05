import React from "react";
import { useRouter } from "next/router";
import { Layout } from "@/components/Layout";

const IndividualPortfolio = () => {
    const router = useRouter();
    return (
        <Layout>
            <div className="text-center">portfolio: {router.query.name}</div>
        </Layout>
    );
};

export default IndividualPortfolio;
