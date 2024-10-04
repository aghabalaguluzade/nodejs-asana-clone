import CryptoJS from 'crypto-js';
import JWT from 'jsonwebtoken';

const passwordToHash = (password) => {
   const hashKey = process.env.PASSWORD_HASH;
   return CryptoJS.HmacSHA256(password, CryptoJS.HmacSHA1(password, hashKey).toString()).toString();
};

const generateAccessToken = (user) => {
   return JWT.sign({ email: user.email, ...user }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: "1w" });
};

const generateRefreshToken = (user) => {
   return JWT.sign({ email: user.email, ...user }, process.env.REFRESH_TOKEN_SECRET_KEY);
};

export {
   passwordToHash,
   generateAccessToken,
   generateRefreshToken
};