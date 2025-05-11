import fs from "fs";
import path from "path";
import { execSync } from "child_process";

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const modulesDir = path.resolve(__dirname, "../ignition/modules/ship-names");
  const moduleFiles = fs
    .readdirSync(modulesDir)
    .filter((file) => file.startsWith("SubsetModule") && file.endsWith(".ts"))
    .sort((a, b) => {
      const aNum = parseInt(a.match(/\d+/)?.[0] || "0");
      const bNum = parseInt(b.match(/\d+/)?.[0] || "0");
      return aNum - bNum;
    });

  for (const file of moduleFiles) {
    const modulePath = `ignition/modules/ship-names/${file}`;
    console.log(`🚀 Deploying ${file}...`);
    try {
      execSync(
        `npx hardhat ignition deploy ${modulePath} --network flow-testnet `,
        {
          stdio: "inherit",
        }
      );
    } catch (err) {
      console.error(`❌ Failed to deploy ${file}:`, err);
    }

    console.log("⏳ Waiting 1 second...");
    await sleep(1000);
  }

  console.log("✅ All modules deployed.");
}

main();
