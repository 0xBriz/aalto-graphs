import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: [join(__dirname, '/schema/**/**/*.graphql')],
  path: join(__dirname, 'types.ts'),
  outputAs: 'class',
});
