import express from 'express';
import ProjectController from '../../controllers/Project.js';
import { storeValidation, updateValidation } from '../../validations/Projects.js';
import { validate } from '../../middlewares/validate.js';
import authenticate from '../../middlewares/authenticate.js';
import idChecker from '../../middlewares/idChecker.js';

const router = express.Router();

router.route('/').get(authenticate, ProjectController.index);
router.route('/').post(authenticate, validate(storeValidation), ProjectController.store);
router.route('/:id').patch(idChecker(), authenticate, validate(updateValidation), ProjectController.update);
router.route('/:id').delete(idChecker(), authenticate, ProjectController.destroy);

export default router;