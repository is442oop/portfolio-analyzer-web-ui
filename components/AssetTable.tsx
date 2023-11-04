import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import { DataTable } from "@/components/ui/DataTable";
import { Columns } from "@/components/AssetTableColumn";

type AssetTableProps = {
    isLoading: boolean;
    data: Asset[];
};
const AssetTable = ({ isLoading, data }: AssetTableProps) => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            {isLoading && <div>Loading Assets...</div>}
            <DataTable columns={Columns} data={data} />
        </QueryClientProvider>
    );
};

export default AssetTable;
