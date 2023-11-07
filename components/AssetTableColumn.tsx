import { ColumnDef } from "@tanstack/react-table";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";

import { formatNumber, formatUsd } from "@/utils/functions";

export const Columns: ColumnDef<Asset>[] = [
    {
        accessorKey: "assetTicker",
        header: () => <div className="w-60 text-left">Asset</div>,
        cell: ({ row }) => {
            const asset = row.original;
            return (
                <div className="flex w-60 items-center gap-2">
                    <div className="flex items-baseline gap-1">
                        <span className="rounded-md border bg-primary px-1.5 py-0.5 text-primary-foreground">
                            {asset.assetTicker}
                        </span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "price",
        header: () => <div className="text-right">Price</div>,
        cell: ({ row }) => {
            return (
                <div className="text-right">
                    {formatUsd(row.getValue("price"))}
                </div>
            );
        },
    },
    {
        accessorKey: "quantity",
        header: () => <div className="text-right">Balance</div>,
        cell: ({ row }) => (
            <div className="text-right">
                {formatNumber(row.getValue("quantity"))}
            </div>
        ),
    },
    {
        accessorKey: "value",
        header: ({ column }) => {
            return (
                <button
                    className="flex h-full w-full items-center"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    <div className="ml-auto flex flex-row gap-1">
                        <div className="shrink-0">Value</div>
                        {column.getIsSorted() === "asc" ? (
                            <ChevronUpIcon className="h-5 w-5 shrink-0" />
                        ) : (
                            <ChevronDownIcon className="h-5 w-5 shrink-0" />
                        )}
                    </div>
                </button>
            );
        },
        cell: ({ row }) => {
            const value = row.original.price * row.original.quantity;
            return <div className="text-right">{formatUsd(value)}</div>;
        },
    },
];
