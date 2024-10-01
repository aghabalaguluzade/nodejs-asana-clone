import express from 'express';
import { index, store } from '../../controllers/Projects.js';
import { storeValidation } from '../../validations/Projects.js';
import { validate } from '../../middlewares/validate.js';

const router = express.Router();

router.get('/', index);
router
   .route('/')
   .post(validate(storeValidation), store);

export default router;