import { Dispatch, SetStateAction, useState } from "react";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { ChartControls } from "./ChartControls";
import { useSessionDetails } from "@/hooks/useSessionDetails";
import { Icons } from "./ui/Icons";

const PortfolioHistoryChart = ({
    setSelectedPeriod,
    selectedPeriod,
    portfolioAssetHistory,
    portfolioAssetListLoading,
}: {
    setSelectedPeriod: React.Dispatch<React.SetStateAction<string>>;
    selectedPeriod: string;
    portfolioAssetHistory: { date: string; balance: number }[];
    portfolioAssetListLoading: boolean;
}) => {
    return (
        <div className="w-full space-y-2 rounded-xl border px-1 py-5 xl:w-1/2">
            <div className="flex flex-col items-center justify-between gap-y-2 font-bold">
                <h1>Historical Trend</h1>

                <ChartControls
                    selectedPeriod={selectedPeriod}
                    setSelectedPeriod={setSelectedPeriod}
                    periods={["1", "7", "30", "90"]}
                />
            </div>
            {portfolioAssetListLoading && !portfolioAssetHistory ? (
                <Icons.spinner className="mx-auto h-full animate-spin text-primary" />
            ) : (
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart
                        width={730}
                        height={250}
                        data={portfolioAssetHistory}
                        margin={{ top: 10, right: 35, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient
                                id="colorUv"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#749AC7"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#749AC7"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" padding="gap" fontSize={10} />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area
                            animationDuration={500}
                            type="monotone"
                            dataKey="balance"
                            stroke="#749AC7"
                            fillOpacity={1}
                            fill="url(#colorUv)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default PortfolioHistoryChart;

// const PortfolioHistorydata = [
//     {
//         date: "2022-06-01",
//         balance: 10000,
//     },
//     {
//         date: "2022-06-02",
//         balance: 11000,
//     },
//     {
//         date: "2022-06-03",
//         balance: 4000,
//     },
//     {
//         date: "2022-06-04",
//         balance: 11222,
//     },
//     {
//         date: "2022-06-05",
//         balance: 9000,
//     },
//     {
//         date: "2022-06-06",
//         balance: 15012,
//     },
//     {
//         date: "2022-06-07",
//         balance: 14444,
//     },
// ];
