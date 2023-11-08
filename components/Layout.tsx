import Sidebar from "./Sidebar";
import { TailwindIndicator } from "./TailwindIndicator";

interface LayoutProps {
    children?: React.ReactElement[] | React.ReactElement;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="flex h-screen flex-auto">
            <Sidebar />
            <div className="grow overflow-y-auto overflow-x-hidden">
                <div className="mx-auto h-full max-w-2xl lg:max-w-4xl xl:max-w-6xl">
                    {children}
                </div>
            </div>
            <TailwindIndicator />
        </div>
    );
}
