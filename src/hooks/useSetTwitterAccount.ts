import { TWITTER_RECORD, env } from "@/config";
import {
  useContractRead,
  useContractWrite,
  useEnsResolver,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import ENS_ABI from "@/abi/ens-abi.json";
import { namehash } from "ethers/lib/utils.js";

export const useSetTwitterAccount = (
  ensName: string | undefined | null,
  twitterValue: string
) => {
  const node = ensName ? namehash(ensName) : undefined;

  const { data: resolverData, isLoading: isLoadingResolver } = useEnsResolver({
    name: ensName as any,
  });

  const {
    config,
    isError: isPrepareError,
    error: prepareError,
  } = usePrepareContractWrite({
    address: resolverData?.address as `0x${string}`,
    abi: ENS_ABI,
    functionName: "setText",
    enabled: !!twitterValue && !!resolverData?.address,
    args: [node, TWITTER_RECORD, twitterValue],
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
      // refetch();
    },
  });

  return {
    isLoading,
    error: prepareError || error || transactionError,
    isError: isPrepareError || isError || isTransactionError,
    setTwitter: write,
    transactionPending,
    transactionHash: data?.hash,
    transactionUrl: `${env.TX_EXPLORER}/${data?.hash}`,
    isSuccess,
  };
};
