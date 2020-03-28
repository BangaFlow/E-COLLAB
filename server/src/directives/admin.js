import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'

class AdminDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field

        field.resolve = function(...args) {
            const [ , , context ] = args
            const roles =  context.req.session.roles

            if (roles.name !== 'Admin') throw new AuthenticationError('Not admin!')

            return resolve.apply(this, args)
            
        }
    }
}

export default AdminDirective