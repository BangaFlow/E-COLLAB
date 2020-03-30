import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const USERS = gql`
  {
    users {
        id
        name
        email
    }
  }`

function Shit() {
    const { loading, error, data } = useQuery(USERS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return data.users.map(({ id, email, name }) => (
      <div key={id}>
        <p>
          email: {email}<br/>
          name: {name}
        </p>
      </div>
    ))
}

export default Shit
