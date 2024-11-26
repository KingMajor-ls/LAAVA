const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',  // Replace with your PostgreSQL username
  host: 'localhost',       // Use 'localhost' or '127.0.0.1' for local connections
  database: 'laava_database',
  password: 'root',  // Replace with your PostgreSQL password
  port: 5432,              // Default PostgreSQL port
});


const getSensor = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM sensor_data ORDER BY id ASC', (error, results) => {
      if (error) {
        // Reject the promise with the error
        reject(error);
      } else {
        // Check if results.rows is defined before accessing it
        if (results && results.rows) {
          // Resolve the promise with the query results
          resolve(results.rows);
        } else {
          // If results.rows is undefined or empty, reject the promise
          reject(new Error('No rows returned from the query'));
        }
      }
    })
  }) 
}

module.exports = {
    getSensor,
}

