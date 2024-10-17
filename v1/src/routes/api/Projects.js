import express from 'express';
import { index, store, update, destroy } from '../../controllers/Projects.js';
import { storeValidation, updateValidation } from '../../validations/Projects.js';
import { validate } from '../../middlewares/validate.js';
import authenticate from '../../middlewares/authenticate.js';

const router = express.Router();

router.route('/').get(authenticate, index);
router.route('/').post(authenticate, validate(storeValidation), store);
router.route('/:id').patch(authenticate, validate(updateValidation), update);
router.route('/:id').delete(authenticate, destroy);

export default router;