const Joi = require('joi')

const validate = async (user) => {

    const JoiSchema = Joi.object({

        First_Name: Joi.string()
            .min(5)
            .max(30)
            .required(),
        Last_Name: Joi.string()
            .min(5)
            .max(30)
            .required(),

        Email: Joi.string()
            .email()
            .min(5)
            .max(50)
            .optional(),
        Role: Joi.string()
            .valid('user')
            .valid('admin')
            .optional(),
        Department: Joi.string()
            // .valid('user')
            // .valid('admin')
            .optional(),
        Password: Joi.string()
            .min(5)
            .max(50)
            .optional(),

    }).options({ abortEarly: false });

    return JoiSchema.validate(user)

}

module.exports = validate;