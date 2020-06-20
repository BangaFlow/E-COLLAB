import mongoose from 'mongoose'
import { hash, compare } from 'bcryptjs'

const subjectSchema = new mongoose.Schema({
   
    title:{
        type:String
    },
    description:{
        type:String
    },
    isvalid:{
        type:Boolean
    },
    Planning:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "step"
        
    }]
    }, 
    {
    timestamps: true
})

const Subject = mongoose.model('subject', subjectSchema)

export default Subject