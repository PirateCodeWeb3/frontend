import { useContractRead, useNetwork } from "wagmi";

import { BigNumber } from "ethers";
import PRIMARY_PFP_ABI from "@/abi/primary-pfp-abi.json";
import { env } from "@/config";
import { useUser } from "./useUser";

export const useGetPrimary = () => {
  const { address } = useUser();

  const { data, isLoading, error, refetch } = useContractRead({
    abi: PRIMARY_PFP_ABI,
    address: env.PRIMARY_PFP_CONTRACT,
    functionName: "getPrimary",
    args: [address],
  });

  const [contractAddress, tknId] =
    (data as [string | undefined, BigNumber | undefined]) ?? [];
  const tokenId = tknId?.toNumber();

  const pfpBinded = data
    ? "0x0000000000000000000000000000000000000000" === contractAddress &&
      tokenId === 0
      ? false
      : true
    : false;

  return {
    isLoading,
    error,
    tokenId,
    contractAddress,
    pfpBinded,
    refetch,
  };
};
