import { Button } from "../ui/button";
import { Error } from "../ui/Error";
import { ExploreLink } from "../ExplorerLink";
import { Infos } from "../ui/Infos";
import { Input } from "../ui/input";
import React from "react";
import { Success } from "../ui/Success";
import { Text } from "../ui/text";
import { locales } from "@/locales";
import useDebounce from "@/hooks/useDebounce";
import { useGetTwitterAccount } from "@/hooks/useGetTwitterAccount";
import { useSetTwitterAccount } from "@/hooks/useSetTwitterAccount";
import { useUser } from "@/hooks/useUser";

export const EnsTwitterRecord: React.FC = () => {
  const [value, setTwitterValue] = React.useState("");
  const debouncedValue = useDebounce(value, 1000);
  const { ensName } = useUser();
  const { twitter } = useGetTwitterAccount(ensName);
  const {
    setTwitter,
    error,
    isError,
    isLoading,
    transactionPending,
    isSuccess,
    transactionUrl,
    transactionHash,
  } = useSetTwitterAccount(ensName, debouncedValue);
  return (
    <>
      <div className="flex space-x-6">
        <div className="w-60">
          <Input
            placeholder={locales.twitterUsername}
            onChange={(e) => setTwitterValue(e.currentTarget.value)}
          />
        </div>
        <Button onClick={setTwitter} loading={isLoading}>
          {locales.steps[5].cta}
        </Button>
      </div>
      <Text>
        {locales.currentTwitterUsername}{" "}
        <span className="font-bold">{twitter}</span>
      </Text>
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
    </>
  );
};
