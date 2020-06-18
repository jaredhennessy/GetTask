require("dotenv").config();

module.exports = {
  development: {
    username: process.env.MY_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MY_DATABASE,
    host: process.env.MY_HOST,
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
};
