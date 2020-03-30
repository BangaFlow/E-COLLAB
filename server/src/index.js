import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express'
import session from 'express-session'
import redis from 'redis'
import connectRedis from 'connect-redis'
import mongoose from 'mongoose'

import typeDefs from './typeDefs'
import resolvers from './resolvers'
import schemaDirectives from './directives'

import { APP_PORT, IN_PROD, DB_NAME, DB_PORT, SESS_NAME, SESS_LIFETIME, SESS_SECRET, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, MONGO_DB } from './config'

mongoose.connect(`mongodb://localhost:${DB_PORT}/${DB_NAME}`, {useNewUrlParser: true}, ()=>{
    console.log('Connected to mongoDB!')
}) 

// mongoose.connect(MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
//     console.log('Connected to mongoDB Atlas!')
//  });

mongoose.set('useFindAndModify', false);

const app = express()

app.disable('x-powered-by')

const RedisStore = connectRedis(session)

const client = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD
})

client.unref()

client.on('error', console.log)
client.on('ready', ()=> {
    console.log('connected to redis')
})

const store = new RedisStore({ client })

app.use(session({
    store,
    name: SESS_NAME,
    secret: SESS_SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        maxAge: parseInt(SESS_LIFETIME),
        sameSite: true,
        secure: IN_PROD
    }
}))

const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives,
    playground: !IN_PROD,
    context: ({ req, res }) => ({ req, res })
})

server.applyMiddleware({ app, cors: true })

app.listen({ port: APP_PORT }, () => 
    console.log(`Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`)
)


