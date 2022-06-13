import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { ValueOf } from "../utils/tsUtils";

const injected = new InjectedConnector({
  supportedChainIds: [1, 42, 1337, 97],
});

const WalletConnect = new WalletConnectConnector({
  rpc: {
    1: "https://mainnet.infura.io/v3/de7757285d664cb6af8239c7fd98a7cc",
  },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

export const Connectors = {
  metamask: injected,
  walletConnect: WalletConnect,
} as const;

export type LocalProvider = keyof typeof Connectors;

export type Connector = ValueOf<typeof Connectors>;
