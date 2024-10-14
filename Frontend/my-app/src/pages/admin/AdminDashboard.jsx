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
    <div className="p-6 bg-base-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">
        User List
      </h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th className="text-left">User Name</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="text-lg">{user.name}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm ml-4"
                    onClick={() =>
                      navigate(`/admin/users/${user._id}/questions`)
                    }
                  >
                    View Questions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
