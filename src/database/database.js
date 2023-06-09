import mysql from "promise-mysql";
import config from "../config";

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  port: config.port
}, { multipleStatements: true });


const getConnection = () => {
  return connection;
};

module.exports = {
  getConnection
};

