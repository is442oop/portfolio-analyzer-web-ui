import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { cn } from "@/utils/cn";
import { QueryClient, QueryClientProvider } from "react-query";

export const inter = Inter({
    subsets: ["latin"],
});
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <main className={cn(inter.className, "")}>
                <style jsx global>{`
                    html {
                        font-family: ${inter.style.fontFamily};
                    }
                `}</style>

                <Component {...pageProps} />
            </main>
        </QueryClientProvider>
    );
}
