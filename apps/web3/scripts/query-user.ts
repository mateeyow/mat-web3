import { ethers } from 'hardhat'

const { ALCHEMY_CONTRACT_ADDRESS = '', USER_ADDRESS = '' } = process.env

async function main() {
  const NAME = "Mat"

  const mat = await ethers.getContractAt(NAME, ALCHEMY_CONTRACT_ADDRESS)

  const [user, balance] = await mat.getUser(USER_ADDRESS)

  console.log(`User: ${ALCHEMY_CONTRACT_ADDRESS} has balance of ${balance} and has checked in ${new Date(Number(user.lastCheckIn) * 1000)}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
