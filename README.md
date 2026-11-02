# HouseHunt – House Rent Management System

HouseHunt is a full-stack MERN house rental application for browsing rental homes, posting property listings, booking rentals, and managing listings through user and admin dashboards.

## Features

- User registration and login with JWT authentication
- Password hashing using bcryptjs
- Role-based access for users and admins
- Browse approved rental properties
- Search and filter properties by location, price, and property type
- Property listing CRUD operations for owners
- Admin approval workflow for submitted properties
- Booking requests mapped between users and properties
- Responsive React and Bootstrap interface
- Express logging, centralized error handling, and MongoDB indexes

## Tech Stack

- **Frontend:** React.js, React Router, Axios, Bootstrap
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Security:** JWT, bcryptjs, role-based route protection

## Project Structure

```text
HouseHunt/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
└── package.json
```

## Installation and Setup

### Prerequisites

- Node.js
- MongoDB
- Git

### 1. Clone the repository

```bash
git clone https://github.com/pihuxsree-15/HouseHunt.git
cd HouseHunt
```

### 2. Install dependencies

```bash
npm install
npm run install:all
```

### 3. Configure environment variables

Create environment files using the example files:

```bash
copy backend\.env.example backend\.env
copy frontend\.env.example frontend\.env
```

Update the environment variables according to your local configuration.

### 4. Start MongoDB

Start your local MongoDB server and configure the database connection in `backend/.env`.

### 5. Run the application

```bash
npm run dev
```

### Local Application URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api

These addresses are for local development and require the application servers to be running.

## Default Roles

New users register with the `user` role by default.

To create an admin account, update a user's `role` field to `admin` in MongoDB.

## Main API Routes

| Method | Endpoint |
|---|---|
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |
| GET | `/api/auth/me` |
| GET | `/api/properties` |
| POST | `/api/properties` |
| PUT | `/api/properties/:id` |
| DELETE | `/api/properties/:id` |
| PATCH | `/api/properties/:id/approve` |
| GET | `/api/bookings/my` |
| POST | `/api/bookings` |
| PATCH | `/api/bookings/:id/status` |

## Repository

[GitHub – HouseHunt](https://github.com/pihuxsree-15/HouseHunt)

