import { ethers } from "hardhat";

async function main() {
  const mat = await ethers.deployContract("Mat", []);

  await mat.waitForDeployment();

  const name = await mat.name();
  const address = await mat.getAddress();

  console.log(`${name} has been deployed to ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
