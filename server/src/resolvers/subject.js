import mongoose from 'mongoose'
import { subject } from '../models'
import { step } from '../models'
export default {
    Query: {
        subject: (root, { id }, context, info) => {

            if (!mongoose.Types.ObjectId.isValid(id)) {

            }

            return subject.findById(id)
        },
       subjects: (root, args, context, info) => {

            return subject.find({})

        }
    },

    Mutation: {
        addsubject: (root, args, context, info) => {
            return subject.create(args)


        },
        updatesubject: (root, { id, title,description }, context, info) => {
            if (!id) return;
            return subject.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    $set: {
                        title: title,
                        description:description

                    }
                }, { new: true }, (err, subject) => {
                    if (err) {
                        console.log('Something went wrong !');
                    } else {
                    }
                }
            );
        },
        deletesubject :(root, { id }, context, info) => {
           return  subject.findByIdAndRemove(id)
            
         },
         validatesubject:async (root, { id}, context, info) => {
            return await subject.findOneAndUpdate(
              { _id: id },
              { $set: { isvalid :true} },
              { new: true },
              
            );
          },
         addsubjecttoproject:(root, args, context, info) => {
            return subject.create(args)
        },
        add_phase:(root, {id_phase}, context, info) => {
            return subject.create(args)
        },

        add_task_to_subject: async (root, args, context, info) => {
            
            let st = await step.create(args);
            //let i=subject.id;
            let s = await subject.findById(args.id);
            console.log(args.id);
            //let subject = await Subject.findById(id_subject);
            console.log(st);
            s.Planning.push(st);
             await subject.findByIdAndUpdate(
                args.id,
                s,
              { new: true },
              (err, doc) => {
                if (err) {
                  throw new Error("Something wrong !");
                }
              }
            );
            return s;
          },

         
        


    },

    Subject:{
        Planning: async (subject, arg, context, info) => {
            return (await subject.populate("Planning").execPopulate()).Planning;
          }
        }


}