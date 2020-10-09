import { logError } from '@root/log';
import { IGraphQLContext, ISubTask } from '@root/types';
import { Context } from 'apollo-server-core';
import { GraphQLResolveInfo } from 'graphql';

export const updateSubTask = async (
  parent: undefined,
  args: { request: ISubTask },
  { dataSources }: Context<IGraphQLContext>,
  info: GraphQLResolveInfo,
): Promise<ISubTask> => {
  try {
    const updateRequest = args.request;
    const found = await dataSources.subTask.get(args.request.id);
    if (!found?.id) throw new Error('SubTask not found');
    await dataSources.subTask.update(updateRequest);
    return updateRequest;
  } catch (e) {
    logError('Error [updateSubTask] :', e);
    throw e;
  }
};
