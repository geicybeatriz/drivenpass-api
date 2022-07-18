import Joi from "joi";

const cardSchema = Joi.object({
    label:Joi.string().required(),
    number:Joi.string().required(),
    name: Joi.string().required(),
    password:Joi.string().required(),
    securityCode: Joi.string().max(3).required(),
    expirationDate:Joi.string().required(),
    type: Joi.string().valid("débito", "credito", "credito_debito").required(), 
    isVirtual:Joi.boolean().required()

});

export default cardSchema;