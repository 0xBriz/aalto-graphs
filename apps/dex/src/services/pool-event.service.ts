import { ContractUtils } from '0xbriz/data';
import { WEBSOCKET_PROVIDER } from '@0xbriz/providers';
import { Inject, Injectable } from '@nestjs/common';
import { ContractReceipt, ethers } from 'ethers';

@Injectable()
export class PoolEventService {
  constructor(
    private readonly utils: ContractUtils,
    @Inject(WEBSOCKET_PROVIDER)
    private provider: ethers.providers.WebSocketProvider,
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

  async handlePoolCreated(poolType: string) {}

  // function createWeightedLikePool(event: PoolCreated, poolType: string): string {
  //   let poolAddress: Address = event.params.pool;
  //   let poolContract = WeightedPool.bind(poolAddress);

  //   let poolIdCall = poolContract.try_getPoolId();
  //   let poolId = poolIdCall.value;

  //   let swapFeeCall = poolContract.try_getSwapFeePercentage();
  //   let swapFee = swapFeeCall.value;

  //   let ownerCall = poolContract.try_getOwner();
  //   let owner = ownerCall.value;

  //   let pool = handleNewPool(event, poolId, swapFee);
  //   pool.poolType = poolType;
  //   pool.factory = event.address;
  //   pool.owner = owner;

  //   let vaultContract = Vault.bind(VAULT_ADDRESS);
  //   let tokensCall = vaultContract.try_getPoolTokens(poolId);

  //   if (!tokensCall.reverted) {
  //     let tokens = tokensCall.value.value0;
  //     pool.tokensList = changetype<Bytes[]>(tokens);

  //     for (let i: i32 = 0; i < tokens.length; i++) {
  //       createPoolTokenEntity(poolId.toHexString(), tokens[i]);
  //     }
  //   }
  //   pool.save();

  //   // Load pool with initial weights
  //   updatePoolWeights(poolId.toHexString());

  //   return poolId.toHexString();
  // }

  async handleWeightedPoolCreated(poolAddress: string, info) {
    try {
      console.log('WeightedPoolFactory - PoolCreated');
      const pool = this.utils.getContractInstance(
        poolAddress,
        'WeightedPool',
        true,
      );

      const [poolId, swapFee, name, symbol, block, owner] = await Promise.all([
        pool.getPoolId(),
        pool.getSwapFeePercentage(),
        pool.name(),
        pool.symbol(),
        info.getBlock(),
        pool.getOwner(),
      ]);

      console.log(poolId);

      const data = {
        id: poolId.toString(),
        address: poolAddress,
        owner,
        factory: info.address, // factory who emitted the event
        swapFee: swapFee.toNumber(),
        createdTime: block.timestamp, // block timestamp
        tx: info.transactionHash, // from tx info
        type: 'Weighted',
        name,
        symbol,
      };

      console.log(data);

      console.log(info);

      // Save pool
      //
      // increment vaults pool count
      //
      // Get token data and save token entities vault.getPoolTokens(poolId)
    } catch (error) {
      console.log(error);
    }
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
