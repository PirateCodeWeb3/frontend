import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Button } from "../ui/button";
import { Heading } from "../ui/text";
import Link from "next/link";
import React from "react";
import { User } from "lucide-react";
import { locales } from "@/locales";
import { useDisconnect } from "wagmi";
import { useGetPrimary } from "@/hooks/useGetPrimary";
import { useGetTwitterAccount } from "@/hooks/useGetTwitterAccount";
import { useNftMetata } from "@/hooks/useNftMetadata";
import { useUser } from "@/hooks/useUser";
import { withHydratationFix } from "@/hoc/withHydratationFix";

interface ProfileDialogProps {
  children?: React.ReactNode;
}

export const ProfileDialog: React.FC<ProfileDialogProps> = withHydratationFix(
  () => {
    const { user, ensName } = useUser();
    const { contractAddress, tokenId } = useGetPrimary();
    const { metadata } = useNftMetata(contractAddress, tokenId);
    const { twitter } = useGetTwitterAccount(ensName);
    const { disconnect } = useDisconnect();

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">{locales.profile}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              {locales.yourProfile}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-10 text-center">
            <Avatar className="mx-auto h-40 w-40">
              <AvatarImage src={metadata?.media[0].thumbnail} />
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>

            <Heading as={"h3"} variant={"h1"} className="mb-4 mt-10">
              {user}
            </Heading>
            {twitter ? (
              <Link
                href={`https://twitter.com/${twitter}`}
                className={
                  "font-bold text-primary underline underline-offset-4"
                }
                target="_blank"
              >{`@${twitter}`}</Link>
            ) : null}
          </div>
          <Button
            onClick={() => disconnect()}
            variant={"destructive"}
            className="mt-12"
          >
            {locales.disconnect}
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
);
