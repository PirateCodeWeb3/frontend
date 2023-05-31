import { useContractRead, useNetwork } from "wagmi";
import { useNfts, useNftsFromAddresses } from "./useNfts";

import { BigNumber } from "ethers";
import WARM_XYZ_ABI from "@/abi/warm-abi.json";
import { env } from "@/config";
import { useUser } from "./useUser";

export const useGetColdWalletsWarmXYZ = (
  address: string | undefined,
  enable: boolean
) => {
  const { data, isLoading, error } = useContractRead({
    abi: WARM_XYZ_ABI,
    address: env.WARMXYZ_CONTRACT,
    functionName: "getHotWallet",
    args: [address],
    enabled: enable,
  });

  return {
    isLoading,
    error,
    wallet: data as string | undefined,
  };
};
