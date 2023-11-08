import { ColumnDef } from "@tanstack/react-table";
import { ChevronUpIcon, ChevronDownIcon, XIcon } from "lucide-react";

import { formatNumber, formatUsd } from "@/utils/functions";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "./ui/Toaster/use-toast";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button } from "./ui/Button";

type DeleteAsset = {
    portfolioId: string;
    assetTicker: string;
};

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
        header: () => <div className="text-right">Average Price</div>,
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
    {
        id: "actions",
        cell: ({ row }) => {
            const queryClient = useQueryClient();
            const asset = row.original;
            // console.log(asset);
            const deleteTransactionReq = async (data: DeleteAsset) => {
                const response = await axios.delete("/api/portfolios/assets", {
                    data: {
                        portfolioId: data.portfolioId,
                        assetTicker: data.assetTicker,
                    },
                });
            };
            const { mutate } = useMutation(deleteTransactionReq, {
                onSuccess: () => {
                    toast({
                        variant: "success",
                        title: "Asset deleted successfully",
                    });
                    queryClient.invalidateQueries("individualPortfolioAssets");
                    queryClient.invalidateQueries("allocationData");
                },
            });
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            className="h-fit border px-0.5 py-0.5 hover:bg-destructive/20"
                            variant={"ghost"}
                        >
                            <XIcon className="h-5 w-5 text-destructive" />
                        </Button>
                        {/* <span className="sr-only">Open menu</span> */}
                        {/* </Button> */}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel className="text-destructive">
                            Confirm delete?
                        </DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                mutate({
                                    portfolioId: asset.portfolioId,
                                    assetTicker: asset.assetTicker,
                                })
                            }
                        >
                            Yes
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
