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
    price: number;
    quantity: number;
    value: number;
    portfolioId: string;
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

<<<<<<< HEAD
declare type TickerPrice = {
    price : number;
}

declare type TickerPriceData = {
    ticker: string,
    name: string,
    price: number,
    price24hDeltaPercentage: number,
    price7dDeltaPercentage: number,
    marketCap: number,
    volume24h: number,
    sparkline: { value: number}[],
}
=======
declare type AllocationChartProps = {
    stock: string;
    percentage: number;
};

declare type PortfolioResponse = {
    assetTicker: string;
    price: number;
    dateCreated: number;
    dateCreatedStringMap: { dateCreated: string };
    dateModified: number;
    dateModifiedStringMap: { dateModified: string };
    portfolioAssetId: number;
    portfolioId: number;
    quantity: number;
    value: number;
};
>>>>>>> 2c513a9f29a960f61ddf7f91e74467a1abce1dc4
