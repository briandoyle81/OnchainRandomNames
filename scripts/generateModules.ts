import fs from "fs";
import path from "path";
import shipNames from "../constants/ships.json";

const CHUNK_SIZE = 250;
const OUTPUT_DIR = path.resolve(__dirname, "../ignition/modules/ship-names");

function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

function generateModule(index: number, start: number, end: number) {
  return `import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import shipNames from "../../../constants/ships.json";

export default buildModule("NamesSubset${index}", (m) => {
  const subset = m.contract("NamesSubset", [shipNames.slice(${start}, ${end})]);
  return { subset };
});
`;
}

function main() {
  ensureOutputDir();

  for (let i = 0; i < shipNames.length; i += CHUNK_SIZE) {
    const chunkIndex = i / CHUNK_SIZE;
    const moduleCode = generateModule(chunkIndex, i, i + CHUNK_SIZE);
    const outputPath = path.join(OUTPUT_DIR, `SubsetModule${chunkIndex}.ts`);
    fs.writeFileSync(outputPath, moduleCode);
    console.log(`✅ Wrote ${outputPath}`);
  }

  console.log(
    `\n✨ Done! Generated ${Math.ceil(
      shipNames.length / CHUNK_SIZE
    )} module files.`
  );
}

main();
