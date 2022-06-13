import { useConnectionContext } from "../../context";

export const ConnectionStatus = () => {
  const { isActive, account } = useConnectionContext();

  return <div>{`Connected? : ${isActive}\nConnected account ${account}`}</div>;
};
