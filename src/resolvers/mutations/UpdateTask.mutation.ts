import { logError } from '@root/log';
import { IGraphQLContext, ITask } from '@root/types';
import { Context } from 'apollo-server-core';
import { GraphQLResolveInfo } from 'graphql';

export const updateTask = async (
  parent: undefined,
  args: { request: ITask },
  { dataSources }: Context<IGraphQLContext>,
  info: GraphQLResolveInfo,
): Promise<ITask> => {
  try {
    const updateRequest = args.request;
    const found = await dataSources.task.get(args.request.id);
    if (!found?.id) throw new Error('Task not found');
    await dataSources.task.update(updateRequest);
    return updateRequest;
  } catch (e) {
    logError('Error [updateTask] :', e);
    throw e;
  }
};
