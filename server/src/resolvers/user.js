import Joi from 'joi'
import mongoose from 'mongoose'
import randomBytes from 'randombytes'
import nodemailer from 'nodemailer'
import { promisify } from 'util'
import { UserInputError } from 'apollo-server-express'
import { signUp, signIn } from '../schemas'
import { User, Role } from '../models'
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
        updateMe: async (root, arg, { req }, info) => {

            // await Joi.validate(arg, signUp, { abortEarly: false })
            
            const user = await User.findByIdAndUpdate(req.session.userId, { $set: arg })

            return user
        },
        deleteUser: async (root, arg, { req }, info) => {
            
            const user = await User.findByIdAndDelete(arg.id)

            return user
        },
        signIn: async (root, arg, { req }, info) => {

            await Joi.validate(arg, signIn, { abortEarly: false })

            const user = await attemptSignIn(arg.email, arg.password)

            const roles = await Role.findById(user.roles[0])

            req.session.userId = user.id
            req.session.roles = roles

            return user
        },
        signOut: (root, arg, { req, res }, info) => {

            return signOut(req, res)
        },
        requestReset: async (root, { email }, { req }, info) => {
            
            email = email.toLowerCase()

            // Check that user exists.
            const user = await User.findOne({ email: email})

            console.log(user)

            if (!user) throw new Error('No user found with that email.')

            // Create randomBytes that will be used as a token
            const randomBytesPromisified = promisify(randomBytes)
            const resetToken = (await randomBytesPromisified(8)).toString('hex')
            const resetTokenExpiry = Date.now() + 3600000 // 1 hour from now

            // console.log(randomBytesPromisified)
            // console.log(resetToken)
            // console.log(new Date(resetTokenExpiry).toString())

            const result = await User.updateOne({email}, { resetToken, resetTokenExpiry })

            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'khaled.saidi@esprit.tn',
                  pass: '*********'
                }
              })

            const resMail = await transport.sendMail({
                from: 'khaled.saidi@esprit.tn',
                to: user.email,
                subject: 'Your Password Reset Token',
                html: `<h1>Welcome</h1> <p>Here is your token: ${resetToken}</p>`
              })

            return true

        }
    },
    User: {
        roles: async (user, arg, context, info) => {
            return (await user.populate('roles').execPopulate()).roles
        }
    }
}
