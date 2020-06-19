import mongoose from 'mongoose'


const questionSchema = new mongoose.Schema({
    question: {

        type: String,
        required: true,

    },
    answer:{

        type: String

    },
    optionA:{

        type: String

    },
    optionB:{

        type: String

    },
    optionC:{

        type: String

    },
    optionD:{

        type: String

    },
    note:{
         type:Number
    }
    ,



}, {
    timestamps: true
})
const Question = mongoose.model('question', questionSchema)

export default Question