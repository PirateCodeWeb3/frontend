import {
  Delegation,
  useGetDelegationsByDelegate,
} from "./useGetDelegationsByDelegate";
import { useNfts, useNftsFromAddresses } from "./useNfts";

import { OwnedNft } from "alchemy-sdk";
import { SET_PRIMARY_METHOD } from "./useSetPrimary";
import { useGetColdWalletsWarmXYZ } from "./useGetColdWalletsWarmXYZ";

const getNftsFromMethod = (
  method: SET_PRIMARY_METHOD,
  nfts: OwnedNft[],
  nftsDC: Record<string, OwnedNft[]>,
  nftsWarm: OwnedNft[],
  delegations: Delegation[] = []
) => {
  switch (method) {
    case SET_PRIMARY_METHOD.DELEGATECASH:
      let filteredNfts: OwnedNft[] = [];

      delegations.forEach((d) => {
        const vaultNfts = nftsDC[d.vault] ?? [];
        if (d.type === "ALL") {
          filteredNfts = filteredNfts.concat(vaultNfts);
        }
        if (d.type === "CONTRACT") {
          filteredNfts = filteredNfts.concat(
            vaultNfts.filter((nft) => {
              return (
                nft.contract.address.toLocaleLowerCase() ===
                d.contract.toLowerCase()
              );
            })
          );
        }
        if (d.type === "TOKEN") {
          filteredNfts = filteredNfts.concat(
            vaultNfts.filter(
              (nft) =>
                nft.contract.address.toLocaleLowerCase() ===
                  d.contract.toLowerCase() &&
                nft.tokenId === d.tokenId.toString()
            )
          );
        }
      });

      return filteredNfts;

    case SET_PRIMARY_METHOD.WARMXYZ:
      return nftsWarm;

    default:
      return nfts;
  }
};

export const useNftsToSetPrimary = (
  address: string | undefined,
  method: SET_PRIMARY_METHOD
) => {
  const {
    isLoading: isLoadingDC,
    error: errorDC,
    addresses: dcVaults,
    data: delegations,
  } = useGetDelegationsByDelegate(
    address,
    method === SET_PRIMARY_METHOD.DELEGATECASH
  );

  const {
    isLoading: isLoadingWarm,
    error: errorWarm,
    wallet,
  } = useGetColdWalletsWarmXYZ(address, method === SET_PRIMARY_METHOD.WARMXYZ);

  const { nfts, isLoading: isLoadingNfts, error: errorNfts } = useNfts(address);
  const {
    nfts: nftsWarm,
    isLoading: isLoadingNftsWarm,
    error: errorNftsWarm,
  } = useNfts(wallet);

  const {
    data: nftsDC,
    isLoading: isLoadingNftsDC,
    error: errorNftsDC,
  } = useNftsFromAddresses(dcVaults);

  const isLoading =
    isLoadingNfts ||
    (method === SET_PRIMARY_METHOD.DELEGATECASH &&
      (isLoadingDC || isLoadingNftsDC)) ||
    (method === SET_PRIMARY_METHOD.WARMXYZ &&
      (isLoadingWarm || isLoadingNftsWarm));

  const error =
    errorNfts ||
    (method === SET_PRIMARY_METHOD.DELEGATECASH && (errorDC || errorNftsDC)) ||
    (method === SET_PRIMARY_METHOD.WARMXYZ && (errorWarm || errorNftsWarm));

  return {
    isLoading,
    error,
    nfts: getNftsFromMethod(method, nfts, nftsDC, nftsWarm, delegations),
  };
};
