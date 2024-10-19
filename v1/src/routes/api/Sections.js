import express from "express";
import { index, store, update, destroy } from '../../controllers/Sections.js';
import { storeValidation, updateValidation } from '../../validations/Sections.js';
import { validate } from '../../middlewares/validate.js';
import authenticate from '../../middlewares/authenticate.js';

const router = express.Router();

router.route('/:projectId').get(authenticate, index);
router.route('/').post(authenticate, validate(storeValidation), store);
router.route('/:id').patch(authenticate, validate(updateValidation), update);
router.route('/:id').delete(authenticate, destroy);

export default router;