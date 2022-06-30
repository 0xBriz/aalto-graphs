import { Query, Resolver } from '@nestjs/graphql';
import { Vault } from 'oxbriz/graphql';

@Resolver(() => Vault)
export class VaultResolver {
  constructor() {}

  @Query(() => Vault)
  async getVault() {
    return null;
  }
}
