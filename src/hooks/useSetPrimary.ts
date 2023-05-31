import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import PRIMARY_PFP_ABI from "@/abi/primary-pfp-abi.json";
import { env } from "@/config";
import { ethers } from "ethers";
import { useGetPrimary } from "./useGetPrimary";

export const enum SET_PRIMARY_METHOD {
  NORMAL = "NORMAL",
  DELEGATECASH = "DELEGATECASH",
  WARMXYZ = "WARMXYZ",
}

function getSetPrimaryFunctionFromMethod(method: SET_PRIMARY_METHOD) {
  switch (method) {
    case SET_PRIMARY_METHOD.DELEGATECASH:
      return "setPrimaryByDelegateCash";
    case SET_PRIMARY_METHOD.WARMXYZ:
      return "setPrimaryByWarmXyz";
    default:
      return "setPrimary";
  }
}

export const useSetPrimary = (
  nftContract: string | undefined,
  tokenId: number | undefined,
  method: SET_PRIMARY_METHOD
) => {
  const { refetch } = useGetPrimary();
  const {
    config,
    isError: isPrepareError,
    error: prepareError,
  } = usePrepareContractWrite({
    address: env.PRIMARY_PFP_CONTRACT,
    abi: PRIMARY_PFP_ABI,
    functionName: getSetPrimaryFunctionFromMethod(method),
    args: [nftContract, tokenId],
    enabled: !!nftContract && !!tokenId,
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
    setPrimaryPFP: write,
    transactionPending,
    transactionHash: data?.hash,
    transactionUrl: `${env.TX_EXPLORER}/${data?.hash}`,
    isSuccess,
  };
};
