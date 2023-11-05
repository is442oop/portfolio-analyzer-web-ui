import { Layout } from "@/components/Layout";
import  UserWatchlist  from "@/components/UserWatchlist";
import React from "react";

const watchlist = () => {
    return (
        <Layout>
               <div className="space-y-4 rounded-lg bg-white p-4">
            <h2 className="text-2xl font-semibold text-primary">
               Watchlist
            </h2>
            </div>

                <UserWatchlist />
        </Layout>
    );
};

export default watchlist;
