// env related to network and contracts fallback to goerli

export const GOERLI_NETWORK = "Goerli";
const GOERLI_PRIMARY_PFP_CONTRACT =
  "0xD2068Fea1e1123a68007b836178f03dEf5aD7717";
const GOERLI_PRIMARY_VERIFICATION_CONTRACT =
  "0xD2068Fea1e1123a68007b836178f03dEf5aD7717";

export const env = {
  ALCHEMY_API_KEY:
    process.env.NEXT_PUBLIC_ALCHEMY_ID ?? process.env.ALCHEMY_ID ?? "",
  PRIMARY_PFP_CONTRACT: (process.env.NEXT_PUBLIC_PRIMARY_PFP_CONTRACT ??
    process.env.PRIMARY_PFP_CONTRACT ??
    GOERLI_PRIMARY_PFP_CONTRACT) as `0x${string}`,
  PRIMARY_VERIFICATION_CONTRACT: (process.env
    .NEXT_PUBLIC_PRIMARY_VERIFICATION_CONTRACT ??
    process.env.PRIMARY_VERIFICATION_CONTRACT ??
    GOERLI_PRIMARY_VERIFICATION_CONTRACT) as `0x${string}`,
  NETWORK:
    process.env.NEXT_PUBLIC_NETWORK ?? process.env.NETWORK ?? GOERLI_NETWORK,
  TX_EXPLORER:
    process.env.NEXT_PUBLIC_TX_EXPLORER ?? "https://goerli.etherscan.io/tx",
};

export const TWITTER_RECORD = "com.twitter";
