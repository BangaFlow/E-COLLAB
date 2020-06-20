import Joi from 'joi'

const title = Joi.string().email().required().label('Title')

