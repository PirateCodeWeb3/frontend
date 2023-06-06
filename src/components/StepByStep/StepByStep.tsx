import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { EnsTwitterRecord } from "../EnsTwitterRecord/EnsTwitterRecord";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { SET_PRIMARY_METHOD } from "@/hooks/useSetPrimary";
import { SetPrimaryPFP } from "../SetPrimaryPFPSmall";
import { Step } from "./Step";
import { locales } from "@/locales";
import { useGetPrimary } from "@/hooks/useGetPrimary";
import { useGetTwitterAccount } from "@/hooks/useGetTwitterAccount";
import { useUser } from "@/hooks/useUser";
import { withHydratationFix } from "@/hoc/withHydratationFix";

export const StepByStep = withHydratationFix((): React.ReactElement | null => {
  const { ensName, isLoadingEnsName } = useUser();
  const { pfpSet, isLoading: isLoadingPrimaryPFP } = useGetPrimary();
  const { twitter, isLoading: isLoadingTwitter } =
    useGetTwitterAccount(ensName);

  const [method, setMethod] = useState<SET_PRIMARY_METHOD>(
    SET_PRIMARY_METHOD.NORMAL
  );

  return (
    <Card>
      <CardHeader className="pb-12">
        <CardTitle>{locales.stepsTitle}</CardTitle>
        <CardDescription>{locales.stepsDescription}</CardDescription>
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
          isOk={pfpSet}
          isLoading={isLoadingPrimaryPFP}
        >
          <CardDescription>{locales.steps[3].description}</CardDescription>
          <div className="pb-4">
            <Select value={method} onValueChange={(e) => setMethod(e as any)}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder={locales.methodPlaceHolder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={SET_PRIMARY_METHOD.NORMAL}>
                  {locales.noDelegation}
                </SelectItem>
                <SelectItem value={SET_PRIMARY_METHOD.DELEGATECASH}>
                  {locales.delegateCash}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <SetPrimaryPFP method={method} />
        </Step>

        {pfpSet ? (
          <>
            <Step
              step={4}
              title={locales.steps[4].title}
              isOk={!!twitter}
              isLoading={isLoadingTwitter}
            >
              <CardDescription className="pb-4">
                {locales.steps[4].description}
                <br />
                {twitter ? (
                  <span>
                    {locales.currentTwitterUsername}{" "}
                    <span className="font-bold text-primary">{twitter}</span>
                  </span>
                ) : null}
              </CardDescription>
              <EnsTwitterRecord />
            </Step>

            <Step step={5} title={locales.steps[5].title}>
              <CardDescription className="pb-4">
                {locales.steps[5].description}
                <Link
                  href={"https://twitter.com/"}
                  className="ml-1 mt-3 flex items-center text-sm font-bold text-primary underline underline-offset-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} className="mr-1" />
                  {locales.steps[5].cta}
                </Link>
              </CardDescription>
            </Step>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
});

const classes = /** class={ */ {
  cta: "ml-1 flex items-center text-sm font-bold text-primary underline underline-offset-4",
  description: "flex pb-4",
}; /** } */
