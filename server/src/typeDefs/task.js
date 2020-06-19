import { gql } from 'apollo-server-express'

export default gql`
    extend type Query{
        task(id: ID!): Task #@auth
    }

    extend type Mutation {
        createTask(title: String!, type: String!, doers: [String!]!): Task
        updateTask(_id: String!, title: String, type: String, doers: [String]): Task
        deleteTask(id: String!): Task
    }

    type Task {
        id: ID!
        title: String!
        doers: [User!]!
        type: String!
    }`
