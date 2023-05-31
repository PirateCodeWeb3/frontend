import { useNfts, useNftsFromAddresses } from "./useNfts";

import { OwnedNft } from "alchemy-sdk";
import { SET_PRIMARY_METHOD } from "./useSetPrimary";
import { useGetColdWalletsWarmXYZ } from "./useGetColdWalletsWarmXYZ";
import { useGetDelegationsByDelegate } from "./useGetDelegationsByDelegate";

const getNftsFromMethod = (
  method: SET_PRIMARY_METHOD,
  nfts: OwnedNft[],
  nftsDC: OwnedNft[],
  nftsWarm: OwnedNft[]
) => {
  switch (method) {
    case SET_PRIMARY_METHOD.DELEGATECASH:
      return nftsDC;

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
    nfts: nftsDC,
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
    nfts: getNftsFromMethod(method, nfts, nftsDC, nftsWarm),
  };
};
