import mongoose from 'mongoose'


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
    eventOrganizer: {

        type: String,

    },
    
    Date: {

        type: Date,

    },
    place: {

        type: String,

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