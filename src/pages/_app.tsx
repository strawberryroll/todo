import { TodoProvider } from "@/contexts/TodoContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <header>헤더 do it</header>
            <TodoProvider>
                <Component {...pageProps} />
            </TodoProvider>
        </>
    );
}
