import Joi from 'joi';

const add = Joi.object({
    body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        quantity: Joi.number().min(0).required(),
        price: Joi.number().min(0).required()
    })
});

export default {add};
