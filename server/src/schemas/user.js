import Joi from 'joi'

const email = Joi.string().regex(/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(esprit)\.tn$/).required().label('Email').options({
    language: {
        string: {
            regex: {
                base: "Your E-mail doesn't have the required domain, esprit.tn."
            }
        }
    }
})

const username = Joi.string().alphanum().min(4).max(30).required().label('Username')

const name = Joi.string().max(254).required().label('Name')

const password = Joi.string().regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/).label('Password').options({
    language: {
        string: {
            regex: {
                base: 'Must have at least one lowercase letter, one uppercase letter, one digit and one special character.'
            }
        }
    }
})

export const signUp = Joi.object().keys({
    email, username, name, password
})

export const signIn = Joi.object().keys({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password')
})