import { AuthCard } from "@/components/AuthCard";

export default function Auth() {
    return (
        <main
            className={`relative flex min-h-screen flex-col items-center justify-between text-5xl text-primary`}
        >
            <div className="absolute top-1/4 w-11/12 sm:w-3/5 md:w-96">
                <AuthCard />
            </div>
        </main>
    );
}
