import mongoose from 'mongoose'
import { hash, compare } from 'bcryptjs'

const StepSchema = new mongoose.Schema({
   
    start_date : {
        type: String
    },
    end_date : {
        type: String
    },
    description : {
        type : String
    },
    goal :{
        type : String
    },},
    {
    timestamps: true
})

const Step = mongoose.model('step', StepSchema)

export default Step

//module.exports = Subject = mongoose.model('subject', subjectSchema);

