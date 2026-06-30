# HouseHunt - House Rent Management System

HouseHunt is a full-stack MERN house rental application for browsing rental homes, posting property listings, booking rentals, and managing listings through user and admin dashboards.

## Features

- User registration and login with JWT authentication
- Password hashing with bcryptjs
- Role-based access for users and admins
- Browse approved rental properties
- Search and filter by location, price, and property type
- Property listing CRUD for owners
- Admin approval workflow for submitted properties
- Booking requests mapped between users and properties
- Responsive React and Bootstrap interface
- Express logging, centralized errors, and MongoDB indexes

## Tech Stack

- Frontend: React, React Router, Axios, Bootstrap
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Security: JWT, bcryptjs, role-based route protection

## Project Structure

\`\`\`text
HouseHunt/
  backend/      Express API, MongoDB models, routes, controllers
  frontend/     React client app
\`\`\`

## Setup

1. Install Node.js, MongoDB, and Git.
2. Install dependencies:

\`\`\`bash
npm install
npm run install:all
\`\`\`

3. Create environment files from the examples:

\`\`\`bash
copy backend\\.env.example backend\\.env
copy frontend\\.env.example frontend\\.env
\`\`\`

4. Start MongoDB locally, then update \`backend/.env\` if needed.
5. Run both apps:

\`\`\`bash
npm run dev
\`\`\`

Frontend: \`http://localhost:5173\`

Backend API: \`http://localhost:5000/api\`

## Default Roles

New users register as \`user\` by default. To create an admin, update a user's \`role\` field to \`admin\` in MongoDB.

## Main API Routes

- \`POST /api/auth/register\`
- \`POST /api/auth/login\`
- \`GET /api/auth/me\`
- \`GET /api/properties\`
- \`POST /api/properties\`
- \`PUT /api/properties/:id\`
- \`DELETE /api/properties/:id\`
- \`PATCH /api/properties/:id/approve\`
- \`GET /api/bookings/my\`
- \`POST /api/bookings\`
- \`PATCH /api/bookings/:id/status\`
