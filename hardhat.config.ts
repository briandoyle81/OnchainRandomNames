import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  etherscan: {
    apiKey: {
      "flow-testnet": "abc",
      flow: "abc",
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
  },
};

export default config;
