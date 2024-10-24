import httpStatus from "http-status";
import ApiError from "../errors/ApiError.js";

const idChecker = (field) => (req, res, next) => {
   const idField = field || "id";

   if(!req?.params[idField]?.match(/^[0-9a-fA-F]{24}$/)) {
      next(new ApiError('Lütfen geçerli bir ID bilgisi giriniz'), httpStatus.BAD_REQUEST);
      return;
   }
   next();
};

export default idChecker;