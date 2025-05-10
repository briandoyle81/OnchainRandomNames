// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

import shipNames from "../../constants/ships.json";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const NamesModule = buildModule("NamesModule", (m) => {
  // Until we've gone through all the firstnames, deploy a NamesSubset containing 1000 firstnames and save the address
  // Handle the last subset not having the full 1000 names
  const shipNameSubsets = [];
  for (let i = 0; i < shipNames.length; i += 500) {
    const subset = m.contract("NamesSubset", [shipNames.slice(i, i + 400)], {
      id: `ShipNameSubset${i}`,
      afterDeploy: async () => {
        await sleep(500);
      },
    });
    shipNameSubsets.push(subset);
  }

  console.log("Total Contracts: ", shipNameSubsets.length);

  // Then deploy the OnchainRandomNames contract
  const onchainShipNames = m.contract("OnchainShipNames", [shipNameSubsets]);

  return { onchainShipNames };
});

export default NamesModule;
