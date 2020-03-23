export const {
    APP_PORT = 4000,
    NODE_ENV = 'development',
    DB_NAME = 'test',
    DB_PORT = 27017,

    SESS_NAME = 'sid',
    SESS_SECRET = 'ssh!secret!',
    SESS_LIFETIME = 1000 * 60 * 60 * 2,

    REDIS_HOST = 'redis-18110.c6.eu-west-1-1.ec2.cloud.redislabs.com',
    REDIS_PORT = 18110,
    REDIS_PASSWORD = 'Oii3qe7TZxijgPTWs19HL6upyLjB7pPz'
} = process.env

export const IN_PROD = NODE_ENV === 'production'