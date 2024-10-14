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

export {
   list,
   insert,
   loginUser
};