const getSkillFetch = async () => {
    const query = JSON.stringify({
      query:
      `{getSkills
        {id,
        label}
        
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

export default getSkillFetch