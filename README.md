# LLM Chat Application

A full-stack chat application that allows users to query a Large Language Model (LLM) through a web interface. The app consists of a frontend built with React, Vite, and Tailwind CSS (using DaisyUI), and a backend built with Node.js, Express, and MongoDB.

### Live Demo
**Check-Out** : https://llm-chatbot-3.onrender.com
## Features

- User authentication and role-based access control (Admin/User).
- Chat interface for sending and receiving messages from an LLM API.
- Admin dashboard to view user queries and chat history.
- Responsive UI with mobile and desktop layouts.
- API integration for fetching chat responses.
- Role-based display features (admin users have access to special functions like managing users).

---
## Project Structure
```bash


├── Backend/ # Node.js + Express Backend │ 
  ├── routes/ # Express Routes │ 
  ├── middleware/ # Middleware for authorization │ 
  ├── models/ # MongoDB models (e.g., User) │ 
  ├── server.js # Main Express server file │ 
  └── .env # Environment variables (e.g., MongoDB URL, JWT secret) │ 
├── Frontend/ # React + Vite Frontend │ 
  ├── my-app/ # Vite React application │ 
  ├── public/ # Public assets (favicon, icons) │ 
  ├── src/ # React source files │ 
  ├── vite.config.js # Vite configuration │ 
  └── package.json # Frontend dependencies │ 
├── package.json # Root package.json to manage both frontend and backend 
  ├── README.md # Project README file 
  └── .gitignore # Ignored files
```


## Prerequisites

Make sure you have the following installed:

- **Node.js** (v14+)
- **MongoDB** (for the database)
- **Git** (for version control)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Aayush2302/LLM-ChatBot.git
cd LLM-ChatBot
```
### 2. Install Dependencies
```bash
cd Backend
npm install
```
### 3. Set Up Environment Variables
Backend (Backend/.env)
Create a .env file in the Backend directory with the following environment variables:
```bash
MONGO_URI=mongodb://localhost:27017/your-database-name
JWT_SECRET=your_jwt_secret_key
PORT=5000
```
### 4. Build the Frontend
Navigate to the frontend directory and run:
```bash
npm run build
```
This will generate the production build for the frontend inside the Frontend/my-app/dist directory.
### 5. Run the Application
You can run both the frontend and backend concurrently using the following command from the root of the project:
```bash
npm run start
```

# Alternatively, you can run them separately:
### Backend
```bash
cd Backend
npm start
```
### Frontend
```bash
cd Frontend/my-app
npm run preview
```
# Tech Stack

## Frontend
- React (with Vite for bundling)
- Tailwind CSS + DaisyUI for styling
- Axios for making API requests
- React-Router for routing
- React-Markdown for displaying formatted markdown content

## Backend
- Node.js with Express.js
- MongoDB (NoSQL database)
- Mongoose (MongoDB ODM)
- JWT for user authentication
- bcrypt.js for password hashing

# Contact
If you have any questions or suggestions, feel free to reach out!

- **Email:** ayushjivani2201@gmail.com
- **GitHub:** [https://github.com/Aayush2302]
