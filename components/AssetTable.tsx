import { DataTable } from "@/components/ui/DataTable";
import { Columns } from "@/components/AssetTableColumn";

type AssetTableProps = {
    isLoading: boolean;
    data: Asset[];
};
const AssetTable = ({ isLoading, data }: AssetTableProps) => {
    return (
        <>
            {isLoading && <div>Loading Assets...</div>}
            <DataTable columns={Columns} data={data} />
        </>
    );
};

export default AssetTable;
