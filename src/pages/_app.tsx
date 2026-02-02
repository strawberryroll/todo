import { TodoProvider } from "@/contexts/TodoContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <header className="bg-white border-b border-slate-100 w-full px-4 md:pl-36 py-1.5">
                <Link href="/" className="inline-block">
                    {/* 태블릿/데스크탑 */}
                    <Image
                        src="/images/logo.svg"
                        alt="logo"
                        width={151}
                        height={40}
                        className="hidden md:block"
                    />
                    {/* 모바일 */}
                    <Image
                        src="/images/logo-small.svg"
                        alt="logo mobile"
                        width={40}
                        height={40}
                        className="block md:hidden"
                    />
                </Link>
            </header>

            <TodoProvider>
                <Component {...pageProps} />
            </TodoProvider>
        </>
    );
}
