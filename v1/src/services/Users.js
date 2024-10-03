import Users from "../models/Users.js";

const insert = (data) => {
   const project = Users(data);

   return project.save();
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