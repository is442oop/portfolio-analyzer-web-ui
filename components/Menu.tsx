import { Menu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import { cn } from "@/utils/cn";
import { sidebarLinks } from "./Sidebar";
import { useRouter } from "next/router";
import SidebarItem from "./SidebarItem";

export function MenuButton() {
    const location = useRouter();
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Menu className="h-auto w-fit  cursor-pointer rounded-md border p-1.5 text-primary hover:bg-muted" />
            </PopoverTrigger>
            <PopoverContent className={cn("ml-3 w-80 bg-muted font-sans")}>
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
