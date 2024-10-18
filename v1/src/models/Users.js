import mongoose from 'mongoose';
import logger from '../scripts/logger/Users.js';

const { Schema } = mongoose;

const UserSchema = new Schema({
   full_name: String,
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
   profile_image: String,
},
   {
      timestamps: true,
      versionKey: false
   }
);

UserSchema.post("save", (log) => {
   logger.log({
      level: 'info',
      message: log
   });
});

const User = mongoose.model('User', UserSchema);

export default User;