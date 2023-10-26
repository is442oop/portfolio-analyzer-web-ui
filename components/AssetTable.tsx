import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import { DataTable } from "@/components/ui/DataTable";
import { Columns } from "@/components/AssetTableColumn";

const AssetTable = () => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <AssetData />
        </QueryClientProvider>
    );
};

const AssetData = () => {
    const { isLoading, data } = useQuery("data", async () => {
        const response = await fetch("/api/users/test/assets");
        const assets = await response.json();
        return assets;
    });

    if (isLoading) {
        return <div>Loading Assets...</div>;
    }

    return (
        <div>
            <DataTable columns={Columns} data={data} />
        </div>
    );
};

export default AssetTable;
