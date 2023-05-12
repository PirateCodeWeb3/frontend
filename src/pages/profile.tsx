import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GOERLI_NETWORK, env } from "@/config";

import { BindPFP } from "@/components/BindPFP";
import ConnectWallet from "@/components/ConnectWallet/ConnectWallet";
import { Mint } from "@/components/MintPFP";
import { Navbar } from "@/components/Navbar";
import { Profile } from "@/components/Profile";
import React from "react";
import { cn } from "@/lib/utils";
import { locales } from "@/locales";
import { useUser } from "@/hooks/useUser";
import { withHydratationFix } from "@/hoc/withHydratationFix";

const IS_TESTNET = env.NETWORK === GOERLI_NETWORK;

function ProfilePage() {
  const { isConnected } = useUser();

  return (
    <div>
      <Navbar />
      <main
        className={cn(
          "mx-auto max-w-xl space-y-4  px-2 pt-32 text-center",
          isConnected &&
            "mb-12 grid-cols-3 gap-4 text-left lg:grid lg:max-w-4xl lg:space-y-0"
        )}
      >
        {!isConnected ? (
          <Card>
            <CardHeader>
              <CardTitle>{locales.bindYourPfp}</CardTitle>
              <CardDescription>{locales.bindWalletInstruction}</CardDescription>
            </CardHeader>
            <CardContent>
              <ConnectWallet />
            </CardContent>
          </Card>
        ) : null}
        <div className="order-2">
          <Profile />
        </div>
        <div className="col-span-2 space-y-4">
          <BindPFP />
          {IS_TESTNET ? <Mint /> : null}
        </div>
      </main>
    </div>
  );
}

export default withHydratationFix(ProfilePage);
