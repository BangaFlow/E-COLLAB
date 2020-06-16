const createTaskFetch = async (title, type, doers) => {
    const query = JSON.stringify({
      query: `mutation {
            createTask(
                title: "${title}",
                type: "${type}",
                doers: ${doers},
                ) { 
                id
                title
                type
                doers {
                  id
                  name
                }
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

export default createTaskFetch