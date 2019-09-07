module.exports = {
  mongoDs: {
    name: 'mongoDs',
    connector: 'mongodb',
    host: process.env.MONGO_HOST || '',
    port: process.env.MONGO_PORT || 27017,
    user: process.env.MONGO_USER || '',
    password: process.env.MONGO_PASS || '',
    url: process.env.MONGO_URL || '',
    database: 'getcoffee-dev'
  }
};
