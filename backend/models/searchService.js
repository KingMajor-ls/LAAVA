const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'laava_database',
  password: 'root',
  port: 5432,
});
async function search(query) {
    try {
      // Search in all relevant tables for matching records
      const searchResults = await Promise.all([
        pool.query('SELECT * FROM answers WHERE answer ILIKE $1', [`%${query}%`]),
        pool.query('SELECT * FROM comments WHERE text ILIKE $1', [`%${query}%`]),
        pool.query('SELECT * FROM farmer WHERE name ILIKE $1 OR surname ILIKE $1', [`%${query}%`]),
        pool.query('SELECT * FROM posts WHERE text ILIKE $1', [`%${query}%`]),
        pool.query('SELECT * FROM productions WHERE maize_units::text ILIKE $1 OR tomato_units::text ILIKE $1 OR potato_units::text ILIKE $1', [`%${query}%`]),
        pool.query('SELECT * FROM questions WHERE question ILIKE $1', [`%${query}%`]),
        pool.query('SELECT * FROM sensor_data WHERE soil_moisture::text ILIKE $1 OR temperature::text ILIKE $1 OR humidity::text ILIKE $1', [`%${query}%`]),
      ]);
      console.log('Search results:', searchResults); // Add this line
  
      // Extract the rows from the search results
      const [answers, comments, farmers, posts, productions, questions, sensorData] = searchResults.map(result => result.rows);
  
      // Combine and format the search results
      const searchResponse = { answers, comments, farmers, posts, productions, questions, sensorData };
      return searchResponse;
    } catch (error) {
      console.error('Error performing search:', error);
      throw new Error('Internal server error');
    }
  }
  module.exports = {
    search,
  
  };