import { Poppins } from "next/font/google";
import Sidebar from "./Sidebar";

export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
});
interface LayoutProps {
    children?: React.ReactElement;
}

export function Layout({ children }: LayoutProps) {
    return (
        <main className={`${poppins.className}`}>
            <div className="flex h-screen flex-auto">
                <Sidebar />
                <div className="grow">
                    <div className="h-screen px-5 py-20 sm:px-10">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
}
