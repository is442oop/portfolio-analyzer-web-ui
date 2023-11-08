import { Button } from "./ui/Button";

export const ChartControls = ({
    selectedPeriod,
    setSelectedPeriod,
    periods,
}: ChartControlsProps) => {
    return (
        <div className="rounded-xl p-1" style={{ backgroundColor: "#F2F5F7" }}>
            {periods.map((period) => (
                <Button
                    key={period}
                    className="rounded-xl"
                    style={{
                        color: "#5B7282",
                        backgroundColor:
                            selectedPeriod === period.split(" ")[0]
                                ? "#FFFFFF"
                                : "transparent",
                    }}
                    onClick={() => {
                        setSelectedPeriod(period.split(" ")[0]);
                    }}
                >
                    {period}
                </Button>
            ))}
        </div>
    );
};
