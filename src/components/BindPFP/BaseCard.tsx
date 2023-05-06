import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { cn } from "@/lib/utils";
import { locales } from "@/locales";

export const BaseCard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  // <Card className="overflow-x-hidden">

  <Card className="overflow-x-hidden">
    <CardHeader>
      <CardTitle>{locales.bindYourPfp}</CardTitle>
      <CardDescription>{locales.selectNft}</CardDescription>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
