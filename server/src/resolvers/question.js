
import mongoose from 'mongoose'
import { Question } from '../models'

import { Answer } from '../models'


export default {

    Query: {
        question: (root, { id }, context, info) => {

            if (!mongoose.Types.ObjectId.isValid(id)) {

            }

            return Question.findById(id)
        },
        allQuestions: async (root, args, context, info) => {

            return await Question.find({})

        }
    },

    Mutation: {
        addQuestion: (root, args, context, info) => {
            return Question.create(args)


        },
        updateQuestion: (root, args, context, info) => {
            if (!args.id) return;
            return Question.findOneAndUpdate(
                {
                    _id: args.id
                },
                {
                    $set: {
                        question: args.question,
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
        deleteQuestion: (root, { id }, context, info) => {
            return Question.findByIdAndRemove(id)

        },

        AssignmentAnswersToQuestion :async (root,args, context, info) => {
            let question= await Question.findById(args.id_question)
            args.id_answers.forEach(async id_answer => {
               
                let answer= await Answer.findById(id_answer)
                
                question.answers.push(answer)
                console.log(question)
                question = await Question.findByIdAndUpdate(
                    args.id_question,
                    question,
                    { new: true },
                    (err, doc) => {
                      if (err) {
                        throw new Error("Something wrong while assignOrChangeQuestion!");
                      }
                    }
                  );
             
            });
            

            return Question.findById(args.id_question)
            
       }
       
    },
    Question: {
        answers: async (question, arg, context, info) => {
            return (await question.populate("answers").execPopulate()).answers;
        }
    }
}



