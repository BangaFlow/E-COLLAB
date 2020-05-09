const createUserFetch = async (email, password, username, name) => {
    const query = JSON.stringify({
      query: `mutation {
            signUp(
                email: "${email}",
                password: "${password}",
                username: "${username}",
                name: "${name}"
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