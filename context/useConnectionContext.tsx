import { useWeb3React } from "@web3-react/core";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Connector } from "../constants";

export const ConnectContext = createContext<any>(null);

interface ConnectProviderProps {
  children?: React.ReactNode;
}

export const ConnectProvider: React.FC<ConnectProviderProps> = ({
  children,
}) => {
  const { activate, account, active, deactivate } = useWeb3React();
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleIsActive = useCallback(() => {
    setIsActive(active);
  }, [active]);

  useEffect(() => {
    handleIsActive();
  }, [handleIsActive]);

  useEffect(() => {
    console.log("ACC", account);
  }, [account]);

  const connect = async (connector: Connector) => {
    console.log("Connecting to wallet");
    try {
      await activate(connector);

      console.log("Connected to wallet", account);
    } catch (error) {
      console.log("Error on connecting: ", error);
    }
  };

  const refreshState = () => {};

  const disconnect = async () => {
    console.log("Deactivating...");
    try {
      await deactivate();
    } catch (error) {
      console.log("Error on disconnecting: ", error);
    }
  };

  const values = useMemo(
    () => ({
      isActive,
      account,
      isLoading,
      connect,
      disconnect,
    }),
    [isActive, isLoading]
  );

  return (
    <ConnectContext.Provider value={values}>{children}</ConnectContext.Provider>
  );
};

interface ConnectionContext {
  isActive: boolean;
  account?: string;
  isLoading: boolean;
  connect: (connector: Connector) => Promise<void>;
  disconnect: () => Promise<void>;
}

export const useConnectionContext = () => {
  const context = useContext<ConnectionContext>(ConnectContext);

  if (context === undefined) {
    throw new Error("provide MetaMask context");
  }

  return context;
};
