import mongoose from 'mongoose'
import { hash, compare } from 'bcryptjs'

const TypeprojectSchema = new mongoose.Schema({
   
    title:{
        type:String
    },
    description:{
        type:String
    },
    methodology:{
        type:String
    },
    Projects:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "project"
          
    }]
    }, 
    {
    timestamps: true
})

const Typeproject = mongoose.model('Typeproject', TypeprojectSchema)

export default Typeproject

//module.exports = Subject = mongoose.model('subject', subjectSchema);
