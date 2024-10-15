import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import toobusy from 'toobusy-js';
import hpp from 'hpp';
import hsts from 'hsts';
import config from './config/index.js';
import { ProjectRoutes, UserRoutes } from './routes/api/index.js';
import loaders from './loaders/index.js';
import shouldCompress from './middlewares/compression.js';
import limiter from './middlewares/rateLimit.js';
import speedLimiter from './middlewares/speedLimiter.js';
import rateLimitFlexibleMiddleware from './middlewares/rateLimitFlexible.js';

config();
loaders();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(rateLimitFlexibleMiddleware);
app.use(speedLimiter);
app.use(limiter);
app.use(hpp());
app.use(compression({
   level: 6,
   threshold: 0,
   filter: shouldCompress
}));
app.use(hsts({
   maxAge: 15552000  // 180 days in seconds
}))
app.use(function (req, res, next) {
   if (toobusy()) {
      res.send(503, 'Server too busy!');
   } else {
      next();
   }
});

app.listen(process.env.APP_PORT, () => {
   console.log('listening on port ' + process.env.APP_PORT);
   app.use("/projects", ProjectRoutes);
   app.use("/users", UserRoutes);
});