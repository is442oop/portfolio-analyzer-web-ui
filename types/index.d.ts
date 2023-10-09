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
