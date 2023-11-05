import { Icons } from "@/components/ui/Icons";
import { Layout } from "@/components/Layout";
import { PortfolioModal } from "@/components/PortfolioModal";
import {
    User,
    createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import Link from "next/link";

const portfolios = () => {
    const [userDetails, setUserDetails] = useState<User>();
    const supabase = createClientComponentClient();
    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        setUserDetails(user!);
        return user;
    };

    const { data: portfolioObj, isLoading } = useQuery(
        "portfolioList",
        async () => {
            // TODO: replace 1 with userDetails id
            const response = await fetch(`/api/portfolios/1`);
            const portfolioList = await response.json();
            return portfolioList;
        },
    );

    return (
        <Layout>
            <div className="h-screen py-10 pl-0 pr-10 sm:p-10">
                {isLoading && (
                    <div className="flex h-full items-center justify-center text-center">
                        <Icons.spinner className="animate-spin text-primary" />
                    </div>
                )}
                {/* Future implementation: infinite scroll or pagination to handle long list of portfolios */}
                {portfolioObj ? (
                    <div className="h-full space-y-4 sm:p-4">
                        <div className="flex justify-between">
                            <h2 className="text-2xl font-semibold text-primary">
                                My Portfolios
                            </h2>
                            <PortfolioModal edit={false} />
                        </div>
                        <div className="flex flex-col gap-4">
                            {portfolioObj.portfolioList.map(
                                (portfolio: Portfolio) => {
                                    return (
                                        <Link
                                            href={`/portfolios/${portfolio.portfolioName}`}
                                            key={portfolio.pid}
                                        >
                                            <Card className="w-full duration-300 hover:scale-[101%] hover:cursor-pointer hover:shadow-primary">
                                                <CardHeader className="space-y-1">
                                                    <CardTitle className="text-2xl">
                                                        {
                                                            portfolio.portfolioName
                                                        }
                                                    </CardTitle>
                                                    <CardDescription>
                                                        {portfolio.description}
                                                    </CardDescription>
                                                </CardHeader>
                                            </Card>
                                        </Link>
                                    );
                                },
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex h-full justify-center text-center">
                        <div className="my-auto flex flex-col items-center justify-center space-y-3">
                            <div className="font-semibold">
                                Looks like you don&#39;t have any portfolios ...
                            </div>
                            <PortfolioModal edit={false} />
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default portfolios;
