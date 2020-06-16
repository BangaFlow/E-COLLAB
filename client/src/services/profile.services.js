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
    $user_id: ID!
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
        skill {
          id
          label
          description
          type
        }
        grade
      }
      github_username
      teams {
        id
        name
        subject {
          id
          name
        }
        members {
          id
          email
          username
          name
        }
        tutors {
          id
          email
          username
          name
        }
        project {
          id
          title
          start_date
          end_date
          short_desc
        }
      }
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
        skill {
          id
          label
          description
          type
        }
        grade
      }
      github_username
      teams {
        id
        name
        subject {
          id
          name
        }
        members {
          id
          email
          username
          name
        }
        tutors {
          id
          email
          username
          name
        }
        project {
          id
          title
          start_date
          end_date
          short_desc
        }
      }
    }
  }
`;
const FETCH_PROFILE_BY_USER_ID = gql`
  query getProfile($id: ID!) {
    getProfile(id: $id) {
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
        skill {
          id
          label
          description
          type
        }
        grade
      }
      github_username
      teams {
        id
        name
        subject {
          id
          name
        }
        members {
          id
          email
          username
          name
        }
        tutors {
          id
          email
          username
          name
        }
        project {
          id
          title
          start_date
          end_date
          short_desc
        }
      }
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
  const variables = {
    image,
    title,
    location,
    phone,
    about,
    github_username,
    user_id,
  };
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
  var data = await client.mutate({ mutation: UPDATE_PROFILE, variables });
  return data.data.updateMyProfile;
}

async function getProfile(id) {
  const variables = { id };
  let data = await client.query({
    query: FETCH_PROFILE_BY_USER_ID,
    variables,
  });
  //console.log(data);

  return data.data.getProfile;
}

export { createProfile, updateProfile, getProfile };
