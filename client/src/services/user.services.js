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

const LOG_OUT = gql`
mutation { 
	signOut
}
`

async function signIn(email, password) {
    const variables = { email, password }
    var data = await client.mutate({ mutation: LOG_IN, variables })
    return data
  }

async function signOut() {
  var data = await client.mutate({ mutation: LOG_OUT })
  return data
}

export { signIn, signOut }