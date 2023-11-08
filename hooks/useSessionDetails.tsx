import {
    User,
    createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

import { useEffect, useState } from "react";

export const useSessionDetails = () => {
    const [userDetails, setUserDetails] = useState<User>();
    const supabase = createClientComponentClient();

    const getUser = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        setUserDetails(user!);
        return user;
    };

    useEffect(() => {
        getUser();
    }, []);

    return userDetails;
};
