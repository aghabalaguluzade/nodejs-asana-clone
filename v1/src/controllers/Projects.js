import httpStatus from 'http-status';
import { insert, list, modify, remove } from '../services/Projects.js';

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
      }).catch(() => {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'A problem occurred during the update.' });
      });
};

const destroy = (req, res) => {
   if (!req.params?.id) return res.status(httpStatus.NOT_FOUND).send({ message: 'ID not found' });

   remove(req.params?.id)
      .then((deleteProject) => {

         if(!deleteProject) return res.status(httpStatus.NOT_FOUND).send({ message : 'Project not found' });

         res.status(httpStatus.OK).send({ message: 'Project deleted.' });
      })
      .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'A problem occurred during the delete.' }));
};

export {
   index,
   store,
   update,
   destroy
};