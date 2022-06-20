import { useAppSelector } from "../../store/store";

export const ConnectionStatus = () => {
  const { address, balance } = useAppSelector((state) => {
    return state.setupWeb3Reducer;
  });

  return <div>{`Connected ${address}`}</div>;
};
