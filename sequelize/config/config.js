require('dotenv').config();

module.exports = {
  local: {
    username: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB,
    host: process.env.SQL_HOST,
    dialect: 'postgres',
  },
};
