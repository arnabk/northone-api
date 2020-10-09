import { ISubTask, ISubTaskDocument, ITaskCommon, ITaskSearch } from '@root/types';
import { DataSource } from 'apollo-datasource';
import { ObjectId } from 'mongodb';
import { SubTask as SubTaskDB } from './Mongo';
import taskRequestBuilder from './TaskSearchRequestBuilder';

interface IAddTask extends ITaskCommon {
  taskId: string;
}

const extractObjectFromDoc = (doc?: ISubTaskDocument | null) => ({
  id: doc?._id,
  taskId: doc?.taskId,
  title: doc?.title,
  description: doc?.description,
  status: doc?.status,
  dueDate: doc?.dueDate,
  fileId: doc?.fileId,
}) as ISubTask;

export default class SubTaskDatasource extends DataSource {

  async add(task: IAddTask): Promise<ISubTask> {
    const newSubTask = await new Promise<ISubTask>((resolve, reject) =>
      new SubTaskDB({
        taskId: task?.taskId,
        title: task?.title,
        description: task?.description,
        status: task?.status,
        dueDate: task.dueDate,
        fileId: task.fileId,
      }).save((err, doc) => {
        if (err) {
          reject(err);
        } else {
          resolve(extractObjectFromDoc(doc));
        }
      }),
    );
    return newSubTask;
  }

  async update(task: ISubTask): Promise<void> {
    await new Promise<void>((resolve, reject) =>
      SubTaskDB.updateOne({
        _id: new ObjectId(task?.id),
      }, {
        taskId: task?.taskId,
        title: task?.title,
        description: task?.description,
        status: task?.status,
        dueDate: task?.dueDate,
        fileId: task?.fileId,
      }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }),
    );
  }

  async remove(taskId: string): Promise<void> {
    await new Promise<void>((resolve, reject) =>
      SubTaskDB.deleteOne({
        _id: new ObjectId(taskId),
      }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }),
    );
  }

  async get(taskId: string): Promise<ISubTask> {
    return await new Promise<ISubTask>((resolve, reject) => SubTaskDB.findOne({
      _id: new ObjectId(taskId),
    }, (err, doc) => {
      if (err) {
        reject(err);
      } else {
        resolve(extractObjectFromDoc(doc));
      }
    }))
  }

  async list(searchRequest: ITaskSearch, page: number, size: number): Promise<ISubTask[]> {
    const actualPage = (page || 1) - 1;
    const actualSize = Math.min(50, size || 10);
    const sortField = searchRequest?.sort?.field || 'dueDate';
    const sortDirection = searchRequest?.sort?.direction || 'desc';
    const response = await new Promise<ISubTask[]>((resolve, reject) =>
      SubTaskDB.find(taskRequestBuilder(searchRequest), (err, users) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(
          users?.map(doc => ({
            id: doc?._id,
            taskId: doc?.taskId,
            title: doc?.title,
            description: doc?.description,
            status: doc?.status,
            dueDate: doc?.dueDate,
            fileId: doc?.fileId,
          })) as ISubTask[],
        );
      })
        .sort({
          [sortField]: sortDirection?.toLowerCase() === 'asc' ? 1 : -1,
        })
        .skip(actualPage * actualSize)
        .limit(actualSize),
    );
    return response;
  }

  async total(searchRequest: ITaskSearch): Promise<number> {
    const total = await new Promise<number>((resolve, reject) => {
      SubTaskDB.find(taskRequestBuilder(searchRequest)).countDocuments((err, count) => {
        if (err) {
          reject(err);
        } else {
          resolve(count);
        }
      });
    });
    return total;
  }
}
