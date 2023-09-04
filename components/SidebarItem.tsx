import { SidebarNavItem } from "@/types";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { NextRouter } from "next/router";
import React from "react";

type SidebarItemProps = {
    link: SidebarNavItem;
    location: NextRouter;
    open: boolean;
};

const SidebarItem = ({ link, location, open }: SidebarItemProps) => {
    return (
        <Link
            href={link.href}
            className={cn("border-l-4 border-transparent", {
                " border-primary border-l-4": location.pathname === link.href,
            })}
        >
            <li
                className={cn(
                    "hover:bg-border text-muted-foreground flex cursor-pointer items-center gap-x-2 rounded-lg px-3 py-2 text-base font-normal",
                    {
                        "rounded-l-none": location.pathname === link.href,
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
    );
};

export default SidebarItem;
