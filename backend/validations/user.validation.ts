import Joi from "joi";

const userValidation = Joi.object({
    userName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(50).required(),
    role: Joi.string().valid("admin", "user").default("user").optional(),
    isActive: Joi.boolean().default(false).optional(), // Check if deleted or not
})

export default userValidation;