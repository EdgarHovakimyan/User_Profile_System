const Joi = require('joi');

module.exports.schemaRegister = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    surname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    age: Joi.number()
        .integer()
        .min(0)
        .max(120)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    role: Joi.number()
        .integer()
        .min(0)
        .max(1)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(6)
        .max(10)
        .required(),

    confirmpassword: Joi.ref('password')
        ,
}).with('password', 'confirmpassword');