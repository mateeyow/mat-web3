import { ethers } from 'ethers';
import type { Mat } from '../../../types/ethers-contracts';
import MATJson from './Mat.json'

const { ALCHEMY_CONTRACT_ADDRESS = '', ALCHEMY_API_KEY = '', METAMASK_PRIVATE_KEY = '' } = process.env
const matJSON = MATJson as unknown as { abi: ethers.InterfaceAbi, bytecode: ethers.BytesLike }

class Contract {
  // mat: Mat
  
  // constructor() {
  //   // const matJSON = MATJson as unknown as { abi: ethers.InterfaceAbi }
  //   // const provider = new ethers.AlchemyProvider("sepolia", ALCHEMY_API_KEY)
  //   // const signer = provider.getSigner()
  //   // // const provider = ethers.getDefaultProvider(PROVIDER_URL)
  //   // const mat = new ethers.Contract(ALCHEMY_CONTRACT_ADDRESS, matJSON.abi, signer) as unknown as Mat

  //   // this.mat = mat  
  // }

  async checkIn(address: string) {
    const provider = new ethers.AlchemyProvider("sepolia", ALCHEMY_API_KEY)
    const signer = await provider.getSigner()
    // const provider = ethers.getDefaultProvider(PROVIDER_URL)
    const mat = new ethers.Contract(ALCHEMY_CONTRACT_ADDRESS, matJSON.abi, signer) as unknown as Mat
    return mat.checkIn(address)
  }

  async getUser(address: string) {
    const provider = new ethers.AlchemyProvider("sepolia", ALCHEMY_API_KEY)
    const mat = new ethers.Contract(ALCHEMY_CONTRACT_ADDRESS, matJSON.abi, provider) as unknown as Mat
    const [user, balance] = await mat.getUser(address)
    console.log('user', user);
    console.log('balance', balance);
    return 'hello'
    // return mat.getUser(address)
  }

  async createUser(address: string) {
    const provider = new ethers.AlchemyProvider("sepolia", ALCHEMY_API_KEY)
    const wallet = new ethers.Wallet(METAMASK_PRIVATE_KEY, provider)
    const mat = new ethers.Contract(ALCHEMY_CONTRACT_ADDRESS, matJSON.abi, wallet) as unknown as Mat
    await mat.createUser(address)
    return true
  }
}

export default new Contract()
