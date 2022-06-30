import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { GraphQLScalarType, Kind } from 'graphql';

export const EthersBigNumberScalar = new GraphQLScalarType({
  name: 'EthersBigNumber',
  description: 'Ethers BigNumber scalar type',
  // outgoing, convert to JSON compatible
  serialize: (value: BigNumber) => {
    return value.toString();
  },
  // incoming, convert to backend representation
  parseValue: (value) => {
    if (!BigNumber.isBigNumber(value)) {
      throw new Error('Invalid BigNumber');
    }

    return value.toString();
  },
  // when coming in as hard coded argument of a query
  parseLiteral: (ast) => {
    if (ast.kind === Kind.INT) {
      return BigNumber.from(String(ast)).toString();
    } else if (ast.kind === Kind.FLOAT) {
      return parseUnits(String(ast)).toString();
    }
  },
});
