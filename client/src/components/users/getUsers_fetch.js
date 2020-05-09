const getUsersFetch = async () => {
    const query = JSON.stringify({
      query: `{
        users {
        name
        id
        email
        roles {
            id
            name
        }
        }
    }`
    })
  
    const response = await fetch('http://localhost:4000/graphql', {
      headers: {'content-type': 'application/json'},
      method: 'POST',
      body: query,
    })
    
    const responseJson = await response.json()
    return responseJson.data
}

export default getUsersFetch