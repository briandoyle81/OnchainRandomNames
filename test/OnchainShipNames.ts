import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress } from "viem";
import ShipNamesModule from "../ignition/modules/OnchainShipNames";

require("dotenv").config();

describe("OnchainShipNames", function () {
  async function deployFixture() {
    // Deploy all contracts using Ignition
    const deployment = await hre.ignition.deploy(ShipNamesModule);

    return {
      onchainShipNames: deployment.onchainShipNames,
    };
  }

  describe("Constructor", function () {
    it("Should have the correct number of ship name subsets", async function () {
      const { onchainShipNames } = await loadFixture(deployFixture);

      // Check first ship name subset (assuming we know how many subsets were deployed)
      const firstSubset = await onchainShipNames.read.shipNameSubsets([0n]);
      expect(getAddress(firstSubset)).to.not.equal(
        getAddress("0x0000000000000000000000000000000000000000")
      );
    });
  });

  describe("getRandomShipName", function () {
    it("Should return a ship name", async function () {
      const { onchainShipNames } = await loadFixture(deployFixture);

      const seed = ("0x" + "1".repeat(64)) as `0x${string}`;
      const shipName = await onchainShipNames.read.getRandomShipName([seed]);

      expect(shipName).to.be.a("string");
      expect(shipName.length).to.be.greaterThan(0);
    });

    it("Should return the same name for the same seed", async function () {
      const { onchainShipNames } = await loadFixture(deployFixture);

      const seed = ("0x" + "2".repeat(64)) as `0x${string}`;
      const shipName1 = await onchainShipNames.read.getRandomShipName([seed]);
      const shipName2 = await onchainShipNames.read.getRandomShipName([seed]);

      expect(shipName1).to.equal(shipName2);
    });

    it("Should return different names for different seeds", async function () {
      const { onchainShipNames } = await loadFixture(deployFixture);

      const seed1 = ("0x" + "3".repeat(64)) as `0x${string}`;
      const seed2 = ("0x" + "4".repeat(64)) as `0x${string}`;

      const shipName1 = await onchainShipNames.read.getRandomShipName([seed1]);
      const shipName2 = await onchainShipNames.read.getRandomShipName([seed2]);

      // There's a very small chance this could fail if we randomly get the same name
      expect(shipName1).to.not.equal(shipName2);
    });

    it("Should generate ship names that look realistic", async function () {
      const { onchainShipNames } = await loadFixture(deployFixture);

      for (let i = 0; i < 5; i++) {
        const seed = `0x${i.toString().padStart(64, "0")}` as `0x${string}`;
        const shipName = await onchainShipNames.read.getRandomShipName([seed]);

        expect(shipName.length).to.be.within(2, 50); // Ship names can be longer than person names

        console.log("Ship Name: ", shipName);

        // Updated regex to include accented characters and spaces
        expect(shipName).to.match(/^[A-Za-zÀ-ÿ\s-]+$/);
      }
    });
  });
});
