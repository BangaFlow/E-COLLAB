import mongoose , { Schema } from 'mongoose'

const colSchema = new mongoose.Schema({
    title: String,
    taskIds: {
        type: [{type: String}]
    },
    tasks: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }]
    },
})


const Column = mongoose.model('Column', colSchema)

export default Column
