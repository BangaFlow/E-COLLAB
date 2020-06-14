import mongoose from 'mongoose'
import { hash, compare } from 'bcryptjs'

const projectSchema = new mongoose.Schema({
    category:{
        type:String
    },
    title:{
        type:String
    },
    id_category:{
        type:String
    },
    school_year:{
        type:String
    },
    start_date:{
        type:String
    },
    end_date:{
        type:String
    },
    class_involved:{
        type:String
    },
    methodology:{
        type:String
    },
    number_of_teams: {
        type: Number
      },
      number_of_members: {
        type: Number
      },
      number_of_tutors_per_team: {
        type: Number
      },
    tutors_involved:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    learners_involved:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
            
        }],
    subjects:[{
        type: mongoose.Schema.Types.ObjectId,
      ref: "subject"
        
        }],
        auto_generate_teams: {
            type: Boolean,
            default: false
          },
          competence_generate_teams: {
            type: Boolean,
            default: false
          },
          learners_choose_teams: {
            type: Boolean,
            default: false
          },
          choose_date_limit: {
            start_choose_date: {
              type: Date
            },
            end_choose_date: {
              type: Date
            }},

        isvalid:{
        type: Boolean,
        default: false
     },
     
    },  
    {
    timestamps: true
})

const Project = mongoose.model('project', projectSchema)

export default Project