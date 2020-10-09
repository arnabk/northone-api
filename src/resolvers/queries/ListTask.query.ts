import { logError } from '@root/log';
import { IGraphQLContext, ITask, ITaskSearch } from '@root/types';
import { Context } from 'apollo-server-core';

interface IArgs extends ITaskSearch {
  page?: number; size?: number;
}

export const listTask = async (
  parent: undefined,
  args: { request: IArgs; },
  { dataSources }: Context<IGraphQLContext>,
): Promise<{
  task: ITask[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}> => {
  try {
    const page = args?.request?.page || 1;
    const size = args?.request?.size || 10;
    const searchRequest = {
      criteria: args?.request?.criteria,
      sort: args?.request?.sort,
    };
    const tasks = await dataSources.task.list(searchRequest, page, size);
    const total = await dataSources.task.total(searchRequest);
    const totalPages = Math.floor(total / size);
    return {
      task: tasks,
      pageInfo: {
        hasNextPage: page < totalPages,
        hasPreviousPage: page !== 1,
      },
    };
  } catch (e) {
    logError('Error [listTask] :', e);
    throw e;
  }
};

export const totalTask = async (
  parent: undefined,
  args: { request: IArgs; },
  { dataSources }: Context<IGraphQLContext>,
): Promise<number> => {
  try {
    const searchRequest = {
      criteria: args?.request?.criteria,
      sort: args?.request?.sort,
    };
    return await dataSources.task.total(searchRequest);
  } catch (e) {
    logError('Error [totalTask] :', e);
    throw e;
  }
};
