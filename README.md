# Task Tracker App

A simple and efficient task management app built with **React**, **TypeScript**, and **ASP.NET Core**. The app allows users to manage their tasks, including adding, updating, deleting, and viewing tasks from a **MySQL** database.

## Features

- **Add a Task**: Create new tasks and add them to the list.
- **Update a Task**: Edit an existing task to keep track of changes.
- **Delete a Task**: Remove tasks from the list.
- **Search Tasks**: Filter and search for tasks by keywords.
- **Responsive Design**: Fully responsive app that works well on both desktop and mobile devices.

## Technologies Used

- **Frontend**: React, TypeScript, CSS (for styling)
- **Backend**: ASP.NET Core (C#)
- **Database**: MySQL

## Installation

Follow these steps to set up and run the app locally.

### Prerequisites

1. Make sure you have **Node.js** installed. If not, download it from [nodejs.org](https://nodejs.org/).
2. Ensure that **MySQL** is installed and running on your machine.

### Setup Steps

#### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/abdelkarim-alili/Task-Tracker-App.git
```

#### 2. Frontend Setup

```bash
cd Task-Tracker-App/client
npm install
```

After installation is complete, run the React app using Vite:

```bash
npm run dev
```

This will start the frontend application on http://localhost:5173.

#### 3. Backend Setup

Navigate to the server folder:

```bash
cd Task-Tracker-App/server
```

Restore the required NuGet packages:

```bash
dotnet restore
```

Before the solution can be executed, Entity Framework migrations must be run to setup the database.
Configure connection string in project's appsettings.json, replacing the username, password, and database appropriately:

```bash
"ConnectionStrings": {
  "DefaultConnection": "server=localhost;user=myusername;password=mypassword;database=mydatabase;"
},
```

Run the migration to create the database:

```bash
dotnet ef database update
```

Then, create the database and run the application:

```bash
dotnet run
```
This will start the backend API on http://localhost:5076.
