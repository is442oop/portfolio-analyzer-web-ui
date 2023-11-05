import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog";
import { toast } from "./ui/Toaster/use-toast";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

type PortfolioModalProps = {
    edit: boolean;
};

type portfolioDetails = {
    userId: 1;
    portfolioName: string;
    description: string;
};
// TODO: refactor to be able to be prefilled with data for updating portfolio name
export const PortfolioModal: React.FC<PortfolioModalProps> = ({ edit }) => {
    const queryClient = useQueryClient();
    const [portfolioDetails, setPortfolioDetails] = useState<portfolioDetails>({
        userId: 1,
        portfolioName: "",
        description: "",
    });

    const createPortfolio = async (data: portfolioDetails) => {
        const response = await axios.post("/api/portfolios", portfolioDetails);
        return response.data;
    };

    const { mutate } = useMutation(createPortfolio, {
        onSuccess: (data) => {
            toast({
                variant: "success",
                title: `Successfully created portfolio: ${portfolioDetails.portfolioName}!`,
            });
            setPortfolioDetails((prev) => ({
                ...prev,
                portfolioName: "",
                description: "",
            }));
            queryClient.invalidateQueries("portfolioList");
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(portfolioDetails);
    };

    useEffect(() => {
        // TODO: preset portfolio details
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    <Button className="hidden w-fit  text-xs sm:block">
                        {edit ? "Edit Portfolio" : "+ New Portfolio"}
                    </Button>
                    <Button className="w-fit sm:hidden"> + </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-sm sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-primary">
                        {edit ? "Edit Your Portfolio" : "New Portfolio"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <div>
                            <p className="pb-1 font-bold">Name</p>
                            <Input
                                id="name"
                                className="col-span-3"
                                placeholder="A portfolio name"
                                value={portfolioDetails.portfolioName}
                                autoFocus
                                onChange={(e) =>
                                    setPortfolioDetails((prev) => ({
                                        ...prev,
                                        portfolioName: e.target.value,
                                    }))
                                }
                                maxLength={50}
                            />
                        </div>
                        <div>
                            <p className="pb-1 font-bold">Description</p>
                            <Input
                                id="description"
                                className="col-span-3"
                                placeholder="A short description"
                                value={portfolioDetails.description}
                                onChange={(e) =>
                                    setPortfolioDetails((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                maxLength={50}
                            />
                        </div>

                        <DialogDescription className="mx-1 my-2">
                            {portfolioDetails.portfolioName.length}/50
                            characters
                        </DialogDescription>
                    </div>
                    <DialogClose
                        type="submit"
                        disabled={
                            portfolioDetails.portfolioName.length == 0 ||
                            portfolioDetails.description.length == 0
                        }
                        className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                        <p className="font-bold">
                            {edit ? "Save Changes" : "Create portfolio"}
                        </p>
                    </DialogClose>
                </form>
            </DialogContent>
        </Dialog>
    );
};
