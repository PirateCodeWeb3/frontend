import { Check, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";

import { CollapsibleContent } from "@radix-ui/react-collapsible";
import React from "react";
import { Text } from "../ui/text";
import { cn } from "@/lib/utils";
import { locales } from "@/locales";
import { useAccount } from "wagmi";

interface StepProps {
  children?: React.ReactNode;
  step: number;
  title: string;
  isLoading?: boolean;
  isOk?: boolean;
}

export const Step: React.FC<StepProps> = ({
  step,
  title,
  isOk,
  children,
  isLoading,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isConnected } = useAccount();

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-4">
          <div
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full   text-xs font-semibold text-primary-foreground",
              isOk ? "bg-green-500 " : "bg-primary ",
              isLoading || isOk ? "p-1" : "p-2"
            )}
          >
            {isLoading ? (
              <Loader2 className={cn("animate-spin")} />
            ) : (
              <> {isOk ? <Check /> : step}</>
            )}
          </div>
          <Text variant="p" className="text-left font-bold">
            {title}
          </Text>
        </div>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 p-4">
        {isConnected ? (
          <>{children}</>
        ) : (
          <Text>{locales.connectWalletFirst}</Text>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};
