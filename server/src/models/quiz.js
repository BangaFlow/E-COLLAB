import mongoose from 'mongoose'


const quizSchema = new mongoose.Schema({
    label:{

        type:String

    }
    ,
    questions: [{

        type:
            mongoose.Schema.Types.ObjectId,
        ref: 'question'

    }
    ],
    skill: {

        type:
            mongoose.Schema.Types.ObjectId,
        ref: 'Skill'

    }




}, {
    timestamps: true
})
const Quiz = mongoose.model('quiz', quizSchema)

export default Quiz