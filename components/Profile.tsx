import { useSessionDetails } from "@/hooks/useSessionDetails";
import { ProfileDropdownMenu } from "./ProfileDropdownMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { formatAvatarFallback } from "@/utils/functions";

type ProfileProps = {
    open: Boolean;
};

export const Profile = ({ open }: ProfileProps) => {
    const userDetails = useSessionDetails();
    const email = userDetails?.email;
    const avatarFallback = formatAvatarFallback(email!);

    return (
        <ProfileDropdownMenu>
            <div className="flex items-center gap-x-2 rounded-lg px-2 py-1 font-normal text-foreground hover:bg-border">
                <Avatar>
                    <AvatarImage src="/avatars/01.png" />
                    <AvatarFallback className="border-2 bg-primary-foreground">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
                {open ? (
                    <div className="text-left">
                        <p className="text-sm text-muted-foreground">{email}</p>
                    </div>
                ) : null}
            </div>
        </ProfileDropdownMenu>
    );
};
