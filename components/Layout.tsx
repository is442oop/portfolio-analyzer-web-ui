import { Rubik } from "next/font/google";
import Sidebar from "./Sidebar";

export const rubik = Rubik({ weight: "400", subsets: ["latin"] });

interface LayoutProps {
    children?: React.ReactElement;
}

export function Layout({ children }: LayoutProps) {
    return (
        <main className={`${rubik.className}`}>
            <div className="flex h-screen flex-auto">
                <Sidebar />
                <div className="grow">
                    <div>{children}</div>
                </div>
            </div>
        </main>
    );
}
