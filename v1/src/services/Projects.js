import Projects from "../models/Projects.js";

const list = (where) => {
   return Projects.find(where || {}).populate({
      path: 'user_id',
      select: 'full_name email profile_image'
   });
};

const insert = (data) => {
   const project = Projects(data);

   return project.save();
};

const modify = (data, id) => {
   return Projects.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
   return Projects.findByIdAndDelete(id);
};

export {
   list,
   insert,
   modify,
   remove
};