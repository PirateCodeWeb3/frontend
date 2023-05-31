# primary-pfp-frontend

Frontend for primary-pfp

## Get started

### Environement variables

`.env.local`

```
NEXT_PUBLIC_ALCHEMY_ID=
ALCHEMY_ID=

NEXT_PUBLIC_NETWORK=
NETWORK=

NEXT_PUBLIC_TX_EXPLORER=

NEXT_PUBLIC_PRIMARY_PFP_CONTRACT=
PRIMARY_PFP_CONTRACT=

NEXT_PUBLIC_PRIMARY_VERIFICATION_CONTRACT=
PRIMARY_VERIFICATION_CONTRACT=

NEXT_PUBLIC_PROVIDER_URL=
```

- `NEXT_PUBLIC_ALCHEMY_ID` : Alchemy ID use in frontend part of next.js
- `ALCHEMY_ID` : Alchemy ID use in api part of next.js
- `NEXT_PUBLIC_NETWORK` : Selected Network use in api part of next.js. Allowed values Goerli, Ethereum
- `NETWORK` : Selected Network use in api part of next.js. Allowed values Goerli, Ethereum
- `NEXT_PUBLIC_TX_EXPLORER` : Blockchain explorer to see transactions ie: https://goerli.etherscan.io/tx
- `NEXT_PUBLIC_PRIMARY_PFP_CONTRACT` : Contract use in frontend part of next.js
- `PRIMARY_PFP_CONTRACT` : Contract use in api part of next.js
- `TX_EXPLORER` : Blockchain explorer (https://goerli.etherscan.io/tx, https://etherscan.io/tx)
- `NEXT_PUBLIC_PROVIDER_URL` : JSON RPC Provider (https://eth-goerli.alchemyapi.io/v2,https://eth-mainnet.alchemyapi.io/v2/API_KEY )
- `NEXT_PUBLIC_WARMXYZ_CONTRACT` : warm.xyz contract address

By default only `NEXT_PUBLIC_ALCHEMY_ID` and `ALCHEMY_ID` are required all others env variables are defaulted to Goerli network.

## Run project

```
yarn & yarn dev
```

## Testnet features

On the testnet you can mint some nfts to try the applications and set them as your primary pfp.
To do this go to the /mint page
