import { IResolvers } from 'graphql-tools';
import query from './query';
import mutation from './mutation';
import subscription from './subscription';
import type from './type';

const resolvers : IResolvers = {
    ...query,
    ...mutation,
    ...subscription,
    ...type
};

export default resolvers;