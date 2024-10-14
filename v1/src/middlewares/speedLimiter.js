import { slowDown } from 'express-slow-down'

const speedLimiter = slowDown({
	windowMs: 15 * 60 * 1000, // 15 minutes
	delayAfter: 5, // Allow 5 requests per 15 minutes.
	delayMs: (hits) => hits * 100, // Add 100 ms of delay to every request after the 5th one.
});

// const apiLimiter = slowDown({
// 	windowMs: 15 * 60 * 1000, // 15 minutes
// 	delayAfter: 1, // Allow only one request to go at full-speed.
// 	delayMs: (hits) => hits * hits * 1000, // 2nd request has a 4 second delay, 3rd is 9 seconds, 4th is 16, etc.
// });

export default speedLimiter;