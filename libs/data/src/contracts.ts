import { VAULT_ABI, WEIGHTED_POOL_ABI, WeightFactoryABI } from './abis';
import { NETWORKS } from './networks';

export type Pools = 'WeightedPool';
export type AaltoContract =
  | 'Vault'
  | 'TimelockAuthorizer'
  | 'WeightedPoolFactory'
  | 'Bank'
  | Pools;

export const getContractAddress = (
  contract: AaltoContract,
  chainId: number,
) => {
  return CONTRACTS[chainId][contract];
};

export const ABI_MAP: { [key in AaltoContract]: any[] } = {
  Vault: VAULT_ABI,
  TimelockAuthorizer: [],
  Bank: [],
  WeightedPoolFactory: WeightFactoryABI,
  WeightedPool: WEIGHTED_POOL_ABI,
};

export const CONTRACTS: {
  [key in NETWORKS]?: { [key in AaltoContract]?: string };
} = {
  [NETWORKS.HARDHAT]: {
    Vault: '0x3B415b38f1c2aE9Af2D1e04F30188AD7dE883B7a',
    TimelockAuthorizer: '0x68a3e75a68aD5b8ED2C59a63b95F39C5D3F8cE71',
    Bank: '',
    WeightedPoolFactory: '0xbbB3Abfa2dd320d85c64e8825c1E32ad0026fAe5',
  },
  [NETWORKS.BSC]: {
    Vault: '0xc37c34eA9CA579aDF279A16C547e801ed722F3b5',
    TimelockAuthorizer: '0x920C87A2853b02D5233d3Eb0608e660eb04de860',
    Bank: '',
    WeightedPoolFactory: '0xC07511107Fb851ca95Faf0dc0804F9F287aAd7c9',
  },
};
