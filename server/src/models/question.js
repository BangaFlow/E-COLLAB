import mongoose from 'mongoose'


const questionSchema = new mongoose.Schema({
    question: {

        type: String,
        required: true,

    },
    answers:[{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'answer'

    }
    ],
    note: {
         type:Number
    }
    ,



}, {
    timestamps: true
})
const Question = mongoose.model('question', questionSchema)

export default Question