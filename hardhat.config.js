require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');
require('dotenv').config();
require('hardhat-abi-exporter');

console.log(process.env.PRIVATE_KEY);

module.exports = {
  abiExporter: {
    path: './abi', 
    runOnCompile: true, //whether to automatically export ABIs during compilation
    clear: true, // whether to delete old ABI files in path on compilation
    flat: true, // whether to flatten output directory (may cause name collisions)
    only: [], // Array of String matchers used to select included contracts, defaults to all contracts if length is 0
    spacing: 2, // number of spaces per indentation level of formatted output
    pretty: false, // whether to use interface-style formatting of output for better readability
  },
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    matic: {
      url: process.env.polygonRPC,
      accounts: [process.env.PRIVATE_KEY],
    }
  },
  solidity: {
    version: "0.8.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
