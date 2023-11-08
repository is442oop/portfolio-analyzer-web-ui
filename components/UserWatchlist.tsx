import { Columns } from "@/components/WatchlistAssetTableColumn";
import { useQuery } from "react-query";
import { DataTable } from "@/components/ui/DataTable";
import { Icons } from "./ui/Icons";
const AssetData = () => {
    const { isLoading, data } = useQuery("data", async () => {
        const response = await fetch("/api/users/test/watchlistAssets");
        const assets = await response.json();
        return assets;
    });

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
