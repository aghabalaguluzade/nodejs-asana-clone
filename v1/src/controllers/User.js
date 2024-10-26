import httpStatus from 'http-status';
import UserService from '../services/UserService.js';
import ProjectService from '../services/ProjectService.js';
import { generateAccessToken, generateRefreshToken, passwordToHash } from '../scripts/utils/helper.js';
import { v4 as uuidv4 } from 'uuid';
import eventEmitter from '../scripts/events/eventEmitter.js';
import path from 'path'
import ApiError from '../errors/ApiError.js';

const __dirname = path.resolve();

class User {
   index(req, res) {
      UserService.list()
         .then((response) => {
            res.status(httpStatus.OK).send(response);
         })
         .catch((e) => next(new ApiError(e?.message)));
   }

   store(req, res) {
      req.body.password = passwordToHash(req.body.password);

      UserService.create(req.body)
         .then((response) => {
            res.status(httpStatus.CREATED).send(response);
         })
         .catch((e) => next(new ApiError(e?.message)));
   }

   login(req, res) {
      req.body.password = passwordToHash(req.body.password);
      UserService.findOne(req.body)
         .then((user) => {
            if (!user) return res.status(httpStatus.NOT_FOUND).send({ message: "User not found" });

            user = {
               ...user.toObject(),
               tokens: {
                  access_token: generateAccessToken(user),
                  refresh_token: generateRefreshToken(user)
               }
            };

            delete user.password;

            res.status(httpStatus.CREATED).send(user);
         })
         .catch((e) => next(new ApiError(e?.message)));
   }

   projectList(req, res) {
      ProjectService.list({ user_id: req.user?._id })
         .then((projects) => {
            res.status(httpStatus.OK).send(projects);
         })
         .catch((e) => next(new ApiError(e?.message)));
   }

   resetPassword(req, res) {
      const new_password = uuidv4()?.split('-')[0] || `user-${new Date().getTime()}`;

      UserService.updateWhere({ email: req.body.email }, { password: passwordToHash(new_password) })
         .then((updatedUser) => {
            if (!updatedUser) return res.status(httpStatus.NOT_FOUND).send({ error: 'User not found' });
            eventEmitter.emit('send_email', {
               to: updatedUser.email,
               subject: "Reset Password",
               text: "Hello world?",
               html: `Your password reset has been completed upon your request.. <br /> Don't forget to change your password after logging in.!</br> Your new password : ${new_password}`,
            });

            res.status(httpStatus.OK).send({ message: 'The necessary information for password reset has been sent to your registered e-mail address.' });
         })
         .catch((e) => next(new ApiError(e?.message)));
   }

   update(req, res) {
      UserService.update(req.user?._id, req.body)
         .then((updatedUser) => {
            if (!updatedUser) return next(new ApiError('No such record exists', httpStatus.NOT_FOUND));
            res.status(httpStatus.OK).send(updatedUser)
         })
         .catch((e) => next(new ApiError(e?.message)));
   }

   changePassword(req, res) {
      // After the UI arrives, rules for password comparisons will be available here
      req.body.password = passwordToHash(req.body.password);

      UserService.update(req.user?.id, req.body)
         .then((changePassword) => res.status(httpStatus.OK).send(changePassword))
         .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Invalid password' }));
   }

   destroy(req, res) {
      if (!req.params?.id) return res.status(httpStatus.NOT_FOUND).send({ message: 'ID not found' });

      UserService.delete(req.params?.id)
         .then((deleteUser) => {
            if (!deleteUser) return next(new ApiError('No such record exists', httpStatus.NOT_FOUND));

            res.status(httpStatus.OK).send({ message: 'User deleted.' });
         })
         .catch((e) => next(new ApiError(e?.message)));
   }

   updateProfileImage(req, res) {
      // Image control
      if (!req?.files?.profile_image) return res.status(httpStatus.NOT_FOUND).send({ error: 'Profile image not found' });


      // Upload operations 
      const extension = path.extname(req?.files?.profile_image?.name);
      const fileName = `${req?.user._id}${extension}`;
      const folderPath = path.join(__dirname, '/v1/src/uploads/users', fileName);

      req.files.profile_image.mv(folderPath, (err) => {
         if (err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: err });
         UserService.update(req.user._id, { profile_image: fileName })
            .then((updatedUser) => res.status(httpStatus.OK).send(updatedUser))
            .catch((e) => next(new ApiError(e?.message)));
      });
   }
}

export default new User();