const Joi = require("joi");

module.exports = {


  createAccountValidation : request =>{
    const createSchema ={
      type: Joi.string().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().required().email(),
      phoneNumber: Joi.number().required(),
      address: Joi.string().required()
    }
    return Joi.validate(request, createSchema);
  },

  
  signInSchema : request =>{
    const signInSchema ={
        password: Joi.string().required(),
        email: Joi.string().required().email()
    }
    return Joi.validate(request, signInSchema);
  },

  validateBody: schema => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) {
        req.value = {};
      }

      req.value["body"] = result.value;
      next();
    };
  },

  schemas: {
    SignUPSchema: Joi.object().keys({

      type: Joi.string().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().required().email(),
      phoneNumber: Joi.number().required(),
      address: Joi.string().required()

    }),

    signINSchema:  Joi.object().keys({
      password: Joi.string().required(),
      email: Joi.string().required().email()

    }),
    staffSchema: Joi.object().keys({
      phoneNumber: Joi.number().required(),
      address: Joi.string().required()

    })



  
  }
};
