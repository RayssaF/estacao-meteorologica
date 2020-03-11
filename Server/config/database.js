require('dotenv').config();
module.exports = {
  username: process.env.DATABASE_USR,
  password: process.env.DATABASE_PWD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dialect: 'postgres',
  ssl: true,
  dialectOptions: {
    "ssl": {"rejectUnauthorized": false}
  },
  
}