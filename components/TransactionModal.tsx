import { useEffect, useState } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
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
} from "@/components/ui/PopoverModified";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/Calendar";
import { useRouter } from "next/router";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "./ui/Toaster/use-toast";

export type Ticker = {
    value: string;
    label: string;
    ticker: string;
    price?: number;
};

export const TransactionModal = ({ tickers }: { tickers: Ticker[] }) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [tickerValue, setTickerValue] = useState("");
    const [ticker, setTicker] = useState("");
    const [date, setDate] = useState<Date>();

    const [stockPrice, setStockPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const router = useRouter();
    const { pid } = router.query;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({
            portfolioId: pid,
            assetTicker: ticker,
            price: parseFloat(stockPrice),
            quantity: parseFloat(quantity),
            date: parseInt((date!.getTime() / 1000).toFixed(0)),
        });
    };

    const createTransaction = async (data: {
        portfolioId: string | string[] | undefined;
        assetTicker: string;
        price: number;
        quantity: number;
        date: number;
    }) => {
        const response = await axios.post(
            `/api/portfolios/assets`,
            data,
            // {
            //     portfolioId: pid,
            //     assetTicker: ticker,
            //     price: parseFloat(stockPrice),
            //     quantity: parseFloat(quantity),
            //     date: parseInt((date!.getTime() / 1000).toFixed(0)),
            // }
        );
        return response.data;
    };

    const { mutate } = useMutation(createTransaction, {
        onSuccess: () => {
            toast({
                variant: "success",
                title: "Successfully added transaction!",
            });
            setTickerValue("");
            setQuantity("");
            setStockPrice("");
            queryClient.invalidateQueries("individualPortfolioAssets");
            queryClient.invalidateQueries("portfolioDetails");
            queryClient.invalidateQueries("portfolioAssetHistory");
        },
    });

    return (
        <>
            <style>
                {`
                    .hide-scrollbar::-webkit-scrollbar {
                        display: none; /* Hide scrollbar for Chrome, Safari and Opera */
                    }
                    .hide-scrollbar {
                        -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
                        scrollbar-width: none; /* Hide scrollbar for Firefox */
                    }
                `}
            </style>
            <Dialog>
                <DialogTrigger asChild>
                    <div>
                        <Button className="hidden w-fit text-xs sm:block">
                            + Add Transaction
                        </Button>
                        <Button className="w-fit sm:hidden"> + </Button>
                    </div>
                </DialogTrigger>
                <DialogContent className="max-w-fit px-8 sm:max-w-fit">
                    <DialogHeader>
                        <DialogTitle className="text-primary">
                            Add a Transaction
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
                                                      ticker.value ===
                                                      tickerValue,
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
                                        <CommandGroup className="hide-scrollbar h-[200px] overflow-y-scroll">
                                            {tickers.map((ticker) => (
                                                <CommandItem
                                                    key={ticker.value}
                                                    onSelect={(
                                                        currentValue,
                                                    ) => {
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
                                                        setStockPrice(
                                                            ticker.price!.toString(),
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
                            <div className="max-w-fit items-center gap-y-2">
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input
                                    type="number"
                                    id="quantity"
                                    placeholder="0"
                                    onChange={(e) =>
                                        setQuantity(e.target.value)
                                    }
                                    required
                                    value={quantity}
                                />
                            </div>
                            <div className="max-w-fit items-center gap-y-2">
                                <Label htmlFor="price">Stock Price</Label>
                                <Input
                                    type="number"
                                    id="price"
                                    placeholder="0.00"
                                    onChange={(e) => {
                                        setStockPrice(e.target.value);
                                    }}
                                    value={stockPrice}
                                />
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col justify-start gap-1.5">
                            {/* TODO: API call for each change in purchase date to find the price at the chosen purchase date */}
                            <Popover>
                                <Label htmlFor="date-picker">
                                    Purchase Date
                                </Label>
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
                                <p
                                    id="spent"
                                    className="scrollbar-transparent overflow-x-scroll text-xl font-bold"
                                >
                                    {formatUsd(
                                        parseFloat(quantity) *
                                            parseFloat(stockPrice),
                                    )}
                                </p>
                            </div>
                        </div>

                        <DialogClose
                            type="submit"
                            disabled={
                                parseFloat(quantity) == 0 ||
                                parseFloat(stockPrice) == 0 ||
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
        </>
    );
};
