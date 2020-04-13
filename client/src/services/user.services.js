import { gql } from 'apollo-boost'
import client from './client'

const LOG_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      username
    }
  }
`

async function signIn(email, password) {
    const variables = { email, password }
    var data = await client.mutate({ mutation: LOG_IN, variables })
    return data
  }

export { signIn }