import React, { useState, useEffect, useRef } from "react";
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

interface PortfolioModalProps {
    edit: boolean;
}

// TODO: refactor to be able to be prefilled with data for updating portfolio name
export const PortfolioModal: React.FC<PortfolioModalProps> = ({ edit }) => {
    const [portfolioName, setPortfolioName] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast({ variant: "success", title: portfolioName });
    };

    useEffect(() => {
        // fetch("http://localhost:3000/api/portfolios/1")
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log(data);
        //         setPortfolioName(data.name);
        //     });
        setPortfolioName("new portfolio name goes here");
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
                    <div>
                        <div>
                            <p className="pb-1 font-bold">Portfolio Name</p>
                            <Input
                                id="name"
                                className="col-span-3"
                                placeholder="e.g. 'My Portfolio'"
                                value={portfolioName}
                                autoFocus
                                onChange={(e) =>
                                    setPortfolioName(e.target.value)
                                }
                                maxLength={24}
                            />
                        </div>

                        <DialogDescription className="mx-1 my-2">
                            {portfolioName.length}/24 characters
                        </DialogDescription>
                    </div>
                    {/* TODO: close modal on submit */}
                    <DialogClose
                        type="submit"
                        disabled={portfolioName.length == 0}
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
