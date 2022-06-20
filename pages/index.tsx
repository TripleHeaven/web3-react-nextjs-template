import type { NextPage } from "next";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { ConnectButton, ConnectionStatus } from "../components";
import { Connectors } from "../constants";
import { useAppDispatch } from "../store/store";
import { clearWeb3, setupWeb3 } from "../store/web3slice/web3slice";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Head>
        <title>Web3 template</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex flex-col justify-center h-screen">
          <ConnectionStatus />
          <div className="flex flex-col gap-[44px] my-auto max-w-[367px] mx-auto">
            <ConnectButton
              src="/assets/metaMaskLogo.png"
              label="Metamask"
              connectCallback={() => {
                dispatch(setupWeb3());
              }}
            />

            <button
              className="br-[8px] border-2 h-[82px] p-[4px]"
              onClick={() => {
                dispatch(clearWeb3());
              }}
            >
              <p>Disconnect</p>
            </button>
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
