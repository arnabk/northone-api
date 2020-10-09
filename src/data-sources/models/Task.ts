import { ITask } from '@root/types';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema<ITask>({
  id: ObjectId,
  user: String,
  email: String,
  title: String,
  description: String,
  status: String,
  dueDate: Date,
  category: [String],
  fileId: [String],
});

export default TaskSchema;
