import mongoose from 'mongoose'


const soutenanceSchema = new mongoose.Schema({
    subject:  {
        type: String
    },
    group:  {
        type: String
    },
    date: {
        type: Date,
        required: true,

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
const Soutenance = mongoose.model('soutenance', soutenanceSchema)

export default Soutenance