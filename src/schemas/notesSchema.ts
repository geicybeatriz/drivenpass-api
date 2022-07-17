import Joi from "joi";

const notesSchemas = Joi.object({
    label: Joi.string().max(50).required(),
    notes: Joi.string().max(1000).required()
});

export default notesSchemas;