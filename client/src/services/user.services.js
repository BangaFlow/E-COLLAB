import { gql } from 'apollo-boost'
import client from './client'

const LOG_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      name
      username
      email
      createdAt
      roles{
        name
        permissions
      }
    }
  }
`
const SIGN_UP = gql`
  mutation signUp($name: String!, $username: String!, $email: String!, $password: String!) {
    signUp(name: $name, username: $username, email: $email, password: $password) {
      id
      name
      username
      email
      createdAt
      roles{
        name
        permissions
      }
    }
  }
`
const LOG_OUT = gql`
mutation { 
	signOut
}
`
const RESET_PASSWORD = gql`
mutation requestReset($email: String!) { 
  requestReset(email: $email)
}`

async function signIn(email, password) {
    const variables = { email, password }
    var data = await client.mutate({ mutation: LOG_IN, variables })
    return data
  }

async function signOut() {
  var data = await client.mutate({ mutation: LOG_OUT })
  return data
}

async function signUp(user) {
  var data = await client.mutate({mutation: SIGN_UP, variables: user})
  return data
}

async function resetPassword(email) {
  var data = await client.mutate({mutation: RESET_PASSWORD, variables: {email}})
  return data
}

export { signUp, signIn, signOut, resetPassword }