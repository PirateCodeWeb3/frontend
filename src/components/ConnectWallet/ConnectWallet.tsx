import { useAccount, useEnsAddress, useEnsName, useNetwork } from "wagmi";
import {
  useAccountModal,
  useChainModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit";

import { Button } from "../ui/button";
import React from "react";
import { locales } from "@/locales";
import { useIsMounted } from "@/hooks/useIsMounted";

const ConnectWallet = (): React.ReactElement | null => {
  const mounted = useIsMounted();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const {
    data: ensName,
    isError,
    isFetching,
    isFetched,
  } = useEnsName({ address });
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();

  if (!mounted) {
    return null;
  }

  const formattedAdr = address
    ? `${address.substring(0, 4)}…${address.substring(
        address.length - 4,
        address.length
      )}`
    : "";

  if (chain?.unsupported) {
    return (
      <Button variant="destructive" onClick={openChainModal}>
        {locales.wrongNetwork}
      </Button>
    );
  }

  if (isConnected) {
    return (
      <Button onClick={openAccountModal}>
        {ensName ? `${ensName.substring(0, 16)}…` : `${formattedAdr}`}
      </Button>
    );
  }

  return <Button onClick={openConnectModal}>{locales.connectWallet}</Button>;
};

export default ConnectWallet;
