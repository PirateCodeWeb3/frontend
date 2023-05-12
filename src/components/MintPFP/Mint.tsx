import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Button } from "../ui/button";
import { Error } from "../ui/Error";
import { ExploreLink } from "../ExplorerLink";
import { Infos } from "../ui/Infos";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import React from "react";
import { Success } from "../ui/Success";
import { Text } from "../ui/text";
import { locales } from "@/locales";
import { useMint } from "@/hooks/useMint";

const nftsContracts = [
  {
    collection: "Bored Ape Yacht Club",
    contract: "0x5f1b78a908a05835b53bbc6cdffc2dfaea10d42d",
  },
  {
    collection: "Mutant Ape Yacht Club",
    contract: "0xeb4be195893969a2ac2eb9650b328a19452e2156",
  },
  {
    collection: "Azuki",
    contract: "0xdbf46ea49b37085ad9dcd5d15e3081391ca10c6b",
  },
  {
    collection: "Beanz",
    contract: "0x8c98a5a89Df5BCD68fc6536F4947a2E0845c0034",
  },
  {
    collection: "wrapped punks",
    contract: "0x29674De3A40432f1d709C40f93d4d707063e73CE",
  },
  {
    collection: "Meebits",
    contract: "0x0c07c88d84337a7b32b0a41e6031ca4ac223c48c",
  },
  {
    collection: "Pudgy Penguins",
    contract: "0xd145e957a975ae7fcccdaaf57f59a905ab10c47f",
  },
  {
    collection: "Moonbrids",
    contract: "0x1f31e37dbefa00d76f292c0d89d8b16f54f602fb",
  },
  {
    collection: "Clonex",
    contract: "0x99F66c5aeaB492C6d8C9c3498570366269ff56C1",
  },
  {
    collection: "doodles",
    contract: "0x644cd7ab005815Fe27182a4b281993e611fe1B12",
  },
  {
    collection: "mfer",
    contract: "0x9AB055D61C8e9b36BD2518e43f3Ac531b2849FAD",
  },
  {
    collection: "DeGods",
    contract: "0x4F0AFBbaC4d1E738d2a3E35b9083c3E859eaa569",
  },
  {
    collection: "V1 CryptoPunks",
    contract: "0x7053c224bF94cdbad53F80bF9029c1ba7334D774",
  },
  {
    collection: "Sappy Seals",
    contract: "0xeB8FEB3C171f224c5B1855D452Cb080Dcf241413",
  },
  {
    collection: "Milady",
    contract: "0x987830Be8D7869485C7C06a3A66e1c00F342B367",
  },
  {
    collection: "World Of Women",
    contract: "0x1E86DC7DE5Df66c15b649c415564B53f3f3f1a7D",
  },
  {
    collection: "Cool Cats",
    contract: "0x7223dfdeCe805acA91E619E9EEDDd266062F9eB3",
  },
  {
    collection: "Valhalla",
    contract: "0xAd56867DBE6b01ff6480e5357601500fea66A62B",
  },
];

export const Mint = (): React.ReactElement => {
  const [collection, setCollection] = React.useState<string | null>(null);
  const [tokenId, setTokenId] = React.useState<number>(0);
  const {
    mint,
    error,
    isError,
    isLoading,
    transactionPending,
    isSuccess,
    transactionUrl,
    transactionHash,
  } = useMint(collection, tokenId);

  return (
    <Card className="overflow-x-hidden">
      <CardHeader>
        <CardTitle>{locales.mintNft}</CardTitle>
        <CardDescription>{locales.mintNftDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2 sm:grid sm:grid-cols-2 sm:gap-2 sm:space-y-0">
          <div className="space-y-2">
            <Label htmlFor="collections">{locales.selectCollection}</Label>

            <Select
              name="collections"
              onValueChange={(value) => setCollection(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={locales.collections} />
              </SelectTrigger>
              <SelectContent>
                {nftsContracts.map((nft) => (
                  <SelectItem key={nft.contract} value={nft.contract}>
                    {nft.collection}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tokenId">{locales.tokenID}</Label>
            <Input
              type="number"
              value={tokenId}
              onChange={(e) => setTokenId(+e.target.value)}
              min={0}
            />
          </div>
        </div>
        <Button
          className="w-full"
          disabled={collection === null || tokenId === null}
          onClick={mint}
          loading={isLoading}
        >
          {locales.mint}
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
      </CardContent>
    </Card>
  );
};
