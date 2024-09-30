import express from 'express';
import helmet from 'helmet';
import config from './config/index.js';
import { ProjectRoutes } from './routes/api/index.js';
import loaders from './loaders/index.js';

config();
loaders();

const app = express();

app.use(express.json());
app.use(helmet());

app.listen(process.env.APP_PORT, () => {
   console.log('listening on port ' + process.env.APP_PORT);
   app.use("/projects", ProjectRoutes);
});