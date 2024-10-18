import express from 'express';
import { index, store, login, projectList, resetPassword, update, destroy, changePassword, updateProfileImage } from '../../controllers/Users.js';
import { storeValidation, loginValidation, ressetPasswordValidation, updateValidation, changePasswordValidation } from '../../validations/Users.js';
import { validate } from '../../middlewares/validate.js';
import authenticate from '../../middlewares/authenticate.js';

const router = express.Router();

router.get('/', index);
router.route('/').post(validate(storeValidation), store);
router.route('/').patch(authenticate, validate(updateValidation), update);
router.route('/:id').delete(authenticate, destroy);
router.route('/login').post(validate(loginValidation), login);
router.route('/projects').get(authenticate ,projectList);
router.route('/reset-password').post(validate(ressetPasswordValidation), resetPassword);
router.route('/change-password').post(authenticate, validate(changePasswordValidation), changePassword);
router.route('/update-profile-image').post(authenticate, updateProfileImage);
// validate(updateProfileImageValidation)
export default router;