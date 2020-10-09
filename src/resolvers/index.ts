import * as ListTaskQuery from './queries/ListTask.query';
import * as AddTaskMutation from './mutations/AddTask.mutation';
import * as RemoveTaskMutation from './mutations/RemoveTask.mutation';
import * as UpdatetaskMutation from './mutations/UpdateTask.mutation';
import * as ListSubTaskQuery from './queries/ListSubTask.query';
import * as AddSubTaskMutation from './mutations/AddSubTask.mutation';
import * as RemoveSubTaskMutation from './mutations/RemoveSubTask.mutation';
import * as UpdateSubtaskMutation from './mutations/UpdateSubTask.mutation';


export default {
  Mutation: {
    ...AddTaskMutation,
    ...RemoveTaskMutation,
    ...UpdatetaskMutation,
    ...AddSubTaskMutation,
    ...RemoveSubTaskMutation,
    ...UpdateSubtaskMutation,
  },
  Query: {
    ...ListTaskQuery,
    ...ListSubTaskQuery,
  },
};
