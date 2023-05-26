import { Button } from "../ui/button";
import { Error } from "../ui/Error";
import { ExploreLink } from "../ExplorerLink";
import { Infos } from "../ui/Infos";
import { NftData } from "./SetPrimaryPFP";
import React from "react";
import { Success } from "../ui/Success";
import { locales } from "@/locales";
import { useSetPrimary } from "@/hooks/useSetPrimary";

interface SetPrimaryPFPButtonProps {
  selectedNft: NftData | null;
  useDelegateCash: boolean;
}

export default ExploreLink;

export const SetPrimaryPFPButton: React.FC<SetPrimaryPFPButtonProps> = ({
  selectedNft,
  useDelegateCash,
}) => {
  const {
    setPrimaryPFP,
    error,
    isError,
    isLoading,
    transactionPending,
    isSuccess,
    transactionUrl,
    transactionHash,
  } = useSetPrimary(
    selectedNft?.contract,
    selectedNft?.tokenId,
    useDelegateCash
  );

  return (
    <div className="space-y-4">
      <Button
        className="w-full"
        disabled={selectedNft === null || transactionPending}
        onClick={setPrimaryPFP}
        loading={isLoading}
      >
        {locales.setSelectedPfp}
      </Button>
      {isError ? (
        <Error>
          {error?.message} <br />
          {transactionHash ? <ExploreLink href={transactionUrl} /> : null}
        </Error>
      ) : null}
      {transactionPending ? (
        <Infos>
          {locales.transactionPending} <br />
          {transactionHash ? <ExploreLink href={transactionUrl} /> : null}
        </Infos>
      ) : null}
      {isSuccess ? (
        <Success>
          {locales.transactionSuccess}
          <br />
          {transactionHash ? <ExploreLink href={transactionUrl} /> : null}
        </Success>
      ) : null}
    </div>
  );
};
