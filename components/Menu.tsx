import { Menu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import { cn } from "@/utils/cn";
import { sidebarLinks } from "./Sidebar";
import Link from "next/link";
import { useRouter } from "next/router";
import { rubik } from "./Layout";

export function MenuButton() {
    const location = useRouter();
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Menu className="text-primary hover:bg-muted  h-auto w-fit cursor-pointer rounded-md border p-1.5" />
            </PopoverTrigger>
            <PopoverContent
                className={cn(
                    "bg-muted/90 ml-3 w-80 font-sans",
                    rubik.className,
                )}
            >
                <ul className="flex flex-col gap-y-2">
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
                                    className={cn("origin-left duration-300")}
                                >
                                    {link.title}
                                </span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </PopoverContent>
        </Popover>
    );
}
