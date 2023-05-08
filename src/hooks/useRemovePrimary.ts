import { env, keyStore } from "@/config";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import PRIMARY_PFP_ABI from "@/abi/primary-pfp-abi.json";
import { useGetPrimary } from "./useGetPrimary";

export const useRemovePrimary = () => {
  const { refetch, contractAddress, tokenId } = useGetPrimary();

  const {
    config,
    isError: isPrepareError,
    error: prepareError,
  } = usePrepareContractWrite({
    address: env.PRIMARY_PFP_CONTRACT,
    abi: PRIMARY_PFP_ABI,
    functionName: "removePrimary",
    args: [contractAddress, tokenId],
    enabled: !!contractAddress && !!tokenId,
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
    unbind: write,
    transactionPending,
    transactionHash: data?.hash,
    transactionUrl: `${env.TX_EXPLORER}/${data?.hash}`,
    isSuccess,
  };
};
