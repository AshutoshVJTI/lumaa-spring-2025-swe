# Task Management App (Full-Stack)

A minimal **React + TypeScript** (frontend), **Node.js** (backend), and **PostgreSQL** (database) application demonstrating user authentication and basic CRUD functionality for tasks.

---

## 1. Prerequisites

- **Node.js** (v14+ recommended)
- **npm** (v6+ recommended)
- **PostgreSQL** database

---

## 2. Setup Instructions

### 2.1 Clone/Download the Repository

```bash
git clone https://github.com/ashutoshvjti/lumaa-spring-2025-swe.git
cd lumaa-spring-2025-swe
```

### 2.2 Database Configuration

1. **Create a PostgreSQL database** (if you do not already have one).

   If you have `psql` installed and your PostgreSQL server running:
   ```bash
   cd backend
   npm install
   npm run init-db   # Creates a database named tasks_db (adjust the script for your DB user)
   ```
   > *Note:* The script `npm run init-db` uses the `psql -U ashutosh postgres` command.  
   > You might need to edit `package.json` (under `"scripts"`) to match your local DB username.

2. **Set environment variables** (backend):
   - Create a `.env` file inside the `backend` directory.
   - Define the following variables:
     ```bash
     # .env file in backend directory
     DATABASE_URL="postgres://YOUR_DB_USER:YOUR_DB_PASS@YOUR_DB_HOST:5432/tasks_db"
     JWT_SECRET="someSuperSecretKey"
     PORT=3000
     ```

   Replace `YOUR_DB_USER`, `YOUR_DB_PASS`, and `YOUR_DB_HOST` with your actual credentials and host.  
   The `DATABASE_URL` is the PostgreSQL connection string.  
   `JWT_SECRET` is any random secret string used for signing JWT tokens.  
   `PORT` is optional (defaults to 3000 if omitted).

3. **Run Migrations**:
   ```bash
   # Still inside /backend directory
   npm run migrate
   ```
   This creates the necessary `users` and `tasks` tables if they do not exist yet.

---

## 3. Running the Backend

From the `backend` folder:

```bash
cd backend
npm install            # Install backend dependencies (if not already done)
npm run dev            # Start the server in development mode (via nodemon)
# or
npm run start          # Start the server with Node (production mode)
```

- By default, the backend will listen on port **3000**.
- API endpoints are under `http://localhost:3000/api/...`
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET /api/tasks`
  - `POST /api/tasks`
  - `PUT /api/tasks/:id`
  - `DELETE /api/tasks/:id`

---

## 4. Running the Frontend

1. **Environment Variable** (Frontend):
   - The frontend makes API calls to the backend using an environment variable `VITE_API_URL`.
   - Create a file named `.env` (or `.env.local`) in the `frontend` directory with the following content:
     ```bash
     VITE_API_URL="http://localhost:3000/api"
     ```
   - Adjust the URL/port if your backend is running elsewhere.

2. **Install & Start**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   - This will spin up the Vite development server (usually on `http://localhost:5173`).

---

## 5. Usage

1. **Register** a new user at `http://localhost:5173/register`.
   - Once registered, a JWT token is stored in `localStorage`.
2. **Login** at `http://localhost:5173/login`.
   - On successful login, a JWT token is stored, and you are redirected to `/tasks`.
3. **Tasks Page** at `http://localhost:5173/tasks`.
   - Allows **Create**, **Read**, **Update**, and **Delete** of tasks.
   - Only accessible if authenticated (i.e., if you have a valid token in localStorage).

---

## 6. Testing Notes

- **Manual Testing**:
  - Register a new user, then confirm login with that user’s credentials.
  - Create, edit, and delete tasks to confirm that the API calls work properly.
  - Verify that tasks are stored in the PostgreSQL database.
  - Check for error handling when credentials are invalid.
- **Token Verification**:
  - If the token in `localStorage` is missing or expired, the user is redirected to the login page.

> **Note**: No automated test suite is included due to the minimal nature of this challenge, but the code is structured so that you could easily add integration/unit tests as needed.

---

## 7. Salary Expectations

**$2400 per month (part-time)**

---

## 8. Demo Video

https://drive.google.com/file/d/1U4ZKOlJJCkjrW8MeYunlOE2NqtEk6i9k/view?usp=sharing

---

### Thank you for reviewing this submission!
