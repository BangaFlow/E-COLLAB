const updateRoleFetch = async (id, name) => {
    const query = JSON.stringify({
      query: `mutation {
            updateRole(
                id: "${id}",
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

export default updateRoleFetch