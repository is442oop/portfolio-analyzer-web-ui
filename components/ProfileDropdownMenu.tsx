import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/Dropdown";

export function ProfileDropdownMenu({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const supabase = createClientComponentClient();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-full">
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={async () => {
                        await supabase.auth.signOut();
                        router.push("/");
                    }}
                >
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
