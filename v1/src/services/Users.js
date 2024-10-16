import Users from "../models/Users.js";

const insert = (data) => {
   const user = Users(data);

   return user.save();
};

const list = () => {
   return Users.find({});
};

const loginUser = (user) => {
   return Users.findOne(user);
};

const modifyPassword = (where, data) => {
   return Users.findOneAndUpdate(where, data, { new: true });
};

export {
   list,
   insert,
   loginUser,
   modifyPassword
};