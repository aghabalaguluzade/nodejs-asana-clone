import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
   full_name: String,
   email: String,
   password: String,
   profile_image: String,
},
   {
      timestamps: true,
      versionKey: false
   }
);

const User = mongoose.model('User', UserSchema);

export default User;