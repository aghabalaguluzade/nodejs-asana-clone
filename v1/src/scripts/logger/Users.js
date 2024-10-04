import winston from 'winston';

const logger = winston.createLogger({
   level: 'info',
   format: winston.format.json(),
   defaultMeta: { service: 'user-service' },
   transports: [
      new winston.transports.File({ filename: 'v1/src/logs/users/error.log', level: 'error', maxsize: 1073741824, maxFiles: 2, zippedArchive: true, }),
      new winston.transports.File({ filename: 'v1/src/logs/users/info.log', level: 'info', maxsize: 1073741824, maxFiles: 2, zippedArchive: true, }),
      new winston.transports.File({ filename: 'v1/src/logs/users/combined.log', maxsize: 1073741824, maxFiles: 2, zippedArchive: true, })
   ],
});

export default logger;