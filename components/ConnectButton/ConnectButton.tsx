import Image from "next/image";
import styles from "./ConnectButton.module.scss";
import clsx from "clsx";

interface ConnectButtonProps {
  label: string;
  src: string;
  connectCallback: () => void;
}

export const ConnectButton = ({
  label,
  src,
  connectCallback,
}: ConnectButtonProps) => {
  return (
    <button
      className={clsx("br-[8px] border-2 h-[82px] p-[4px]", styles.button)}
      onClick={connectCallback}
    >
      <Image src={src} alt={`connect ${label} logo`} width={26} height={26} />
      <p>{label}</p>
    </button>
  );
};
