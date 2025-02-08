// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

import firstnames from "../../constants/firstnames.json";
import lastnames from "../../constants/lastnames.json";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const NamesModule = buildModule("NamesModule", (m) => {
  // Until we've gone through all the firstnames, deploy a NamesSubset containing 1000 firstnames and save the address
  // Handle the last subset not having the full 1000 names
  const firstnameSubsets = [];
  for (let i = 0; i < firstnames.length; i += 500) {
    const subset = m.contract("NamesSubset", [firstnames.slice(i, i + 400)], {
      id: `FirstNameSubset${i}`,
      afterDeploy: async () => {
        await sleep(500);
      },
    });
    firstnameSubsets.push(subset);
  }

  // Do the same for the lastnames
  const lastnameSubsets = [];
  for (let i = 0; i < lastnames.length; i += 500) {
    const subset = m.contract("NamesSubset", [lastnames.slice(i, i + 400)], {
      id: `LastNameSubset${i}`,
      afterDeploy: async () => {
        await sleep(500);
      },
    });
    lastnameSubsets.push(subset);
  }

  console.log(
    "Total Contracts: ",
    firstnameSubsets.length + lastnameSubsets.length
  );

  // Then deploy the OnchainRandomNames contract
  const onchainRandomNames = m.contract("OnchainRandomNames", [
    firstnameSubsets,
    lastnameSubsets,
  ]);

  return { onchainRandomNames };
});

export default NamesModule;
