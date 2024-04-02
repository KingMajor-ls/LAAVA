const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'laava_database',
  password: 'root',
  port: 5432,
});

async function createQuestion(question, userId) {
  try {
    const query = 'INSERT INTO questions (question, user_id) VALUES ($1, $2) RETURNING *';
    const values = [question, userId];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createAnswer(answer, questionId, userId) {
  try {
    const query = 'INSERT INTO answers (answer, question_id, user_id) VALUES ($1, $2, $3) RETURNING *';
    const values = [answer, questionId, userId];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  createQuestion,
  createAnswer,
};