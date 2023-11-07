import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { cn } from "@/utils/cn";
import { formatUsd } from "@/utils/functions";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/Command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/Popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/Calendar";

type ticker = {
    value: string;
    label: string;
    ticker: string;
};
// TODO: integrate wtih backend
export const TransactionModal = () => {
    const tickers: ticker[] = [
        {
            value: "apple",
            label: "Apple",
            ticker: "AAPL",
        },
        {
            value: "amazon",
            label: "Amazon",
            ticker: "AMZN",
        },
        {
            value: "google",
            label: "Google",
            ticker: "GOOG",
        },
        {
            value: "microsoft",
            label: "Microsoft",
            ticker: "MSFT",
        },
        {
            value: "meta",
            label: "Meta",
            ticker: "META",
        },
    ];
    const [open, setOpen] = React.useState(false);
    const [tickerValue, setTickerValue] = React.useState("");
    const [ticker, setTicker] = React.useState("");
    const [date, setDate] = React.useState<Date>();

    const [stockPrice, setStockPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    <Button className="hidden w-fit text-xs sm:block">
                        + Add Ticker
                    </Button>
                    <Button className="w-fit sm:hidden"> + </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-fit px-8 sm:max-w-fit">
                <DialogHeader>
                    <DialogTitle className="text-primary">
                        Add a ticker
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex w-full justify-center">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full justify-between"
                                >
                                    {tickerValue
                                        ? tickers.find(
                                              (ticker) =>
                                                  ticker.value === tickerValue,
                                          )?.label
                                        : "Select tickers..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="min-w-fit p-0">
                                <Command>
                                    <CommandInput placeholder="Search tickers..." />
                                    <CommandEmpty>
                                        No ticker found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {tickers.map((ticker) => (
                                            <CommandItem
                                                key={ticker.value}
                                                onSelect={(currentValue) => {
                                                    setTickerValue(
                                                        currentValue ===
                                                            tickerValue
                                                            ? ""
                                                            : currentValue,
                                                    );
                                                    setTicker(
                                                        tickers.find(
                                                            (ticker) =>
                                                                ticker.value ===
                                                                currentValue,
                                                        )?.ticker!,
                                                    );
                                                    setOpen(false);
                                                }}
                                                value={ticker.value}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        tickerValue ===
                                                            ticker.value
                                                            ? "opacity-100"
                                                            : "opacity-0",
                                                    )}
                                                />
                                                <div className="flex justify-center">
                                                    <p>
                                                        {ticker.label}{" "}
                                                        <span className="text-[#c5c7c9]">
                                                            {ticker.ticker}
                                                        </span>
                                                    </p>
                                                </div>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="mt-4 flex justify-around gap-4">
                        <div className="max-w-fit items-center gap-1.5">
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input
                                type="number"
                                id="quantity"
                                placeholder="0.00"
                                onChange={(e) =>
                                    setQuantity(Number(e.target.value))
                                }
                                required
                            />
                        </div>
                        <div className="max-w-fit items-center gap-1.5">
                            <Label htmlFor="price">Stock Price</Label>
                            <Input
                                type="number"
                                id="price"
                                onChange={(e) =>
                                    setStockPrice(Number(e.target.value))
                                }
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col justify-start gap-1.5">
                        {/* TODO: API call for each change in purchase date to find the price at the chosen purchase date */}
                        <Popover>
                            <Label htmlFor="date-picker">Purchase Date</Label>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground",
                                    )}
                                    id="date-picker"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? (
                                        format(date, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="mt-4 h-[75px] w-full rounded-xl bg-gray-200">
                        <div className="grid w-full max-w-sm items-center gap-1.5 p-4">
                            <Label htmlFor="spent">Total Spent</Label>
                            <p id="spent" className="text-xl font-bold">
                                ${formatUsd(quantity * stockPrice)}
                            </p>
                        </div>
                    </div>

                    <DialogClose
                        type="submit"
                        disabled={
                            quantity == 0 ||
                            stockPrice == 0 ||
                            !date ||
                            !tickerValue
                        }
                        className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                        <p className="font-bold">Add Transaction</p>
                    </DialogClose>
                </form>
            </DialogContent>
        </Dialog>
    );
};
