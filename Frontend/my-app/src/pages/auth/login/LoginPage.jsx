/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post("/api/auth/login", formData);
      return response.data;
    },
    onSuccess: (data) => {
      Cookies.set("jwt", data.token); // Save the token in a cookie
      toast.success("Logged in successfully");
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Error logging in");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10 items-center justify-center">
      <form onSubmit={handleSubmit} className="lg:w-1/3 mx-auto space-y-4">
        <input
          type="email"
          className="input input-bordered w-full"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <input
          type="password"
          className="input input-bordered w-full"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <button type="submit" className="btn btn-primary w-full">
          {isLoading ? "Loading..." : "Login"}
        </button>
        {isError && <p className="text-red-500">{error.message}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
