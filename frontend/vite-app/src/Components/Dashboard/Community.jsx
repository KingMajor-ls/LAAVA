import '../../styles/Community.css';
import  { useState } from 'react';

const Community = () => {
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleQuestionChange = (event) => {
    setNewQuestion(event.target.value);
  };

  const handleQuestionSubmit = (event) => {
    event.preventDefault();
    if (newQuestion.trim()) {
      setQuestions([...questions, { id: Date.now(), question: newQuestion.trim(), answers: [] }]);
      setNewQuestion('');
    }
  };

  const handleAnswerSubmit = (questionId, newAnswer) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, answers: [...q.answers, newAnswer] } : q
      )
    );
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
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="questions">
        <h2>Questions</h2>
        {questions.map((q) => (
          <div key={q.id} className="question">
            <h3>{q.question}</h3>
            <div className="answers">
              <h4>Answers</h4>
              {q.answers.map((answer, index) => (
                <p key={index}>{answer}</p>
              ))}
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