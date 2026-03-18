import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  etherscan: {
    apiKey: {
      "flow-testnet": "abc",
      flow: "abc",
      "ronin-saigon": "",
      "xai-testnet": "",
      "base-sepolia": process.env.BASECAN_API_KEY as string,
    },
    customChains: [
      {
        network: "flow",
        chainId: 747,
        urls: {
          apiURL: "https://evm.flowscan.io/api",
          browserURL: "https://evm.flowscan.io",
        },
      },
      {
        network: "flow-testnet",
        chainId: 545,
        urls: {
          apiURL: "https://evm-testnet.flowscan.io/api",
          browserURL: "https://evm-testnet.flowscan.io",
        },
      },
      {
        network: "ronin-saigon",
        chainId: 2021,
        urls: {
          apiURL: "https://saigon-testnet.roninchain.com/rpc",
          browserURL: "https://saigon-app.roninchain.com/",
        },
      },
      {
        network: "xai-testnet",
        chainId: 37714555429,
        urls: {
          apiURL: "https://testnet-v2.xai-chain.net/rpc",
          browserURL: "https://testnet-explorer-v2.xai-chain.net",
        },
      },
      {
        network: "base-sepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://sepolia.base.org",
          browserURL: "https://sepolia.basescan.org",
        },
      },
    ],
  },
  networks: {
    "flow-testnet": {
      url: "https://testnet.evm.nodes.onflow.org",
      accounts: [process.env.METAMASK_WALLET_1 as string],
    },
    flow: {
      url: "https://mainnet.evm.nodes.onflow.org",
      accounts: [process.env.METAMASK_WALLET_1 as string],
    },
    "ronin-saigon": {
      url: "https://saigon-testnet.roninchain.com/rpc",
      accounts: [process.env.METAMASK_WALLET_1 as string],
    },
    "xai-testnet": {
      url: "https://testnet-v2.xai-chain.net/rpc",
      accounts: [process.env.METAMASK_WALLET_1 as string],
    },
    "base-sepolia": {
      url: "https://sepolia.base.org",
      accounts: [process.env.METAMASK_WALLET_1 as string],
    },
  },
};

export default config;
