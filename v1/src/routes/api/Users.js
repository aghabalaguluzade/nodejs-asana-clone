import express from 'express';
import { index, store, login } from '../../controllers/Users.js';
import { storeValidation, loginValidation } from '../../validations/Users.js';
import { validate } from '../../middlewares/validate.js';

const router = express.Router();

router.get('/', index);
router.route('/').post(validate(storeValidation), store);
router.route('/login').post(validate(loginValidation), login);

export default router;