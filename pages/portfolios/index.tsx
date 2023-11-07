import { Icons } from "@/components/ui/Icons";
import { Layout } from "@/components/Layout";
import { useQuery } from "react-query";
import PortfolioList from "@/components/PortfolioList";
import { useSessionDetails } from "@/hooks/useSessionDetails";
import { useContext } from "react";

const portfolios = () => {
    const userDetails = useSessionDetails();
    const userId = userDetails?.id;
    const { data: portfolioObj, isLoading } = useQuery(
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

    return (
        <Layout>
            <div className="h-fit min-h-screen py-10 pl-0 pr-10 sm:p-10">
                {isLoading && (
                    <div className="flex h-full items-center justify-center text-center">
                        <Icons.spinner className="animate-spin text-primary" />
                    </div>
                )}
                <div className="p-4">
                    {portfolioObj && userId && (
                        <PortfolioList
                            portfolioList={portfolioObj.portfolioList}
                            id={userId}
                        />
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default portfolios;
