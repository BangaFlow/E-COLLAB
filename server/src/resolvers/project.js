import mongoose from 'mongoose'
import { project } from '../models'
import { User } from '../models'
import { subject } from '../models'

//import  Subject  from '../models/subject'
export default {
    Query: {
        getproject: (root, { id }, context, info) => {

            if (!mongoose.Types.ObjectId.isValid(id)) {

            }

            return project.findById(id)
        },
        getprojects: (root, args, context, info) => {

            return project.find({})

        }
    },

    Mutation: {
       
        addproject: (root, args, context, info) => {
            return project.create(args)
        },
        
        updateproject: (root, { id, title,category,school_year,start_date,end_date,class_involved,methodology,number_of_teams,number_of_members,number_of_tutors_per_team,tutors_involved,learners_involved,subjects,auto_generate_teams,
          competence_generate_teams,
          learners_choose_teams,
          start_choose_date,
    end_choose_date }, context, info) => {
            if (!id) return;
            return project.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    $set: {
                        title: title,
                        category:category,
                        school_year:school_year,
                        start_date:start_date,
                        end_date:end_date,
                        class_involved:class_involved,
                        methodology: methodology,
                        number_of_teams:number_of_teams,
                        number_of_members:number_of_members,
                        number_of_tutors_per_team: number_of_tutors_per_team,
                        tutors_involved:tutors_involved,
                        learners_involved:learners_involved,
                        subjects:subjects,
                        competence_generate_teams:competence_generate_teams,
                        learners_choose_teams:learners_choose_teams,
                        start_choose_date:start_choose_date,
                        end_choose_date:end_choose_date

                    }
                }, { new: true }, (err, project) => {
                    if (err) {
                        console.log('Something went wrong !');
                    } else {
                    }
                }
            );
        },
        deleteproject :(root, { id }, context, info) => {
           return  project.findByIdAndRemove(id)
            
         },
         add_tutors_to_project: async (root, {  id,id_tutor }, context, info) => {
            let p = await project.findById(id);
            let tutor = await User.findById(id_tutor);
            p.tutors_involved.push(tutor);
             await project.findByIdAndUpdate(
                id,
                p,
              { new: true },
              (err, doc) => {
                if (err) {
                  throw new Error("Something wrong !");
                }
              }
            );
            return p;
          },
          add_learners_to_project: async (root, {  id,id_learner }, context, info) => {
            let p = await project.findById(id);
            let learner = await User.findById(id_learner);
            p.learners_involved.push(learner);
             await project.findByIdAndUpdate(
                id,
                p,
              { new: true },
              (err, doc) => {
                if (err) {
                  throw new Error("Something wrong !");
                }
              }
            );
            return p;
          },

          add_subjects_to_project: async (root, args, context, info) => {
            
            let s = await subject.create(args);
            //let i=subject.id;
            let p = await project.findById(args.id);
            console.log(args.id);
            //let subject = await Subject.findById(id_subject);
            console.log(s);
            p.subjects.push(s);
             await project.findByIdAndUpdate(
                args.id,
                p,
              { new: true },
              (err, doc) => {
                if (err) {
                  throw new Error("Something wrong !");
                }
              }
            );
            return p;
          },

         /* add_s_to_p: async(root, args, context, info)=>{
             //subject.create(args);

            let p = await project.findById(args.id);
            //let subject = await Subject.findById(id_subject);
            p.subjects.push(subject.create(args));
             await project.findByIdAndUpdate(
                id,
                p,
              { new: true },
              (err, doc) => {
                if (err) {
                  throw new Error("Something wrong !");
                }
              }
            );
            return p;



          }*/
         
       
    },

    Project:{
        tutors_involved: async (project, arg, context, info) => {
            return (await project.populate("tutors_involved").execPopulate()).tutors_involved;
          },
          learners_involved: async (project, arg, context, info) => {
            return (await project.populate("learners_involved").execPopulate()).learners_involved;
          },
          subjects: async (project, arg, context, info) => {
            return (await project.populate("subjects").execPopulate()).subjects;
          },
    
        }


}