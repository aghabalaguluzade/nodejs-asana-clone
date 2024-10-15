import httpStatus from "http-status";
import JWT from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
   const token = req.headers?.authorization?.split(' ')[1] || null;
   
   if(!token) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'Invalid token' });

   JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
      if(err) return res.status(httpStatus.FORBIDDEN).send({ error: 'Token expired' });
      
      req.user = user?._doc;
      next();
   });
};

export default authenticateToken;