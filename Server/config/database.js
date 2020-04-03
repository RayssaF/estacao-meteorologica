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
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  freezeTableName:false
}