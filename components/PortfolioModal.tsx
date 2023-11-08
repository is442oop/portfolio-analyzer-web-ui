import React, { useState, useEffect, useContext } from "react";
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
import { usePortfolioDetails } from "@/hooks/usePortfolioDetails";

const toastMessage = {
    createSuccess: "Successfully created portfolio!",
    editSuccess: "Successfully edited portfolio!",
};

type PortfolioModalProps = {
    edit: boolean;
    prefilledPortfolioDetails: {
        portfolioName: string;
        portfolioDesc: string;
    };
    id: string;
};

type PortfolioDetails = {
    userId: string;
    portfolioName: string;
    description: string;
};

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
    edit,
    prefilledPortfolioDetails,
    id,
}: PortfolioModalProps) => {
    const { portfolioDetails } = edit
        ? usePortfolioDetails()
        : { portfolioDetails: null };
    const queryClient = useQueryClient();

    const [portfolioModalDetails, setPortfolioModalDetails] =
        useState<PortfolioDetails>({
            userId: id,
            portfolioName: "",
            description: "",
        });

    const createPortfolioReq = async (data: PortfolioDetails) => {
        const response = await axios.post(
            "/api/portfolios",
            portfolioModalDetails,
        );
        return response.data;
    };

    const updatePortfolioReq = async (data: PortfolioDetails) => {
        const response = await axios.put(
            `/api/portfolios/${portfolioDetails.pid}`,
            {
                portfolioName: portfolioModalDetails.portfolioName,
                description: portfolioModalDetails.description,
            },
        );
        return response.data;
    };

    const { mutate } = useMutation(
        edit ? updatePortfolioReq : createPortfolioReq,
        {
            onSuccess: () => {
                toast({
                    variant: "success",
                    title: edit
                        ? `${toastMessage.editSuccess}`
                        : `${toastMessage.createSuccess}`,
                });
                setPortfolioModalDetails((prev) => ({
                    ...prev,
                    portfolioName: "",
                    description: "",
                }));
                queryClient.invalidateQueries("portfolioDetails");
                queryClient.invalidateQueries("portfolioList");
                queryClient.invalidateQueries("allocationData");
            },
        },
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(portfolioModalDetails);
    };

    useEffect(() => {
        setPortfolioModalDetails((prev) => ({
            ...prev,
            portfolioName: prefilledPortfolioDetails.portfolioName,
            description: prefilledPortfolioDetails.portfolioDesc,
        }));
    }, [prefilledPortfolioDetails]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    <Button className="hidden w-fit  text-xs sm:block">
                        {edit ? "Edit Portfolio" : "+ New Portfolio"}
                    </Button>
                    <Button className="w-fit sm:hidden">
                        {edit ? "Edit" : "+"}
                    </Button>
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
                                value={portfolioModalDetails.portfolioName}
                                autoFocus
                                onChange={(e) =>
                                    setPortfolioModalDetails((prev) => ({
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
                                value={portfolioModalDetails.description}
                                onChange={(e) =>
                                    setPortfolioModalDetails((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                maxLength={50}
                            />
                        </div>

                        <DialogDescription className="mx-1 my-2">
                            {portfolioModalDetails.description.length}/50
                            characters used for description
                        </DialogDescription>
                    </div>
                    <DialogClose
                        type="submit"
                        disabled={
                            portfolioModalDetails.portfolioName.length == 0 ||
                            portfolioModalDetails.description.length == 0
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
