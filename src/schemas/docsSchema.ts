import Joi from "joi";

const docsSchema = Joi.object({
    number:Joi.string().required(),
    fullname: Joi.string().required(),
    createdAt: Joi.string().required(),
    expirationDate: Joi.string().required(),
    entity: Joi.string().required(),
    type: Joi.string().valid("RG", "CNH").required()
});

export default docsSchema;