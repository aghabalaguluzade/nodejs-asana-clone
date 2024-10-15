import httpStatus from 'http-status';
import { insert, list, modify } from '../services/Projects.js';

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
   req.body.user_id = req.user;

   insert(req.body)
      .then((response) => {
         res.status(httpStatus.CREATED).send(response);
      }).catch((error) => {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
      });
};

const update = (req, res) => {
   if (!req.params?.id) return res.status(httpStatus.NOT_FOUND).send({ message: 'ID not found' });

   modify(req.body, req.params?.id)
      .then(updatedProject => {
         res.status(httpStatus.OK).send(updatedProject);
      }).catch(err => {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'A problem occurred during the update.' });
      });
};

export {
   index,
   store,
   update
};