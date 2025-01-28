Challenge: Full-Stack Authentication and Dashboard Application

This repository contains a solution for the challenge that tests skills in Next.js, React,  and Express. The application includes a secure login system and a data table with CRUD functionality.
Features

    Login Page:
        Accepts email and password.
        Redirects to a dashboard upon successful login.
        Protects the dashboard with an authentication guard.

    Dashboard:
        Displays a data table with columns: Name, Age, Date of Birth, and Actions.
        Allows adding, editing, and deleting items.
        Calculates Age dynamically based on Date of Birth.
        Provides visual feedback using toast messages and loaders for AJAX operations.

Setup Instructions
Prerequisites

    Node.js (v16 or later)
    npm or yarn package manager
    Git

Steps

    Clone the Repository:

git clone https://github.com/Amey0312/logging_model.git


Install Dependencies:

npm install
# or
yarn install

Set Environment Variables: Create a .env file in the root directory with the following keys:

PORT=<backend-port>
MONGO_URI=<mongodb-connection-string> # if using MongoDB
JWT_SECRET=<your-jwt-secret>

Start the Backend Server: Navigate to the backend directory and run:

npm start

Start the Frontend Server: Navigate to the frontend directory and run:
    
    cd my-app
    npm run dev

    Access the Application: Open your browser and navigate to:
        Frontend: http://localhost:3000
        Backend: http://localhost:5000

Deployment

The application is deployed at: https://logging-model.onrender.com


Run Commands

    Frontend:

cd my-app
npm run dev

Backend:

    cd backend
    npm start

Notes

    The backend provides APIs for authentication and CRUD operations.
    The frontend uses Next.js for server-side rendering.
    Ensure all dependencies are correctly installed before running the application.