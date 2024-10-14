import Joi from "joi";

const storeValidation = Joi.object({
   name: Joi.string().required().min(5)
});

export {
   storeValidation
};