import { env, keyStore } from "@/config";

import { DelegateCash } from "delegatecash";
import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";

export interface Delegation {
  type: "NONE" | "ALL" | "CONTRACT" | "TOKEN";
  vault: string;
  delegate: string;
  contract: string;
  tokenId: number;
}

export const useGetDelegationsByDelegate = (
  address: string | undefined,
  enable: boolean
) => {
  const { data, isLoading, error } = useQuery<Delegation[]>(
    keyStore.delegations.byDelegate(address as string).queryKey,
    () => {
      const provider = new ethers.providers.JsonRpcProvider(
        env.PROVIDER_URL,
        "any"
      );
      const dc = new DelegateCash(provider);
      return dc.getDelegationsByDelegate(address as string);
    },
    { enabled: !!address && !!enable }
  );

  let addresses = data ? data?.map((d) => d.vault) : undefined;
  return {
    addresses,
    data,
    isLoading,
    error,
  };
};
