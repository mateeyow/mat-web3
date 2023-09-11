import { ethers } from 'hardhat'

async function main() {
  const CONTRACT = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6"
  const USER_ADDRESS = '0x976EA74026E726554dB657fA54763abd0C3a0aa9'
  const NAME = "Mat"

  const mat = await ethers.getContractAt(NAME, CONTRACT)

  const user = await mat.getUser(USER_ADDRESS)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
