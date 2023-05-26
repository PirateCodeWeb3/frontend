import { Alchemy, Network, OwnedNft, OwnedNftsResponse } from "alchemy-sdk";
import { GOERLI_NETWORK, env } from "@/config";
import type { NextApiRequest, NextApiResponse } from "next";

const settings = {
  apiKey: env.ALCHEMY_API_KEY,
  network:
    env.NETWORK === GOERLI_NETWORK ? Network.ETH_GOERLI : Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  const { address, vaults } = req.query;

  let data: OwnedNft[] = [];
  if (vaults) {
    const vaultsArray = (vaults as string)?.split(",");
    data = await Promise.all(
      vaultsArray.map((vault) => fetchAllNfts(vault))
    ).then((results) => results.flat());
  } else {
    data = await fetchAllNfts(address as string);
  }

  const withoutERC1155 = data.filter((nft) => nft.tokenType !== "ERC1155");
  return res.status(200).json(withoutERC1155);
}

const fetchAllNfts = async (
  owner: string,
  pageKey: string | null = null,
  fetched: OwnedNft[] = []
): Promise<OwnedNft[]> => {
  const options: { pageSize: number; pageKey?: string } = {
    pageSize: 100,
  };

  if (pageKey) {
    options.pageKey = pageKey;
  }

  const response = await alchemy.nft.getNftsForOwner(owner, options);
  const allNfts = fetched.concat(response.ownedNfts);
  if (response.pageKey) {
    return await fetchAllNfts(owner, response.pageKey, allNfts);
  }

  return allNfts;
};
