import React from "react";
import {
    PieChart,
    Pie,
    ResponsiveContainer,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

const COLORS = ["#6477AF", "#749AC7", "#85B5D0", "#97CDD8"];

const AllocationPieChart = ({
    allocationData,
}: {
    allocationData: AllocationChartProps[];
}) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart className="">
                <Pie
                    nameKey="stock"
                    dataKey="percentage"
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={0.5}
                    label
                    isAnimationActive={false}
                >
                    {allocationData.map((entry, index) => (
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
    );
};

export default AllocationPieChart;
