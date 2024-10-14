// src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data); // Store user data in state
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user._id} className="bg-base-200 p-2 rounded">
            {user.name} {/* Display only the user's name */}
            <button
              className="btn btn-secondary ml-2"
              onClick={() => navigate(`/users/${user._id}/questions`)} // Navigate to user's questions
            >
              View Questions
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
