import Projects from "../models/Projects.js";

const insert = (projectData) => {
   const project = Projects(projectData);

   return project.save();
};

const list = () => {
   return Projects.find({});
};

export {
   list,
   insert
};