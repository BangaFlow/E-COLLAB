import mongoose from 'mongoose'


const eventSchema = new mongoose.Schema({
    eventName: {

        type: String,
        required: true,

    },
    eventType: {

        type: String,

    },
    keyWords: {

        type: [String],

    },
    description: {

        type: String,

    },
    eventCreator: {

        type: String,

    },
    eventOrganizers :{

        type: String

    },
    startDate: {

        type: Date,

    },
    endDate: {

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