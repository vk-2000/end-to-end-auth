const joi = require('joi');

module.exports = {
    login: joi.object({
        username: joi
            .string()
            .required(),

        password: joi
            .string()
            .min(8)
            .max(18)
            .required()
    }),

    validateToken: joi.string().required()
};
