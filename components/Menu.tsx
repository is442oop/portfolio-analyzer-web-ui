import { Menu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import { cn } from "@/utils/cn";
import { sidebarLinks } from "./Sidebar";
import Link from "next/link";
import { useRouter } from "next/router";
import { rubik } from "./Layout";
import SidebarItem from "./SidebarItem";

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
                        <SidebarItem
                            link={link}
                            location={location}
                            key={index}
                            open={true}
                        />
                    ))}
                </ul>
            </PopoverContent>
        </Popover>
    );
}
