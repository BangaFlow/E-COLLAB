
import mongoose from 'mongoose'
import { Question } from '../models'

import { Quiz } from '../models'


export default {

    Query: {
        quiz: (root, { id }, context, info) => {

            if (!mongoose.Types.ObjectId.isValid(id)) {

            }

            return Quiz.findById(id)
        },
        allQuizzes: async (root, args, context, info) => {

            return await Quiz.find({})

        }
    },

    Mutation: {
        addQuiz: async (root, args, context, info) => {
            return await Quiz.create(args)

        },
        updateQuiz: async (root, args, context, info) => {
            if (!args.id) return;
            return await Quiz.findOneAndUpdate(
                {
                    _id: args.id
                },
                {
                    $set: {
                        label: args.label,
                        
                       
                        

                    }
                }, { new: true }, (err, Answer) => {
                    if (err) {
                        console.log('Something went wrong when updating the Quiz');
                    } else {
                    }
                }
            );
        },
        deleteQuiz: async (root, { id }, context, info) => {
            return await Quiz.findByIdAndRemove(id)

        },

        AssignmentQuestionsToQuiz :async (root,args, context, info) => {
            let quiz= await Quiz.findById(args.id_quiz)
            args.id_questions.forEach(async id_question => {
               
                let question= await Question.findById(id_question)
                console.log(question)
                quiz.questions.push(question)
                console.log(quiz)
                quiz = await Quiz.findByIdAndUpdate(
                    args.id_quiz,
                    quiz,
                    { new: true },
                    (err, doc) => {
                      if (err) {
                        throw new Error("Something wrong while assignOrChangeQuiz!");
                      }
                    }
                  );
             
            });
            

            return await Quiz.findById(args.id_quiz)
            
       }
       
    },
    Quiz: {
        questions: async (quiz, arg, context, info) => {
            return (await quiz.populate("questions").execPopulate()).questions;
        }
    }
}



