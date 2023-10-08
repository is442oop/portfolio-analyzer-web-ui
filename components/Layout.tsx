import Sidebar from "./Sidebar";

interface LayoutProps {
    children?: React.ReactElement;
}

export function Layout({ children }: LayoutProps) {
    return (
        <main className="flex h-screen flex-auto">
            <Sidebar />
            <div className="grow">
                <div className="mx-auto h-screen max-w-4xl px-5 py-20 pl-0 sm:pl-5">
                    {children}
                </div>
            </div>
        </main>
    );
}
