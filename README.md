# User Profile System

A role-based user profile management system built with **Node.js**, **Express**, **Sequelize**, and **MySQL**.

## 🔑 Roles

- `user`
- `manager`
- `admin`

Each role has specific permissions and access to different parts of the system.

## 📁 Project Structure

```
User_Profile_System/
│
├── controllers/        # Business logic for different roles
├── models/             # Sequelize models and associations
├── routers/            # Route definitions for users, managers, and admins
├── views/              # (If using templating - otherwise can be ignored)
├── .env                # Environment configuration (DB credentials, etc.)
├── index.js            # Entry point
└── README.md           # Project documentation
```

## ⚙️ Installation

```bash
npm install
```

## 🧪 Run the project

```bash
npm start
```

Or with `nodemon`:

```bash
npx nodemon index.js
```

## 🔌 Environment Configuration

Create a `.env` file in the root directory with the following format:

```env
DB_NAME=your_database_name
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_DIALECT=mysql
```

> Make sure the database exists and credentials are correct.

## 📦 Sequelize Models

Includes user model with role-based logic. Other models can be added as needed.

## 🧩 Features

- Authentication system
- Role-based access control
- Sequelize ORM
- Error handling
- RESTful routing

## 📜 License

MIT
