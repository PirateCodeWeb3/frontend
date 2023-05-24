import { useAccount, useEnsName } from "wagmi";

export const useUser = () => {
  const { isConnected, address } = useAccount();
  const { data: ensName, isLoading } = useEnsName({ address });

  const formattedAdr = address
    ? `${address.substring(0, 8)}…${address.substring(
        address.length - 8,
        address.length
      )}`
    : "";

  return {
    isConnected,
    address,
    ensName,
    formattedAdr,
    isLoadingEnsName: isLoading,
    user: ensName || formattedAdr,
  };
};
