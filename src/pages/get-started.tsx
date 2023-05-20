import { Card, CardHeader } from "@/components/ui/card";
import { GOERLI_NETWORK, env } from "@/config";
import { Heading, Text } from "@/components/ui/text";

import ConnectWallet from "@/components/ConnectWallet/ConnectWallet";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import React from "react";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";
import { withHydratationFix } from "@/hoc/withHydratationFix";

const IS_TESTNET = env.NETWORK === GOERLI_NETWORK;

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

function GetStartedPage() {
  return (
    <div>
      <Navbar />
      <main className={cn(fontSans.variable, "container py-36 font-sans")}>
        <div className="space-y-12">
          <Heading>Connect to your PFP community onchain in 5 steps</Heading>
          <ConnectWallet />
        </div>
        <div className="mt-20 space-y-14 lg:space-y-20">
          <section className="items-start space-y-8 lg:grid lg:grid-cols-2 lg:gap-28 lg:space-y-0">
            <div className="max-w-2xl">
              <Heading as="h2">1. Register a ENS</Heading>
              <Text colors={"secondary"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis, culpa? Nisi hic ducimus nobis quae corrupti doloribus
                quisquam voluptates minima doloremque vero. Quos minima sapiente
                voluptatibus. At dolorem ad nostrum.
              </Text>
            </div>
            <div className="pt-24">
              <Card className="mx-auto w-full max-w-md lg:max-w-full">
                <CardHeader>Add action or check informations</CardHeader>
              </Card>
            </div>
          </section>
          <section className="items-start space-y-8 lg:grid lg:grid-cols-2 lg:gap-28 lg:space-y-0">
            <div className="max-w-2xl">
              <Heading as="h2">2. Set the ENS Primary for your address</Heading>
              <Text colors={"secondary"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis, culpa? Nisi hic ducimus nobis quae corrupti doloribus
                quisquam voluptates minima doloremque vero. Quos minima sapiente
                voluptatibus. At dolorem ad nostrum.
              </Text>
            </div>
            <div className="pt-24">
              <Card className="mx-auto w-full max-w-md lg:max-w-full">
                <CardHeader>Add action or check informations</CardHeader>
              </Card>
            </div>
          </section>
          <section className="items-start space-y-8 lg:grid lg:grid-cols-2 lg:gap-28 lg:space-y-0">
            <div className="max-w-2xl">
              <Heading as="h2">
                3. Set your primary PFP to your primary ENS address
              </Heading>
              <Text colors={"secondary"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis, culpa? Nisi hic ducimus nobis quae corrupti doloribus
                quisquam voluptates minima doloremque vero. Quos minima sapiente
                voluptatibus. At dolorem ad nostrum.
              </Text>
            </div>
            <div className="pt-24">
              <Card className="mx-auto w-full max-w-md lg:max-w-full">
                <CardHeader>Add action or check informations</CardHeader>
              </Card>
            </div>
          </section>
          <section className="items-start space-y-8 lg:grid lg:grid-cols-2 lg:gap-28 lg:space-y-0">
            <div className="max-w-2xl">
              <Heading as="h2">
                4. Find your community members on Twitter
              </Heading>
              <Text colors={"secondary"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis, culpa? Nisi hic ducimus nobis quae corrupti doloribus
                quisquam voluptates minima doloremque vero. Quos minima sapiente
                voluptatibus. At dolorem ad nostrum.
              </Text>
            </div>
            <div className="pt-24">
              <Card className="mx-auto w-full max-w-md lg:max-w-full">
                <CardHeader>Add action or check informations</CardHeader>
              </Card>
            </div>
          </section>
          <section className="items-start space-y-8 lg:grid lg:grid-cols-2 lg:gap-28 lg:space-y-0">
            <div className="max-w-2xl">
              <Heading as="h2">
                5. Set your record for your primary ENS to be connected
              </Heading>
              <Text colors={"secondary"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis, culpa? Nisi hic ducimus nobis quae corrupti doloribus
                quisquam voluptates minima doloremque vero. Quos minima sapiente
                voluptatibus. At dolorem ad nostrum.
              </Text>
            </div>
            <div className="pt-24">
              <Card className="mx-auto w-full max-w-md lg:max-w-full">
                <CardHeader>Add action or check informations</CardHeader>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default withHydratationFix(GetStartedPage);
