const hre = require("hardhat");

async function main() {
  const [wallet] = await hre.viem.getWalletClients();

  console.log("Sending 0 ETH transaction to increment nonce...");
  const hash = await wallet.sendTransaction({
    to: wallet.account.address,
    value: 0n,
  });

  console.log("Transaction hash:", hash);
  console.log("Transaction sent");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
