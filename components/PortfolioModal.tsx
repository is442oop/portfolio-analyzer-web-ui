import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog";

// TODO: refactor to be able to be prefilled with data for updating portfolio name
export const PortfolioModal = () => {
    const [portfolioName, setPortfolioName] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(portfolioName);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    <Button className="hidden w-fit  text-xs sm:block">
                        + New Portfolio
                    </Button>
                    <Button className="w-fit sm:hidden"> + </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-sm sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-primary">
                        New Portfolio
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <p className="pb-1 font-bold">Portfolio Name</p>
                            <Input
                                id="name"
                                className="col-span-3"
                                placeholder={portfolioName}
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
                    <Button
                        type="submit"
                        disabled={portfolioName.length == 0}
                        className="w-full"
                    >
                        <p className="font-bold">Create portfolio</p>
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
