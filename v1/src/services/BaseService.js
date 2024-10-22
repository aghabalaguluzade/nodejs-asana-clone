
class BaseService {
   BaseModel = null;
   
   constructor(model) {
      this.BaseModel = model;
   }

   list(where) {
      return this.BaseModel?.find(where || {});
   }
   create(data) {
      return new this.BaseModel(data);
   }
   findOne(where) {
      return this.BaseModel.findOne(where);
   }
   update(data, id) {
      return this.BaseModel.findByIdAndUpdate(id, data, { new: true });
   }
   updateWhere(where, data) {
      return this.BaseModel.findOneAndUpdate(where, data, { new: true });
   }
   findOne(where) {
      return this.BaseModel.findOne(where);
   }
   delete(id) {
      return this.BaseModel.findByIdAndDelete(id);
   }
};

export default BaseService;