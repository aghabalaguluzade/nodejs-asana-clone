import httpStatus from 'http-status';
import { insert, list, loginUser, modifyPassword } from '../services/Users.js';
import * as projectService from '../services/Projects.js';
import { generateAccessToken, generateRefreshToken, passwordToHash } from '../scripts/utils/helper.js';
import { v4 as uuidv4 } from 'uuid';
import eventEmitter from '../scripts/events/eventEmitter.js';

const index = (req, res) => {
   list()
      .then((response) => {
         res.status(httpStatus.OK).send(response);
      })
      .catch((error) => {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
      })
};

const store = (req, res) => {
   req.body.password = passwordToHash(req.body.password);

   insert(req.body)
      .then((response) => {
         res.status(httpStatus.CREATED).send(response);
      }).catch((error) => {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
      });
};

const login = (req, res) => {
   req.body.password = passwordToHash(req.body.password);
   loginUser(req.body)
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
      .catch((error) => {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
      });
};

const projectList = (req, res) => {
   projectService.list({ user_id: req.user?._id })
      .then((projects) => {
         res.status(httpStatus.OK).send(projects);
      })
      .catch(() => {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'An unexpected error occurred while fetching projects' });
      });
};

const resetPassword = (req, res) => {
   const new_password = uuidv4()?.split('-')[0] || `user-${new Date().getTime()}`;

   modifyPassword({ email: req.body.email }, { password: passwordToHash(new_password) })
      .then((updatedUser) => {
         if (!updatedUser) return res.status(httpStatus.NOT_FOUND).send({ error: 'User not found' });
         eventEmitter.emit('send_email', {
            to: updatedUser.email,
            subject: "Reset Password",
            text: "Hello world?",
            html: `Your password reset has been completed upon your request.. <br /> Don't forget to change your password after logging in.!</br> Your new password : ${ new_password }`,
         });

         res.status(httpStatus.OK).send({ message: 'The necessary information for password reset has been sent to your registered e-mail address.' });
      })
      .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'An error occurred while resetting the password.' }))
};

const update = (req, res) => {
   modifyPassword({ _id: req.user?._id }, req.body)
      .then((updatedUser) => res.status(httpStatus.OK).send(updatedUser))
      .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'An error occurred during the update process' }));
};

export {
   index,
   store,
   login,
   projectList,
   resetPassword,
   update
};