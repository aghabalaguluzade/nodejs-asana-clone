import mongoose from "mongoose";
import logger from '../scripts/logger/Tasks.js';

const { Schema } = mongoose;

const TaskSchema = new Schema({
   title: {
      type: String,
      required: true,
   },
   description: {
      type: String,
   },
   assigned_To: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
   },
   due_date: {
      type: Date
   },
   statuses: [String],
   section_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Section'
   },
   project_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Projects'
   },
   user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
   },
   order: {
      type: Number
   },
   isCompleted: {
      type: Boolean
   },
   comments: [
      {
         comment: String,
         commentedAt: Date,
         user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
         },
         // likes: [
         //    {
         //       type: mongoose.Types.ObjectId,
         //       ref: 'User'
         //    }
         // ]
      }
   ],
   media: [String],
   sub_tasks: [
      {
         type: mongoose.Types.ObjectId,
         ref: 'Task'
      }
   ]
}, { timestamps: true, versionKey: false }
);

TaskSchema.post("save", (log) => {
   logger.log({
      level: 'info',
      message: `Task document created: ${log}`
   });
});

const Task = mongoose.model('Task', TaskSchema);

export default Task;