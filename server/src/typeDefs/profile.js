import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getMyProfile: Profile
    getProfile(id: ID!): Profile
  }

  extend type Mutation {
    createProfile(
      image: String
      title: String
      location: String
      phone: String
      about: String
      github_username: String
    ): Profile

    updateMyProfile(
      image: String
      title: String
      location: String
      phone: String
      about: String
      github_username: String
      profile_id: String
    ): Profile
  }

  type Profile {
    id: ID!
    user: User!
    image: String
    title: String
    location: String
    phone: String
    about: String
    skills: [Skill]
    github_username: String
  }
`;
