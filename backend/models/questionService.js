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

async function getAllQuestions() {
  try {
    const query = `
      SELECT 
        q.id AS question_id,
        q.question,
        q.user_id AS question_user_id,
        q.created_at AS question_created_at,
        a.id AS answer_id,
        a.answer,
        a.user_id AS answer_user_id,
        a.likes AS answer_likes,
        a.created_at AS answer_created_at
      FROM 
        questions q
      LEFT JOIN 
        answers a ON q.id = a.question_id
      ORDER BY 
        q.id, a.id`;
    const { rows } = await pool.query(query);
    // Process the rows to create an object structure that groups answers under their respective questions
    const questions = {};
    rows.forEach(row => {
      if (!questions[row.question_id]) {
        questions[row.question_id] = {
          id: row.question_id,
          question: row.question,
          user_id: row.question_user_id,
          created_at: row.question_created_at,
          answers: [],
        };
      }
      if (row.answer_id) {
        questions[row.question_id].answers.push({
          id: row.answer_id,
          answer: row.answer,
          user_id: row.answer_user_id,
          likes: row.answer_likes,
          created_at: row.answer_created_at,
        });
      }
    });
    return Object.values(questions);
  } catch (error) {
    console.error(error);
    throw error;
  }
}


async function likeAnswer(questionId, answerId, userId) {
  try {
    // Check if the user has already liked the answer
    const checkQuery = 'SELECT likes, liked_by FROM answers WHERE question_id = $1 AND id = $2';
    const checkValues = [questionId, answerId];
    const { rows: [existingAnswer] } = await pool.query(checkQuery, checkValues);

    let updateQuery;
    let values;

    if (existingAnswer && existingAnswer.liked_by && (Array.isArray(existingAnswer.liked_by) && existingAnswer.liked_by.includes(userId))) {
      // User has already liked the answer, so unlike it
      updateQuery = 'UPDATE answers SET likes = likes - 1, liked_by = array_remove(liked_by, $3) WHERE question_id = $1 AND id = $2';
      values = [questionId, answerId, userId];
    } else {
      // User hasn't liked the answer, so like it
      updateQuery = 'UPDATE answers SET likes = likes + 1, liked_by = array_append(liked_by, $3) WHERE question_id = $1 AND id = $2';
      values = [questionId, answerId, userId];
    }

    // Update the likes count and liked_by array
    await pool.query(updateQuery, values);

    // Retrieve the updated answer
    const selectQuery = 'SELECT * FROM answers WHERE question_id = $1 AND id = $2';
    const updatedAnswer = await pool.query(selectQuery, [questionId, answerId]);

    return updatedAnswer.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  createQuestion,
  createAnswer,
  likeAnswer,
  getAllQuestions,
};