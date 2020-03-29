import { gql } from 'apollo-server-express'

export default gql
`
    type Skill {
        id: ID!
        label: String!
        description : String!
        type : String!
    }

    extend type Mutation {
        createSkill(
            label: String, 
            description : String,
            type : String
        ) : Skill @auth
    }

    extend type Query {
        getSkills: [Skill] @auth
    }

`
