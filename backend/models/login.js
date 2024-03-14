const axios = require("axios"); // Add axios import

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'laava_database',
  password: 'root',        
  port: 5432,
});

const getUsers = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM farmer ORDER BY username ASC', (error, results) => {
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
    });
  });
};


// const createUsers = (body) => {
//   return new Promise(function(resolve, reject) {
//     const { name, surname,home_address, username, email, phone_number, password } = body
//     pool.query('INSERT INTO farmer (name, surname, home_address, username, email, phone_number, password ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [name, surname,home_address, username, email, phone_number, password], (error, results) => {

//       if (error) {
//         reject(error)
//       }
//       resolve(`A new farmer has been added: ${results.rows[0]}`)
//     })
//   })
// }


//////////////////////////////////////////////////////////////////////////////



// const createUsers = (body) => {
//   return new Promise(async function(resolve, reject) {
//     const { name, surname, home_address, username, email, phone_number, password } = body;
//     try {
//       // Insert user into local database
//       const dbResult = await pool.query('INSERT INTO farmer (name, surname, home_address, username, email, phone_number, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [name, surname, home_address, username, email, phone_number, password]);
//       const newUser = dbResult.rows[0];

//       // Register user in ChatEngine.io
//       const chatEngineResponse = await axios.put(
//         'https://api.chatengine.io/users/',
//         { username, secret: password, first_name: name }, // Assuming password can be used as a secret, you may need to adjust this
//         { headers: { 'Private-Key': 'da747483-030d-401a-95e3-08b2834b6830' } }
//       );

//       // Check if the registration was successful in ChatEngine.io
//       if (chatEngineResponse.status === 200) {
//         resolve(`A new farmer has been added: ${JSON.stringify(newUser)}`);
//       } else {
//         reject('Error registering user in ChatEngine.io');
//       }
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

const createUsers = async (body) => {
  const { name, surname, home_address, username, email, phone_number, password } = body;
  try {
    // Insert user into the database
    const dbResult = await new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO farmer (name, surname, home_address, username, email, phone_number, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [name, surname, home_address, username, email, phone_number, password],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(results.rows[0]);
        }
      );
    });

    // Register user in chatEngine.io
    const chatEngineResult = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: password, first_name: name },
      { headers: { "Private-Key": "da747483-030d-401a-95e3-08b2834b6830" } }
    );

    return {
      dbResult,
      chatEngineResult
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
    getUsers,
    createUsers,
}

