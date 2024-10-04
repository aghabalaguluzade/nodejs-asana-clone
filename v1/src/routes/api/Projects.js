import express from 'express';
import { index, store } from '../../controllers/Projects.js';
import { storeValidation } from '../../validations/Projects.js';
import { validate } from '../../middlewares/validate.js';
import authenticate from '../../middlewares/authenticate.js';

const router = express.Router();

router.route('/').get(authenticate, index);
router.route('/').post(authenticate, validate(storeValidation), store);

export default router;