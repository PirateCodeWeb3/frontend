import React, { useEffect } from "react";

import { Error } from "../ui/Error";
import { PickListPlaceholder } from "./Placeholder";
import { PickerList } from "./PickerList";
import { SetPrimaryPFPButton } from "./SetPrimaryPFPBtn";
import { locales } from "@/locales";
import { useNfts } from "@/hooks/useNfts";
import { useUser } from "@/hooks/useUser";

export interface NftData {
  contract: string;
  tokenId: number;
}

export const SetPrimaryPFP: React.FC = ({}) => {
  const { isConnected, address } = useUser();
  const { nfts, isLoading, error } = useNfts(address);
  const [selectedNft, setSelectedNft] = React.useState<NftData | null>(null);

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
      <SetPrimaryPFPButton selectedNft={selectedNft} />
    </>
  );
};
