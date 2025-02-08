import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress } from "viem";
import NamesModule from "../ignition/modules/OnchainRandomNames";

describe("OnchainRandomNames", function () {
  async function deployFixture() {
    // Deploy all contracts using Ignition
    const deployment = await hre.ignition.deploy(NamesModule);

    return {
      onchainRandomNames: deployment.onchainRandomNames,
    };
  }

  describe("Constructor", function () {
    it("Should have the correct number of name subsets", async function () {
      const { onchainRandomNames } = await loadFixture(deployFixture);

      // Check first name subsets length (assuming we know how many subsets were deployed)
      const firstSubset = await onchainRandomNames.read.firstNameSubsets([0n]);
      expect(getAddress(firstSubset)).to.not.equal(
        getAddress("0x0000000000000000000000000000000000000000")
      );
    });
  });

  describe("getRandomName", function () {
    it("Should return a first and last name", async function () {
      const { onchainRandomNames } = await loadFixture(deployFixture);

      const seed = "0x" + "1".repeat(64);
      const [firstName, lastName] = await onchainRandomNames.read.getRandomName(
        [seed]
      );

      expect(firstName).to.be.a("string");
      expect(lastName).to.be.a("string");
      expect(firstName.length).to.be.greaterThan(0);
      expect(lastName.length).to.be.greaterThan(0);
    });

    it("Should return the same name for the same seed", async function () {
      const { onchainRandomNames } = await loadFixture(deployFixture);

      const seed = "0x" + "2".repeat(64);
      const [firstName1, lastName1] =
        await onchainRandomNames.read.getRandomName([seed]);
      const [firstName2, lastName2] =
        await onchainRandomNames.read.getRandomName([seed]);

      expect(firstName1).to.equal(firstName2);
      expect(lastName1).to.equal(lastName2);
    });

    it("Should return different names for different seeds", async function () {
      const { onchainRandomNames } = await loadFixture(deployFixture);

      const seed1 = "0x" + "3".repeat(64);
      const seed2 = "0x" + "4".repeat(64);

      const [firstName1, lastName1] =
        await onchainRandomNames.read.getRandomName([seed1]);
      const [firstName2, lastName2] =
        await onchainRandomNames.read.getRandomName([seed2]);

      // There's a very small chance this could fail if we randomly get the same name
      expect(firstName1).to.not.equal(firstName2);
      expect(lastName1).to.not.equal(lastName2);
    });

    it("Should generate names that look realistic", async function () {
      const { onchainRandomNames } = await loadFixture(deployFixture);

      for (let i = 0; i < 5; i++) {
        const seed = `0x${i.toString().padStart(64, "0")}`;
        const [firstName, lastName] =
          await onchainRandomNames.read.getRandomName([seed]);

        expect(firstName.length).to.be.within(2, 20);
        expect(lastName.length).to.be.within(2, 20);

        // Updated regex to include accented characters
        expect(firstName).to.match(/^[A-Za-zÀ-ÿ-]+$/);
        expect(lastName).to.match(/^[A-Za-zÀ-ÿ-]+$/);
      }
    });
  });
});
