import { CartContextProvider } from "@/context/Cart";
import StoreProvider from "@/store/StoreProvider";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <div className="bg-gray-100">
      <SessionProvider session={session}>
        <StoreProvider>
          <CartContextProvider>
            <Component {...pageProps} />
          </CartContextProvider>
        </StoreProvider>
      </SessionProvider>
    </div>
  );
}
