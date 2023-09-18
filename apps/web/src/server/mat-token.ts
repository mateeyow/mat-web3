import { ethers } from 'ethers';
import type { Mat } from '../../types/ethers-contracts';
import MATJson from './contract/Mat.json'

const PROVIDER_URL = "http://127.0.0.1:8545"
const { CONTRACT_ADDRESS = '', USER_ADDRESS = '' } = process.env

export const getUser = async () => {
  const matJSON = MATJson as unknown as { abi: ethers.InterfaceAbi }
  const provider = ethers.getDefaultProvider(PROVIDER_URL)
  const mat = new ethers.Contract(CONTRACT_ADDRESS, matJSON.abi, provider) as unknown as Mat

  try {
     
    const [user, balance] = await mat.getUser(USER_ADDRESS)
    const date = new Date(Number(user.lastCheckIn) * 1000).toString()

    console.info(`Got a user with balance ${Number(balance)} last checkin is on ${date}`)
  } catch (err) {
    console.error('Something went wrong while getting a user:', err)
  }
}
