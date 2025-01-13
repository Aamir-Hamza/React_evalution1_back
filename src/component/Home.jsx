import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css'; // Add a separate CSS file for styling

const Home = () => {
  const [quizData, setQuizData] = useState({
    name: '',
    category: '',
    difficulty: 'easy',
    numQuestions: 10,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    localStorage.setItem('quizSetup', JSON.stringify(quizData));
    const { category, difficulty, numQuestions } = quizData;
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
      );
      localStorage.setItem('quizQuestions', JSON.stringify(response.data.results));
      navigate('/quiz');
    } catch (error) {
      console.error('Error fetching quiz questions', error);
    }
  };

  return (
    <div className="setup-quiz">
      <h1 className="title">Setup Your Quiz</h1>
      <form className="quiz-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={quizData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={quizData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="9">General Knowledge</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="25">Art</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            name="difficulty"
            value={quizData.difficulty}
            onChange={handleChange}
            required
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="numQuestions">Number of Questions</label>
          <input
            type="number"
            id="numQuestions"
            name="numQuestions"
            value={quizData.numQuestions}
            onChange={handleChange}
            min="1"
            max="50"
            required
          />
        </div>

        <button className="submit-button" type="submit">Start Quiz</button>
      </form>
    </div>
  );
};

export default Home;