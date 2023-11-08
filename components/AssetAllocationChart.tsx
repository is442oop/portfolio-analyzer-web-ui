import { ChartControls } from "./ChartControls";
import AllocationPieChart from "./AllocationPieChart";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSessionDetails } from "@/hooks/useSessionDetails";
import { User, createPagesServerClient } from "@supabase/auth-helpers-nextjs";

const AssetAllocationChart = ({
    isIndividualPortfolio = true,
    pid,
    userId,
}: {
    isIndividualPortfolio: boolean;
    pid?: string;
    userId: string;
}) => {
    const router = useRouter();
    const [selectedAllocation, setSelectedAllocation] = useState("Ticker");

    const getIndivAllocationData = async () => {
        const response = await fetch(
            `/api/portfolios/${pid}/allocation/${selectedAllocation.toLowerCase()}`,
        );
        return await response.json();
    };
    const getAllPortfolioAllocationData = async () => {
        const response = await fetch(
            `/api/users/${userId}/portfolios/allocation/${selectedAllocation.toLowerCase()}`,
        );
        return await response.json();
    };

    const {
        data: indivAssetAllocationData,
        isLoading: allocationDataLoading,
        refetch,
    } = useQuery<AllocationChartProps[]>(
        "indivAllocationData",
        getIndivAllocationData,
        { enabled: !!router.isReady, initialData: [] },
    );

    const {
        data: allAssetAllocationData,
        isLoading,
        refetch: refetchAll,
    } = useQuery<AllocationChartProps[]>(
        "allAllocationData",
        getAllPortfolioAllocationData,
        { enabled: !!userId, initialData: [] },
    );
    useEffect(() => {
        isIndividualPortfolio ? refetch() : refetchAll();
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
            {isIndividualPortfolio
                ? indivAssetAllocationData && (
                      <AllocationPieChart
                          selectedAllocation={
                              selectedAllocation === "Industry"
                                  ? "industry"
                                  : "assetTicker"
                          }
                          allocationData={indivAssetAllocationData}
                      />
                  )
                : allAssetAllocationData && (
                      <AllocationPieChart
                          selectedAllocation={
                              selectedAllocation === "Industry"
                                  ? "industry"
                                  : "assetTicker"
                          }
                          allocationData={allAssetAllocationData}
                      />
                  )}
        </div>
    );
};

export default AssetAllocationChart;
