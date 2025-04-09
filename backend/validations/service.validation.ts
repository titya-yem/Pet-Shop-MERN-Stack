import Joi from "joi";

const serviceValidation = Joi.object({
    title: Joi.string().min(5).max(255).required().trim(),
    text: Joi.string().min(5).max(255).required().trim(),
    alt: Joi.string().min(5).max(255).required().trim(),
    price: Joi.alternatives().try(Joi.number(), Joi.string()).required().default(0),
    duration: Joi.alternatives().try(Joi.number(), Joi.string()),
})

export default serviceValidation;