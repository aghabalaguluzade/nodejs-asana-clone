import httpStatus from 'http-status';
import TaskService from '../services/TaskService.js';
import ApiError from '../errors/ApiError.js';

const index = (req, res) => {
   if (!req?.params?.projectId) return res.status(httpStatus.NOT_FOUND).send({ error: 'Project not found' });
   TaskService.list({ project_id: req.params.projectId })
      .then((response) => {
         res.status(httpStatus.OK).send(response);
      })
      .catch((e) => next(new ApiError(e?.message)));
};

const store = (req, res) => {
   req.body.user_id = req.user;

   TaskService.create(req.body)
      .then((response) => {
         res.status(httpStatus.CREATED).send(response);
      })
      .catch((e) => next(new ApiError(e?.message)));
};

const update = (req, res) => {
   if (!req.params?.id) return res.status(httpStatus.NOT_FOUND).send({ message: 'ID not found' });

   TaskService.update(req.body, req.params?.id)
      .then(updatedTasks => {
         if (!updatedTasks) return next(new ApiError('No such record exists', httpStatus.NOT_FOUND));
         res.status(httpStatus.OK).send(updatedTasks);
      })
      .catch((e) => next(new ApiError(e?.message)));
};

const destroy = (req, res) => {
   if (!req.params?.id) return res.status(httpStatus.NOT_FOUND).send({ message: 'ID not found' });

   TaskService.delete(req.params?.id)
      .then((deleteTask) => {
         if (!deleteTask) return next(new ApiError('No such record exists', httpStatus.NOT_FOUND));

         res.status(httpStatus.OK).send({ message: 'Project deleted.' });
      })
      .catch((e) => next(new ApiError(e?.message)));
};

const sendComment = (req, res) => {
   TaskService.findOne({ _id: req.params.id })
      .then((mainTask) => {
         if (!mainTask) return res.status(httpStatus.NOT_FOUND).send({ message: 'Not found' });
         const comment = {
            ...req.body,
            commentedAt: new Date(),
            user_id: req.user
         };

         mainTask.comments.push(comment);
         mainTask.save()
            .then((sendComment) => res.status(httpStatus.OK).send(sendComment))
            .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' }));
      })
      .catch((e) => next(new ApiError(e?.message)));
};

const deleteComment = (req, res) => {
   if (!req.params?.id) return res.status(httpStatus.NOT_FOUND).send({ message: 'ID not found' });

   TaskService.findOne({ _id: req.params.id })
      .then((mainTask) => {
         if (!mainTask) return res.status(httpStatus.NOT_FOUND).send({ message: 'Not found' });
         const commentId = req.params.commentId;
         const commentIndex = mainTask.comments.findIndex(comment => comment._id.toString() === commentId);
         if (commentIndex === -1) return res.status(httpStatus.NOT_FOUND).send({ message: 'Comment not found' });

         mainTask.comments.splice(commentIndex, 1);

         mainTask.save()
            .then(() => res.status(httpStatus.OK).send({ message: 'Comment deleted successfully' }))
            .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' }));
      })
      .catch((e) => next(new ApiError(e?.message)));
};

const addSubTask = (req, res) => {
   if (!req.params?.id) return res.status(httpStatus.NOT_FOUND).send({ message: 'ID not found' });

   TaskService.findOne({ _id: req.params.id })
      .then((mainTask) => {
         if (!mainTask) return res.status(httpStatus.NOT_FOUND).send({ message: 'Not found' });

         req.body.user_id = req.user;

         TaskService.create({ ...req.body, user_id: req.user })
            .then((subTask) => {
               mainTask.sub_tasks.push(subTask);

               mainTask.save()
                  .then((subTask) => res.status(httpStatus.OK).send(subTask))
                  .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'A problem occurred during the operation' }));

            }).catch((error) => {
               res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
            });
      })
      .catch((e) => next(new ApiError(e?.message)));
};

const fetchTask = (req, res) => {
   if (!req.params?.id) return res.status(httpStatus.NOT_FOUND).send({ message: 'ID not found' });

   TaskService.findOne({ _id: req.params.id }, true)
      .then((task) => {
         if (!task) return res.status(httpStatus.NOT_FOUND).send({ message: 'Not found' });
         res.status(httpStatus.OK).send(task);
      })
      .catch((e) => next(new ApiError(e?.message)));
};

export {
   index,
   store,
   update,
   destroy,
   sendComment,
   deleteComment,
   addSubTask,
   fetchTask
};