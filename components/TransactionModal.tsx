import { useEffect, useState } from "react";
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

type ticker = {
    value: string;
    label: string;
    ticker: string;
};

const tickers: ticker[] = [
    {
        value: "apple",
        label: "Apple",
        ticker: "AAPL",
    },
    {
        value: "microsoft",
        label: "Microsoft",
        ticker: "MSFT",
    },
    {
        value: "alphabet inc.",
        label: "Alphabet Inc.",
        ticker: "GOOGL",
    },
    {
        value: "amazon",
        label: "Amazon",
        ticker: "AMZN",
    },
    {
        value: "nvidia",
        label: "Nvidia",
        ticker: "NVDA",
    },
    {
        value: "meta",
        label: "Meta",
        ticker: "META",
    },
    {
        value: "berkshire hathaway inc.",
        label: "Berkshire Hathaway Inc.",
        ticker: "BRK.B",
    },
    {
        value: "tesla",
        label: "Tesla",
        ticker: "TSLA",
    },
    {
        value: "eli lilly and company",
        label: "Eli Lilly and Company",
        ticker: "LLY",
    },
    {
        value: "visa inc.",
        label: "Visa Inc.",
        ticker: "V",
    },
    {
        value: "unitedhealth group incorporated",
        label: "UnitedHealth Group Incorporated",
        ticker: "UNH",
    },
    {
        value: "taiwan semiconductor manufacturing company limited",
        label: "Taiwan Semiconductor Manufacturing Company Limited",
        ticker: "TSM",
    },
    {
        value: "walmart inc.",
        label: "Walmart Inc.",
        ticker: "WMT",
    },
    {
        value: "novo nordisk a/s",
        label: "Novo Nordisk A/S",
        ticker: "NVO",
    },
    {
        value: "exxon mobil corporation",
        label: "Exxon Mobil Corporation",
        ticker: "XOM",
    },
    {
        value: "jpmorgan chase & co.",
        label: "JPMorgan Chase & Co.",
        ticker: "JPM",
    },
    {
        value: "johnson & johnson",
        label: "Johnson & Johnson",
        ticker: "JNJ",
    },
    {
        value: "broadcom inc.",
        label: "Broadcom Inc.",
        ticker: "AVGO",
    },
    {
        value: "mastercard incorporated",
        label: "Mastercard Incorporated",
        ticker: "MA",
    },
    {
        value: "the procter & gamble company",
        label: "The Procter & Gamble Company",
        ticker: "PG",
    },
    {
        value: "oracle corporation",
        label: "Oracle Corporation",
        ticker: "ORCL",
    },
    {
        value: "the home depot, inc.",
        label: "The Home Depot, Inc.",
        ticker: "HD",
    },
    {
        value: "chevron corporation",
        label: "Chevron Corporation",
        ticker: "CVX",
    },
    {
        value: "merck & co., inc.",
        label: "Merck & Co., Inc.",
        ticker: "MRK",
    },
    {
        value: "adobe inc.",
        label: "Adobe Inc.",
        ticker: "ADBE",
    },
    {
        value: "toyota motor corporation",
        label: "Toyota Motor Corporation",
        ticker: "TM",
    },
    {
        value: "asml holding n.v.",
        label: "ASML Holding N.V. ",
        ticker: "ASML",
    },
    {
        value: "abbvie inc.",
        label: "AbbVie Inc.",
        ticker: "ABBV",
    },
    {
        value: "costco wholesale corporation",
        label: "Costco Wholesale Corporation",
        ticker: "COST",
    },
    {
        value: "the coca-cola company",
        label: "The Coca-Cola Company",
        ticker: "KO",
    },
    {
        value: "pepsico, inc.",
        label: "PepsiCo, Inc.",
        ticker: "PEP",
    },
    {
        value: "bank of america corporation",
        label: "Bank of America Corporation",
        ticker: "BAC",
    },
    {
        value: "shell plc",
        label: "Shell plc",
        ticker: "SHEL",
    },
    {
        value: "alibaba group holding limited",
        label: "Alibaba Group Holding Limited",
        ticker: "BABA",
    },
    {
        value: "fomento cconómico mexicano, sab de cv",
        label: "Fomento Económico Mexicano, SAB de CV",
        ticker: "FMX",
    },
    {
        value: "cisco systems, inc.",
        label: "Cisco Systems, Inc.",
        ticker: "CSCO",
    },
    {
        value: "salesforce, inc.",
        label: "Salesforce, Inc.",
        ticker: "CRM",
    },
    {
        value: "astrazeneca plc",
        label: "AstraZeneca PLC",
        ticker: "AZN",
    },
    {
        value: "accenture plc",
        label: "Accenture PLC",
        ticker: "ACN",
    },
    {
        value: "mcdonald's corporation",
        label: "McDonald's Corporation",
        ticker: "MCD",
    },
    {
        value: "linde plc",
        label: "Linde PLC",
        ticker: "LIN",
    },
    {
        value: "novartis ag",
        label: "Novartis AG",
        ticker: "NVS",
    },
    {
        value: "netflix, inc.",
        label: "Netflix, Inc.",
        ticker: "NFLX",
    },
    {
        value: "advanced micro devices, inc.",
        label: "Advanced Micro Devices, Inc.",
        ticker: "AMD",
    },
    {
        value: "comcast corporation",
        label: "Comcast Corporation",
        ticker: "CMCSA",
    },
    {
        value: "pfizer inc.",
        label: "Pfizer Inc.",
        ticker: "PFE",
    },
    {
        value: "thermo fisher scientific inc.",
        label: "Thermo Fisher Scientific Inc.",
        ticker: "TMO",
    },
    {
        value: "t-mobile us, inc.",
        label: "T-Mobile US, Inc.",
        ticker: "TMUS",
    },
    {
        value: "abbott laboratories",
        label: "Abbott Laboratories",
        ticker: "ABT",
    },
    {
        value: "nike, inc.",
        label: "NIKE, Inc.",
        ticker: "NKE",
    },
    {
        value: "invesco qqq trust series 1",
        label: "Invesco QQQ Trust Series 1",
        ticker: "QQQ",
    },
    {
        value: "spdr s&p 500 etf trust",
        label: "SPDR S&P 500 ETF Trust",
        ticker: "SPY",
    },
];

// TODO: refactor to be able to be prefilled with data for updating portfolio name
export const TransactionModal = () => {
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
        });
    };

    const createTransaction = async (data: {
        portfolioId: string | string[] | undefined;
        assetTicker: string;
        price: number;
        quantity: number;
    }) => {
        const response = await axios.post(`/api/portfolio/asset`, {
            portfolioId: pid,
            assetTicker: ticker,
            price: parseFloat(stockPrice),
            quantity: parseFloat(quantity),
        });
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
                                    className=" overflow-x-scroll pb-2 text-xl font-bold"
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
