const fs = require("fs");
const path = require("path");

const artifactPath = path.join(
  __dirname,
  "../artifacts/contracts/FirstNamesSubset_0.sol/FirstNamesSubset_0.json"
);
const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

const bytecodeSize = (artifact.bytecode.length - 2) / 2;
const deployedBytecodeSize = (artifact.deployedBytecode.length - 2) / 2;

console.log(`Bytecode size: ${bytecodeSize} bytes`);
console.log(`Deployed bytecode size: ${deployedBytecodeSize} bytes`);
