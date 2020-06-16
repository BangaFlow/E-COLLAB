import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { Column } from '../models'

export default {
    Query: {
        column: (root, { id }, { req }, info) => {
            // TODO: auth, projection, sanitization

           if (!mongoose.Types.ObjectId.isValid(id)){
                throw new UserInputError(`${id} is not a valid ID.`)
            }
            
            return Column.findById(id)
        },
        columns: (root, arg, { req }, info) => {
            // TODO: auth, projection, pagination
            return Column.find({})
        }
    },
    Mutation: {
        createColumn: async (root, args, context, info) => {
            
            const col = await Column.create(args)
            
            return col
        },
        updateColumn: async (root, args, context, info) => {
            console.log(args)
            const result = await Column.findOneAndUpdate({_id: args._id},
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
        deleteColumn: async (root, arg, { req }, info) => {
            
            const col = await Column.findByIdAndDelete(arg.id)

            return col
        },
    },
    Column: {
        tasks: async (col, arg, context, info) => {
            return (await col.populate('tasks').execPopulate()).tasks
        }
    }
}
