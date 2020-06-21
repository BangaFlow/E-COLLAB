import { gql } from 'apollo-server-express'

export default gql`
    extend type Query{
        column(id: ID!): Column #@auth
        columns: [Column!]!
        getWorkspace(columns: [String!]!): [Column!]!
    }

    extend type Mutation {
        createColumn(title: String!, taskIds: [String], tasks: [String]): Column
        updateColumn(_id: String, title: String, taskIds: [String], tasks: [String]): Column
        deleteColumn(id: String!): Column
    }

    type Column {
        id: ID!
        title: String!
        taskIds: [String!]!
        tasks: [Task!]!
    }`