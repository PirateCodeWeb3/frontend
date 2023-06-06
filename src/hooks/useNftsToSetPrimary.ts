import {
  Delegation,
  useGetDelegationsByDelegate,
} from "./useGetDelegationsByDelegate";
import { useNfts, useNftsFromAddresses } from "./useNfts";

import { OwnedNft } from "alchemy-sdk";
import { SET_PRIMARY_METHOD } from "./useSetPrimary";

const getNftsFromMethod = (
  method: SET_PRIMARY_METHOD,
  nfts: OwnedNft[],
  nftsDC: Record<string, OwnedNft[]>,
  delegations: Delegation[] = []
) => {
  if (method === SET_PRIMARY_METHOD.DELEGATECASH) {
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
                d.contract.toLowerCase() && nft.tokenId === d.tokenId.toString()
          )
        );
      }
    });

    return filteredNfts;
  }
  return nfts;
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

  const { nfts, isLoading: isLoadingNfts, error: errorNfts } = useNfts(address);

  const {
    data: nftsDC,
    isLoading: isLoadingNftsDC,
    error: errorNftsDC,
  } = useNftsFromAddresses(dcVaults);

  const isLoading =
    isLoadingNfts ||
    (method === SET_PRIMARY_METHOD.DELEGATECASH &&
      (isLoadingDC || isLoadingNftsDC));

  const error =
    errorNfts ||
    (method === SET_PRIMARY_METHOD.DELEGATECASH && (errorDC || errorNftsDC));

  return {
    isLoading,
    error,
    nfts: getNftsFromMethod(method, nfts, nftsDC, delegations),
  };
};
