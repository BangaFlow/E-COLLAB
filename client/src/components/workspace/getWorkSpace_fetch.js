const getColumnsFetch = async (columns) => {
    const query = JSON.stringify({
      query: `{
        getWorkspace(columns: ${columns}) {
            id
            title
            taskIds
            tasks {
                id
                title
                type
                doers {
                    id
                    name
                }
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

export default getColumnsFetch