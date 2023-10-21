import { Layout } from "@/components/Layout";
import { UserWatchlist } from "@/components/UserWatchlist";
import React from "react";

const watchlist = () => {
    return (
        <Layout>
            <main
                className={`text-primary flex min-h-screen flex-col items-center justify-between p-10 text-5xl`}
            >
                <UserWatchlist />
            </main>
           
        </Layout>
    );
};

export default watchlist;
