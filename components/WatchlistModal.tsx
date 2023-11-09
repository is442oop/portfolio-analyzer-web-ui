import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
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
import axios from "axios";

import { useMutation, useQueryClient } from "react-query";
import { toast } from "./ui/Toaster/use-toast";

type Ticker = {
    value: string;
    label: string;
    ticker: string;
};

export const WatchlistModal = ({
    userId,
    tickers,
}: {
    userId: string;
    tickers: Ticker[];
}) => {
    const [open, setOpen] = React.useState(false);
    const [tickerValue, setTickerValue] = React.useState("");
    const [ticker, setTicker] = React.useState("");
    const [watchlistTickers, setWatchlistTickers] = useState<string[]>([]);

    const queryClient = useQueryClient();

    const getWatchlistTickers = async () => {
        let existingTickers = [];
        const response = await axios.get(
            `/api/users/${userId}/watchlistAssets`,
        );
        const data = await response.data;
        for (let i = 0; i < data.length; i++) {
            existingTickers.push(data[i].ticker);
        }
        setWatchlistTickers(existingTickers);
    };

    const addTicker = async (tickers: string[]) => {
        const response = await axios.put(`/api/watchlist/user/${userId}/add`, {
            watchlist_asset: tickers,
        });
        return response;
    };

    const { mutate } = useMutation(addTicker, {
        onSuccess: () => {
            toast({
                variant: "success",
                title: "Ticker added to watchlist",
            });
            queryClient.invalidateQueries("watchlistData");
        },
    });
    useEffect(() => {
        getWatchlistTickers();
    }, [userId]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const tickerToBeAdded = [ticker];

        if (watchlistTickers.includes(tickerToBeAdded[0])) {
            toast({
                variant: "destructive",
                title: "Ticker already exists in watchlist",
            });
            return;
        }

        mutate(tickerToBeAdded);
    };

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
                            + Ticker
                        </Button>
                        <Button className="w-fit sm:hidden"> + </Button>
                    </div>
                </DialogTrigger>
                <DialogContent className="min-w-[300px] max-w-fit px-8 sm:max-w-fit">
                    <DialogHeader>
                        <DialogTitle className="text-primary">
                            Add a Ticker
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

                        <DialogClose
                            type="submit"
                            disabled={!tickerValue}
                            className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                            <p className="font-bold">Add To Watchlist</p>
                        </DialogClose>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};
