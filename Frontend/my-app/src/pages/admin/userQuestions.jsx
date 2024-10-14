/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown"; // Correct capitalization of ReactMarkdown

const UserQuestions = () => {
  const { userId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `/api/admin/users/${userId}/questions`
        );
        setQuestions(response.data);
      } catch (error) {
        console.log("Error fetching questions", error);
      }
    };

    fetchQuestion();
  }, [userId]);

  // Handle showing the selected question's details
  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  // Handle closing the selected question
  const handleCloseQuestion = () => {
    setSelectedQuestion(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Questions of User</h2>
      <ul className="space-y-4">
        {questions.length > 0 ? (
          questions.map((question) => (
            <li
              key={question._id}
              className="bg-base-200 p-4 rounded-lg shadow-lg"
            >
              <button
                className="btn btn-outline w-full text-left"
                onClick={() => handleQuestionClick(question)} // Show question details
              >
                {question.query} {/* Display the question */}
              </button>
            </li>
          ))
        ) : (
          <li className="text-lg">No questions found for this user.</li>
        )}
      </ul>

      {/* Display selected question and answer */}
      {selectedQuestion && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Selected Question</h3>
          <p className="text-lg font-semibold">{selectedQuestion.query}</p>
          <h3 className="text-lg font-bold mt-6">Answer</h3>
          <div className="text-base mt-2">
            {/* Render the answer with markdown formatting */}
            <ReactMarkdown>{selectedQuestion.response}</ReactMarkdown>
          </div>
          <button className="btn btn-danger mt-4" onClick={handleCloseQuestion}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default UserQuestions;
