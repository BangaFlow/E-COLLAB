import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'

class AdminDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field

        field.resolve = function(...args) {
            const [ , , context ] = args

            // Logic

            return resolve.apply(this, args)
        }
    }
}

export default AdminDirective