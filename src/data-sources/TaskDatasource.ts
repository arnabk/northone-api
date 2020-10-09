import { ITask, ITaskCommon, ITaskDocument, ITaskSearch, IUser } from '@root/types';
import { DataSource } from 'apollo-datasource';
import { ObjectId } from 'mongodb';
import { Task as TaskDB } from './Mongo';
import taskRequestBuilder from './TaskSearchRequestBuilder';

interface IAddTask extends ITaskCommon, IUser {
  category: string[];
}

const extractObjectFromDoc = (doc?: ITaskDocument | null) => ({
  id: doc?._id,
  title: doc?.title,
  description: doc?.description,
  status: doc?.status,
  dueDate: doc?.dueDate,
  category: doc?.category,
  fileId: doc?.fileId,
  email: doc?.email,
  user: doc?.user,
}) as ITask;

export default class TaskDatasource extends DataSource {

  async add(task: IAddTask): Promise<ITask> {
    const newTask = await new Promise<ITask>((resolve, reject) =>
      new TaskDB({
        title: task?.title,
        description: task?.description,
        status: task?.status,
        dueDate: task.dueDate,
        category: task.category,
        fileId: task.fileId,
        email: task.email,
        user: task.user,
      }).save((err, doc) => {
        if (err) {
          reject(err);
        } else {
          resolve(extractObjectFromDoc(doc));
        }
      }),
    );
    return newTask;
  }

  async update(task: ITask): Promise<void> {
    return await new Promise<void>((resolve, reject) =>
      TaskDB.updateOne({
        _id: new ObjectId(task?.id),
      }, {
        title: task?.title,
        description: task?.description,
        status: task?.status,
        dueDate: task?.dueDate,
        category: task?.category,
        fileId: task?.fileId,
        email: task?.email,
        user: task?.user,
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
      TaskDB.deleteOne({
        _id: new ObjectId(taskId),
      }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    );
  }

  async get(taskId: string): Promise<ITask> {
    return await new Promise<ITask>((resolve, reject) => TaskDB.findOne({
      _id: new ObjectId(taskId),
    }, (err, doc) => {
      if (err) {
        reject(err);
      } else {
        resolve(extractObjectFromDoc(doc));
      }
    }))
  }

  async list(searchRequest: ITaskSearch, page: number, size: number): Promise<ITask[]> {
    const actualPage = (page || 1) - 1;
    const actualSize = Math.min(50, size || 10);
    const sortField = searchRequest?.sort?.field || 'dueDate';
    const sortDirection = searchRequest?.sort?.direction || 'desc';
    const response = await new Promise<ITask[]>((resolve, reject) =>
      TaskDB.find(taskRequestBuilder(searchRequest), (err, foundDocs) => {
        if (err) {
          reject(err);
        } else {
          resolve(
            foundDocs?.map(doc => ({
              id: doc?._id,
              title: doc?.title,
              description: doc?.description,
              status: doc?.status,
              dueDate: doc?.dueDate,
              category: doc?.category,
              fileId: doc?.fileId,
              user: doc?.user,
              email: doc?.email,
            })) as ITask[],
          );
        }
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
      TaskDB.find(taskRequestBuilder(searchRequest)).countDocuments((err, count) => {
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
