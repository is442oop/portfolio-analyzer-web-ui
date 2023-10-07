import { cn } from "@/utils/cn";
import Link from "next/link";
import { NextRouter } from "next/router";
import React from "react";

interface SidebarItemProps {
    link: SidebarItemType;
    location: NextRouter;
    open: boolean;
}

const SidebarItem = ({ link, location, open }: SidebarItemProps) => {
    return (
        <Link
            href={link.href}
            className={cn("border-l-4 border-transparent", {
                " border-l-4 border-primary": location.pathname === link.href,
            })}
        >
            <li
                className={cn(
                    "flex cursor-pointer items-center gap-x-2 rounded-lg px-2 py-1 font-normal text-foreground hover:bg-border",
                    {
                        "rounded-l-none": location.pathname === link.href,
                    },
                )}
            >
                <span className="p-1">{link.icon}</span>
                <span
                    className={cn(
                        { hidden: !open },
                        "origin-left text-sm font-medium",
                    )}
                >
                    {link.title}
                </span>
            </li>
        </Link>
    );
};

export default SidebarItem;
