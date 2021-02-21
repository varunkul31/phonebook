const Joi=require('joi');

const addContactValidation=(data)=>
{
    let schema=Joi.object().keys({
        email:Joi.string()
        .trim()
        .lowercase()
        .email({ minDomainAtoms: 2 })
        .regex(config.CONSTANT.REGEX.EMAIL)
        .required(),
        name:Joi.string.required(),
        phoneNumber:Joi.string().length(10).optional()
    })
    return schema.validate(data)
}

const updateContactValidation=(data)=>{
    let schema=Joi.object().keys({
        contact_id:Joi.string().required(),
        email:Joi.string()
        .trim()
        .lowercase()
        .email({ minDomainAtoms: 2 })
        .regex(config.CONSTANT.REGEX.EMAIL)
        .optional(),
        name:Joi.string().optional(),
        phoneNumber:Joi.string().length(10).optional()
    })
    return schema.validate(data)
}

module.exports={
    addContactValidation,
    updateContactValidation
}



