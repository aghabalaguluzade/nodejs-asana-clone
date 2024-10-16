import Joi from "joi";

const storeValidation = Joi.object({
   full_name: Joi.string().required().min(3),
   email: Joi.string().email().required().min(8),
   password: Joi.string().required().min(8),
});

const updateValidation = Joi.object({
   full_name: Joi.string().min(3),
   email: Joi.string().email().min(8)
});

const loginValidation = Joi.object({
   email: Joi.string().email().required().min(8),
   password: Joi.string().required().min(8),
});

const ressetPasswordValidation = Joi.object({
   email: Joi.string().email().required().min(8)
});

export {
   storeValidation,
   loginValidation,
   ressetPasswordValidation,
   updateValidation
};