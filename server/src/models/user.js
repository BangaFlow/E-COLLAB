import mongoose , { Schema } from 'mongoose'
import { hash, compare } from 'bcryptjs'
import user from '../resolvers/user'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: {
            validator: email => User.doesntExist({ email }),
            message: ({ value }) => `Email ${value} has already been taken.`
        }
    },
    username: {
        type: String,
        validate: {
            validator: username => User.doesntExist({ username }),
            message: ({ value }) => `Username ${value} has already been taken.`
        }
    },
    name: String,
    password: String,
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }],
    resetToken: String,
    resetTokenExpiry: String
}, {
    timestamps: true
})

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        try {
            this.password = await hash(this.password, 12)
        } catch (error) {
            next(error)
        }
    }
    next()
})

userSchema.statics.doesntExist = async function (params) {
    return await this.where(params).countDocuments() === 0
}

userSchema.methods.matchesPassword = function (password) {
    return compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
