const pg = require('pg')


var client = new pg.Client(process.env.DB_URL);

module.exports = client