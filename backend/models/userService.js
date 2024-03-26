const Pool = require('pg').Pool;
const bcrypt = require('bcrypt');

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'laava_database',
  password: 'root',
  port: 5432,
});

async function authenticate(username, password) {
  try {
    const query = 'SELECT * FROM farmer WHERE username = $1';
    const user = await pool.query(query, [username]);

    if (user.rows.length === 0) {
      return null;
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return null;
    }

    return user.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getAllUsers() {
  try {
    const query = 'SELECT id, username, role FROM farmer';
    const users = await pool.query(query);
    return users.rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function createFarmer(farmerData) {
  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(farmerData.password, 10);

    // Create a new farmer in the database
    const query = `
      INSERT INTO farmer (name, surname, home_address, username, email, phone_number, password, role)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const values = [
      farmerData.name,
      farmerData.surname,
      farmerData.homeAddress,
      farmerData.username,
      farmerData.email,
      farmerData.phoneNumber,
      hashedPassword,
      farmerData.role || 'User', // Default role to 'User' if not provided
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  authenticate,
  getAllUsers,
  createFarmer,
};