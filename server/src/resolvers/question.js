
import mongoose from 'mongoose'
import { Question } from '../models'
import { Quiz } from '../models'




export default {

    Query: {
        question:async (root, { id }, context, info) => {

            if (!mongoose.Types.ObjectId.isValid(id)) {

            }

            return await Question.findById(id)
        },
        allQuestions: async (root, args, context, info) => {

            return await Question.find({})

        }
    },

    Mutation: {
        addQuestion: async (root, args, context, info) => {
            const question= await Question.create(args)
            let quiz= await Quiz.findById(args.id)
           
            quiz.questions.push(question)
            console.log(question.id)
            quiz = await Quiz.findByIdAndUpdate(
                args.id,
                quiz,
                { new: true },
                (err, doc) => {
                  if (err) {
                    throw new Error("Something wrong while assignOrChangeQuiz!");
                  }
                }
              );


            return question


        },
        updateQuestion: async (root, args, context, info) => {
            if (!args.id) return;
            return await Question.findOneAndUpdate(
                {
                    _id: args.id
                },
                {
                    $set: {
                        question: args.question,
                        optionA : args.optionA,
                        optionB : args.optionB,
                        optionC :args.optionC,
                        optionD : args.optionD,
                        answer  : args.answer,
                        note:args.note
                       
                        

                    }
                }, { new: true }, (err, Answer) => {
                    if (err) {
                        console.log('Something went wrong when updating the Answer');
                    } else {
                    }
                }
            );
        },
        deleteQuestion: async (root, { id }, context, info) => {
            

             return await Question.findByIdAndRemove(id)

        },

       
    },
   
}



