import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    "flow-testnet": {
      url: "https://testnet.evm.nodes.onflow.org",
      accounts: [process.env.METAMASK_WALLET_1 as string],
      gas: 500000,
    },
  },
};

export default config;
