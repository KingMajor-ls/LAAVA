const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'laava_database',
  password: 'root',
  port: 5432,
});

const insertProduction = async (userId, quarter, year, maizeUnits, tomatoUnits, potatoUnits) => {
  try {
    const query = 'INSERT INTO productions (user_id, quarter, year, maize_units, tomato_units, potato_units) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [userId, quarter, year, maizeUnits, tomatoUnits, potatoUnits];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const getProductionsByUserId = async (userId) => {
  try {
    const query = 'SELECT * FROM productions WHERE user_id = $1';
    const values = [userId];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  insertProduction,
  getProductionsByUserId
};
