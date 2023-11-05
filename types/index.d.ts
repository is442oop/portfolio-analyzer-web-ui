declare interface SidebarItemType {
    title: string;
    href: string;
    icon: React.ReactElement;
}

declare interface ChartControlsProps {
    selectedPeriod: string;
    setSelectedPeriod: (period: string) => void;
    periods: string[];
}

declare type Asset = {
    ticker: string;
    name: string;
    logoUrl: string;
    balance: number;
    price: number;
    price24hDeltaPercentage: number;
    value: number;
}

declare type WatchlistAsset = {
    ticker: string;
    name: string;
    // logoUrl: string;
    price: number;
    price24hDeltaPercentage: number;
    price7dDeltaPercentage: number;
    marketCap: number;
    volume24h: number;
    sparkline: Record<string, any>[];
};

declare interface TimeSeriesData {
    "4. close": number;
    // Add other properties here if needed
}