import { OwnedNft, OwnedNftsResponse } from "alchemy-sdk";

import { keyStore } from "@/config/keystore";
import { useQuery } from "@tanstack/react-query";

export const useNfts = (address: string | undefined) => {
  const { data, isLoading, error, refetch } = useQuery<OwnedNft[]>(
    keyStore.nfts.byAddress(address as string).queryKey,
    () =>
      fetch(`/api/nfts/${address}`, {
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

export const useNftsFromAddresses = (addresses: string[] | undefined) => {
  const addressesPath =
    addresses && addresses?.length > 0
      ? addresses?.join("/")
      : "0x0000000000000000000000000000000000000000";
  const { data, isLoading, error, refetch } = useQuery<OwnedNft[]>(
    keyStore.nfts.byAddresses(addresses as string[]).queryKey,
    () =>
      fetch(`/api/nfts/${addressesPath}`, {
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        return res.json();
      }),
    { enabled: !!addresses, staleTime: 1000 * 10 } // 10 seconds
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
