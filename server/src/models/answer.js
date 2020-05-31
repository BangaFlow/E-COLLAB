import mongoose from 'mongoose'


const answerSchema = new mongoose.Schema({
    answer: {

        type: String,
        required: true,

    },
    correction: {

        type: Boolean,
        required: true,
    },



}, {
    timestamps: true
})
const Answer = mongoose.model('answer', answerSchema)

export default Answer