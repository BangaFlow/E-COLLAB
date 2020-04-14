import { gql } from 'apollo-boost'
import client from './client'

const LOG_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
<<<<<<< HEAD
      name
      username
      email
      createdAt
      roles{
        name
        permissions
      }
=======
      username
>>>>>>> 66adb6320efd054ca3537e34a7179b435e9ea035
    }
  }
`

async function signIn(email, password) {
    const variables = { email, password }
    var data = await client.mutate({ mutation: LOG_IN, variables })
    return data
  }

export { signIn }