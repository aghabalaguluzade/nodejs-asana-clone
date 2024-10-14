import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
   windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
   limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
   legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
   max: 100, // limit each IP to 100 requests per windowMs for APIs
   message: 'You have exceeded the 100 requests in 24 hrs limit!', // the message when they exceed limit
   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export default limiter;