import { gql } from 'apollo-server-express'

export default gql`

    extend type Query{
        roles: [Role!]! 
    }

    extend type Mutation {
        addRole(name: String!, permissions: [String]): Role
        deleteRole(id: String!): Role
    }

    type Role {
        id: ID!
        name: String! 
        permissions: [String!]!
    }`