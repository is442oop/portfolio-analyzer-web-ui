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
};
