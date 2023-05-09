import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import PRIMARY_PFP_ABI from "@/abi/primary-pfp-abi.json";
import { env } from "@/config";
import { ethers } from "ethers";
import { useGetPrimary } from "./useGetPrimary";

export const useSetPrimary = (
  nftContract: string | undefined,
  tokenId: number | undefined
) => {
  const { refetch } = useGetPrimary();

  const {
    config,
    isError: isPrepareError,
    error: prepareError,
  } = usePrepareContractWrite({
    address: env.PRIMARY_PFP_CONTRACT,
    abi: PRIMARY_PFP_ABI,
    functionName: "setPrimary",
    args: [nftContract, tokenId],
    enabled: !!nftContract && !!tokenId,
    overrides: {
      value: ethers.utils.parseEther("0.01"),
    },
  });
  const { data, isLoading, write, error, isError } = useContractWrite(config);

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
    bind: write,
    transactionPending,
    transactionHash: data?.hash,
    transactionUrl: `${env.TX_EXPLORER}/${data?.hash}`,
    isSuccess,
  };
};
