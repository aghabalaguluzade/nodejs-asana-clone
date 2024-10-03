import CryptoJS from 'crypto-js';

const passwordToHash = (password) => {
   const hashKey = process.env.PASSWORD_HASH;
   return CryptoJS.HmacSHA256(password, CryptoJS.HmacSHA1(password, hashKey).toString()).toString();
};

export {
   passwordToHash
};
