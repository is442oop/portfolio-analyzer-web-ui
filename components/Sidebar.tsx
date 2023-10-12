import React, { useState } from "react";
import { useRouter } from "next/router";

import { cn } from "@/utils/cn";
import {
    CandlestickChart,
    Gauge,
    PanelLeftOpen,
    PanelLeftClose,
    Star,
} from "lucide-react";
import { MenuButton } from "./Menu";
import SidebarItem from "./SidebarItem";
import { ProfileDropdownMenu } from "./ProfileDropdownMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

export const sidebarLinks: SidebarItemType[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: <Gauge />,
    },
    {
        title: "Portfolios",
        href: "/portfolios",
        icon: <CandlestickChart />,
    },
    {
        title: "Watchlist",
        href: "/watchlist",
        icon: <Star />,
    },
];

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const location = useRouter();
    return (
        <>
            <div
                className={`${
                    open ? "w-64" : "w-fit"
                } relative hidden content-between border-r border-gray-200 bg-muted p-2 pb-8 duration-300 sm:grid`}
            >
                <PanelLeftOpen
                    className={cn(
                        "absolute -right-11 top-3 h-auto w-fit cursor-pointer rounded-md border p-1.5 text-primary hover:bg-muted",
                        { hidden: open },
                    )}
                    onClick={() => setOpen(!open)}
                />
                <PanelLeftClose
                    className={cn(
                        "absolute -right-11 top-3 h-auto w-fit cursor-pointer rounded-md border p-1.5 text-primary hover:bg-muted",
                        { hidden: !open },
                    )}
                    onClick={() => setOpen(!open)}
                />
                <div>
                    <h1 className="w-full p-2 text-center text-xl font-bold text-primary">
                        {open ? "Goldman Sachs" : "GS"}
                    </h1>
                    <ul className="flex flex-col gap-y-2 pt-3">
                        {sidebarLinks.map((link, index) => (
                            <SidebarItem
                                link={link}
                                open={open}
                                location={location}
                                key={index}
                            />
                        ))}
                    </ul>
                </div>

                <ProfileDropdownMenu>
                    <div className="flex items-center gap-x-2 rounded-lg px-2 py-1 font-normal text-foreground hover:bg-border">
                        <Avatar>
                            <AvatarImage src="/avatars/01.png" />
                            <AvatarFallback className="border-2 bg-primary-foreground">
                                OM
                            </AvatarFallback>
                        </Avatar>
                        {open ? (
                            <div className="text-left">
                                <p className="text-sm font-medium leading-none">
                                    John Smith
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    name@example.com
                                </p>
                            </div>
                        ) : null}
                    </div>
                </ProfileDropdownMenu>
            </div>
            {/* Mobile Menu */}
            <div className="h-fit pl-1 pt-3 sm:hidden">
                <MenuButton />
            </div>
        </>
    );
};

export default Sidebar;
