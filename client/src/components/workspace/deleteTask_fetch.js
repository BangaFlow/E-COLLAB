const deleteTaskFetch = async taskId => {
    const query = JSON.stringify({
      query: `mutation {
        deleteTask(id: "${taskId}") {
          id
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

export default deleteTaskFetch