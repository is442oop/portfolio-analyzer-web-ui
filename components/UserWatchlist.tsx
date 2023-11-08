import { Columns } from "@/components/WatchlistAssetTableColumn";
import { useQuery } from "react-query";
import { DataTable } from "@/components/ui/DataTable";
import { Icons } from "./ui/Icons";
import {
    User,
    createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

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
                `/api/users/${userDetails!.id}/watchlistAssets`,
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
    return <AssetData />;
};

export default UserWatchlist;
