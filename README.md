# Awesome Artists 

## Overview

This project consists of a NestJS backend and a React frontend. The backend handles the business logic and data management, while the frontend provides the user interface. This guide will help you set up the project, configure the database, and run both applications seamlessly.

## Folder Structure

```
/project-root
├── /backend           # NestJS backend
│   ├── /src          # Source code for backend
│   ├── /prisma       # Prisma configuration and migration files
│   ├── .env          # Environment variables for backend
│   ├── package.json  # Backend dependencies and scripts
│   └── ...
└── /frontend         # React application
    ├── /src          # Source code for frontend
    ├── .env          # Environment variables for frontend
    ├── package.json  # Frontend dependencies and scripts
    └── ...
```

## Requirements

* **Node.js** (version 18.18 or higher is mandatory)
* **npm** (version >= 6.x) or **Yarn** (version >= 1.x)
* **Laragon** (for MySQL database management)

## Setup Instructions

### 1. Set Up the Database

1. **Install Laragon** (if not already installed)
   * You can download it from [Laragon's official website](https://laragon.org/download/)

2. **Create a Database**
   * Open Laragon and start the services (Apache and MySQL)
   * Use the Laragon interface to create a new database

3. **Configure Database Connection**
   * In the `/backend/.env` file, set the following environment variables:
     ```env
     DATABASE_URL=mysql://your_username:your_password@localhost:3306/your_database_name
     ```

### 2. Install Dependencies

1. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

2. **Install packages using npm or Yarn**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Navigate to the frontend directory**
   ```bash
   cd ../frontend
   ```

4. **Install packages using npm or Yarn**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

### 3. Run Prisma Commands

1. **Navigate to the backend directory**
   ```bash
   cd ../backend
   ```

2. **Run the Prisma migration** to create the tables
   ```bash
   npx prisma migrate dev --name init
   ```

3. **Seed the database** (if you have a seed script defined in your Prisma setup)
   ```bash
   npx prisma db seed
   ```

### 4. Run Both Applications

1. **Open Visual Studio Code** and make sure you have your project opened

2. **Run the task to start both applications**
   * Press `Ctrl + Shift + P` to open the command palette
   * Type `Run Task` and select it
   * Choose `Run Both` from the list

## Conclusion

You should now have both the backend and frontend running. Access the frontend through your browser and make requests to the backend as needed.