const updateTaskFetch = async (taskId, title, type, doers) => {
    const query = JSON.stringify({
      query: `mutation{
        updateTask(_id:"${taskId}", title: "${title}", type: "${type}", doers: ${doers} ){
          id
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

export default updateTaskFetch