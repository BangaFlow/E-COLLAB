const createRoleFetch = async (name) => {
    const query = JSON.stringify({
      query: `mutation {
            addRole(
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

export default createRoleFetch