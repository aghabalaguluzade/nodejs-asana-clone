import mongoose from "mongoose";
import logger from '../scripts/logger/Sections.js';

const { Schema } = mongoose;

const SectionSchema = new Schema({
   name: {
      type: String,
      required: true,
   },
   user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
   },
   project_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Projects',
   },
   order: {
      type: Number,
   }
},
   { 
      timestamps: true,
      versionKey: false
   }
);

SectionSchema.post("save", (log) => {
   logger.log({
      level: 'info',
      message: `Section document created: ${log}`
   });
});

const Section = mongoose.model('Section', SectionSchema);

export default Section;