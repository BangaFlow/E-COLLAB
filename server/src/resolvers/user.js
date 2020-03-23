import Joi from 'joi'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { signUp, signIn } from '../schemas'
import { User } from '../models'
import { attemptSignIn, signOut} from '../auth'

export default {
    Query: {
        me: (root, arg, { req }, info) => {
            // TODO: projection
            return User.findById(req.session.userId)
        },
        users: (root, arg, { req }, info) => {
            // TODO: auth, projection, pagination
            return User.find({})
        },
        user: (root, { id }, { req }, info) => {
            // TODO: auth, projection, sanitization

           if (!mongoose.Types.ObjectId.isValid(id)){
                throw new UserInputError(`${id} is not a valid ID.`)
            }
            
            return User.findById(id)
        }
    },
    Mutation: {
        signUp: async (root, arg, { req }, info) => { 
            // TODO: not auth

            await Joi.validate(arg, signUp, { abortEarly: false })

            const user = await User.create(arg)

            req.session.userId = user.id

            return user
        },
        signIn: async (root, arg, { req }, info) => {

            await Joi.validate(arg, signIn, { abortEarly: false })

            const user = await attemptSignIn(arg.email, arg.password)

            req.session.userId = user.id

            return user
        },
        signOut: (root, arg, { req, res }, info) => {

            return signOut(req, res)
        }
    }
}