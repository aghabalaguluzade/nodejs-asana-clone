import express from "express";
import SectionController from '../../controllers/Section.js';
import { storeValidation, updateValidation } from '../../validations/Sections.js';
import { validate } from '../../middlewares/validate.js';
import authenticate from '../../middlewares/authenticate.js';

const router = express.Router();

router.route('/:projectId').get(authenticate, SectionController.index);
router.route('/').post(authenticate, validate(storeValidation), SectionController.store);
router.route('/:id').patch(authenticate, validate(updateValidation), SectionController.update);
router.route('/:id').delete(authenticate, SectionController.destroy);

export default router;