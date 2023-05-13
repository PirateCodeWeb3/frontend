import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { BindPFP } from "../BindPFPSmall";
import { EnsTwitterRecord } from "../EnsTwitterRecord/EnsTwitterRecord";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Step } from "./Step";
import { locales } from "@/locales";
import { useGetPrimary } from "@/hooks/useGetPrimary";
import { useGetTwitterAccount } from "@/hooks/useGetTwitterAccount";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useUser } from "@/hooks/useUser";

export const StepByStep = (): React.ReactElement | null => {
  const isMounted = useIsMounted();
  const { ensName, isLoadingEnsName } = useUser();
  const { pfpBinded, isLoading: isLoadingPrimaryPFP } = useGetPrimary();
  const { twitter, isLoading: isLoadingTwitter } =
    useGetTwitterAccount(ensName);

  if (isMounted === false) {
    return null;
  }
  return (
    <Card>
      <CardHeader className="pb-12">
        <CardTitle>
          Connect to your PFP community onchain in five steps
        </CardTitle>
        <CardDescription>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime
          exercitationem sunt quam. Ipsum amet repudiandae reprehenderi
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Step
          step={1}
          title={locales.steps[1].title}
          isOk={!!ensName}
          isLoading={isLoadingEnsName}
        >
          <CardDescription className="flex pb-4">
            {locales.steps[1].description}
            <Link
              href={"https://support.ens.domains/howto/registration"}
              className={
                "ml-1 flex items-center text-sm font-bold text-primary underline underline-offset-4"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={16} className="mr-1" />
              {locales.steps[1].cta}
            </Link>
          </CardDescription>
        </Step>

        <Step
          step={2}
          title={locales.steps[2].title}
          isOk={!!ensName}
          isLoading={isLoadingEnsName}
        >
          <CardDescription className="flex pb-4">
            {locales.steps[2].description}
            <Link
              href={"https://support.ens.domains/howto/set-primary-name"}
              className="ml-1 flex items-center text-sm font-bold text-primary underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={16} className="mr-1" />
              {locales.steps[2].cta}
            </Link>
          </CardDescription>
        </Step>

        <Step
          step={3}
          title={locales.steps[3].title}
          isOk={pfpBinded}
          isLoading={isLoadingPrimaryPFP}
        >
          <CardDescription className="pb-4">
            {locales.steps[3].description}
          </CardDescription>
          <BindPFP />
        </Step>

        <Step step={4} title={locales.steps[4].title}>
          <CardDescription className="flex pb-4">
            {locales.steps[4].description}
            <Link
              href={"https://twitter.com/"}
              className="ml-1 flex items-center text-sm font-bold text-primary underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={16} className="mr-1" />
              {locales.steps[4].cta}
            </Link>
          </CardDescription>
        </Step>

        <Step
          step={5}
          title={locales.steps[5].title}
          isOk={!!twitter}
          isLoading={isLoadingTwitter}
        >
          <CardDescription className="pb-4">
            {locales.steps[5].description}
          </CardDescription>
          <EnsTwitterRecord />
        </Step>
      </CardContent>
    </Card>
  );
};

const classes = /** class={ */ {
  cta: "ml-1 flex items-center text-sm font-bold text-primary underline underline-offset-4",
  description: "flex pb-4",
}; /** } */
