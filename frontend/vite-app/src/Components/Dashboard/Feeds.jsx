import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../Styles/Feeds.css';
import { LuBadgeCheck } from "react-icons/lu";

const Feeds = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [newImage, setNewImage] = useState(null);
  const userId = useSelector(state => state.userId);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  // const fetchPosts = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8280/api/posts');
  //     const data = await response.json();

  //     // Fetch comments for each post
  //     const postsWithComments = await Promise.all(data.map(async (post) => {
  //       const commentResponse = await fetch(`http://localhost:8280/api/posts/${post.id}/comments`);
  //       const commentsData = await commentResponse.json();
  //       return { ...post, comments: commentsData };
  //     }));

  //     setPosts(postsWithComments);
  //   } catch (error) {
  //     console.error('Error fetching posts:', error);
  //   }
  // };
  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8280/api/users/${userId}`);
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  };
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8280/api/posts');
      const data = await response.json();

      const postsWithComments = await Promise.all(
        data.map(async (post) => {
          const commentResponse = await fetch(`http://localhost:8280/api/posts/${post.id}/comments`);
          const commentsData = await commentResponse.json();

          // Fetch user details for each comment
          const commentsWithUserDetails = await Promise.all(
            commentsData.map(async (comment) => {
              const userDetails = await fetchUserDetails(comment.user_id);
              return { ...comment, username: userDetails ? userDetails.username : 'Unknown' };
            })
          );

          return { ...post, comments: commentsWithUserDetails };
        })
      );

      setPosts(postsWithComments);
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
      setPosts([data, ...posts]);
      setNewPost('');
      setNewImage(null);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  // const handleLike = async (postId) => {
  //   try {
  //     // Optimistically update the local state with the like
  //     const updatedPosts = posts.map((post) => {
  //       if (post.id === postId) {
  //         const updatedLikes = post.likes ? [...post.likes, userId] : [userId];
  //         return { ...post, likes: updatedLikes };
  //       }
  //       return post;
  //     });
  //     setPosts(updatedPosts);

  //     // Send the like to the server
  //     const response = await fetch(`http://localhost:8280/api/posts/${postId}/likes`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ userId }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       // If the server request succeeds, no further action is needed
  //     } else {
  //       // If the server request fails, revert the local state
  //       const revertedPosts = posts.map((post) => {
  //         if (post.id === postId) {
  //           const revertedLikes = post.likes.filter((id) => id !== userId);
  //           return { ...post, likes: revertedLikes };
  //         }
  //         return post;
  //       });
  //       setPosts(revertedPosts);
  //       throw new Error('Error liking post');
  //     }
  //   } catch (error) {
  //     console.error('Error liking post:', error);
  //   }
  // };
  const handleLike = async (postId) => {
    try {
      // Optimistically update the local state with the like/unlike
      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          const updatedLikes = post.likes
            ? post.likes.includes(userId)
              ? post.likes.filter((id) => id !== userId)
              : [...post.likes, userId]
            : [userId];
          return { ...post, likes: updatedLikes };
        }
        return post;
      });
      setPosts(updatedPosts);

      // Send the like/unlike to the server
      const response = await fetch(`http://localhost:8280/api/posts/${postId}/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        // If the server request succeeds, no further action is needed
      } else {
        // If the server request fails, revert the local state
        const revertedPosts = posts.map((post) => {
          if (post.id === postId) {
            const revertedLikes = post.likes.includes(userId)
              ? post.likes.filter((id) => id !== userId)
              : [...post.likes, userId];
            return { ...post, likes: revertedLikes };
          }
          return post;
        });
        setPosts(revertedPosts);
        throw new Error('Error liking/unliking post');
      }
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };
  const handleComment = async (postId) => {
    const commentText = prompt('Enter your comment:');
    if (commentText) {
      try {
        // Optimistically update the local state with the new comment
        const newComment = {
          userId,
          text: commentText,
          createdAt: new Date().toISOString(),
        };
        const updatedPosts = posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: post.comments ? [...post.comments, newComment] : [newComment],
            };
          }
          return post;
        });
        setPosts(updatedPosts);

        // Send the comment to the server
        const response = await fetch(`http://localhost:8280/api/posts/${postId}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, text: commentText }),
        });
        const data = await response.json();

        // Fetch user details for the new comment
        const userDetails = await fetchUserDetails(userId);
        const commentWithUsername = {
          ...data,
          username: userDetails ? userDetails.username : 'Unknown',
        };

        // Update the local state with the comment including the username
        const updatedPostsWithUsername = updatedPosts.map((post) => {
          if (post.id === postId) {
            const updatedComments = post.comments.map((comment) =>
              comment.userId === userId ? commentWithUsername : comment
            );
            return { ...post, comments: updatedComments };
          }
          return post;
        });
        setPosts(updatedPostsWithUsername);
      } catch (error) {
        console.error('Error commenting on post:', error);
        // Handle the error and revert the local state if needed
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
              placeholder="What's on your mind/Ngola maikutlo a hau?"
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
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index} className="post-card">
                <div className="post-header">
                  <div className="avatar"></div>
                  <span className="username">{post.username}</span>
                  <span className="facebook-badge"><LuBadgeCheck /></span>
                </div>

                <div className="post-content">
                  <p>{post.text}</p>
                  {post.image && <img src={`http://localhost:8280/uploads/${post.image}`} alt="Post" />}
                </div>
                <div className="post-actions">
                  <div className="like-container">
                    <button className="like-button" onClick={() => handleLike(post.id)}>
                      <i className="fas fa-heart"></i>Like
                    </button>
                    <span className="like-count">{post.likes ? post.likes.length : 0}</span>
                  </div>
                  <button className="comment-button" onClick={() => handleComment(post.id)}>
                    <i className="fas fa-comment"></i> Comment
                  </button>
                </div>

                {/* Add comments section */}
                <div className="comments-section">
                  {post.comments && (
                    post.comments.length > 0 ? (
                      post.comments.map((comment, commentIndex) => (
                        <div key={commentIndex} className="comment-card">
                          <div className="comment-header">
                            <div className="avatar"></div>
                            <div className='logo-name1'>
                              <span className='username1'>{comment.username}</span> {/* Replace with actual user name */}
                              <span className="facebook-badge1"><LuBadgeCheck /></span>
                            </div>
                           
                          </div>
                          <div className="comment-content">
                            <p>{comment.text}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No comments yet.</p>
                    )
                  )}

                </div>
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feeds;
