import Users from "../models/Users.js";

const insert = (data) => {
   const user = Users(data);

   return user.save();
};

const list = () => {
   return Users.find({});
};

const loginUser = (user) => {
   return Users.findOne(user);
};

const modify = (where, data) => {
   return Users.findOneAndUpdate(where, data, { new: true });
};

const remove = (id) => {
   return Users.findByIdAndDelete(id);
}

export {
   list,
   insert,
   loginUser,
   modify,
   remove
};