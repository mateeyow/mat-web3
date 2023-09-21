import { ethers, AlchemyProvider } from 'ethers';
import { Network, Alchemy, Wallet, ContractFactory }  from "alchemy-sdk";
import type { Mat } from '../../../types/ethers-contracts';
import MATJson from './Mat.json'

const { ALCHEMY_CONTRACT_ADDRESS = '', ALCHEMY_API_KEY = '', METAMASK_PRIVATE_KEY = '' } = process.env

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
    const matJSON = MATJson as unknown as { abi: ethers.InterfaceAbi, bytecode: ethers.BytesLike }
    const provider = new ethers.AlchemyProvider("sepolia", ALCHEMY_API_KEY)
    const signer = await provider.getSigner()
    // const provider = ethers.getDefaultProvider(PROVIDER_URL)
    const mat = new ethers.Contract(ALCHEMY_CONTRACT_ADDRESS, matJSON.abi, signer) as unknown as Mat
    return mat.checkIn(address)
  }

  async getUser(address: string) {
    const provider = new ethers.AlchemyProvider("sepolia", ALCHEMY_API_KEY)
    const signer = await provider.getSigner()
    // const provider = ethers.getDefaultProvider(PROVIDER_URL)
    const mat = new ethers.Contract(ALCHEMY_CONTRACT_ADDRESS, matJSON.abi, signer) as unknown as Mat
    return mat.getUser(address)
  }

  createUser(address: string) {
    const matJSON = MATJson as unknown as { abi: ethers.InterfaceAbi }
    const alchemy = new Alchemy({
      network: Network.ETH_SEPOLIA,
      apiKey: ALCHEMY_API_KEY,
    })

    const wallet = new Wallet(METAMASK_PRIVATE_KEY, alchemy)
    const factory = new ContractFactory(matJSON.abi, matJSON.bytecode, wallet)
    factory.connect()
    
  }
  // async createUser(address: string) {
  //   const matJSON = MATJson as unknown as { abi: ethers.InterfaceAbi }
  //   const provider = new AlchemyProvider("sepolia", ALCHEMY_API_KEY)
  //   try {
  //     console.log('getting wallet...')
  //     const signer = await provider.getSigner()
  //     console.log('sinsignerger', signer);
  //     // const wallet = new ethers.Wallet(METAMASK_PRIVATE_KEY, provider)
  //     // console.log('wallet', wallet);
  //   // const signer = await provider.getSigner()
  //   // console.log('signer', signer);
  //   const mat = new ethers.Contract(ALCHEMY_CONTRACT_ADDRESS, matJSON.abi, provider) as unknown as Mat
  //   console.log('mat', mat);
  //   // return mat.createUser(address)
  //   return mat.balanceOf(address, 0)
  //   } catch (err) {
  //     console.log('error creating user:', err)
  //   }
    
  // }
}

export default new Contract()
