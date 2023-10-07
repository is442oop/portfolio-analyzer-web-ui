import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import axios from "axios";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/Dialog";

export const PortfolioModal = () => {
    const [portfolioName, setPortfolioName] = useState("My New Portfolio");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitting");
        // axios.post("/api/portfolios", {
        //     name: portfolioName,
        // });
        // change axios post url when backend api endpoints are developed
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">+ New Portfolio</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Portfolio</DialogTitle>
                    <DialogDescription>
                        Give your new portfolio a name!
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <p className="font-bold">Portfolio Name</p>
                            <Input
                                id="name"
                                className="col-span-3"
                                value={portfolioName}
                                onChange={(e) =>
                                    setPortfolioName(e.target.value)
                                }
                                maxLength={24}
                            />
                        </div>
                        <div>
                            <DialogDescription className="mx-1 my-2">
                                {portfolioName.length}/24 characters
                            </DialogDescription>
                        </div>
                    </div>

                    <div>
                        <Button type="submit" disabled={portfolioName.length == 0} className="w-full">
                            <p className="font-bold">Create portfolio</p>
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
