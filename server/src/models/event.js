import mongoose from 'mongoose'
import { hash, compare } from 'bcryptjs'

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,

    },
    eventType: {
        type: String,



    },
    description: {
        type: String,


    },
    date: {
        type: Date,


    },
    startTime: {
        type: Date,


    },
    endTime: {
        type: Date,


    },
    participants: [{
        type:
            mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    ],



}, {
    timestamps: true
})
const Event = mongoose.model('event', eventSchema)

export default Event