import httpStatus from 'http-status';
import { insert, list, modify, remove, findOne } from '../services/Tasks.js';

const index = (req, res) => {
   if (!req?.params?.projectId) return res.status(httpStatus.NOT_FOUND).send({ error: 'Project not found' });
   list({ project_id: req.params.projectId })
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
      .then(updatedSection => {
         res.status(httpStatus.OK).send(updatedSection);
      }).catch(() => {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'A problem occurred during the update.' });
      });
};

const destroy = (req, res) => {
   if (!req.params?.id) return res.status(httpStatus.NOT_FOUND).send({ message: 'ID not found' });

   remove(req.params?.id)
      .then((deleteSection) => {

         if (!deleteSection) return res.status(httpStatus.NOT_FOUND).send({ message: 'Section not found' });

         res.status(httpStatus.OK).send({ message: 'Project deleted.' });
      })
      .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'A problem occurred during the delete.' }));
};

const sendComment = (req, res) => {
   findOne({ _id: req.params.id })
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
      .catch(() => {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'A problem occurred during the sending message' });
      });
};

const deleteComment = (req, res) => {
   if (!req.params?.id) return res.status(httpStatus.NOT_FOUND).send({ message: 'ID not found' });

   findOne({ _id: req.params.id })
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
      .catch(() => {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'A problem occurred during the operation' });
      });
};

const addSubTask = (req, res) => {
   if (!req.params?.id) return res.status(httpStatus.NOT_FOUND).send({ message: 'ID not found' });

   findOne({ _id: req.params.id })
      .then((mainTask) => {
         if (!mainTask) return res.status(httpStatus.NOT_FOUND).send({ message: 'Not found' });

         req.body.user_id = req.user;

         insert({ ...req.body, user_id: req.user })
            .then((subTask) => {
               mainTask.sub_tasks.push(subTask);

               mainTask.save()
                  .then((subTask) => res.status(httpStatus.OK).send(subTask))
                  .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'A problem occurred during the operation' }));

            }).catch((error) => {
               res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
            });
      })
      .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'A problem occurred during the operation' }));
};

const fetchTask = (req, res) => {
   if (!req.params?.id) return res.status(httpStatus.NOT_FOUND).send({ message: 'ID not found' });

   findOne({ _id: req.params.id }, true)
      .then((task) => {
         if (!task) return res.status(httpStatus.NOT_FOUND).send({ message: 'Not found' });
         res.status(httpStatus.OK).send(task);
      })
      .catch((error) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error));
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