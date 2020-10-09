import TaskDatasource from '@root/data-sources/TaskDatasource';
import SubTaskDatasource from '@root/data-sources/SubTaskDatasource';
import { Request, Response } from 'express';
import { Document } from 'mongoose';

export interface IApplicationError extends Error {
  status?: number;
  syscall?: string;
  code?: string;
}

export interface IDataSources {
  task: TaskDatasource;
  subTask: SubTaskDatasource;
}

export interface IGraphQLContext {
  req: Request;
  res: Response;
  dataSources: IDataSources;
}

export interface ITaskCommon {
  title: string;
  description: string;
  status: string;
  dueDate: Date;
  fileId: string[];
}

export interface ISubTask extends ITaskCommon {
  id: string;
  taskId: string;
}

export interface ISubTaskDocument extends Document, ITaskCommon {
  taskId: string;
}

export type ISearchField = 'title' | 'description' | 'status' | 'dueDate' | 'category';

export interface ITaskSearch {
  criteria: {
    field: ISearchField;
    value: string;
  }[];
  sort: {
    field: ISearchField;
    direction: 'asc' | 'desc'
  }
}

export interface IUser {
  user: string;
  email: string;
}

export interface ITask extends ITaskCommon, IUser {
  category: string[];
  id: string;
}

export interface ITaskDocument extends Document, ITaskCommon, IUser {
  category: string[];
}
