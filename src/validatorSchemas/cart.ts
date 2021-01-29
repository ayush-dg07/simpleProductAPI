import Joi from 'joi';

const add = Joi.object({
    body: Joi.object({
        product: Joi.object({
            _id: Joi.string().required(),
            name: Joi.string().required(),
            description: Joi.string().required(),
            quantity: Joi.number().min(0).required(),
            price: Joi.number().min(0).required()
        })
    })
});

const update = Joi.object({
    body: Joi.object({
        _id: Joi.string().required(),
        quantity: Joi.number().min(0).required()
    })
});

export default {add, update};