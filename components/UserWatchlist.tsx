import { useCallback, useEffect, useMemo, useState } from "react";
import { Columns } from "@/components/WatchlistAssetTableColumn";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { DataTable } from "@/components/ui/DataTable";
import { Icons } from "./ui/Icons";
const AssetData = () => {
    const { isLoading, data } = useQuery("data", async () => {
        const response = await fetch("/api/users/test/watchlistAssets");
        const assets = await response.json();
        return assets;
    });

    // TESTNG PERFORMANCE OF USEMEMO VS REACTQUERY

    // const [assets, setAssets] = useState();
    // const [isLoading, setIsLoading] = useState<boolean>(true);
    // const getAssets = async () => {
    //     const response = await fetch("/api/users/1/watchlistAssets");
    //     const assets = await response.json();
    //     return assets;
    // };

    // const results = useMemo(
    //     () => async () => {
    //         const data = await getAssets();
    //         setAssets(data);
    //         setIsLoading(false);
    //     },
    //     [assets],
    // );

    // useEffect(() => {
    //     results();
    // }, [results]);

    return (
        <div>
            {isLoading && (
                <Icons.spinner className="mx-auto animate-spin text-primary" />
            )}
            {data && <DataTable columns={Columns} data={data} />}
        </div>
    );
};

const UserWatchlist = () => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <AssetData />
        </QueryClientProvider>
    );
};

export default UserWatchlist;
