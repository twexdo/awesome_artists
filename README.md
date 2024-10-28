# Project Title

## Overview

This project consists of a NestJS backend and a React frontend. The backend handles the business logic and data management, while the frontend provides the user interface. This guide will help you set up the project, configure the database, and run both applications seamlessly.

## Folder Structure

```
/project-root
├── /backend           # NestJS backend
│   ├── /src           # Source code for backend
│   ├── /prisma        # Prisma configuration and migration files
│   ├── .env           # Environment variables for backend
│   ├── package.json    # Backend dependencies and scripts
│   └── ...
└── /frontend          # React application
    ├── /src           # Source code for frontend
    ├── .env           # Environment variables for frontend
    ├── package.json    # Frontend dependencies and scripts
    └── ...
```

## Requirements

* **Node.js** (version >= 14.x)
* **npm** (version >= 6.x)
* **PostgreSQL** (or your preferred database)
* **Prisma** (for database management)

## Setup Instructions

### 1. Set Up the Database

1. **Install PostgreSQL** (if not already installed)
   * Download it from [PostgreSQL's official website](https://www.postgresql.org/download/)

2. **Create a Database**
   ```bash
   psql -U your_username -c "CREATE DATABASE your_database_name;"
   ```

3. **Configure Database Connection**
   * In the `/backend/.env` file, set the following environment variables:
     ```env
     DATABASE_URL=postgresql://your_username:your_password@localhost:5432/your_database_name
     ```

### 2. Seed the Database

1. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

2. **Install Prisma CLI** (if not already installed)
   ```bash
   npm install prisma --save-dev
   ```

3. **Run the Prisma migration** to create the tables
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Seed the database** (if you have a seed script defined in your Prisma setup)
   ```bash
   npx prisma db seed
   ```

### 3. Install Dependencies

1. **Backend**
   ```bash
   cd backend
   npm install
   ```

2. **Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### 4. Run Both Applications

1. **Navigate to the project root directory**
   ```bash
   cd ..
   ```

2. **Run the task to start both applications**
   ```bash
   npm run Run Both
   ```

## Conclusion

You should now have both the backend and frontend running. Access the frontend through your browser and make requests to the backend as needed.