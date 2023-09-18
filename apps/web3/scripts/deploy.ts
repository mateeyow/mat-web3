import { ethers } from "hardhat";

async function main() {
  const mat = await ethers.deployContract("Mat", []);

  await mat.waitForDeployment();

  const name = await mat.name();
  const address = await mat.getAddress()

  console.log(`${name} has been deployed to ${address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// async function main() {
//   const [deployer] = await ethers.getSigners();
//   console.log("Deploying contracts with the account:", deployer.address);

//   console.log(`Account balance: ${(await deployer.getBalance()).toString()}`);
//   const TOR = await ethers.getContractFactory("TorNFT");

//   const tor = await TOR.deploy();
//   console.log(`Contract deployed to address: ${tor.address}`);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
