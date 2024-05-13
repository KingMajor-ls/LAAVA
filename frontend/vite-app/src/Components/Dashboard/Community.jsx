import '../../Styles/Community.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaThumbsUp } from 'react-icons/fa';

const Community = () => {
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState([]);
 
  const User = useSelector(state => state.username);
  const userId = useSelector(state => state.userId); // Assuming you have the user ID in the Redux store
  const [currentUserId, setCurrentUserId] = useState(userId);
  // Inside the useEffect hook for fetching questions
  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:8280/questions');
      const data = await response.json();
      setQuestions(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []); // Fetch questions on initial mount

  const handleQuestionChange = (event) => {
    setNewQuestion(event.target.value);
  };

  const handleQuestionSubmit = (event) => {
    event.preventDefault();
    console.log(1);
    // Inside handleQuestionSubmit
    if (newQuestion.trim()) {
      fetch('http://localhost:8280/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: newQuestion.trim(), userId }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setQuestions(prevQuestions => [...prevQuestions, data]); // Use the callback form
          setNewQuestion('');
        })
        .catch(error => console.error('Error creating question:', error));
    }

  };
  const handleAnswerSubmit = (questionId, newAnswer) => {
    // Create a new answer on the server
    fetch(`http://localhost:8280/questions/${questionId}/answers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answer: newAnswer, userId }),
    })
      .then(response => response.json())
      .then(data => {
        setQuestions(prevQuestions =>
          prevQuestions.map(q =>
            q.id === questionId ? { ...q, answers: [...(q.answers || []), data] } : q
          )
        );
      })
      .catch(error => console.error('Error creating answer:', error));
  };



  const handleLike = async (questionId, answerId) => {
    // Update the like count on the server
    const url = `http://localhost:8280/questions/${questionId}/answers/${answerId}/like`;
  
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUserId }), // Use currentUserId here
      });
      const data = await response.json();
  
      setQuestions(
        questions.map(q =>
          q.id === questionId
            ? {
                ...q,
                answers: q.answers.map(answer =>
                  answer.id === data.id ? data : answer
                ),
              }
            : q
        )
      );
    } catch (error) {
      console.error('Error liking:', error);
      // Implement additional error handling if needed
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Community Engagement</h1>
      <p>Ask questions, share knowledge, and collaborate with fellow members!</p>
      <div className="question-form">
        <h2>Ask a Question</h2>
        <form onSubmit={handleQuestionSubmit}>
          <textarea
            value={newQuestion}
            onChange={handleQuestionChange}
            placeholder="Enter your question..."
            style={{ color: 'white', placeholderColor: 'white' }}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="questions">
        <h2>Questions</h2>
        {questions && questions.length > 0 && questions.map((q) => (
          <div key={q.id} className="question">
            <h3>{q.user_id}</h3> {/* Replace with actual user name */}
            <div>
              Question: {q.question}
            </div>
            <div className="answers">
              <h3 className='answer'>Answers</h3>
              {
                q.answers &&
                  q.answers.map(answer => (
                    <div className="alignmentUser" key={answer.id}>
                      <h3>{answer.user_id}</h3> {/* Replace with actual user name */}
                      Answer: {answer.answer}
                      <div className="like" onClick={() => handleLike(q.id, answer.id)}>
                        <FaThumbsUp /> {answer.likes}
                      </div>
                    </div>
                  ))
              }
              <AnswerForm questionId={q.id} onAnswerSubmit={handleAnswerSubmit} />
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

const AnswerForm = ({ questionId, onAnswerSubmit }) => {
  const [newAnswer, setNewAnswer] = useState('');

  const handleAnswerChange = (event) => {
    setNewAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newAnswer.trim()) {
      onAnswerSubmit(questionId, newAnswer.trim());
      setNewAnswer('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={newAnswer}
        onChange={handleAnswerChange}
        placeholder="Enter your answer..."
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Community;