import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TodoProvider } from "../lib/TodoContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";

const queryClient = new QueryClient();

declare global {
    interface Window {
        __TANSTACK_QUERY_CLIENT__: import("@tanstack/query-core").QueryClient;
    }
}

if (typeof window !== "undefined") {
    window.__TANSTACK_QUERY_CLIENT__ = queryClient;
}

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            {/* 투두 앱 헤더 */}
            <header className="bg-white border-b border-slate-100 w-full px-4 md:pl-36 py-1.5">
                {/* 로고 클릭하면 홈페이지로 이동 */}
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

            <QueryClientProvider client={queryClient}>
                <TodoProvider>
                    <Component {...pageProps} />
                </TodoProvider>
            </QueryClientProvider>
        </>
    );
}
