import User from "../models/Projects.js";

const insert = (data) => {
   const project = User(data);

   return project.save();
};

const list = () => {
   return User.find({});
};

export {
   list,
   insert
};