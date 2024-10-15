import httpStatus from 'http-status';
import { insert, list, loginUser } from '../services/Users.js';
import * as projectService from '../services/Projects.js';
import { generateAccessToken, generateRefreshToken, passwordToHash } from '../scripts/utils/helper.js';

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
      .catch((error) => {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'An unexpected error occurred while fetching projects' });
      });

};

export {
   index,
   store,
   login,
   projectList
};