import { ethers } from 'hardhat'

const { CONTRACT_ADDRESS = '', USER_ADDRESS = '' } = process.env

async function main() {
  const NAME = "Mat"

  const mat = await ethers.getContractAt(NAME, CONTRACT_ADDRESS)

  const user = await mat.getUser(USER_ADDRESS)

  console.log(`User: ${CONTRACT_ADDRESS} has balance of ${user.balance} and has checked in ${new Date(Number(user.lastCheckIn) * 1000)}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
