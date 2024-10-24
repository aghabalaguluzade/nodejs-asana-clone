import express from 'express';
import UserController from '../../controllers/User.js';
import { storeValidation, loginValidation, ressetPasswordValidation, updateValidation, changePasswordValidation } from '../../validations/Users.js';
import { validate } from '../../middlewares/validate.js';
import authenticate from '../../middlewares/authenticate.js';
import idChecker from '../../middlewares/idChecker.js';

const router = express.Router();

router.get('/', UserController.index);
router.route('/').post(validate(storeValidation), UserController.store);
router.route('/').patch(authenticate, validate(updateValidation), UserController.update);

router.route('/:id').delete(idChecker(), authenticate, UserController.destroy);

router.route('/login').post(validate(loginValidation), UserController.login);
router.route('/projects').get(authenticate, UserController.projectList);
router.route('/reset-password').post(validate(ressetPasswordValidation), UserController.resetPassword);
router.route('/change-password').post(authenticate, validate(changePasswordValidation), UserController.changePassword);
router.route('/update-profile-image').post(authenticate, UserController.updateProfileImage);

export default router;