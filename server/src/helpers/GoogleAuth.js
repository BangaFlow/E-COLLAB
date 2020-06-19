const { OAuth2Client } = require('google-auth-library')

const GOOGLE_CLIENT_ID = '249588691331-bmubp1an7198lf7jo9pfjcjvbredi9ca.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = 'XUdL-4ZaugT_W4NqBt9kx8xy'

const client = new OAuth2Client(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'postmessage'
  )

const getProfileInfo = async (code) => {
    const r = await client.getToken(code)
    const idToken = r.tokens.id_token
  
    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    })
  
    const payload = ticket.getPayload()
  
    return payload
}

export default getProfileInfo