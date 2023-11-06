import { useState } from "react";
import { ChartControls } from "./ChartControls";
import AllocationPieChart from "./AllocationPieChart";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

const AssetAllocationChart = ({
    isIndividualPortfolio,
    pid,
}: {
    isIndividualPortfolio: boolean;
    pid?: number;
}) => {
    const router = useRouter();
    // TODO: when selectedPreiod changes, fetch new data and memoize it
    const [selectedPeriod, setSelectedPeriod] = useState("Industry");

    const getIndivAllocationData = async () => {
        const response = await fetch(
            `/api/portfolio/${router.query.pid}/allocation/industry`,
        );
        return await response.json();
    };

    const getAllPortfolioAllocationData = async () => {
        return [
            { stock: "AAPL", percentage: 40 },
            { stock: "NVDA", percentage: 30 },
            { stock: "TSLA", percentage: 30 },
            { stock: "NDX", percentage: 20 },
        ];
    };

    const { data: assetAllocationData, isLoading: allocationDataLoading } =
        useQuery<AllocationChartProps[]>(
            "allocationData",
            isIndividualPortfolio
                ? getIndivAllocationData
                : getAllPortfolioAllocationData,
            { enabled: router.isReady },
        );
    return (
        <div className="mx-auto w-full space-y-2 rounded-xl border px-4 py-5 lg:w-1/2">
            <div className="flex flex-col items-center justify-center gap-y-2 font-bold">
                <h1>Asset Allocation</h1>
                <ChartControls
                    selectedPeriod={selectedPeriod}
                    setSelectedPeriod={setSelectedPeriod}
                    periods={["Industry", "Stocks"]}
                />
            </div>
            {assetAllocationData && (
                <AllocationPieChart allocationData={assetAllocationData} />
            )}
        </div>
    );
};

export default AssetAllocationChart;
