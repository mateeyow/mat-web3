import { ethers } from 'ethers';
import { Mat__factory } from 'types/ethers-contracts/factories/Mat__factory'
import MAT from './contract/Mat.json'

export const getUser = async () => {
  const provider = ethers.getDefaultProvider("http://127.0.0.1:8545")
  const mat = new ethers.Contract("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", Mat__factory.abi, provider)

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call --- disable for now
    const user = await mat.getUser("0x71bE63f3384f5fb98995898A86B02Fb2426c5788")
    console.info(`Got a user with balance ${Number(user.balance)}`)
  } catch (err) {
    console.error('Something went wrong while getting a user:', err)
  }
}
