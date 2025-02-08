const { spawn } = require("child_process");
const path = require("path");

let attemptCount = 1;

function runDeployment() {
  console.log(`\n=== Deployment Attempt ${attemptCount} ===`);

  const deployment = spawn(
    "npx",
    [
      "hardhat",
      "ignition",
      "deploy",
      "./ignition/modules/OnchainRandomNames.ts",
      "--network",
      "flow",
      "--verify",
    ],
    {
      cwd: path.join(__dirname, "../"),
      shell: true,
      stdio: "pipe",
    }
  );

  deployment.stdout.pipe(process.stdout);
  deployment.stderr.pipe(process.stderr);

  deployment.stdout.on("data", (data) => {
    if (data.toString().includes("Confirm deploy")) {
      deployment.stdin.write("y\n");
    }
  });

  deployment.on("close", (code) => {
    if (code !== 0) {
      console.log("\nDeployment failed, retrying in 5 seconds...");
      attemptCount++;
      setTimeout(runDeployment, 5000);
    } else {
      console.log("\nDeployment successful!");
    }
  });
}

runDeployment();
