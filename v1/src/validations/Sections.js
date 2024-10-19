import Joi from "joi";

const storeValidation = Joi.object({
   name: Joi.string().required().min(5),
   project_id: Joi.string().required().min(8)
});

const updateValidation = Joi.object({
   name: Joi.string().min(5),
   project_id: Joi.string().min(8)
});

export {
   storeValidation,
   updateValidation
};