import mongoose from "mongoose";
import logger from '../scripts/logger/Projects.js';

const { Schema } = mongoose;

const ProjectSchema = new Schema({
   name: String,
   // user_id: {
   //    type: mongoose.Types.ObjectId,
   //    ref: 'User'
   // }
}, 
   { 
      timestamps: true,
      versionKey: false
   }
);

ProjectSchema.post("save", (log) => {
   logger.log({
      level: 'info',
      message: log
   });
});

const Projects = mongoose.model('Projects', ProjectSchema);

export default Projects;