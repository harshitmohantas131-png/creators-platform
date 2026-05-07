# CreatorHub - MERN Stack Application

## Overview
CreatorHub is a full-stack MERN application that allows users to register, log in, and manage their own content with full CRUD functionality.

## Tech Stack
- Frontend: React, React Router, Axios
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT (JSON Web Token)

## Features
- User Registration and Login
- JWT-based Authentication
- Protected Routes (Frontend + Backend)
- Create, Read, Update, Delete (CRUD) functionality
- Pagination for content listing
- Error handling with toast notifications

## Setup Instructions

### Backend
cd server
npm install
npm run dev

### Frontend
cd client
npm install
npm run dev

## Environment Variables

Create a `.env` file inside the server folder with:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

## Notes
- `.env` files are not included for security reasons
- node_modules are excluded from submission

# Deployed Links:

Backend: https://creators-platform-api-4hym.onrender.com/
Frontend: https://creators-platform-o8au1xl7w-harshits-projects-37653749.vercel.app/
