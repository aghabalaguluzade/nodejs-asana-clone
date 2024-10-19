import winston from 'winston';

const logger = winston.createLogger({
   level: 'info',
   format: winston.format.json(),
   defaultMeta: { service: 'section-service' },
   transports: [
      new winston.transports.File({ filename: 'v1/src/logs/sections/error.log', level: 'error', maxsize: 1073741824, maxFiles: 2, zippedArchive: true, }),
      new winston.transports.File({ filename: 'v1/src/logs/sections/info.log', level: 'info', maxsize: 1073741824, maxFiles: 2, zippedArchive: true, }),
      new winston.transports.File({ filename: 'v1/src/logs/sections/combined.log', maxsize: 1073741824, maxFiles: 2, zippedArchive: true, })
   ],
});

export default logger;