import {
  ContractUtils,
  getContractAddress,
  WeightFactoryABI,
} from '0xbriz/data';
import { WEBSOCKET_PROVIDER } from '@0xbriz/providers';
import { Inject, Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class DexEventService {
  constructor(
    private readonly utils: ContractUtils,
    @Inject(WEBSOCKET_PROVIDER)
    private provider: ethers.providers.WebSocketProvider,
  ) {
    this.setListeners();
  }

  setListeners() {
    const weightedFactory = new ethers.Contract(
      getContractAddress('WeightedPoolFactory', this.provider.network.chainId),
      WeightFactoryABI,
    );

    console.log(weightedFactory.interface.events);
  }

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
