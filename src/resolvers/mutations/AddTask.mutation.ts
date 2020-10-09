import { logError } from '@root/log';
import { IGraphQLContext, ITask, ITaskCommon, IUser } from '@root/types';
import { Context } from 'apollo-server-core';
import { GraphQLResolveInfo } from 'graphql';

interface IArgs extends ITaskCommon, IUser {
  category: string[];
}

export const addTask = async (
  parent: undefined,
  args: { request: IArgs },
  { dataSources }: Context<IGraphQLContext>,
  info: GraphQLResolveInfo,
): Promise<ITask> => {
  try {
    const addRequest = args.request;
    return dataSources.task.add(addRequest);
  } catch (e) {
    logError('Error [addTask] :', e);
    throw e;
  }
};
