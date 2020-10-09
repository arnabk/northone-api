import { logError } from '@root/log';
import { IGraphQLContext, ISubTask, ITaskCommon } from '@root/types';
import { Context } from 'apollo-server-core';
import { GraphQLResolveInfo } from 'graphql';

interface IArgs extends ITaskCommon {
  taskId: string;
}

export const addSubTask = async (
  parent: undefined,
  args: { request: IArgs },
  { dataSources }: Context<IGraphQLContext>,
  info: GraphQLResolveInfo,
): Promise<ISubTask> => {
  try {
    const addRequest = args.request;
    const taskObject = await dataSources.task.get(addRequest?.taskId);
    if (!taskObject?.id) throw new Error('Task not found!');
    const a = await dataSources.subTask.add(addRequest);
    return a;
  } catch (e) {
    logError('Error [addSubTask] :', e);
    throw e;
  }
};
