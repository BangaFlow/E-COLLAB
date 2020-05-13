import Joi from 'joi'
import mongoose from 'mongoose'
import randomBytes from 'randombytes'
import nodemailer from 'nodemailer'
import { promisify } from 'util'
import { UserInputError } from 'apollo-server-express'
import { signUp, signIn } from '../schemas'
import { User, Role } from '../models'
import { attemptSignIn, signOut} from '../auth'
import getProfileInfo from '../helpers/GoogleAuth'

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
        google: async (root, { code }, { req }, info) => {
            
            const profile = await getProfileInfo(code)
            console.log(profile)
            const args = {
                googleId: profile.sub,
                name: profile.name,
                username: profile.given_name,
                email: profile.email,
            }

            const user = await User.findOne({googleId: args.googleId})
            
            if(user) {
            req.session.userId = user.id
            
            return user
            } else {
            const user = await User.create(args)
            req.session.userId = user.id

            return user
            }
        },
        updateMe: async (root, arg, { req }, info) => {

            // await Joi.validate(arg, signUp, { abortEarly: false })
            
            // const user = await User.findOneAndUpdate({_id: new mongoose.Types.ObjectId(req.session.userId)}, { $set: arg }, (err, doc) => {
            //     if (err) {
            //         console.log("Something wrong when updating data!");
            //     }
            //     console.log(doc);
            // })
            console.log(typeof req.session.userId)
            const user = await User.find({_id: (req.session.userId).toString() })

            return user
        },
        createUser: async (root, args, context, info) => {
            
            // console.log(args.roles)
            const user = await User.create(args)
            
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

            if (!user) throw new Error('No user found with that email.')

            // Create randomBytes that will be used as a token
            const randomBytesPromisified = promisify(randomBytes)
            const resetToken = (await randomBytesPromisified(8)).toString('hex')
            const resetTokenExpiry = Date.now() + 300000 // 5 minutes from now

            // console.log(randomBytesPromisified)
            // console.log(resetToken)
            // console.log(new Date(resetTokenExpiry).toString())

            const result = await User.updateOne({email}, { resetToken, resetTokenExpiry })

            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'khaled.saidi@esprit.tn',
                  pass: 'Esprit12-*'
                }
              })

            const resMail = await transport.sendMail({
                from: 'khaled.saidi@esprit.tn',
                to: user.email,
                subject: 'Your Password Reset Token',
                text: `Hi ${user.name}\nPlease click on the following link http://localhost:3000/change-password/${resetToken} to reset your password.\nIf you did not request this, please ignore this email and your password will remain unchanged.`
              })

            return true
        },
        resetPassword: async (root, { password, confirmPassword, resetToken }, {req}, info) => {

            // check if passwords match
            if (password !== confirmPassword) throw new Error(`Your passwords don't match`)


            // find the user with that resetToken
            // make sure it's not expired
            const current = Date.now()
            const user = await User.findOne({ resetToken, resetTokenExpiry: {$gte: current}})

            // throw error if user doesn't exist
            if (!user) throw new Error('Your password reset token is either invalid or expired.')

            const result = await User.findOneAndUpdate({email: user.email},
                                                { password, resetToken: null, resetTokenExpiry: null },
                                                {new: true},
                                                (err, doc) => {
                                                    if (err) {
                                                        console.log("Something wrong when updating data!")
                                                    }
                                                    console.log(doc)
                                                })
            req.session.userId = result.id
            return result
      }
    },
    User: {
        roles: async (user, arg, context, info) => {
            return (await user.populate('roles').execPopulate()).roles
        }
    }
}
