import React, { useState } from "react";
import Image from "next/image";
import { PortfolioModal } from "./PortfolioModal";

export const DashboardHeader = () => {
    const [showBalance, setShowBalance] = useState(true);
    const [portfolioData, setPortfolioData] = useState({
        currentBalance: 10000,
        previousBalance: 9500, // take it as balance 24 hours ago?
    });

    const percentageChange =
        ((portfolioData.currentBalance - portfolioData.previousBalance) /
            portfolioData.previousBalance) *
        100;

    return (
        <div className="rounded-lg bg-white p-4 shadow-md">
            <div className="mb-4 flex items-center space-x-2">
                <h2 className="text-2xl font-semibold">Portfolio Dashboard</h2>
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

            {/* Balance */}
            <div>
                <p className="mb-2 text-xl font-semibold">Current Balance</p>
                <div className="flex items-center justify-between">
                    {showBalance ? (
                        <p className="text-4xl font-bold text-black">
                            ${portfolioData.currentBalance.toFixed(2)}
                        </p>
                    ) : (
                        <p className="text-4xl font-bold text-black">
                            •••••••••
                        </p>
                    )}
                    <PortfolioModal/>
                </div>
            </div>
            {/* Percentage Change */}
            <div className="flex items-center space-x-1 ">
                <p
                    className={`mt-2 text-base font-bold ${
                        percentageChange >= 0
                            ? "text-green-500"
                            : "text-red-500"
                    }`}
                >
                    +{percentageChange.toFixed(2)}%
                </p>
                <span className="mt-2 rounded bg-gray-200 px-2 py-1 text-xs text-gray-700">
                    <p>24h</p>
                </span>
            </div>
        </div>
    );
};
