import { TodoProvider } from "@/contexts/TodoContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <header className="bg-white border-b border-slate-100 w-full pl-36 py-1.5">
                <Link href="/" className="inline-block">
                    <Image
                        src="/images/Size=Large.svg"
                        alt="logo"
                        width={151}
                        height={40}
                    />
                </Link>
            </header>

            <TodoProvider>
                <Component {...pageProps} />
            </TodoProvider>
        </>
    );
}
