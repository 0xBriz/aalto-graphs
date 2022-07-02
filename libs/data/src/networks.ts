import { config } from 'dotenv';

export enum NETWORKS {
  BSC = 56,
  HARDHAT = 31337,
}

config();

export interface INetworkConfig {
  rpcUrl: string;
  wsUrl: string;
}

export const Network: { [key in NETWORKS]: INetworkConfig } = {
  [NETWORKS.BSC]: {
    rpcUrl: process.env.BSC_RPC,
    wsUrl: process.env.BSC_WS_RPC,
  },
  [NETWORKS.HARDHAT]: {
    rpcUrl: 'http://localhost:8545',
    wsUrl: 'ws://localhost:8545',
  },
};
