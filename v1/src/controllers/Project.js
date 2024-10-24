import httpStatus from 'http-status';
import ProjectService from '../services/ProjectService.js';
import ApiError from '../errors/ApiError.js';

class Project {

   index(req, res) {
      ProjectService.list()
         .then((response) => {
            res.status(httpStatus.OK).send(response);
         })
         .catch((error) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
         })
   }

   store(req, res) {
      req.body.user_id = req.user;
   
      ProjectService.create(req.body)
         .then((response) => {
            res.status(httpStatus.CREATED).send(response);
         }).catch((error) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
         });
   }

   update (req, res, next) {
      if (!req.params?.id) return res.status(httpStatus.NOT_FOUND).send({ message: 'ID not found' });
   
      ProjectService.update(req.body, req.params?.id)
         .then(updatedProject => {
            if(!updatedProject) return next(new ApiError('No such record exists', httpStatus.NOT_FOUND));
            res.status(httpStatus.OK).send(updatedProject);
         })
         .catch((e) => next(new ApiError(e?.message)));
   }

   destroy(req, res) {
      if (!req.params?.id) return res.status(httpStatus.NOT_FOUND).send({ message: 'ID not found' });
   
      ProjectService.delete(req.params?.id)
         .then((deleteProject) => {
   
            if(!deleteProject) return res.status(httpStatus.NOT_FOUND).send({ message : 'Project not found' });
   
            res.status(httpStatus.OK).send({ message: 'Project deleted.' });
         })
         .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'A problem occurred during the delete.' }));
   }

}

export default new Project();