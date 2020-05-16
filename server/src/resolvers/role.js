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
        deleteRole: async (root, arg, context, info) => {
            const role = await Role.findByIdAndDelete(arg.id)

            return role
        }
    }
}