import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import { PortfolioModal } from "./PortfolioModal";
import Link from "next/link";

const PortfolioList = ({ portfolioList }: { portfolioList: Portfolio[] }) => {
    return (
        <div>
            {portfolioList ? (
                <div className="h-full space-y-4">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-semibold text-primary">
                            Portfolios
                        </h2>
                        <PortfolioModal
                            prefilledPortfolioDetails={{
                                portfolioName: "",
                                portfolioDesc: "",
                            }}
                            edit={false}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        {portfolioList.map((portfolio: Portfolio) => {
                            return (
                                <Link
                                    href={`/portfolios/${portfolio.pid}`}
                                    key={portfolio.pid}
                                >
                                    <Card className="w-full duration-300 hover:scale-[101%] hover:cursor-pointer hover:shadow-primary">
                                        <CardHeader className="space-y-1">
                                            <CardTitle className="text-2xl">
                                                {portfolio.portfolioName}
                                            </CardTitle>
                                            <CardDescription>
                                                {portfolio.description}
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="flex h-full justify-center text-center">
                    <div className="my-auto flex flex-col items-center justify-center space-y-3">
                        <div className="font-semibold">
                            Looks like you don&#39;t have any portfolios ...
                        </div>
                        <PortfolioModal
                            prefilledPortfolioDetails={{
                                portfolioName: "",
                                portfolioDesc: "",
                            }}
                            edit={false}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PortfolioList;
