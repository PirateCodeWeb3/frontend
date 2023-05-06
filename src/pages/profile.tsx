import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { BindPFP } from "@/components/BindPFP";
import ConnectWallet from "@/components/ConnectWallet/ConnectWallet";
import { Navbar } from "@/components/Navbar";
import { Profile } from "@/components/Profile";
import React from "react";
import { cn } from "@/lib/utils";
import { locales } from "@/locales";
import { useUser } from "@/hooks/useUser";
import { withHydratationFix } from "@/hoc/withHydratationFix";

function App() {
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
        <div className="col-span-2">
          <BindPFP />
        </div>
      </main>
    </div>
  );
}

export default withHydratationFix(App);
