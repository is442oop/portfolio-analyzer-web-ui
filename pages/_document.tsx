import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en" className="h-screen overflow-hidden">
            <Head />
            <body className="h-screen overflow-auto overscroll-none">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
