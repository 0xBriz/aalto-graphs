import { ContractUtils } from '0xbriz/data';
import { WEBSOCKET_PROVIDER } from '@0xbriz/providers';
import { Inject, Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { Pool, PoolToken, Token } from 'oxbriz/graphql';
import { PoolDataService } from './pool-data.service';
import { getPoolTokenId, ONE, parseWeightPoolResponse, ZERO } from './utils';

@Injectable()
export class PoolEventService {
  constructor(
    private readonly utils: ContractUtils,
    @Inject(WEBSOCKET_PROVIDER)
    private provider: ethers.providers.WebSocketProvider,
    private readonly data: PoolDataService,
  ) {
    this.setListeners();
  }

  setListeners() {
    console.log('Setting pool event listeners');
    const weightedFactory = this.utils.getContract('WeightedPoolFactory');

    weightedFactory.on('PoolCreated', (poolAddress: string, info) => {
      this.handleWeightedPoolCreated(poolAddress, info);
    });

    console.log('Pool event listeners set');
  }

  async handleWeightedPoolCreated(poolAddress: string, info) {
    try {
      console.log('WeightedPoolFactory - PoolCreated');
      const pool = this.utils.getContractInstance(
        poolAddress,
        'WeightedPool',
        true,
      );

      // create pool
      const poolModel = await parseWeightPoolResponse(poolAddress, pool, info);

      // Load pool with initial weights
      // updatePoolWeights(poolId.toHexString());

      // increment vaults pool count
      const vault = this.utils.getContract('Vault');

      // create pool tokens
      const tokens = await vault.getPoolTokens(poolModel.id);
      console.log(tokens);

      await this.data.createNewPool(poolModel);

      for (const tokenAddress of tokens.tokens) {
        await this.handlePoolToken(poolModel.id, tokenAddress);
      }
    } catch (error) {
      console.log(error);
    }
  }

  handlePoolToken = async (poolId: string, tokenAddress: string) => {
    try {
      const tokenContract = this.utils.getERC20(tokenAddress);
      const [name, symbol, decimals] = await Promise.all([
        tokenContract.name(),
        tokenContract.symbol(),
        tokenContract.decimals(),
      ]);

      let _token = await this.data.getToken(tokenAddress);
      if (!_token) {
        _token = await this.createToken(tokenAddress);
      }

      const poolTokenId = getPoolTokenId(poolId, tokenAddress);

      const poolToken = new PoolToken();
      poolToken.id = poolTokenId;
      poolToken.poolId = poolId;
      poolToken.address = tokenAddress;
      poolToken.name = name;
      poolToken.symbol = symbol;
      poolToken.decimals = decimals;
      poolToken.balance = ZERO;
      poolToken.invested = ZERO;
      poolToken.priceRate = ONE;
      poolToken.tokenId = _token._id as unknown as string;
    } catch (error) {
      throw error;
    }
  };

  createToken = async (tokenAddress: string) => {
    try {
      const token = new Token();
      const erc20token = this.utils.getERC20(tokenAddress);

      const [name, symbol, decimals] = await Promise.all([
        erc20token.name(),
        erc20token.symbol(),
        erc20token.decimals(),
      ]);

      token.name = name;
      token.symbol = symbol;
      token.decimals = decimals;
      token.totalBalanceUSD = ZERO;
      token.totalBalanceNotional = ZERO;
      token.totalSwapCount = ZERO;
      token.totalVolumeUSD = ZERO;
      token.totalVolumeNotional = ZERO;
      token.address = tokenAddress;
      return await this.data.createToken(token);
    } catch (error) {
      console.log(error);
    }
  };

  // VAULT
  //  - event: Swap(indexed bytes32,indexed address,indexed address,uint256,uint256)
  //   handler: handleSwapEvent
  // - event: PoolBalanceChanged(indexed bytes32,indexed address,address[],int256[],uint256[])
  //   handler: handleBalanceChange
  // - event: PoolBalanceManaged(indexed bytes32,indexed address,indexed address,int256,int256)
  //   handler: handleBalanceManage
  // - event: InternalBalanceChanged(indexed address,indexed address,int256)
  //   handler: handleInternalBalanceChange

  // WeightedPool
  //  - event: Transfer(indexed address,indexed address,uint256)
  //   handler: handleTransfer
  // - event: SwapFeePercentageChanged(uint256)
  //   handler: handleSwapFeePercentageChange

  //  StablePool (The Transfer event comes from the WeightedPool ABI in their graph though - line 403 )
  // - event: Transfer(indexed address,indexed address,uint256)
  //   handler: handleTransfer
  // - event: SwapFeePercentageChanged(uint256)
  //   handler: handleSwapFeePercentageChange
  // - event: AmpUpdateStarted(uint256,uint256,uint256,uint256)
  //   handler: handleAmpUpdateStarted
  // - event: AmpUpdateStopped(uint256)
  //   handler: handleAmpUpdateStopped

  // MetaStablePool
  // - event: Transfer(indexed address,indexed address,uint256)
  //   handler: handleTransfer
  // - event: SwapFeePercentageChanged(uint256)
  //   handler: handleSwapFeePercentageChange
  // - event: AmpUpdateStarted(uint256,uint256,uint256,uint256)
  //   handler: handleAmpUpdateStarted
  // - event: AmpUpdateStopped(uint256)
  //   handler: handleAmpUpdateStopped
  // - event: PriceRateProviderSet(indexed address,indexed address,uint256)
  //   handler: handlePriceRateProviderSet
  // - event: PriceRateCacheUpdated(indexed address,uint256)
  //   handler: handlePriceRateCacheUpdated

  // LiquidityBootstrappingPool
  // - event: Transfer(indexed address,indexed address,uint256)
  //   handler: handleTransfer
  // - event: SwapFeePercentageChanged(uint256)
  //   handler: handleSwapFeePercentageChange
  // - event: SwapEnabledSet(bool)
  //   handler: handleSwapEnabledSet
  // - event: GradualWeightUpdateScheduled(uint256,uint256,uint256[],uint256[])
  //   handler: handleGradualWeightUpdateScheduled

  // InvestmentPool
  // - event: Transfer(indexed address,indexed address,uint256)
  //   handler: handleTransfer
  // - event: SwapFeePercentageChanged(uint256)
  //   handler: handleSwapFeePercentageChange
  // - event: SwapEnabledSet(bool)
  //   handler: handleSwapEnabledSet
  // - event: GradualWeightUpdateScheduled(uint256,uint256,uint256[],uint256[])
  //   handler: handleGradualWeightUpdateScheduled
  // - event: ManagementFeePercentageChanged(uint256)
  //   handler: handleManagementFeePercentageChanged
  // - event: PausedStateChanged(bool)
  //   handler: handlePausedStateChanged

  // WeightedPoolFactory - WeightedPool2TokenFactory, StablePoolFactory,
  //  MetaStablePoolFactory, LiquidityBootstrappingPoolFactory, InvestmentPoolFactory
  // StablePhantomPoolFactory, ERC4626LinearPoolFactory
  // - event: PoolCreated(indexed address)
  // handler: handleNewWeightedPool
}
