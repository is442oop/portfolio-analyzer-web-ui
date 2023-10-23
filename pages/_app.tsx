import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { cn } from "@/utils/cn";

export const inter = Inter({
    subsets: ["latin"],
});
export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={cn(inter.className, "")}>
            <style jsx global>{`
                html {
                    font-family: ${inter.style.fontFamily};
                }
            `}</style>
            <Component {...pageProps} />
        </main>
    );
}
