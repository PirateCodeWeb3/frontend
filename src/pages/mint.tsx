import { Heading, Text } from "@/components/ui/text";

import Link from "next/link";
import { Mint } from "@/components/MintPFP";
import { Navbar } from "@/components/Navbar";
import { StepByStep } from "@/components/StepByStep";
import { buttonVariants } from "@/components/ui/button";
import { locales } from "@/locales";
import { routes } from "@/config";
import { withHydratationFix } from "@/hoc/withHydratationFix";

function MintPage() {
  return (
    <div className={"container py-36 font-sans"}>
      <Navbar />
      <main className="sm:pt-4 md:pt-8 lg:pt-32">
        <div className="items-start lg:grid lg:grid-cols-2 lg:gap-24">
          <div className="space-y-10 md:space-y-12 lg:space-y-16">
            <Heading className="font-extrabold tracking-tight lg:text-6xl">
              {locales.mintForTest}
            </Heading>
            <Text variant="lead" className="relative mt-6 leading-8">
              {locales.mintForTestDescription}
            </Text>
          </div>
          <div className="mt-12 lg:mt-0 lg:pl-10">
            <Mint />
          </div>
        </div>
      </main>
    </div>
  );
}

export default withHydratationFix(MintPage);
