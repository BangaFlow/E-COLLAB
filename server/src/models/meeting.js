import mongoose from 'mongoose'


const meetingSchema = new mongoose.Schema({
    subject: {

        type: String,

    },
    group: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    startTime: {
        type: Date,
        required: true,

    },
    endTime: {
        type: Date,
        required: true,

    },

}, {
    timestamps: true
})
const Meeting = mongoose.model('meeting', meetingSchema)

export default Meeting