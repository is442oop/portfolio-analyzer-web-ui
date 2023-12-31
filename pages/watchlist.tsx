import { Layout } from "@/components/Layout";
import UserWatchlist from "@/components/UserWatchlist";
import { WatchlistModal } from "@/components/WatchlistModal";
import { Button } from "@/components/ui/Button";
import React from "react";
import PerspectiveViewer from "@/components/PerspectiveViewer";

const watchlist = () => {
    return (
        <Layout>
            <div className="flex h-fit min-h-screen flex-col py-10 pl-0 pr-10 sm:p-10">
                <div className="flex items-center justify-between rounded-lg bg-white py-4">
                    <h2 className="text-2xl font-semibold text-primary">
                        Watchlist
                    </h2>
                    {/* TODO add ticker logic */}
                    <WatchlistModal />
                </div>
                <div className="flex grow flex-col space-y-10 pt-2">
                    <UserWatchlist />
                    <PerspectiveViewer />
                </div>
            </div>
        </Layout>
    );
};

export default watchlist;
