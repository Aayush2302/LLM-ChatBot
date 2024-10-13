import SignUpPage from "./pages/auth/signup/SIgnUpPage.jsx";
import LoginPage from "../src/pages/auth/login/LoginPage";
import UserDashboard from "./pages/home/UserDashboard.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import QueryClient and QueryClientProvider
import "./index.css";
// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {" "}
      {/* Wrap your app in QueryClientProvider */}
      <Router>
        <div>
          <Toaster position="top-right" reverseOrder={false} />
          <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/home/UserDashboard" element={<UserDashboard />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
