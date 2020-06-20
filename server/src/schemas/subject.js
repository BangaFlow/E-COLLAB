import Joi from 'joi'

const title = Joi.string().required().label('Title')

const tasks = Joi.string().required().label('tasks')

