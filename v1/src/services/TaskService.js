import BaseService from "./BaseService.js";
import BaseModel from '../models/Tasks.js';

class TaskService extends BaseService {
   constructor() {
      super(BaseModel);
   }

   list = (where) => {
      return this.BaseModel.find(where || {})
         .populate({
            path: 'user_id',
            select: 'full_name email profile_image'
         });
   };

   findOne(where, expand) {
      if(!expand) return this.BaseModel.findOne(where);
      return this.BaseModel.findOne(where)
         .populate({ path: 'user_id', select: 'full_name email profile_image' })
         .populate({
            path: 'comments.user_id', 
            select: 'full_name email profile_image'
         })
         .populate({ path: 'sub_tasks' })
   };
};

export default new TaskService();