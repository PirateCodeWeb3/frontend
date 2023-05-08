import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import React from "react";
import { Text } from "../ui/text";
import { Unbind } from "./Unbind";
import { User } from "lucide-react";
import { locales } from "@/locales";
import { useGetPrimary } from "@/hooks/useGetPrimary";
import { useNftMetata } from "@/hooks/useNftMetadata";
import { useUser } from "@/hooks/useUser";

export const Profile: React.FC = () => {
  const { isConnected, ensName, formattedAdr } = useUser();
  const { contractAddress, tokenId, pfpBinded } = useGetPrimary();
  const { metadata } = useNftMetata(contractAddress, tokenId);

  if (!isConnected) return null;

  return (
    <>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Your profile</CardTitle>
          <CardDescription>{ensName ?? formattedAdr}</CardDescription>
        </CardHeader>
        <CardContent>
          <Avatar className="mx-auto h-40 w-40">
            <AvatarImage src={metadata?.media[0].thumbnail} />
            <AvatarFallback>
              <User className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <Text
            variant={"large"}
            className="my-6 text-center tracking-tight"
          ></Text>
          {pfpBinded ? (
            <Unbind />
          ) : (
            // <h2 className="text-center py-2 text-red-500 text-md leading-6">
            <Text
              variant={"small"}
              className="my-6 text-center font-bold tracking-tight text-red-500"
            >
              {locales.noPfpBinded}
            </Text>
          )}
        </CardContent>
      </Card>
    </>
  );
};
