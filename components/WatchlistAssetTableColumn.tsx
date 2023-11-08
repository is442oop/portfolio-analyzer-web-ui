import { ColumnDef } from "@tanstack/react-table";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";
import { LineChart, Line, YAxis } from "recharts";
import { formatPercentage, formatUsdWatchlist } from "@/utils/functions";

export const Columns: ColumnDef<WatchlistAsset>[] = [
    {
        accessorKey: "symbol",
        header: () => <div className="text-left">Symbol</div>,
        cell: ({ row }) => {
            const asset = row.original;
            return (
                <div className="text-left">
                    <span className="rounded-md border bg-primary px-1.5 py-0.5 text-primary-foreground">
                        {asset.ticker}
                    </span>
                </div>
            );
        },
    },
    {
        id: "assetTicker",
        accessorKey: "ticker",
        header: () => <div className="w-60 text-left">Tickers</div>,
        cell: ({ row }) => {
            const asset = row.original;
            return (
                <div className="flex w-60 items-center gap-2">
                    <div className="flex items-baseline gap-1">
                        <span>{asset.name}</span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "price24hDeltaPercentage",
        header: () => <div className="text-right">24h %</div>,
        cell: ({ row }) => {
            return (
                <div
                    className="text-right"
                    style={{
                        color:
                            (
                                row as { getValue: (key: string) => any }
                            ).getValue("price24hDeltaPercentage") < 0
                                ? "#cd4a60"
                                : "#55bd7d",
                    }}
                >
                    {formatPercentage(row.getValue("price24hDeltaPercentage"))}
                </div>
            );
        },
    },
    {
        accessorKey: "price7dDeltaPercentage",
        header: () => <div className="text-right">7d %</div>,
        cell: ({ row }) => (
            <div
                className="text-right"
                style={{
                    color:
                        (row as { getValue: (key: string) => any }).getValue(
                            "price24hDeltaPercentage",
                        ) < 0
                            ? "#cd4a60"
                            : "#55bd7d",
                }}
            >
                {formatPercentage(row.getValue("price7dDeltaPercentage"))}
            </div>
        ),
    },
    {
        accessorKey: "marketCap",
        header: ({ column }) => {
            return (
                <button
                    className="flex h-full w-full items-center"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    <div className="ml-auto flex flex-row gap-1">
                        <div className="shrink-0">Market Cap</div>
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
                    {formatUsdWatchlist(row.getValue("marketCap"))}
                </div>
            );
        },
    },
    {
        accessorKey: "volume24h",
        header: ({ column }) => {
            return (
                <button
                    className="flex h-full w-full items-center"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    <div className="ml-auto flex flex-row gap-1">
                        <div className="shrink-0">Volume (24h)</div>
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
                    {formatUsdWatchlist(row.getValue("volume24h"))}
                </div>
            );
        },
    },
    {
        accessorKey: "sparkline",
        header: () => <div className="text-right">Last 7 days</div>,
        cell: ({ row }) => {
            const asset = row.original;
            return (
                <div className="flex justify-end">
                    <LineChart width={178} height={50} data={asset.sparkline}>
                        <YAxis
                            hide={true}
                            type="number"
                            domain={["dataMin", "dataMax"]}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={
                                asset.sparkline[0].value >
                                asset.sparkline[asset.sparkline.length - 1]
                                    .value
                                    ? "#cd4a60"
                                    : "#55bd7d"
                            }
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </div>
            );
        },
    },
];
