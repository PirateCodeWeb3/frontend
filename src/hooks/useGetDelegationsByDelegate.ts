import { env, keyStore } from "@/config";

import { DelegateCash } from "delegatecash";
import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";

export const useGetDelegationsByDelegate = (
  address: string | undefined,
  enable: boolean
) => {
  const { data, isLoading, error } = useQuery(
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
    isLoading,
    error,
  };
};
