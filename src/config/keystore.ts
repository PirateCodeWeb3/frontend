import { createQueryKeyStore } from "@lukemorales/query-key-factory";

export const keyStore = createQueryKeyStore({
  nfts: {
    byAddress: (address: string, vaults: string[] = []) => [address, vaults],
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
