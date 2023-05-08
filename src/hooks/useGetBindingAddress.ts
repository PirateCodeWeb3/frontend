import { useContractRead, useNetwork } from "wagmi";

import PRIMARY_PFP_ABI from "@/abi/primary-pfp-abi.json";
import { env } from "@/config";

export const useGetPrimaryAddress = (nftContract: string, tokenId: number) => {
  const { data, isLoading, error } = useContractRead({
    abi: PRIMARY_PFP_ABI,
    address: env.PRIMARY_PFP_CONTRACT,
    functionName: "getPrimaryAddress",
    args: [nftContract, tokenId],
  });

  return {
    isLoading,
    error,
    bindedAddress: data,
  };
};
