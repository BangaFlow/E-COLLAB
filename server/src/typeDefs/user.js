import { gql } from 'apollo-server-express'

export default gql`
    extend type Query{
        me: User @auth
        user(id: ID!): User @auth
        users: [User!]! #@hasRole( roles: ["Admin"])
    }

    extend type Mutation {
        signUp(email: String!, username: String!, name: String!, password: String!): User @guest
        signIn(email: String!, password: String!): User @guest
        signOut: Boolean @auth
        requestReset(email: String!): Boolean
        resetPassword(email: String, password: String, confirmPassword: String, resetToken: String): User
        updateMe(email: String, username: String, name: String, password: String): User
        deleteUser(id: String!): User
    }

    type User {
        id: ID!
        email: String!
        username: String!
        name: String!
        roles: [Role!]!
        resetToken: String
        resetTokenExpiry: String
        createdAt: String!
    }`
