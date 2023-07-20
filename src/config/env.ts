// env related to network and contracts fallback to goerli

export const GOERLI_NETWORK = "Goerli";
const GOERLI_PRIMARY_PFP_CONTRACT =
  "0x00000000009706556bfd041ed3ea54aa406a7e60";
const GOERLI_PRIMARY_VERIFICATION_CONTRACT =
  "0x036F0d017f5D11080Dc426De30A455687C9bEf3a";

const PROVIDER_URL = "https://eth-goerli.alchemyapi.io/v2";
const ALCHEMY_API_KEY =
  process.env.NEXT_PUBLIC_ALCHEMY_ID ?? process.env.ALCHEMY_ID ?? "";

export const env = {
  ALCHEMY_API_KEY,
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
  PROVIDER_URL: `${
    process.env.NEXT_PUBLIC_PROVIDER_URL ?? PROVIDER_URL
  }/${ALCHEMY_API_KEY}`,
};

export const TWITTER_RECORD = "com.twitter";
