import { ethers } from 'ethers';
import type { Mat } from '../../../types/ethers-contracts';
import MATJson from './Mat.json'

const PROVIDER_URL = "http://127.0.0.1:8545"
const { CONTRACT_ADDRESS = '', } = process.env

class Contract {
  mat: Mat
  
  constructor() {
    console.log('CONTRACT_ADDRESS', CONTRACT_ADDRESS);
    const matJSON = MATJson as unknown as { abi: ethers.InterfaceAbi }
    const provider = ethers.getDefaultProvider(PROVIDER_URL)
    const mat = new ethers.Contract(CONTRACT_ADDRESS, matJSON.abi, provider) as unknown as Mat

    this.mat = mat  
  }

  checkIn(address: string) {
    return this.mat.checkIn(address)
  }

  getUser(address: string) {
    return this.mat.getUser(address)
  }

  createUser(address: string) {
    return this.mat.createUser(address)
  }
}

export default new Contract()
