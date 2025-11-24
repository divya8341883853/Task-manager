Understood — here is the same README **with all icons removed** and written in clean, professional plain text.

---

# Human Resource Management System (HRMS)

A full-stack Human Resource Management System built with Node.js, React.js, and a SQL database.
The system allows organisations to securely manage employees, teams, and team assignments while maintaining a complete audit log of all actions.

---

## Features

### Authentication & Organisation Management

* Create an organisation account
* User login and logout
* All features require authentication

### Employee Management

* Create, view, update, delete employees
* List all employees
* Employees can belong to multiple teams

### Team Management

* Create, view, update, delete teams
* List all teams

### Employee–Team Assignments

* Assign employees to teams
* Remove employees from teams
* View which employees belong to which teams

### Operation Logging (Audit Trail)

Every major action must be logged, including:

* User login/logout
* Employee creation, update, deletion
* Team creation, update, deletion
* Assignment of employees to teams
* Changes to employee-team relationships

Example log:

```
[TIMESTAMP] User '3' created employee with ID 10.
[TIMESTAMP] User '3' assigned employee 10 to team 4.
```

---

## Tech Stack

### Backend

* Node.js
* Express.js
* JWT authentication
* bcrypt for password hashing
* Sequelize ORM (recommended)
* PostgreSQL or MySQL

### Frontend

* React.js
* Axios or Fetch API
* LocalStorage or Context for authentication

### Optional

* Docker / Docker Compose
* Deployment on Render, Railway, or similar

---

## Project Structure

```
hrms/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── db.js
│   │   └── index.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   └── services/api.js
    └── package.json
```

---

## Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/your-username/hrms.git
cd hrms
```

---

## Backend Setup

### Install dependencies

```
cd backend
npm install
```

### Environment variables

Create a `.env` file:

```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=youruser
DB_PASS=yourpass
DB_NAME=hrms_db
JWT_SECRET=your_jwt_secret
```

### Run migrations (if using Sequelize)

```
npx sequelize-cli db:migrate
```

### Start the backend

```
npm run dev
```

The backend will run at:

```
http://localhost:5000
```

---

## Frontend Setup

### Install dependencies

```
cd ../frontend
npm install
```

### Start the frontend

```
npm start
```

The frontend will run at:

```
http://localhost:3000
```

---

## API Endpoints (Summary)

### Authentication

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

### Employees

```
GET    /api/employees
POST   /api/employees
PUT    /api/employees/:id
DELETE /api/employees/:id
```

### Teams

```
GET    /api/teams
POST   /api/teams
PUT    /api/teams/:id
DELETE /api/teams/:id
```

### Employee–Team Assignment

```
POST   /api/teams/:teamId/assign
DELETE /api/teams/:teamId/unassign
```

### Logs

```
GET /api/logs
```

---



---

If you want, I can also customize this README to match your exact project name, add diagrams, or convert it to a markdown file in canvas.
