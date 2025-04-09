import Joi from "joi";

const productValidation = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().valid('cat', 'dog', 'bird', 'rabbit', 'goldfish').required(),
    price: Joi.number().required(),
    rating: Joi.number().required(),
    reviews: Joi.number(),
    description: Joi.string().required(),
    image: Joi.string().required(),
})

export default productValidation;
