import { MONGO_DB, MONGO_ENDPOINT } from '@root/common/Constants';
import { logError, logInfo } from '@root/log';
import { ISubTaskDocument, ITaskDocument } from '@root/types';
import mongoose from 'mongoose';
import TaskModel from './models/Task';

mongoose.connect(MONGO_ENDPOINT, {
  dbName: MONGO_DB,
  appname: 'northone-api',
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const Task = mongoose.model<ITaskDocument>('Task', TaskModel);
export const SubTask = mongoose.model<ISubTaskDocument>('SubTask', TaskModel);

mongoose.connection.on('error', () => logError('MongoDB connection error'));
mongoose.connection.once('open', () => {
  logInfo(`🚀 Connected to MongoDB`);
});

export default mongoose.connection;
