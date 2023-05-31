import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { env } from "@/config";
import { useNfts } from "./useNfts";
import { useUser } from "./useUser";

export const useMint = (contract: string | null, tokenId: number) => {
  const { address } = useUser();
  const { refetch } = useNfts(address);
  const {
    config: mintConfig,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: contract as `0x${string}`,
    abi: [
      {
        name: "mint",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        outputs: [],
      },
    ],
    functionName: "mint",
    args: [tokenId as any],
    enabled: !!contract,
  });
  const { data, isLoading, write, error, isError } =
    useContractWrite(mintConfig);

  const {
    isError: isTransactionError,
    error: transactionError,
    isLoading: transactionPending,
    isSuccess,
  } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      refetch();
    },
  });

  return {
    isLoading,
    error: prepareError || error || transactionError,
    isError: isPrepareError || isError || isTransactionError,
    mint: write,
    transactionPending,
    transactionHash: data?.hash,
    transactionUrl: `${env.TX_EXPLORER}/${data?.hash}`,
    isSuccess,
  };
};
