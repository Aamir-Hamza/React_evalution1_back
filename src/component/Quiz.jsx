import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css'; 

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const quizQuestions = JSON.parse(localStorage.getItem('quizQuestions'));
    if (quizQuestions) {
      setQuestions(quizQuestions);
    }
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
        setCorrectAnswers((prev) => prev + 1);
      } else {
        setIncorrectAnswers((prev) => prev + 1);
      }

      if (currentQuestionIndex === questions.length - 1) {
        setShowConfirmationPopup(true);
      } else {
        setTimeout(() => {
          setCurrentQuestionIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setFeedback('');
        }, 500); 
      }
    }
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prev) => prev - 1);
    setFeedback('');
  };

  const handleFinishQuiz = () => {
    const totalQuestions = questions.length;
    const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2); 
    setScore(percentage);

    const userName = JSON.parse(localStorage.getItem('quizSetup')).name;
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

    leaderboard.push({
      name: userName,
      score: percentage,
    });

    leaderboard.sort((a, b) => b.score - a.score);

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    setShowResult(true);
  };

  const handleConfirmation = (confirmation) => {
    if (confirmation === 'yes') {
      handleFinishQuiz(); 
    }
    setShowConfirmationPopup(false); 
  };

  if (!questions.length) return <div className="loading">Loading...</div>;

  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
          <h2 className="question-counter">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <div className="question-text">{questions[currentQuestionIndex].question}</div>
          <div className="options-container">
            {questions[currentQuestionIndex].incorrect_answers
              .concat(questions[currentQuestionIndex].correct_answer)
              .sort(() => Math.random() - 0.5) 
              .map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`option-button ${selectedAnswer === option ? 'selected' : ''}`}
                >
                  {option}
                </button>
              ))}
          </div>
          {feedback && <div className="feedback-text">{feedback}</div>}
          <div className="navigation-buttons">
            {currentQuestionIndex > 0 && (
              <button className="previous-button" onClick={handlePreviousQuestion}>Previous</button>
            )}
            <button className="next-button" onClick={handleNextQuestion}>
              {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next'}
            </button>
          </div>
        </>
      ) : (
        <div className="result-container">
          <h3 className="result-title">Quiz Completed!</h3>
          <p className="result-score">Your score: {score}%</p>
          <p className="result-details">Correct Answers: {correctAnswers}</p>
          <p className="result-details">Incorrect Answers: {incorrectAnswers}</p>
          <button className="leaderboard-button" onClick={() => navigate('/leaderboard')}>View Leaderboard</button>
        </div>
      )}

      {showConfirmationPopup && (
        <div className="confirmation-popup">
          <p className="confirmation-text">Are you sure you want to finish the quiz?</p>
          <button className="confirmation-button" onClick={() => handleConfirmation('yes')}>Yes</button>
          <button className="confirmation-button" onClick={() => handleConfirmation('no')}>No</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
