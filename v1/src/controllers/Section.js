import httpStatus from 'http-status';
import SectionService from '../services/SectionService.js';
import ApiError from '../errors/ApiError.js';

class Section {
   index(req, res) {
      if (!req?.params?.projectId) return res.status(httpStatus.NOT_FOUND).send({ error: 'Project not found' });
      SectionService.list({ project_id: req.params.projectId })
         .then((response) => {
            res.status(httpStatus.OK).send(response);
         })
         .catch((e) => next(new ApiError(e?.message)));
   }

   store(req, res) {
      req.body.user_id = req.user;

      SectionService.create(req.body)
         .then((response) => {
            res.status(httpStatus.CREATED).send(response);
         })
         .catch((e) => next(new ApiError(e?.message)));
   }

   update(req, res) {
      if (!req.params?.id) return res.status(httpStatus.NOT_FOUND).send({ message: 'ID not found' });

      SectionService.update(req.body, req.params?.id)
         .then(updatedSection => {
            if (!updatedSection) return next(new ApiError('No such record exists', httpStatus.NOT_FOUND));

            res.status(httpStatus.OK).send(updatedSection);
         })
         .catch((e) => next(new ApiError(e?.message)));
   }

   destroy(req, res) {
      if (!req.params?.id) return res.status(httpStatus.NOT_FOUND).send({ message: 'ID not found' });

      SectionService.delete(req.params?.id)
         .then((deleteSection) => {

            if (!deleteSection) return next(new ApiError('No such record exists', httpStatus.NOT_FOUND));

            res.status(httpStatus.OK).send({ message: 'Project deleted.' });
         })
         .catch((e) => next(new ApiError(e?.message)));
   }
}

export default new Section();