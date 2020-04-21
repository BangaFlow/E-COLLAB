import mongoose from 'mongoose'


const workShopSchema = new mongoose.Schema({
    workShopName: {
        type: String,
        required: true,

    },
    workShopType: {
        type: String,
        required: true,


    },
    workShop_description: {
        type: String,
        required: true,

    },
    workShop_date: {
        type: Date,
        required: true,

    },
    workShop_startTime: {
        type: Date,
        required: true,

    },
    workShop_endTime: {
        type: Date,
        required: true,

    },
    participants: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    organiser: {
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    workShop_Requirments: {
        type: String,
        required: true,

    },
    workShop_goals: {
        type: String,
        required: true,

    },
    workShop_Certification: {
        type: Boolean
    }

}, {
    timestamps: true
})
const WorkShop = mongoose.model('workShop', workShopSchema)

export default WorkShop