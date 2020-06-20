import mongoose, { Schema } from 'mongoose'

const taskSchema = new mongoose.Schema({
    title: String,
    doers: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    type: String
})


const Task = mongoose.model('Task', taskSchema)

export default Task
