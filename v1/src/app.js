import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import toobusy from 'toobusy-js';
import hpp from 'hpp';
import config from './config/index.js';
import loaders from './loaders/index.js';
import events from './scripts/events/index.js';
import fileupload from 'express-fileupload';
import path from 'path';
import { ProjectRoutes, UserRoutes, SectionRoutes, TaskRoutes } from './routes/api/index.js';
import shouldCompress from './middlewares/compression.js';
import limiter from './middlewares/rateLimit.js';
import speedLimiter from './middlewares/speedLimiter.js';
import rateLimitFlexibleMiddleware from './middlewares/rateLimitFlexible.js';

config();
loaders();
events();

const app = express();
const __dirname = path.resolve();

app.use(express.json({ limit: '500kb' }));
app.use(cors());
app.use(helmet({
   hsts: {
      maxAge: 15552000, // 180 days in seconds
      includeSubDomains: true,
      preload: true,
   },
   xPoweredBy: false,
   contentSecurityPolicy: {
      directives: {
         defaultSrc: ["'self'"],
         scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
         styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
         imgSrc: ["'self'", 'data:', 'https://images.example.com'],
         connectSrc: ["'self'"],
         fontSrc: ["'self'", 'https://fonts.gstatic.com'],
         frameAncestors: ["'self'"],
         objectSrc: ["'none'"],
         mediaSrc: ["'self'"]
      }
   },
   xDownloadOptions: false,
   frameguard: {
      action: 'sameorigin'
   },
   crossOriginResourcePolicy: {
      policy: 'cross-origin'
   },
   xssFilter: true,
   crossOriginEmbedderPolicy: true
}));
app.use(helmet.hidePoweredBy());
app.use(rateLimitFlexibleMiddleware);
app.use(speedLimiter);
app.use(limiter);
app.use(hpp());
app.use(compression({
   level: 6,
   threshold: 0,
   filter: shouldCompress
}));
app.use(function (req, res, next) {
   if (toobusy()) {
      res.send(503, 'Server too busy!');
   } else {
      next();
   }
});
app.use(fileupload());
app.use("/uploads", express.static(path.join(__dirname, 'v1/src/uploads')));

app.listen(process.env.APP_PORT, () => {
   console.log('listening on port ' + process.env.APP_PORT);
   app.use("/projects", ProjectRoutes);
   app.use("/users", UserRoutes);
   app.use("/sections", SectionRoutes);
   app.use("/tasks", TaskRoutes);
});