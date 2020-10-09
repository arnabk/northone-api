import { IDataSources } from '@root/types';
import TaskDatasource from './TaskDatasource';
import SubTaskDatasource from './SubTaskDatasource';

const dataSources: IDataSources = {
  task: new TaskDatasource(),
  subTask: new SubTaskDatasource(),
};

export default dataSources;
