import Projects from "../models/Projects.js";

const insert = (data) => {
   const project = Projects(data);

   return project.save();
};

const list = () => {
   return Projects.find({});
};

export {
   list,
   insert
};