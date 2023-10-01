import { ethers } from 'hardhat'

const { ALCHEMY_CONTRACT_ADDRESS = '', USER_ADDRESS = '' } = process.env

async function main() {
  const NAME = "Mat"

  const mat = await ethers.getContractAt(NAME, ALCHEMY_CONTRACT_ADDRESS)

  const coinID = await mat.COIN_ID()
  const [user, balance] = await mat.getUser(USER_ADDRESS)
  const coinBalance = await mat.balanceOf(USER_ADDRESS, coinID)


  console.log(`User: ${ALCHEMY_CONTRACT_ADDRESS} has balance of ${balance} and has checked in ${new Date(Number(user.lastCheckIn) * 1000)}`)
  console.log(`Balance: ${coinBalance}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
