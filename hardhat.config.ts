// require('solidity-coverage')
import 'hardhat-gas-reporter'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'
import { HardhatUserConfig } from 'hardhat/types/config'

import './tasks/deploy'

require('dotenv').config()
const mnemonic = process.env.DEV_MNEMONIC || ''

export enum AvailableNetwork {
  HARDHAT = 'hardhat',
  GANACHE = 'ganache',
  RINKEBY = 'rinkeby',
  MAINNET = 'mainnet'
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.7',
        settings: {
          evmVersion: 'istanbul',
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  networks: {
    [AvailableNetwork.GANACHE]: {
      url: 'http://127.0.0.1:8545',
    },
    [AvailableNetwork.RINKEBY]: {
      url: 'https://rinkeby.infura.io/v3/' + process.env.INFURA_ID,
      accounts: {
        mnemonic,
      },
    }
  },
  mocha: {
    timeout: 99999999,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_APIKEY,
  }
}

export default config
