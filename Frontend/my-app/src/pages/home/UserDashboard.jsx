/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { AiOutlineMenu } from "react-icons/ai"; // For toggling history on mobile
import Cookies from "js-cookie"; // Make sure you have this installed
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

const UserDashboard = () => {
  const navigate = useNavigate(); // Define navigate using useNavigate hook
  const [messages, setMessages] = useState([]); // Store chat messages
  const [input, setInput] = useState(""); // User input
  const [searchHistory, setSearchHistory] = useState([]); // User's search history
  const [selectedQA, setSelectedQA] = useState(null); // Holds selected Q&A
  const [showHistory, setShowHistory] = useState(false); // For mobile view toggling
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch the user's chat history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("/api/history");
        setSearchHistory(response.data);
      } catch (error) {
        console.error("Error fetching history", error);
      }
    };
    fetchHistory();
  }, []);

  // Handle sending a message (chat)
  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { role: "user", content: input }];
      setMessages(newMessages);
      setInput(""); // Clear the input field

      try {
        const response = await axios.post("/api/responses/query", {
          query: input,
        });

        const botResponse = response.data;

        setMessages((prev) => [
          ...prev,
          { role: "bot", content: botResponse.response || "No response" },
        ]);
      } catch (error) {
        console.error("Error sending message", error);
      }
    }
  };

  // Handle clicking on a search history item
  const handleHistoryClick = (qa) => {
    setSelectedQA(qa); // Set selected Q&A
    setShowHistory(false); // Hide history on mobile after selecting
  };

  // Check if the logged-in user is an admin
  useEffect(() => {
    const checkRole = async () => {
      try {
        const response = await axios.get("/api/role");
        setIsAdmin(response.data.role === "admin");
      } catch (error) {
        console.error("Error checking user role:", error);
      }
    };
    checkRole();
  }, []);

  const handleUsersDataClick = () => {
    navigate("/admin/AdminDashboard"); // Navigate to the admin dashboard
  };

  // Handle user logout
  const handleLogout = () => {
    Cookies.remove("jwt"); // Remove the JWT from cookies
    navigate("/signin"); // Redirect to the login page
    toast.success("Logged out successfully");
  };

  return (
    <div className="flex h-screen">
      {/* Mobile toggle button for history */}
      {!showHistory && (
        <button
          className="lg:hidden p-2 m-2 rounded-full bg-primary text-white fixed z-50"
          onClick={() => setShowHistory(true)}
        >
          <AiOutlineMenu size={24} />
        </button>
      )}

      {/* Left Sidebar for Search History */}
      <div
        className={`w-3/4 bg-base-200 p-4 lg:block ${
          showHistory ? "block" : "hidden"
        } lg:relative fixed z-40 h-full lg:w-1/4 flex flex-col`}
      >
        <div className="flex-grow overflow-y-auto max-h-[70vh]">
          <h2 className="text-xl font-bold mb-4">Search History</h2>
          <ul className="menu p-2 space-y-2">
            {searchHistory.map((qa) => (
              <li key={qa._id} className="border rounded-lg p-2">
                <button
                  className="btn btn-outline w-full truncate whitespace-normal text-left"
                  onClick={() => handleHistoryClick(qa)}
                >
                  {qa.question}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Buttons at the bottom of the history bar */}
        <div className="mt-4">
          {isAdmin && (
            <button
              onClick={handleUsersDataClick}
              className="btn btn-primary w-full mb-2"
            >
              Users Data
            </button>
          )}
          <button className="btn btn-danger w-full mb-2" onClick={handleLogout}>
            Logout
          </button>
          <button
            className=" btn btn-primary w-full"
            onClick={() => setShowHistory(false)}
          >
            Close History
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div
        className={`w-full lg:w-3/4 flex flex-col justify-between p-4 bg-base-100 transition-all duration-300 ease-in-out ${
          showHistory ? "opacity-20 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Display Selected Q&A */}
        {selectedQA && (
          <div className="mb-4">
            <h3 className="text-lg font-bold">{selectedQA.question}</h3>
            <p className="text-base">{selectedQA.answer}</p>
          </div>
        )}
        {/* Chat Messages */}
        <div className="overflow-y-auto p-2 space-y-4 flex-1 max-h-[70vh]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat ${
                msg.role === "user" ? "chat-end" : "chat-start"
              }`}
            >
              <div
                className={`chat-bubble ${
                  msg.role === "user"
                    ? "chat-bubble-primary"
                    : "chat-bubble-secondary"
                }`}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-4 bg-base-300 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Type your query here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input input-bordered flex-grow mr-2"
          />
          <button className="btn btn-primary" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
