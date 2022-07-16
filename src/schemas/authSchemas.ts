import Joi from "joi";

const signUpSchema = Joi.object({
    name:Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()
});

const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()
});


const authSchemas = {
    signUpSchema,
    signInSchema
}

export default authSchemas;