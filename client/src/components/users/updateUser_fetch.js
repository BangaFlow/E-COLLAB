const updateUserFetch = async (id, email, username, firstName, lastName, gender, roles, birthDate, usernameChanged, emailChanged ) => {
  let query = ''
  if (usernameChanged && emailChanged) {
    query = JSON.stringify({
      query: `mutation {
            updateUser(
                _id: "${id}",
                email: "${email}",
                username: "${username}",
                name: "${firstName+' '+lastName}",
                gender: "${gender}",
                roles: ${roles},
                birthDate: "${birthDate}"
                ) { 
                id
                name
            }
          }
      `
    })
  }
  else if(usernameChanged) {
    query = JSON.stringify({
      query: `mutation {
            updateUser(
                _id: "${id}",
                username: "${username}",
                name: "${firstName+' '+lastName}",
                gender: "${gender}",
                roles: ${roles},
                birthDate: "${birthDate}"
                ) { 
                id
                name
            }
          }
      `
    })
  } else if (emailChanged) {
    query = JSON.stringify({
      query: `mutation {
            updateUser(
                _id: "${id}",
                email: "${email}",
                name: "${firstName+' '+lastName}",
                gender: "${gender}",
                roles: ${roles},
                birthDate: "${birthDate}"
                ) { 
                id
                name
            }
          }
      `
    })
  } else {
    query = JSON.stringify({
      query: `mutation {
            updateUser(
                _id: "${id}",
                name: "${firstName+' '+lastName}",
                gender: "${gender}",
                roles: ${roles},
                birthDate: "${birthDate}"
                ) { 
                id
                name
            }
          }
      `
    })
  }
  const response = await fetch('http://localhost:4000/graphql', {
    headers: {'content-type': 'application/json'},
    method: 'POST',
    body: query,
  })
  
  const responseJson = await response.json()
  return responseJson
}

export default updateUserFetch