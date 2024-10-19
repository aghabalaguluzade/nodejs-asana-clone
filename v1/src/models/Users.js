import mongoose from 'mongoose';
import logger from '../scripts/logger/Users.js';

const { Schema } = mongoose;

const UserSchema = new Schema({
   full_name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true,
      min: 8
   },
   profile_image: {
      type: String,
   }
},
   {
      timestamps: true,
      versionKey: false
   }
);

UserSchema.post("save", (log) => {
   logger.log({
      level: 'info',
      message: `User document created: ${log}`
   });
});

UserSchema.post('findOneAndUpdate', (log) => {
   logger.log({
      level: 'info',
      message: `User document updated: ${log}`
   });
});

const User = mongoose.model('User', UserSchema);

export default User;