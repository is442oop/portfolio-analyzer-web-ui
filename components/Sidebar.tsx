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
        <div>
            <div
                className={`${
                    open ? "w-52" : "w-fit"
                } relative hidden h-screen border-r border-gray-200 bg-muted p-2 duration-300 sm:block`}
            >
                <PanelLeftOpen
                    className={cn(
                        "absolute -right-11 top-2 h-auto w-fit cursor-pointer rounded-md border p-1.5 text-primary hover:bg-muted",
                        { hidden: open },
                    )}
                    onClick={() => setOpen(!open)}
                />
                <PanelLeftClose
                    className={cn(
                        "absolute -right-11 top-2 h-auto w-fit cursor-pointer rounded-md border p-1.5 text-primary hover:bg-muted",
                        { hidden: !open },
                    )}
                    onClick={() => setOpen(!open)}
                />
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
            {/* Mobile Menu */}
            <div className="ml-3 pt-3 sm:hidden">
                <MenuButton />
            </div>
        </div>
    );
};

export default Sidebar;
