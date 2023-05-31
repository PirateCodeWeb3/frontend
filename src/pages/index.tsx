import { Heading, Text } from "@/components/ui/text";

import { ConnectWallet } from "@/components/ConnectWallet";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ProfileDialog } from "@/components/ProfileDialog";
import { StepByStep } from "@/components/StepByStep";
import { buttonVariants } from "@/components/ui/button";
import { locales } from "@/locales";
import { routes } from "@/config";
import { useUser } from "@/hooks/useUser";

export default function Home() {
  const { isConnected } = useUser();
  return (
    <div className={"container py-36 font-sans"}>
      <Navbar />
      <main className="sm:pt-4 md:pt-8 lg:pt-32">
        <div className="items-center lg:grid lg:grid-cols-2 lg:gap-24">
          <div className="space-y-10 md:space-y-12 lg:space-y-16">
            <Heading className="font-extrabold tracking-tight lg:text-6xl">
              {locales.heroTitle}
            </Heading>
            <Text variant="lead" className="relative mt-6 leading-8">
              {locales.heroDescription}
            </Text>
            <div className="mt-10 flex items-center gap-x-6">
              {isConnected ? <ProfileDialog /> : <ConnectWallet />}
            </div>
          </div>
          <div className="mt-12 lg:mt-0 lg:pl-10">
            <StepByStep />
          </div>
        </div>
      </main>
    </div>
  );
}
