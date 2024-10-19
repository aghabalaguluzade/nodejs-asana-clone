import Sections from "../models/Sections.js";

const list = (where) => {
   return Sections.find(where || {})
      .populate({
         path: 'user_id',
         select: 'full_name email profile_image'
      })
      .populate({
         path: 'project_id',
         select: 'name'
      });
};

const insert = (data) => {
   const section = Sections(data);

   return section.save();
};

const modify = (data, id) => {
   return Sections.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
   return Sections.findByIdAndDelete(id);
};

export {
   list,
   insert,
   modify,
   remove
};