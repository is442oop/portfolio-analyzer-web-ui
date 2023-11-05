import { ColumnDef } from "@tanstack/react-table";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { formatNumber, formatPercentage, formatUsd, formatUsdWatchlist } from "@/utils/functions";

export const Columns: ColumnDef<WatchlistAsset>[] = [
    {
        accessorKey: "ticker",
        header: () => <div className="text-left">Ticker</div>,
        cell: ({ row }) => {
            const asset = row.original;
            return (
                <div className="text-left">
                    <span className="text-white bg-primary border-2 border-primary rounded px-1">{asset.ticker}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "ticker",
        header: () => <div className="w-60 text-left">Name</div>,
        cell: ({ row }) => {
            const asset = row.original;
            return (
                <div className="flex w-60 items-center gap-2">
                    {/* <img
                        src={asset.logoUrl}
                        alt={asset.name}
                        className="mr-2 h-6 w-6 rounded-full"
                    /> */}
                    <div className="flex items-baseline gap-1">
                        {/* <span className="text-gray-400" style={{border: '1px solid', padding: '2px', backgroundColor: 'primary'}}>{asset.ticker}</span> */}
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
                <div className="text-right" style={{ color: (row as { getValue: (key: string) => any }).getValue("price24hDeltaPercentage") < 0 ? '#cd4a60' : '#55bd7d' }}>
                    {formatPercentage(row.getValue("price24hDeltaPercentage"))}
                </div>
            );
        },
    },
    {
        accessorKey: "price7dDeltaPercentage",
        header: () => <div className="text-right">7d %</div>,
        cell: ({ row }) => (
            <div className="text-right" style={{ color: (row as { getValue: (key: string) => any }).getValue("price24hDeltaPercentage") < 0 ? '#cd4a60' : '#55bd7d' }}>
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
            return(
            <div className="flex justify-end">
                     <LineChart width={178} height={50} data={asset.sparkline}>
                         <YAxis hide={true} type="number" domain={['dataMin', 'dataMax']} />
                         <Line type="monotone" dataKey="value" stroke={asset.sparkline[0].value>asset.sparkline[asset.sparkline.length-1].value?"#cd4a60":"#55bd7d"} strokeWidth={2} dot={false} />
                     </LineChart>
            </div>
            )
    },
    },
];
