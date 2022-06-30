import { NETWORKS } from './networks';

export type Pools = 'AMES-BUSD' | 'ASHARE-BUSD';
export type AaltoContract =
  | 'Vault'
  | 'TimelockAuthorizer'
  | 'WeightedPoolFactory'
  | 'Bank';

export const getContractAddress = (
  contract: AaltoContract,
  chainId: number,
) => {
  return CONTRACTS[chainId][contract];
};

export const CONTRACTS: {
  [key in NETWORKS]?: { [key in AaltoContract]: string };
} = {
  [NETWORKS.HARDHAT]: {
    Vault: '0x3B415b38f1c2aE9Af2D1e04F30188AD7dE883B7a',
    TimelockAuthorizer: '0x68a3e75a68aD5b8ED2C59a63b95F39C5D3F8cE71',
    Bank: '',
    WeightedPoolFactory: '0xbbB3Abfa2dd320d85c64e8825c1E32ad0026fAe5',
  },
};
