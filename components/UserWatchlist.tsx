import { useCallback, useEffect, useMemo, useState } from "react";
import { Columns } from "@/components/WatchlistAssetTableColumn";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { DataTable } from "@/components/ui/DataTable";
import { Icons } from "./ui/Icons";
import {
    User,
    createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

const AssetData = () => {

    const [userDetails, setUserDetails] = useState<User>();
    const supabase = createClientComponentClient();

    const getUser = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        setUserDetails(user!);
        return user;
    };

    useEffect(() => {
        getUser();
    }, []);

    const { isLoading, data } = useQuery(
        "data",
        async () => {
            const response = await fetch(
                `/api/users/${userDetails?.id}/watchlistAssets`,
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const jsonData = await response.json();
            console.log(jsonData);
            return jsonData;
        },
        {
            enabled: !!userDetails?.id,
        },
    );

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
