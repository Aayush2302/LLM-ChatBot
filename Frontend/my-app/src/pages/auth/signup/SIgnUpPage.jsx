/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MdOutlineMail,
  MdPassword,
  MdDriveFileRenameOutline,
} from "react-icons/md";
import XSvg from "../../../components/AI.svg";
import { FaUser } from "react-icons/fa";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  const { mutate, isError, isLoading, error } = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post("/api/auth/signup", formData);
      return response.data;
    },

    onSuccess: () => {
      toast.success("Account created successfully");
      navigate("/signin");
      //redirect to login page
    },
    onError: () => {
      toast.error("Error creating account");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      {/* <div className="flex-1 hidden lg:flex items-center justify-center">
        <XSvg className=" lg:w-2/3 fill-white" />
      </div> */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <form
          className="lg:w-1/3 mx-auto md:mx-20 flex gap-4 flex-col"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl font-extrabold text-white">Join today.</h1>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="email"
              className="grow"
              placeholder="Email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
            />
          </label>
          <div className="flex gap-4 flex-wrap">
            <label className="input input-bordered rounded flex items-center gap-2 flex-1">
              <FaUser />
              <input
                type="text"
                className="grow"
                placeholder="Username"
                name="name"
                onChange={handleInputChange}
                value={formData.name}
              />
            </label>
          </div>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>
          <button className="btn rounded-full btn-primary text-white">
            {isLoading ? "Loading..." : "Sign up"}
          </button>
          {isError && <p className="text-red-500">{error.message}</p>}
        </form>
        <div className="flex flex-col lg:w-1/3 gap-2 mt-4">
          <p className="text-white text-lg">Already have an account?</p>
          <button
            className="btn rounded-full btn-primary text-white btn-outline w-full"
            onClick={() => navigate("/signin")}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
