import { all } from "axios";
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
    selectedAllocation,
}: {
    allocationData: AllocationChartProps[];
    selectedAllocation: string;
}) => {
    return (
        <>
            {selectedAllocation && allocationData && (
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            isAnimationActive={false}
                            nameKey={selectedAllocation}
                            dataKey="percentage"
                            data={allocationData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            fill="#8884d8"
                            paddingAngle={0.5}
                            label
                        >
                            {allocationData?.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            )}
        </>
    );
};

export default AllocationPieChart;
