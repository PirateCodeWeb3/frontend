import React, { useEffect } from "react";

import { Error } from "../ui/Error";
import { PickListPlaceholder } from "./Placeholder";
import { PickerList } from "./PickerList";
import { SET_PRIMARY_METHOD } from "@/hooks/useSetPrimary";
import { SetPrimaryPFPButton } from "./SetPrimaryPFPBtn";
import { locales } from "@/locales";
import { useGetColdWalletsWarmXYZ } from "@/hooks/useGetColdWalletsWarmXYZ";
import { useGetDelegationsByDelegate } from "@/hooks/useGetDelegationsByDelegate";
import { useNfts } from "@/hooks/useNfts";
import { useNftsToSetPrimary } from "@/hooks/useNftsToSetPrimary";
import { useUser } from "@/hooks/useUser";

export interface NftData {
  contract: string;
  tokenId: number;
}

export const SetPrimaryPFP: React.FC<{ method: SET_PRIMARY_METHOD }> = ({
  method,
}) => {
  const { isConnected, address } = useUser();
  const [selectedNft, setSelectedNft] = React.useState<NftData | null>(null);
  const { isLoading, error, nfts } = useNftsToSetPrimary(address, method);

  useEffect(() => {
    setSelectedNft(null);
  }, [address]);

  if (!isConnected) return null;

  if (isLoading) {
    return <PickListPlaceholder />;
  }

  if (error) {
    return <Error>{locales.errorFetchingNfts}</Error>;
  }

  return (
    <>
      <PickerList
        nfts={nfts}
        onSelect={(data) => setSelectedNft(data)}
        selected={selectedNft}
      />
      <SetPrimaryPFPButton selectedNft={selectedNft} method={method} />
    </>
  );
};
