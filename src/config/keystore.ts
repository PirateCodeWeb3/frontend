import { createQueryKeyStore } from "@lukemorales/query-key-factory";

export const keyStore = createQueryKeyStore({
  nfts: {
    byAddress: (address: string) => [address],
    byAddresses: (addresses: string[]) => [addresses],
  },
  nftMetaData: {
    byContractAndTokenId: (contract: string, tokenId: number) => [
      contract,
      tokenId,
    ],
  },
  delegations: {
    byDelegate: (address: string) => [address],
  },
});
