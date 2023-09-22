import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const { ALCHEMY_API_URL, METAMASK_PRIVATE_KEY } = process.env

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  defaultNetwork: "sepolia",
	networks: {
		hardhat: {},
		sepolia: {
			url: ALCHEMY_API_URL,
			accounts: [`0x${METAMASK_PRIVATE_KEY}`]
		}
	}
};

export default config;
