import mongoose from 'mongoose'

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: name => Role.doesntExist({ name }),
            message: ({ value }) => `Role ${value} exist already.`
        }
    },
    permissions:{
        type: [String],
        default: ['C','R','U','D']
    } 
}, {
    timestamps: true
})

roleSchema.statics.doesntExist = async function (params) {
    return await this.where(params).countDocuments() === 0
}

const Role = mongoose.model('Role', roleSchema)

export default Role