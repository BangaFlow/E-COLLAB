import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { Task } from '../models'

export default {
    Query: {
        task: (root, { id }, { req }, info) => {
            // TODO: auth, projection, sanitization

           if (!mongoose.Types.ObjectId.isValid(id)){
                throw new UserInputError(`${id} is not a valid ID.`)
            }
            
            return Task.findById(id)
        }
    },
    Mutation: {
        createTask: async (root, args, context, info) => {
            
            console.log(args.doers)
            const task = await Task.create(args)
            
            return task
        },
        updateTask: async (root, args, context, info) => {
            console.log(args)
            const result = await Task.findOneAndUpdate({_id: args._id},
                { $set: args },
                { runValidators: true},
                (err, doc) => {
                    if (err) {
                        console.log(err.message)
                    }
                    console.log(doc)
                })

            return result
        },
        deleteTask: async (root, arg, { req }, info) => {
            
            const task = await Task.findByIdAndDelete(arg.id)

            return task
        },
    },
    Task: {
        doers: async (task, arg, context, info) => {
            return (await task.populate('doers').execPopulate()).doers
        }
    }
}
