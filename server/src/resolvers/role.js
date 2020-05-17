import { Role }  from '../models'

export default {
    Query: {
        roles: (root, arg, { req }, info) => {
            // TODO: auth, projection, pagination
            return Role.find({})
        }
    },
    Mutation: {
        addRole: async (root, arg, { req }, info) => { 
            // TODO: not auth

            const role = await Role.create(arg)

            return role
        },
        updateRole: async (root, arg, context, info) => {
            console.log(arg)
            const result = await Role.findOneAndUpdate({_id: arg.id},
                { $set: arg },
                { new: true},
                (err, doc) => {
                    if (err) {
                        console.log(err.message)
                    }
                    console.log(doc)
                })

            return result
        },
        deleteRole: async (root, arg, context, info) => {
            const role = await Role.findByIdAndDelete(arg.id)

            return role
        }
    }
}