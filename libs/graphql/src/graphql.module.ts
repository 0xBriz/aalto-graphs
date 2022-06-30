import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { EthersBigNumberScalar } from './scalars';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // debug: false,
      playground: true,
      autoSchemaFile: join(__dirname, 'schema.gql'),
      // resolvers: {
      //   EthersBigBumber: EthersBigNumberScalar,
      // },
    }),
  ],
  exports: [GraphQLModule],
})
export class GraphqlModule {}
