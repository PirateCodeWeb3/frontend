import { useContractRead, useNetwork } from "wagmi";

import PRIMARY_PFP_ABI from "@/abi/primary-verification-abi.json";
import { env } from "@/config";

export const useIsVerified = (nftContract: string) => {
  const { data, isLoading, error } = useContractRead({
    abi: PRIMARY_PFP_ABI,
    address: env.PRIMARY_VERIFICATION_CONTRACT,
    functionName: "isVerified",
    args: [nftContract],
  });

  return {
    isLoading,
    error,
    isVerified: data,
  };
};
