import Sidebar from "./Sidebar";
import { TailwindIndicator } from "./TailwindIndicator";
import { Toaster } from "./ui/Toaster/toaster";

interface LayoutProps {
    children?: React.ReactElement[] | React.ReactElement;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="flex h-screen flex-auto items-stretch">
            <Sidebar />
            <div className="mx-auto max-w-2xl grow overflow-y-auto overflow-x-hidden lg:max-w-4xl xl:max-w-6xl">
                {children}
            </div>
            <TailwindIndicator />
            <Toaster />
        </div>
    );
}
