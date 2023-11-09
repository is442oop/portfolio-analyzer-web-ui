import { Columns } from "@/components/WatchlistAssetTableColumn";
import { useQuery } from "react-query";
import { DataTable } from "@/components/ui/DataTable";
import { Icons } from "./ui/Icons";
import { toast } from "./ui/Toaster/use-toast";

const UserWatchlist = ({ userId }: { userId: string }) => {
    const { isLoading, data } = useQuery("watchlistData", async () => {
        const response = await fetch(`/api/users/${userId}/watchlistAssets`);
        if (!response.ok) {
            toast({
                variant: "destructive",
                title: "Failed to fetch watchlist data",
            });
        }
        const jsonData = await response.json();
        console.log(jsonData);
        return jsonData;
    });
    if (data) console.log(data);

    return (
        <div>
            {isLoading && (
                <Icons.spinner className="mx-auto animate-spin text-primary" />
            )}
            {data && <DataTable columns={Columns} data={data} />}
        </div>
    );
};

export default UserWatchlist;
