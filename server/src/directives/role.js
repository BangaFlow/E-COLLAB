import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server-express'
import {
  GraphQLDirective,
  DirectiveLocation,
  GraphQLList,
  GraphQLString,
  defaultFieldResolver
} from 'graphql'

class HasRoleDirective extends SchemaDirectiveVisitor {

  static getDirectiveDeclaration(directiveName, schema) {
    return new GraphQLDirective({
      name: 'hasRole',
      locations: [DirectiveLocation.FIELD_DEFINITION],
      args: {
        roles: {
          type: new GraphQLList(GraphQLString)
        }
      }
    })
  }

  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    const roles = this.args.roles
    field.resolve = async function(...args) {
      const [, , context] = args
      const userRoles = context.req.session.roles

      if (roles.some(role => role === userRoles.name)) {
        const result = await resolve.apply(this, args)
        return result
      }
      throw new AuthenticationError('You are not authorized for this resource')
    }
  }
}
export default HasRoleDirective