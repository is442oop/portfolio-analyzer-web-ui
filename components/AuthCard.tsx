import * as React from "react";
import { useRouter } from "next/router";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Button } from "@/components/ui/Button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Icons } from "./ui/Icons";
import axios from "axios";
import { toast } from "./ui/Toaster/use-toast";

type TextKeys = {
    title: string;
    description: string;
    button: string;
    footer: string;
    footerLink: string;
};

const newUserTextKeys: TextKeys = {
    title: "Create an account",
    description: "Enter your email below to create your account",
    button: "Create account",
    footer: "Have an account?",
    footerLink: "Login",
};

const existingUserTextKeys: TextKeys = {
    title: "Welcome back!",
    description: "Enter your email below to login to your account",
    button: "Login",
    footer: "Not registered?",
    footerLink: "Create an account",
};

export function AuthCard() {
    const [email, setEmail] = React.useState("");
    const [showEmailError, setShowEmailError] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [showPwdError, setShowPwdError] = React.useState(false);
    const [isNewUser, setIsNewUser] = React.useState(false);
    const [textKeys, setTextKeys] = React.useState<TextKeys>(newUserTextKeys);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    React.useEffect(
        () =>
            isNewUser
                ? setTextKeys(newUserTextKeys)
                : setTextKeys(existingUserTextKeys),
        [isNewUser],
    );

    const router = useRouter();
    const supabase = createClientComponentClient();

    const isEmailValid = (email: string) => /\S+@\S+\.\S+/.test(email);
    const isPasswordValid = (password: string) => {
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,25}$/;
        return passwordRegex.test(password);
    };

    const createAccount = async () => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            return { data, error };
        }
        const res = await axios.post("/api/users", {
            id: data.user!.id,
            email: email,
            username: email,
        });
        if (res.status !== 200) {    
            return { data, error: res.data };
        }
        const responseWatchlist = await createWatchlist(data.user!.id, ["AAPL"]);
        return { data, error };
    };



    const createWatchlist = async (userId: string, defaultAsset: string[]) => {
        try {
            const response = await axios.post("/api/users/watchlist", {
                userId: userId,
                watchlist_assets: defaultAsset,
            });
            const data = await response.data;
            return data;
        } catch (error) {
            console.log(error);
        }
        
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isEmailValid(email)) {
            setShowEmailError(true);
            return;
        }
        if (isNewUser && !isPasswordValid(password)) {
            setShowPwdError(true);
            return;
        }
        setIsLoading(true);

        const { data, error } = isNewUser
            ? await createAccount()
            : await supabase.auth.signInWithPassword({
                  email,
                  password,
              });

        if (error) {
            const msg = isNewUser
                ? "failed to create account"
                : "failed to login";
            toast({
                variant: "destructive",
                title: msg + ": " + error.message,
            });
            return;
        } else {
            toast({
                variant: "success",
                title: `Welcome, ${data.user!.email}!`,
            });
        }

        setIsLoading(false);
        router.push("/dashboard");
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">{textKeys.title}</CardTitle>
                    <CardDescription>{textKeys.description}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        {showEmailError ? (
                            <div className="text-xs text-destructive">
                                Please enter a valid email address
                            </div>
                        ) : null}
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        {showPwdError ? (
                            <div className="text-xs text-destructive">
                                Password must contain:
                                <br />
                                <li>8-25 characters</li>
                                <li>upper and lowercase letters</li>
                                <li>at least 1 numeral</li>
                                <li>at least 1 symbol</li>
                            </div>
                        ) : null}
                        <Input
                            id="password"
                            type="password"
                            autoCorrect="off"
                            disabled={isLoading}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full"
                        type="submit"
                        disabled={!email || !password}
                    >
                        {isLoading ? (
                            <Icons.spinner className="animate-spin" />
                        ) : (
                            textKeys.button
                        )}
                    </Button>
                </CardFooter>
                <CardFooter>
                    <div className="relative w-full">
                        <div className="relative flex gap-1 text-xs">
                            {textKeys.footer}
                            <span
                                className="cursor-pointer font-medium text-primary underline"
                                onClick={() => setIsNewUser(!isNewUser)}
                            >
                                {textKeys.footerLink}
                            </span>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </form>
    );
}
