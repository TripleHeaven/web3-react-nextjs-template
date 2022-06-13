import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Web3ReactProvider } from "@web3-react/core";
import getLibrary from "../utils/getLibrary";
import { ConnectProvider } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ConnectProvider>
        <Component {...pageProps} />
      </ConnectProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
