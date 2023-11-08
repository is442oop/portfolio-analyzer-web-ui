import { DashboardHeader } from "@/components/DashboardHeader";
import { Layout } from "@/components/Layout";
import PortfolioHistoryChart from "@/components/PortfolioHistoryChart";
import AssetTable from "@/components/AssetTable";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import AssetAllocationChart from "@/components/AssetAllocationChart";
import PortfolioList from "@/components/PortfolioList";
import { useSessionDetails } from "@/hooks/useSessionDetails";
import { User, createPagesServerClient } from "@supabase/auth-helpers-nextjs";

const dashboard = ({ userId }: { userId: string }) => {
    const [currentBalance, setCurrentBalance] = useState<number>(0);
    const [selectedPeriod, setSelectedPeriod] = useState("7");
    // const userDetails = useSessionDetails();
    const [latestPrices, setLatestPrices] = useState();
    // const [isLoading, setIsLoading] = useState(true);
    // const userId = user.id;
    // console.log(user.id);

    // Data for the table
    const { data: allAssetsList, isLoading: allAssetsListLoading } = useQuery(
        "allAssetsList",
        async () => {
            const response = await fetch(
                `/api/portfolios/assets/user/${userId}`,
            );
            const assets = await response.json();
            return assets.portfolioAssetList;
        },
        {
            enabled: !!userId,
            onSuccess: (allAssetsList) => {
                allAssetsList?.forEach((asset: PortfolioResponse) => {
                    asset.value = asset.quantity * asset.price;
                });

                // get balance for current portfolio
                const initialValue = 0;
                const currentBalance = allAssetsList?.reduce(
                    (accumulator: number, currentValue: PortfolioResponse) => {
                        return accumulator + currentValue.value;
                    },
                    initialValue,
                );
                setCurrentBalance(currentBalance);
            },
        },
    );

    // Data for the list of portfolios
    const { data: portfolioObj, isLoading: portfolioObjLoading } = useQuery(
        "portfolioList",
        async () => {
            const response = await fetch(`/api/users/${userId}/portfolios`);
            const portfolioList = await response.json();
            return portfolioList;
        },
        {
            enabled: !!userId,
        },
    );

    // Data for the portfolio history chart
    const {
        data: portfolioAssetHistory,
        isLoading: portfolioAssetListLoading,
        refetch: refetchHistory,
    } = useQuery(
        "allPortfolioAssetHistory",
        async () => {
            const response = await fetch(
                `/api/users/${userId}/portfolios/balance?duration=${
                    selectedPeriod === "1" ? "2" : selectedPeriod
                }`,
            );
            const res = await response.json();
            return res.overallPortfolioHistoryData;
        },
        {
            onSuccess: async (portfolioAssetHistory) => {
                console.log(portfolioAssetHistory);
                if (portfolioAssetHistory !== undefined) {
                    setLatestPrices(
                        portfolioAssetHistory[portfolioAssetHistory?.length - 1]
                            .balance,
                    );
                }
            },
            enabled: !!userId,
        },
    );

    // useEffect(() => {
    //     if (userId !== undefined) setIsLoading(false);
    //     refetchHistory();
    // }, [userId]);

    useEffect(() => {
        refetchHistory();
    }, [selectedPeriod]);

    return (
        <Layout>
            <div className="h-fit min-h-screen space-y-10 py-10 pl-0 pr-10 sm:p-10">
                <div>
                    <DashboardHeader
                        userId={userId}
                        latestPrices={latestPrices!}
                        balance={currentBalance!}
                    />
                    <div className="flex flex-col gap-1 xl:flex-row xl:justify-center">
                        <PortfolioHistoryChart
                            portfolioAssetHistory={portfolioAssetHistory}
                            setSelectedPeriod={setSelectedPeriod}
                            selectedPeriod={selectedPeriod}
                            portfolioAssetListLoading={
                                portfolioAssetListLoading
                            }
                        />

                        <AssetAllocationChart
                            userId={userId}
                            isIndividualPortfolio={false}
                        />
                    </div>
                </div>
                <div>
                    <div className="mt-12 py-4 text-2xl font-semibold text-primary">
                        Holdings
                    </div>
                    {allAssetsList && (
                        <AssetTable
                            data={allAssetsList}
                            isLoading={allAssetsListLoading}
                        />
                    )}
                </div>
                {portfolioObj && (
                    <PortfolioList
                        id={userId!}
                        portfolioList={portfolioObj.portfolioList}
                    />
                )}
            </div>
        </Layout>
    );
};

export default dashboard;

export const getServerSideProps = async (context: any) => {
    const supabase = createPagesServerClient(context);
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();
    if (error || !user)
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };

    return {
        props: {
            userId: user.id,
        },
    };
};
