import { gql } from 'apollo-server-express'

export default gql`
    extend type Query{
        getMyProfile: Profile @auth
    }

    extend type Mutation {
        createProfile(phone: String, skills: [String], bio: String, github_username: String): Profile @auth,
        updateMyProfile(phone: String, skills: [String], bio: String, github_username: String, profile_id: String): Profile @auth
    }

    type Profile {
        id: ID!
        phone: String
        skills: [String]
        bio: String
        github_username: String
    }`
