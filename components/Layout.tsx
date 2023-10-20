import Sidebar from "./Sidebar";
import { TailwindIndicator } from "./TailwindIndicator";
import { Toaster } from "./ui/Toaster/toaster";

interface LayoutProps {
    children?: React.ReactElement;
}

export function Layout({ children }: LayoutProps) {
    return (
        <main className="flex h-screen flex-auto">
            <Sidebar />
            <div className="grow">
                <div className="no-scrollbar mx-auto h-screen max-w-2xl overflow-y-scroll px-5 py-12 pl-0 md:pl-5 lg:max-w-4xl xl:max-w-6xl">
                    {children}
                </div>
            </div>
            <Toaster />
            <TailwindIndicator />
        </main>
    );
}
