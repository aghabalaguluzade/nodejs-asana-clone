import express from "express";
import { index, store, update, destroy, sendComment, deleteComment, addSubTask, fetchTask } from '../../controllers/Tasks.js';
import { storeValidation, updateValidation, commentValidation } from '../../validations/Tasks.js';
import { validate } from '../../middlewares/validate.js';
import authenticate from '../../middlewares/authenticate.js';

const router = express.Router();

router.route('/').post(authenticate, validate(storeValidation), store);
router.route('/:id').patch(authenticate, validate(updateValidation), update);
router.route('/:id').delete(authenticate, destroy);
router.route('/:projectId').get(authenticate, index);

router.route('/:id/make-comment').post(authenticate, validate(commentValidation), sendComment);
router.route('/:id/:commentId').delete(authenticate, deleteComment);

router.route('/:id').get(authenticate, fetchTask);
router.route('/:id/:add-sub-task').post(authenticate, validate(storeValidation), addSubTask);

export default router;