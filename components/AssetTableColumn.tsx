import { ColumnDef } from "@tanstack/react-table";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";

import { formatNumber, formatUsd } from "@/utils/functions";

export const Columns: ColumnDef<Asset>[] = [
    {
        accessorKey: "ticker",
        header: () => <div className="w-60 text-left">Asset</div>,
        cell: ({ row }) => {
            const asset = row.original;
            return (
                <div className="flex w-60 items-center gap-2">
                    <img
                        src={asset.logoUrl}
                        alt={asset.name}
                        className="mr-2 h-6 w-6 rounded-full"
                    />
                    <div className="flex items-baseline gap-1">
                        <span>{asset.name}</span>
                        <span className="text-gray-400">{asset.ticker}</span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "price",
        header: () => <div className="text-right">Price (24h %)</div>,
        cell: ({ row }) => {
            return (
                <div className="text-right">
                    {formatUsd(row.getValue("price"))}
                </div>
            );
        },
    },
    {
        accessorKey: "balance",
        header: () => <div className="text-right">Balance</div>,
        cell: ({ row }) => (
            <div className="text-right">
                {formatNumber(row.getValue("balance"))}
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
            return (
                <div className="text-right">
                    {formatUsd(row.getValue("value"))}
                </div>
            );
        },
    },
];
