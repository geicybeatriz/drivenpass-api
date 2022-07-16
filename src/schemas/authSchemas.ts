import Joi from "joi";

const signUpSchema = Joi.object({
    name:Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required(),
    confirm_password:Joi.ref('password')
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