const
  Joi = require('joi'),

  mixins = {
    checkValidation : (data) => {
      const schema = Joi.object({
          content: Joi.string().min(3).required(),
          senderId: Joi.number().required()
          // receiver_id:Joi.number().required()
        }),
        {error} = schema.validate(data)

      if (error) return (error.details.map(d => d.message)).join(',')
      else return true
    }
    
  }
module.exports = mixins
 