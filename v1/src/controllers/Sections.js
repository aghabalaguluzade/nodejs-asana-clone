import httpStatus from 'http-status';
import SectionService from '../services/SectionService.js';

const index = (req, res) => {
   if(!req?.params?.projectId) return res.status(httpStatus.NOT_FOUND).send({ error: 'Project not found' });
   SectionService.list({ project_id: req.params.projectId})
      .then((response) => {
         console.log(response);
         res.status(httpStatus.OK).send(response);
      })
      .catch((error) => {
         console.log(error);
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
      })
};

const store = (req, res) => {
   req.body.user_id = req.user;

   SectionService.create(req.body)
      .then((response) => {
         res.status(httpStatus.CREATED).send(response);
      }).catch((error) => {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
      });
};

const update = (req, res) => {
   if (!req.params?.id) return res.status(httpStatus.NOT_FOUND).send({ message: 'ID not found' });

   SectionService.update(req.body, req.params?.id)
      .then(updatedSection => {
         res.status(httpStatus.OK).send(updatedSection);
      }).catch(() => {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'A problem occurred during the update.' });
      });
};

const destroy = (req, res) => {
   if (!req.params?.id) return res.status(httpStatus.NOT_FOUND).send({ message: 'ID not found' });

   SectionService.delete(req.params?.id)
      .then((deleteSection) => {

         if(!deleteSection) return res.status(httpStatus.NOT_FOUND).send({ message : 'Section not found' });

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