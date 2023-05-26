import { OwnedNft, OwnedNftsResponse } from "alchemy-sdk";

import { keyStore } from "@/config/keystore";
import { useQuery } from "@tanstack/react-query";

export const useNfts = (
  address: string | undefined,
  vaults: string[] | undefined
) => {
  const vaultsParams = vaults
    ? `?vaults=${encodeURIComponent(vaults.join(","))}`
    : "";
  const { data, isLoading, error, refetch } = useQuery<OwnedNft[]>(
    keyStore.nfts.byAddress(address as string, vaults).queryKey,
    () =>
      fetch(`/api/nfts/${address}${vaultsParams}`, {
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        return res.json();
      }),
    { enabled: !!address, staleTime: 1000 * 10 } // 10 seconds
  );

  return {
    nfts: data ?? [],
    total: data?.length ?? 0,
    isLoading,
    error,
    collections: [...new Set(data?.map((nft) => nft.title))],
    refetch,
  };
};
