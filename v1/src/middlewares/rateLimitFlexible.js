import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 10, // 10 points for each IP
  duration: 1, // 1 second
});

const rateLimitFlexibleMiddleware = async (req, res, next) => {
  try {
    // Points consumption by IP address
    await rateLimiter.consume(req.ip);
    next(); // Rate limit not exceeded, continue request
  } catch (rejRes) {
    // Rate limit exceeded, send error response
    res.status(429).send('Too Many Requests');
  }
};

export default rateLimitFlexibleMiddleware;
