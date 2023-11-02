declare type SidebarItemType = {
    title: string;
    href: string;
    icon: React.ReactElement;
};

declare type ChartControlsProps = {
    selectedPeriod: string;
    setSelectedPeriod: (period: string) => void;
    periods: string[];
};

declare type Asset = {
    ticker: string;
    name: string;
    logoUrl: string;
    balance: number;
    price: number;
    price24hDeltaPercentage: number;
    value: number;
};

declare type Portfolio = {
    pid: number;
    userId: number;
    portfolioName: String;
    description: String;
};
