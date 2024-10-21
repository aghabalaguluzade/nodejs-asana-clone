import Tasks from "../models/Tasks.js";

const list = (where) => {
   return Tasks.find(where || {})
      .populate({
         path: 'user_id',
         select: 'full_name email profile_image'
      });
};

const findOne = (where, expand) => {
   if(!expand) return Tasks.findOne(where);
   return Tasks.findOne(where)
      .populate({ path: 'user_id', select: 'full_name email profile_image' })
      .populate({
         path: 'comments.user_id', 
         select: 'full_name email profile_image'
      })
      .populate({ path: 'sub_tasks' })
};

const insert = (data) => {
   const section = Tasks(data);

   return section.save();
};

const modify = (data, id) => {
   return Tasks.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
   return Tasks.findByIdAndDelete(id);
};

export {
   list,
   insert,
   modify,
   remove,
   findOne
};