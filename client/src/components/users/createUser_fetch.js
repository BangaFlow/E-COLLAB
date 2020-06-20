const createUserFetch = async (email, password, username, firstName, lastName, gender, roles, birthDate) => {
    const query = JSON.stringify({
      query: `mutation {
            createUser(
                email: "${email}",
                password: "${password}",
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
  
    const response = await fetch('http://localhost:4000/graphql', {
      headers: {'content-type': 'application/json'},
      method: 'POST',
      body: query,
    })
    
    const responseJson = await response.json()
    return responseJson.data
}

export default createUserFetch