import Joi from "joi";

const appointmentType = ["Vacation", "Bathing", "Cut and Trim hair", "Food and Supplies", "Party"]

const appointmentValidation = Joi.object({
    type: Joi.string().valid(...appointmentType).required(),
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().email().required(),
    time: Joi.string().required(),
    date: Joi.string().required(),
    message: Joi.string().min(5).max(400).required(),
})

export default appointmentValidation;