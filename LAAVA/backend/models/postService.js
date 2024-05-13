const { Pool } = require('pg');

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'laava_database',
  password: 'root',
  port: 5432,
});


async function createPost(postData) {
    const { text, userId, image } = postData;
  
    try {
      const { rows } = await pool.query(
        'INSERT INTO posts (user_id, text, image) VALUES ($1, $2, $3) RETURNING *, (SELECT username FROM farmer WHERE id = $1) AS username',
        [userId, text, image]
      );
      return rows[0];
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }
  
//   async function getPosts() {
//     try {
//       const { rows } = await pool.query('SELECT * from posts');
//       return rows;
//     } catch (error) {
//       console.error('Error getting posts:', error);
//       throw error;
//     }
//   }
  async function getPosts() {
    try {
      const { rows } = await pool.query(`
        SELECT p.id, p.user_id, p.text, p.image, p.likes, p.comments, p.created_at, f.username
        FROM posts p
        JOIN farmer f ON p.user_id = f.id
      `);
      return rows;
    } catch (error) {
      console.error('Error getting posts:', error);
      throw error;
    }
  }
  
async function likePost(postId, userId) {
  try {
    const { rows } = await pool.query(
      'UPDATE posts SET likes = array_append(likes, $1) WHERE id = $2 RETURNING *',
      [userId, postId]
    );
    return rows[0];
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
}

async function commentOnPost(postId, userId, text) {
  try {
    const comment = { user_id: userId, text, created_at: new Date() };
    const { rows } = await pool.query(
      'UPDATE posts SET comments = array_append(comments, $1) WHERE id = $2 RETURNING *',
      [comment, postId]
    );
    return rows[0];
  } catch (error) {
    console.error('Error commenting on post:', error);
    throw error;
  }
}

module.exports = {
  createPost,
  likePost,
  commentOnPost,
  getPosts,
};