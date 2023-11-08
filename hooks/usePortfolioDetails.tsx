import { useRouter } from "next/router";
import { useQuery } from "react-query";

export const usePortfolioDetails = () => {
    const router = useRouter();
    const pid = router.query.pid;
    const { data: portfolioDetails, isLoading: isPortfolioDetailsLoading } =
        useQuery(
            "portfolioDetails",
            async () => {
                const response = await fetch(`/api/portfolios/${pid}`);
                const portfolioDetails = await response.json();
                return portfolioDetails;
            },
            { enabled: router.isReady },
        );

    return {
        portfolioDetails: portfolioDetails,
        isPortfolioDetailsLoading: isPortfolioDetailsLoading,
    };
};
