import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // For managing cookies
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const token = Cookies.get("jwt");

    if (token) {
      try {
        // JWT structure: [header].[payload].[signature]
        const base64Url = token.split(".")[1]; // Extract the payload part
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const decodedPayload = JSON.parse(atob(base64)); // Decode base64 to JSON

        // Check for admin role
        if (decodedPayload.role === "admin") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        // Handle error (optional: navigate to login, logout user, etc.)
      }
    }
  }, []);

  return (
    <div>
      {isAdmin && (
        <button
          onClick={() => navigate("/admin/users")}
          className="btn btn-primary"
        >
          Users Data
        </button>
      )}
    </div>
  );
};

export default UserDashboard;
