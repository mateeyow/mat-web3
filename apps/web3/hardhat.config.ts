import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  // gasReporter: {
	// 	currency: 'USD',
	// 	gasPrice: 100,
	// 	enabled: true,
	// 	maxMethodDiff: 10,
	// },
};

export default config;
