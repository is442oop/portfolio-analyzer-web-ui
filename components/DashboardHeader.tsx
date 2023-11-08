import React, { useState } from "react";
import Image from "next/image";
import { PortfolioModal } from "./PortfolioModal";
import { formatPercentage, formatUsd } from "@/utils/functions";
import { useSessionDetails } from "@/hooks/useSessionDetails";
import { cn } from "@/utils/cn";
import { Icons } from "./ui/Icons";
import { Ballet } from "next/font/google";
import { Badge } from "./ui/Badge";

type DashboardHeaderProps = {
    latestPrices: number;
    balance: number;
    edit?: boolean;
    portfolioName?: string;
    portfolioDesc?: string;
    portfolioAssets?: PortfolioResponse[];
    userId: string;
};

export const DashboardHeader = ({
    portfolioAssets,
    userId,
    balance,
    edit = false,
    latestPrices = 0,
    portfolioName = "",
    portfolioDesc = "",
}: DashboardHeaderProps) => {
    const [showBalance, setShowBalance] = useState(true);
    // const userDetails = useSessionDetails();
    // const userId = userDetails?.id;
    const percentageChange =
        balance === 0 && latestPrices === 0
            ? 0
            : (latestPrices - balance) / balance;

    const isPositiveChange = percentageChange >= 0;
    return (
        <div className="space-y-4 rounded-lg bg-white py-4">
            <h1 className="text-2xl font-semibold text-primary">
                {portfolioName === "" ? "Dashboard" : portfolioName}
            </h1>
            <h2 className="text-sm text-primary">{portfolioDesc}</h2>
            <div className="space-y-2">
                {/* Balance */}
                <div className="flex gap-x-2">
                    <p className="text-lg text-foreground">Current Balance</p>
                    <div className="flex cursor-pointer items-center">
                        {/* Toggle visibility of balance */}
                        <div
                            className={`${
                                showBalance ? "bg-opacity-100" : "bg-opacity-20"
                            }`}
                            onClick={() => setShowBalance(!showBalance)}
                        >
                            {showBalance ? (
                                <Image
                                    src="/hidden.png"
                                    alt=""
                                    width={20}
                                    height={20}
                                />
                            ) : (
                                <Image
                                    src="/icons8-eye-30.png"
                                    alt=""
                                    width={20}
                                    height={20}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        {latestPrices === 0 && portfolioAssets?.length !== 0 ? (
                            <Icons.spinner className="animate-spin text-primary" />
                        ) : showBalance ? (
                            <p
                                className={cn(
                                    "text-2xl font-bold tracking-wider text-black sm:text-3xl",
                                )}
                            >
                                {formatUsd(latestPrices)}
                                {/* {formatUsd(portfolioData.currentBalance)} */}
                            </p>
                        ) : (
                            <p className="text-2xl font-bold text-black sm:text-3xl">
                                •••••••••
                            </p>
                        )}
                        {latestPrices !== 0 && (
                            <div className="flex items-center space-x-1 ">
                                <p
                                    className={`text-base font-bold tracking-wider ${
                                        isPositiveChange
                                            ? "text-green-600"
                                            : "text-destructive"
                                    }`}
                                >
                                    {isPositiveChange && "+"}
                                    {formatPercentage(percentageChange)}
                                </p>
                                <Badge variant={"secondary"}>24hr</Badge>
                            </div>
                        )}
                    </div>
                    <PortfolioModal
                        id={userId!}
                        edit={edit}
                        prefilledPortfolioDetails={{
                            portfolioName: portfolioName,
                            portfolioDesc: portfolioDesc,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
