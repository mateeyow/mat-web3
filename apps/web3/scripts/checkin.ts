import { ethers } from 'hardhat'

const { CONTRACT_ADDRESS = '', USER_ADDRESS = '' } = process.env

async function main() {
  const NAME = "Mat"

  const mat = await ethers.getContractAt(NAME, CONTRACT_ADDRESS)

  await mat.checkIn(USER_ADDRESS)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
