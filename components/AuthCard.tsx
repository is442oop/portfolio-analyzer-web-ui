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
    const [password, setPassword] = React.useState("");
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

    const handleSignUp = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            alert(error);
            return;
        }
        setIsLoading(false);
        console.log("Sign up:", data);
        router.push("/dashboard");
    };

    const handleSignIn = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            alert(error);
            return;
        }
        setIsLoading(false);
        console.log("Login:", data);
        router.push("/dashboard");
    };

    return (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">{textKeys.title}</CardTitle>
                <CardDescription>{textKeys.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
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
                    onClick={isNewUser ? handleSignUp : handleSignIn}
                >
                    {isLoading ? (
                        <Icons.spinner className="animate-spin " />
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
                            className="cursor-pointer font-medium text-blue-600 underline"
                            onClick={(e) => setIsNewUser(!isNewUser)}
                        >
                            {textKeys.footerLink}
                        </span>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
