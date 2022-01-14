const mysql = require('mysql2/promise')
let connection

module.exports = {
  async initDB() {
    if (!connection) {
      connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'komori',
        database: 'user_db'
      })
    }
  },
  getDB() {
    return connection
  }
}
