import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import axios from "axios";
import { cn } from "@/utils/cn";
import { formatUsd } from "@/utils/functions";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
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

// TODO: refactor to be able to be prefilled with data for updating portfolio name
export const AddTransactionModal = () => {
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
    const [logos, setLogos] = useState<{ [ticker: string]: string }>({});
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [ticker, setTicker] = React.useState("");
    const [date, setDate] = React.useState<Date>();

    const [stockPrice, setStockPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    type ticker = {
        value: string;
        label: string;
        ticker: string;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const fetchLogo = async (ticker: string) => {
        try {
            const apiKey = process.env.API_KEY;
            const apiUrl = `https://api.api-ninjas.com/v1/logo?ticker=${ticker}`;

            const response = await axios.get(apiUrl, {
                headers: {
                    "X-Api-Key": apiKey,
                },
            });

            // Handle the successful response
            console.log(response.data);

            // Update the logos object with the fetched logo for this ticker
            setLogos((prevLogos) => ({
                ...prevLogos,
                [ticker]: response.data[0]?.image,
            }));

            // console.log(logos);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // const fetchLogo = async (ticker: string) => {
    //     try {
    //         // const ticker = "AAPL";
    //         const apiKey = "APIKEYHERE";
    //         const apiUrl = `https://api.api-ninjas.com/v1/logo?ticker=${ticker}`;

    //         const response = await axios.get(apiUrl, {
    //             headers: {
    //                 "X-Api-Key": apiKey,
    //             },
    //         });

    //         // Handle the successful response
    //         console.log(response.data);
    //         setLogos((prevLogos) => ({
    //             ...prevLogos,
    //             [ticker]: response.data[0].image,
    //         }));
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // };

    // useEffect(() => {
    //     tickers.forEach((ticker) => {
    //         fetchLogo(ticker.ticker);
    //     });
    // }, []);

    {
        /* this is supposed to render logos beside the stocks, but they don't come in a square format...*/
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    <Button className="hidden w-fit text-xs sm:block">
                        Add Transaction
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
                                    {value
                                        ? tickers.find(
                                              (ticker) =>
                                                  ticker.value === value,
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
                                                    setValue(
                                                        currentValue === value
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
                                                        value === ticker.value
                                                            ? "opacity-100"
                                                            : "opacity-0",
                                                    )}
                                                />
                                                <div className="flex justify-end">
                                                    {/* <img
                                                        src={
                                                            logos[
                                                                ticker.ticker
                                                            ]
                                                        }
                                                        alt={ticker.label}
                                                        className="min-content mr-2 h-4"
                                                    /> */}{" "}
                                                    {/* this is supposed to render logos beside the stocks, but they don't come in a square format...*/}
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
                            <p id="spent" className="font-bold text-xl">
                                ${formatUsd(quantity * stockPrice)}
                            </p>
                        </div>
                    </div>

                    <DialogClose
                        type="submit"
                        disabled={quantity == 0 || stockPrice == 0 || !date || !value}
                        className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                        <p className="font-bold">Add Transaction</p>
                    </DialogClose>
                </form>
            </DialogContent>
        </Dialog>
    );
};
