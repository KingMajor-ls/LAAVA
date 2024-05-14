import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Corrected import
import '../../Styles/Feeds.css';
import { LuBadgeCheck } from "react-icons/lu";


const Feeds = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [newImage, setNewImage] = useState(null);
  const userId = useSelector(state => state.userId);
  const navigate = useNavigate(); // Initialize navigate



  useEffect(() => {

    fetchPosts();
  }, []); // Empty dependency array ensures this effect runs only once when component mounts
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8280/api/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', newPost);
    formData.append('userId', userId);
    if (newImage) {
      formData.append('image', newImage);
    }

    try {
      const response = await fetch('http://localhost:8280/api/posts', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      // Update posts state with the new post added
      setPosts([data, ...posts]);
      setNewPost('');
      setNewImage(null);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8280/api/posts/${postId}/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      // Update the posts state with the updated post
      const updatedPosts = posts.map((post) => (post.id === postId ? data : post));
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (postId) => {
    const commentText = prompt('Enter your comment:');
    if (commentText) {
      try {
        const response = await fetch(`http://localhost:8280/api/posts/${postId}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, text: commentText }),
        });
        const data = await response.json();
        // Update the posts state with the updated post
        const updatedPosts = posts.map((post) => (post.id === postId ? data : post));
        setPosts(updatedPosts);
      } catch (error) {
        console.error('Error commenting on post:', error);
      }
    }
  };

  return (
    <div className="table1">
      <div className='table-data2'>
        <div className="create-post">
          <form onSubmit={handleSubmit}>
            <textarea
              className="post-input"
              placeholder="What's on your mind?"
              value={newPost}
              onChange={handlePostChange}
            />
            <div className="post-actions">
              <input type="file" id="image-upload" onChange={handleImageChange} />
              <label htmlFor="image-upload" className="image-upload-label">
                <i className="fas fa-image"></i>
              </label>
              <button type="submit" className="post-button">
                Post
              </button>
            </div>
          </form>
        </div>
        <div className="post-feed">
          {posts.map((post, index) => (
            <div key={index} className="post-card">
              <div className="post-header">
                <div className="avatar"></div>
                <span className="username">{post.username}</span>
                <span className="facebook-badge"><LuBadgeCheck />
                </span>
              </div>

              <div className="post-content">
                <p >{post.text}</p>
                {post.image && <img src={`http://localhost:8280/uploads/${post.image}`} alt="Post" />}
              </div>
              <div className="post-actions">
                <button className="like-button" onClick={() => handleLike(post.id)}>
                  <i className="fas fa-heart"></i> Like
                </button>
                <button className="comment-button" onClick={() => handleComment(post.id)}>
                  <i className="fas fa-comment"></i> Comment
                </button>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feeds;
