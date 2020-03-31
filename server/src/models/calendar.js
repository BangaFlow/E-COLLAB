import mongoose from 'mongoose'
import { hash, compare } from 'bcryptjs'
import { number } from 'joi'

const calendarSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
})
const Calendar = mongoose.model('calendar', calendarSchema)

export default Calendar