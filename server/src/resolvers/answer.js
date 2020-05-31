
import mongoose from 'mongoose'
import { Answer } from '../models'

import User from '../models/user'

export default {

    Query: {
        answer: (root, { id }, context, info) => {

            if (!mongoose.Types.ObjectId.isValid(id)) {

            }

            return Answer.findById(id)
        },
        allAnswers: async (root, args, context, info) => {

            return await Answer.find({})

        }
    },

    Mutation: {
        addAnswer: (root, args, context, info) => {
            //  console.log(dayjs(args.date).format("YYYY-MM-DD"))
            console.log(args)
            return Answer.create(args)


        },
        updateAnswer: (root, args, context, info) => {
            if (!args.id) return;
            return Answer.findOneAndUpdate(
                {
                    _id: args.id
                },
                {
                    $set: {
                        answer: args.answer,
                        correction: args.correction,
                        

                    }
                }, { new: true }, (err, Answer) => {
                    if (err) {
                        console.log('Something went wrong when updating the Answer');
                    } else {
                    }
                }
            );
        },
        deleteAnswer: (root, { id }, context, info) => {
            return Answer.findByIdAndRemove(id)

        },
       
    }

}
