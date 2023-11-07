import { ChartControls } from "./ChartControls";
import AllocationPieChart from "./AllocationPieChart";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSessionDetails } from "@/hooks/useSessionDetails";

const AssetAllocationChart = ({
    isIndividualPortfolio = true,
    pid,
}: {
    isIndividualPortfolio: boolean;
    pid?: number;
}) => {
    const router = useRouter();
    const [selectedAllocation, setSelectedAllocation] = useState("Ticker");
    const userDetails = useSessionDetails();
    const userId = userDetails?.id;

    const getIndivAllocationData = async () => {
        const response = await fetch(
            `/api/portfolios/${
                router.query.pid
            }/allocation/${selectedAllocation.toLowerCase()}`,
        );
        return await response.json();
    };
    const getAllPortfolioAllocationData = async () => {
        const response = await fetch(
            `/api/users/d988bdd8-e569-4026-970a-dd6c286ebe6d/portfolios/allocation/${selectedAllocation.toLowerCase()}`,
        );
        return await response.json();
    };

    const {
        data: assetAllocationData,
        isLoading: allocationDataLoading,
        refetch,
    } = useQuery<AllocationChartProps[]>(
        "allocationData",
        isIndividualPortfolio
            ? getIndivAllocationData
            : getAllPortfolioAllocationData,
        { enabled: !!router.isReady, initialData: [] },
    );

    useEffect(() => {
        refetch();
    }, [selectedAllocation]);

    return (
        <div className="mx-auto w-full space-y-2 rounded-xl border px-1 py-5 xl:w-1/2">
            <div className="flex flex-col items-center justify-center gap-y-2 font-bold">
                <h1>Asset Allocation</h1>
                <ChartControls
                    selectedPeriod={selectedAllocation}
                    setSelectedPeriod={setSelectedAllocation}
                    periods={["Ticker", "Industry"]}
                />
            </div>
            {assetAllocationData && (
                <AllocationPieChart
                    selectedAllocation={
                        selectedAllocation === "Industry"
                            ? "industry"
                            : "assetTicker"
                    }
                    allocationData={assetAllocationData}
                />
            )}
        </div>
    );
};

export default AssetAllocationChart;
