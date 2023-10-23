import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "./ui/Badge";
import { PortfolioModal } from "./PortfolioModal";
import { formatPercentage, formatUsd } from "@/utils/functions";

export const DashboardHeader = () => {
    const [showBalance, setShowBalance] = useState(true);
    // TODO: refactor in future when shape of data is out
    const [portfolioData, setPortfolioData] = useState({
        currentBalance: 10000,
        previousBalance: 9900, // 24hrs ago balance
    });

    const percentageChange =
        ((portfolioData.currentBalance - portfolioData.previousBalance) /
            portfolioData.previousBalance) *
        100;

    const isPositiveChange = percentageChange >= 0;
    return (
        <div className="space-y-4 rounded-lg bg-white p-4">
            <h2 className="text-2xl font-semibold text-primary">
                Portfolio Dashboard
            </h2>

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
                            <Image
                                src="/icons8-eye-30.png"
                                alt=""
                                width={20}
                                height={20}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    {showBalance ? (
                        <p className="text-2xl font-bold tracking-wider text-black sm:text-3xl">
                            {formatUsd(portfolioData.currentBalance)}
                        </p>
                    ) : (
                        <p className="text-2xl font-bold text-black sm:text-3xl">
                            •••••••••
                        </p>
                    )}
                    <PortfolioModal edit={false} />
                </div>

                {/* Percentage Change */}
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
            </div>
        </div>
    );
};
