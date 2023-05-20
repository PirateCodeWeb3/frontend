import { Button } from "../ui/button";
import { Error } from "../ui/Error";
import { ExploreLink } from "../ExplorerLink";
import { Infos } from "../ui/Infos";
import { NftData } from "./BindPFP";
import React from "react";
import { Success } from "../ui/Success";
import { locales } from "@/locales";
import { useSetPrimary } from "@/hooks/useSetPrimary";

interface BindProps {
  selectedNft: NftData | null;
}

export default ExploreLink;

export const Bind: React.FC<BindProps> = ({ selectedNft }) => {
  const {
    bind,
    error,
    isError,
    isLoading,
    transactionPending,
    isSuccess,
    transactionUrl,
    transactionHash,
  } = useSetPrimary(selectedNft?.contract, selectedNft?.tokenId);

  return (
    <div className="space-y-4">
      <Button
        className="w-full"
        disabled={selectedNft === null}
        onClick={bind}
        loading={isLoading}
      >
        {locales.bindSelectedPfp}
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
