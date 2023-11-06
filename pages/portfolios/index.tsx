import { Icons } from "@/components/ui/Icons";
import { Layout } from "@/components/Layout";
import {
    User,
    createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import PortfolioList from "@/components/PortfolioList";

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
    useEffect(() => {
        console.log(userDetails);
    }, [userDetails]);

    const { data: portfolioObj, isLoading } = useQuery(
        "portfolioList",
        async () => {
            // TODO: replace 1 with userDetails id
            const response = await fetch(`/api/users/1/portfolios`);
            const portfolioList = await response.json();
            return portfolioList;
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
                    {portfolioObj && (
                        <PortfolioList
                            portfolioList={portfolioObj.portfolioList}
                        />
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default portfolios;
