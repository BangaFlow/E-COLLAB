import { gql } from 'apollo-server-express'

export default gql`
    extend type Query{
        getMyProfile: Profile @auth
    }

    extend type Mutation {
        createProfile(
            image: String, 
            title: String, 
            location: String,
            phone: String, 
            about: String, 
            github_username: String
        ): Profile @auth,
        
        updateMyProfile(
            image: String, 
            title: String, 
            location: String,
            phone: String, 
            about: String, 
            github_username: String,
            profile_id: String
        ): Profile @auth
    }

    type Profile {
        id: ID!
        user : User!
        image: String
        title: String
        location: String
        phone: String
        about: String
        skills: [Skill]
        github_username: String   
    }`
