import { ConnectWallet } from "../ConnectWallet";
import Head from "next/head";
import Link from "next/link";
import { ProfileDialog } from "../ProfileDialog";
import React from "react";
import { locales } from "@/locales";
import { routes } from "@/config";
import { useUser } from "@/hooks/useUser";

interface NavbarProps {
  title?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const metaTitle = title ? `${title} | ${locales.name}` : locales.metaTile;
  const { isConnected } = useUser();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <Head>
        <title>{metaTitle}</title>
      </Head>
      <nav className="bg-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <Link href={routes.HOME} className="flex items-center">
            <div className="mr-4 h-8 w-8 rounded-full bg-black" />
            <p className="text-lg font-semibold">{locales.name}</p>
          </Link>
          {isConnected ? <ProfileDialog /> : <ConnectWallet />}
        </div>
      </nav>
    </header>
  );
};
