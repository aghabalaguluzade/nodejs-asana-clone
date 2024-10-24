import httpStatus from "http-status";

class ApiError extends Error {
   constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.message = message;
   };

   static notFound() {
      this.message = 'There is no such record';
      this.statusCode = httpStatus.NOT_FOUND;
   };

};

export default ApiError;