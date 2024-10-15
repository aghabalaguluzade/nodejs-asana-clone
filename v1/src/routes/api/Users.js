import express from 'express';
import { index, store, login, projectList } from '../../controllers/Users.js';
import { storeValidation, loginValidation } from '../../validations/Users.js';
import { validate } from '../../middlewares/validate.js';
import authenticate from '../../middlewares/authenticate.js';

const router = express.Router();

router.get('/', index);
router.route('/').post(validate(storeValidation), store);
router.route('/login').post(validate(loginValidation), login);
router.route('/projects').get(authenticate ,projectList);

export default router;