import BaseService from "./BaseService.js";
import BaseModel from '../models/Users.js';

class UserService extends BaseService {
   constructor() {
      super(BaseModel);
   }
}

export default new UserService();