import { useState } from "react";
import {
    PieChart,
    Pie,
    ResponsiveContainer,
    Cell,
    Tooltip,
    Legend,
} from "recharts";
import { Button } from "./ui/Button";
import { ChartControls } from "./ChartControls";

const AssetAllocationData = [
    { stock: "AAPL", allocation: 400 },
    { stock: "NVDA", allocation: 300 },
    { stock: "TSLA", allocation: 300 },
    { stock: "NDX", allocation: 200 },
];

const COLORS = ["#6477AF", "#749AC7", "#85B5D0", "#97CDD8"];

export const AssetAllocationChart = () => {
    const [selectedPeriod, setSelectedPeriod] = useState("Token");
    // TODO: when selectedPreiod changes, fetch new data and memoize it
    return (
        <div className="mx-auto w-full space-y-2 rounded-xl border px-4 py-5 lg:w-1/2">
            <div className="flex flex-col items-center justify-center gap-y-2 font-bold">
                <h1>Asset Allocation</h1>
                <ChartControls
                    selectedPeriod={selectedPeriod}
                    setSelectedPeriod={setSelectedPeriod}
                    periods={["Token", "Portfolio"]}
                />
            </div>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart className="">
                    <Pie
                        nameKey="stock"
                        data={AssetAllocationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        fill="#8884d8"
                        paddingAngle={3}
                        dataKey="allocation"
                        label
                    >
                        {AssetAllocationData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
