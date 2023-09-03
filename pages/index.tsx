import { Layout } from "../components/Layout";

export default function Home() {
    return (
        <Layout>
            <main
                className={`text-primary flex min-h-screen flex-col items-center justify-between p-10 text-5xl`}
            >
                Hello world
            </main>
        </Layout>
    );
}
