import { useContractRead, useEnsResolver } from "wagmi";

import ENS_ABI from "@/abi/ens-abi.json";
import { TWITTER_RECORD } from "@/config";
import { namehash } from "ethers/lib/utils.js";

export const useGetTwitterAccount = (ensName: string | null | undefined) => {
  const node = ensName ? namehash(ensName) : undefined;

  const { data: resolverData, isLoading: isLoadingResolver } = useEnsResolver({
    name: ensName as any,
  });

  const {
    data: twitter,
    isLoading: isLoadingTwitter,
    refetch,
    isError,
    error,
  } = useContractRead({
    abi: ENS_ABI,
    address: resolverData?.address as `0x${string}`,
    functionName: "text",
    args: [node, TWITTER_RECORD],
  });

  return {
    isLoading: isLoadingResolver || isLoadingTwitter,
    twitter: twitter as string | undefined,
    isError,
    error,
    refetch,
  };
};
