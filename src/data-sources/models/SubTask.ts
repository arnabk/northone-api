import { ISubTask } from '@root/types';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const SubTaskSchema = new mongoose.Schema<ISubTask>({
  id: ObjectId,
  taskId: ObjectId,
  title: String,
  description: String,
  status: String,
  dueDate: Date,
  fileId: [String],
});

export default SubTaskSchema;
