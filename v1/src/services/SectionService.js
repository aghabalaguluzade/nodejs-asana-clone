import BaseService from "./BaseService.js";
import BaseModel from '../models/Sections.js';

class SectionService extends BaseService {
   constructor() {
      super(BaseModel);
   }

   list(where) {
      return BaseModel.find(where || {})
         .populate({ path: 'user_id', select: 'full_name email profile_image' });
   }
}

export default new SectionService();