import { Button } from "../ui/button";
import { Error } from "../ui/Error";
import { ExploreLink } from "../ExplorerLink";
import { Infos } from "../ui/Infos";
import React from "react";
import { Success } from "../ui/Success";
import { locales } from "@/locales";
import { useRemovePrimary } from "@/hooks/useRemovePrimary";

export const Unbind: React.FC = () => {
  const {
    unbind,
    error,
    isError,
    isLoading,
    transactionPending,
    isSuccess,
    transactionUrl,
    transactionHash,
  } = useRemovePrimary();

  return (
    <div className="space-y-4">
      <Button
        variant="destructive"
        className="w-full"
        onClick={unbind}
        loading={isLoading}
      >
        {locales.removePfp}
      </Button>
      {isError ? (
        <Error>
          {error?.message} <br />
          {transactionHash ? <ExploreLink href={transactionUrl} /> : null}
        </Error>
      ) : null}
      {transactionPending ? (
        <Infos>
          {locales.transactionPending}
          <br />
          {transactionHash ? <ExploreLink href={transactionUrl} /> : null}
        </Infos>
      ) : null}
      {isSuccess ? (
        <Success>
          {locales.transactionSuccess} <br />
          {transactionHash ? <ExploreLink href={transactionUrl} /> : null}
        </Success>
      ) : null}
    </div>
  );
};
