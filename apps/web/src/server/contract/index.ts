import { ethers } from 'ethers';
import type { Mat } from '../../../types/ethers-contracts';
import MATJson from './Mat.json'

interface Abi {
  abi: ethers.InterfaceAbi
  bytecode: ethers.BytesLike
}

const { ALCHEMY_CONTRACT_ADDRESS = '', ALCHEMY_API_KEY = '', METAMASK_PRIVATE_KEY = '' } = process.env

const isMatContract = (contract: unknown): contract is Mat => {
  const matContract = contract as Mat

  return typeof matContract.checkIn === 'function'
    && typeof matContract.createUser === 'function'
    && typeof matContract.getUser === 'function'
}

const isAbi = (abi: unknown): abi is Abi => {
  const abiArray = abi as Abi

  return typeof abiArray.abi === 'object'
    && typeof abiArray.bytecode === 'string'
}

class MATContract {
  public provider: ethers.AlchemyProvider
  public wallet: ethers.Wallet
  public contract: Mat

  constructor() {
    if (!isAbi(MATJson)) {
      throw new Error('ABI is not a valid ABI')
    }

    const abiData = MATJson.abi
    const provider = new ethers.AlchemyProvider("sepolia", ALCHEMY_API_KEY)
    const wallet = new ethers.Wallet(METAMASK_PRIVATE_KEY, provider)
    const contract = new ethers.Contract(ALCHEMY_CONTRACT_ADDRESS, abiData, wallet)

    if (!isMatContract(contract)) {
      throw new Error('Contract is not a Mat contract')
    }

    this.provider = provider
    this.wallet = wallet
    this.contract = contract
  }

  createUser(address: string) {
    return this.contract.createUser(address)
  }

  getUser(address: string) {
    return this.contract.getUser(address)
  }

  checkIn(address: string) {
    return this.contract.checkIn(address)
  }

  async balanceOf(address: string) {
    const coinID = await this.contract.COIN_ID()
    return this.contract.balanceOf(address, coinID)
  }
}

export default MATContract
