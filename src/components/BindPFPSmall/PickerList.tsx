import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Frown, FrownIcon, ImageOff } from "lucide-react";

import { NftData } from "./BindPFP";
import { OwnedNft } from "alchemy-sdk";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { locales } from "@/locales";
import { useGetPrimary } from "@/hooks/useGetPrimary";

interface PickerListProps {
  nfts: OwnedNft[];
  onSelect: (nft: NftData) => void;
  selected: NftData | null;
}

export const PickerList: React.FC<PickerListProps> = ({
  nfts,
  onSelect,
  selected,
}) => {
  const { contractAddress, tokenId } = useGetPrimary();

  if (nfts.length === 0)
    return (
      <div className="mb-10 flex h-48 w-full flex-col items-center justify-center">
        <FrownIcon className="mb-6 h-12 w-12 text-gray-400" />
        <p className="text-lg font-bold text-gray-400">{locales.noNftsFound}</p>
      </div>
    );

  return (
    <ScrollArea className="mb-10 h-48 w-full">
      <div className="grid grid-cols-4 gap-3 pt-1 sm:grid-cols-5">
        {nfts.map((nft) => {
          const isAlreadyBound =
            nft.contract.address.toUpperCase() ===
              contractAddress?.toUpperCase() && +nft.tokenId === tokenId;

          return (
            <Avatar
              key={`${nft.contract.address}${nft.tokenId}`}
              onClick={() =>
                isAlreadyBound
                  ? null
                  : onSelect({
                      contract: nft.contract.address,
                      tokenId: +nft.tokenId,
                    })
              }
              className={cn(
                "h-14 w-14 sm:h-16 sm:w-16",
                selected?.contract === nft.contract.address &&
                  selected?.tokenId === +nft.tokenId &&
                  "shadow-lg ring-2 ring-primary "
              )}
            >
              <AvatarImage
                src={nft.media[0]?.thumbnail}
                className={cn(
                  isAlreadyBound
                    ? "cursor-default opacity-40"
                    : "cursor-pointer"
                )}
              />
              <AvatarFallback
                className={cn(
                  isAlreadyBound
                    ? "cursor-default opacity-40"
                    : "cursor-pointer"
                )}
              >
                <ImageOff />
              </AvatarFallback>
            </Avatar>
          );
        })}
      </div>
    </ScrollArea>
  );
};
