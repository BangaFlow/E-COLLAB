import { gql } from "apollo-boost";
import client from "./client";

const CREATE_PROFILE = gql`
  mutation createProfile(
    $image: String
    $title: String
    $location: String
    $phone: String
    $about: String
    $github_username: String
    $user_id : ID!
  ) {
    createProfile(
      image: $image
      title: $title
      location: $location
      phone: $phone
      about: $about
      github_username: $github_username
      user_id: $user_id
    ) {
      id
      user {
        id
        name
        username
        email
        createdAt
        roles {
          name
          permissions
        }
      }
      image
      title
      location
      phone
      about
      skills {
        id
        label
        description
        type
      }
      github_username
    }
  }
`;
const UPDATE_PROFILE = gql`
  mutation updateMyProfile(
    $image: String
    $title: String
    $location: String
    $phone: String
    $about: String
    $github_username: String
    $profile_id: String
  ) {
    updateMyProfile(
      image: $image
      title: $title
      location: $location
      phone: $phone
      about: $about
      github_username: $github_username
      profile_id: $profile_id
    ) {
      id
      user {
        id
        name
        username
        email
        createdAt
        roles {
          name
          permissions
        }
      }
      image
      title
      location
      phone
      about
      skills {
        id
        label
        description
        type
      }
      github_username
    }
  }
`;

async function createProfile(
  image,
  title,
  location,
  phone,
  about,
  github_username,
  user_id
) {
  const variables = { image, title, location, phone, about, github_username, user_id };
  var data = await client.mutate({ mutation: CREATE_PROFILE, variables });
  return data.data.createProfile;
}

async function updateProfile(
  image,
  title,
  location,
  phone,
  about,
  github_username,
  profile_id
) {
  const variables = {
    image,
    title,
    location,
    phone,
    about,
    github_username,
    profile_id,
  };
  var data = await client.mutate({ mutation: CREATE_PROFILE, variables });
  return data.data.updateProfile;
}

export { createProfile, updateProfile };
