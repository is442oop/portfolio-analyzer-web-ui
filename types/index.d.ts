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
    assetTicker: string;
    averagePrice: number;
    quantity: number;
    value: number;
};

declare type WatchlistAsset = {
    ticker: string;
    name: string;
    price: number;
    price24hDeltaPercentage: number;
    price7dDeltaPercentage: number;
    marketCap: number;
    volume24h: number;
    sparkline: Record<string, any>[];
};

declare interface TimeSeriesData {
    "4. close": number;
}

declare type Portfolio = {
    pid: number;
    userId: number;
    portfolioName: String;
    description: String;
};

declare type AllocationChartProps = {
    stock: string;
    percentage: number;
};

declare type PortfolioResponse = {
    assetTicker: string;
    averagePrice: number;
    dateCreated: number;
    dateCreatedStringMap: { dateCreated: string };
    dateModified: number;
    dateModifiedStringMap: { dateModified: string };
    portfolioAssetId: number;
    portfolioId: number;
    quantity: number;
    value: number;
};
