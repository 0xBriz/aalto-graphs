export enum NETWORKS {
  BSC = 56,
  HARDHAT = 31337,
}

export interface INetworkConfig {
  rpcUrl: string;
  wsUrl: string;
}

export const Network: { [key in NETWORKS]: INetworkConfig } = {
  [NETWORKS.BSC]: {
    rpcUrl: '',
    wsUrl: '',
  },
  [NETWORKS.HARDHAT]: {
    rpcUrl: 'http://localhost:8545',
    wsUrl: 'ws://localhost:8545',
  },
};
