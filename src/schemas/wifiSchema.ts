import Joi from "joi";

const wifiSchema = Joi.object({
    label:Joi.string().required(),
    name:Joi.string().required(),
    password:Joi.string().required()
});

export default wifiSchema;


