import { Layout } from "@/components/Layout";
import { PortfolioModal } from "@/components/PortfolioModal";
import {
    User,
    createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

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

    const {
        data: portfolioList,
        error,
        isLoading,
    } = useQuery("portfolioList", async () => {
        // TODO: repace with userDetails id
        const response = await fetch(`/api/portfolio/1`);
        const portfolioList = await response.json();
        return portfolioList;
    });

    console.log(portfolioList);
    return (
        <Layout>
            <div className="h-screen">
                {/* if no portfolios */}
                <div className="flex h-full justify-center text-center">
                    <div className="my-auto flex flex-col items-center justify-center space-y-3">
                        <div className="font-semibold">
                            Looks like you don&#39;t have any portfolios ...
                        </div>
                        <PortfolioModal edit={false} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default portfolios;
