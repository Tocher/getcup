module.exports = {
  mongoDs: {
    connector: 'mongodb',
    hostname: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT || 27017,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASS,
    url: process.env.MONGO_URL || '',
    database: 'getCoffee',
    name: 'mongoDs'
  }
};
