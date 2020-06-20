import mongoose from 'mongoose'
import { project } from '../models'

import { Typeproject } from '../models'


import { User } from '../models'
export default {
    Query: {
        gettype_project: (root, { id }, context, info) => {

            if (!mongoose.Types.ObjectId.isValid(id)) {

            }

            return Typeproject.findById(id)
        },
        gettypes_project: (root, args, context, info) => {

            return Typeproject.find({})

        }
    },

    Mutation: {
       
        add_type_project: (root, args, context, info) => {
            return Typeproject.create(args)
        },
        
        update_type_project: (root, { id, title,description,methodology,Projects }, context, info) => {
            if (!id) return;
            return Typeproject.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    $set: {
                        title: title,
                        description:description,
                        methodology:methodology,
                        Projects:Projects

                    }
                }, { new: true }, (err, project) => {
                    if (err) {
                        console.log('Something went wrong !');
                    } else {
                    }
                }
            );
        },
        delete_type_project :(root, { id }, context, info) => {
           return  Typeproject.findByIdAndRemove(id)
            
         },
         add_project: async (root, args, context, info) => {
            //let u=[];
            let tp = await Typeproject.findById(args.id);
            let p = await project.create(args);

            //u= await User.find({});
            //console.log(u);
            
            //p.learners_involved.push(u.id);
            
            tp.Projects.push(p);
             await Typeproject.findByIdAndUpdate(
                args.id,
                tp,
              { new: true },
              (err, doc) => {
                if (err) {
                  throw new Error("Something wrong !");
                }
              }
            );
            return tp;
          },
      
       
    },

    Typeproject:{
        Projects: async (Typeproject, arg, context, info) => {
            return (await Typeproject.populate("Projects").execPopulate()).Projects;
          }
    
        }


}