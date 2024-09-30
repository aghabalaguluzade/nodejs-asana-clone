import mongoose from "mongoose";

import { Schema } from "mongoose";

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

const Projects = mongoose.model('Projects', ProjectSchema);

export default Projects;