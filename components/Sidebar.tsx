import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { cn } from "@/utils/cn";
import { SidebarNavItem } from "@/types";
import {
    CandlestickChart,
    Gauge,
    PanelLeftOpen,
    PanelLeftClose,
    Star,
} from "lucide-react";
import { MenuButton } from "./Menu";

export const sidebarLinks: SidebarNavItem[] = [
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
                } bg-muted relative hidden h-screen border-r border-gray-200 p-2 duration-300 sm:block`}
            >
                <PanelLeftOpen
                    className={cn(
                        "text-primary hover:bg-muted absolute -right-11 top-7 h-auto w-fit cursor-pointer rounded-md border p-1.5",
                        { hidden: open },
                    )}
                    onClick={() => setOpen(!open)}
                />
                <PanelLeftClose
                    className={cn(
                        "text-primary hover:bg-muted absolute -right-11 top-7 h-auto w-fit cursor-pointer rounded-md border p-1.5",
                        { hidden: !open },
                    )}
                    onClick={() => setOpen(!open)}
                />

                <ul className="flex flex-col gap-y-2 pt-3">
                    {sidebarLinks.map((link, index) => (
                        <Link
                            href={link.href}
                            key={index}
                            className={cn("border-l-4 border-transparent", {
                                " border-primary border-l-4":
                                    location.pathname === link.href,
                            })}
                        >
                            <li
                                className={cn(
                                    "hover:bg-border text-muted-foreground flex cursor-pointer items-center gap-x-2 rounded-lg px-3 py-2 text-base font-normal",
                                    {
                                        "rounded-l-none":
                                            location.pathname === link.href,
                                    },
                                )}
                            >
                                <span className="p-1.5">{link.icon}</span>
                                <span
                                    className={cn(
                                        { hidden: !open },
                                        "origin-left duration-300",
                                    )}
                                >
                                    {link.title}
                                </span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
            {/* Mobile Menu */}
            <div className="ml-3 pt-3">
                <MenuButton />
            </div>
        </div>
    );
};

export default Sidebar;
