import express from "express";
import { index, store, update, destroy, sendComment, deleteComment, addSubTask, fetchTask } from '../../controllers/Tasks.js';
import { storeValidation, updateValidation, commentValidation } from '../../validations/Tasks.js';
import { validate } from '../../middlewares/validate.js';
import authenticate from '../../middlewares/authenticate.js';
import idChecker from '../../middlewares/idChecker.js';

const router = express.Router();

router.route('/').post(authenticate, validate(storeValidation), store);

router.route('/:id').patch(idChecker(), authenticate, validate(updateValidation), update);
router.route('/:id').delete(idChecker(), authenticate, destroy);
router.route('/:projectId').get(idChecker("projectId"), authenticate, index);

router.route('/:id/make-comment').post(idChecker(), authenticate, validate(commentValidation), sendComment);
router.route('/:id/:commentId').delete(idChecker(), authenticate, deleteComment);

router.route('/:id').get(idChecker(), authenticate, fetchTask);
router.route('/:id/:add-sub-task').post(idChecker(), authenticate, validate(storeValidation), addSubTask);

export default router;