import { Toaster } from "@/components/ui/Toaster/toaster";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "react-query";

export const inter = Inter({
    subsets: ["latin"],
});

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={inter.className}>
            <style jsx global>{`
                html {
                    font-family: ${inter.style.fontFamily};
                }
            `}</style>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
            <Toaster />
        </main>
    );
}
