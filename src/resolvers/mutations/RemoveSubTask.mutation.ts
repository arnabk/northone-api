import { logError } from '@root/log';
import { IGraphQLContext } from '@root/types';
import { Context } from 'apollo-server-core';
import { GraphQLResolveInfo } from 'graphql';

export const removeSubTask = async (
  parent: undefined,
  args: { request: { id: string } },
  { dataSources }: Context<IGraphQLContext>,
  info: GraphQLResolveInfo,
): Promise<Boolean> => {
  try {
    const found = await dataSources.subTask.get(args.request.id);
    if (!found?.id) throw new Error('SubTask not found');
    dataSources.subTask.remove(args.request.id);
    return true;
  } catch (e) {
    logError('Error [removeSubTask] :', e);
    throw e;
  }
};
