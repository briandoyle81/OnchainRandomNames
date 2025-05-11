// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

import shipNames from "../../constants/ships.json";

const NamesModule = buildModule("NamesModule", (m) => {
  // Deploy NamesSubset contracts containing 300 names each
  const shipNameSubsets = [];
  for (let i = 0; i < shipNames.length; i += 250) {
    const subset = m.contract("NamesSubset", [shipNames.slice(i, i + 250)], {
      id: `ShipNameSubset${i}`,
    });
    shipNameSubsets.push(subset);
  }

  console.log("Total Contracts: ", shipNameSubsets.length);

  // Then deploy the OnchainRandomNames contract
  const onchainShipNames = m.contract("OnchainShipNames", [shipNameSubsets]);

  return { onchainShipNames };
});

export default NamesModule;
