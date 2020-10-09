import { logError } from '@root/log';
import { IGraphQLContext } from '@root/types';
import { Context } from 'apollo-server-core';
import { GraphQLResolveInfo } from 'graphql';

export const removeTask = async (
  parent: undefined,
  args: { request: { id: string } },
  { dataSources }: Context<IGraphQLContext>,
  info: GraphQLResolveInfo,
): Promise<Boolean> => {
  try {
    const found = await dataSources.task.get(args.request.id);
    if (!found?.id) throw new Error('Task not found');
    dataSources.task.remove(args.request.id);
    return true;
  } catch (e) {
    logError('Error [removeTask] :', e);
    throw e;
  }
};
