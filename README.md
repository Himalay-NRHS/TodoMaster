# To-Do List Application

A full-stack To-Do List application that allows users to manage their tasks efficiently. The project includes a React frontend and an Express backend, deployed as separate services, and supports user authentication and CRUD operations for tasks.

## Features

- **User Authentication**
  - Sign up and log in with secure password hashing (using bcrypt)
- **Task Management**
  - Add, edit, delete, and mark tasks as completed
- **Responsive UI**
  - Built with React for a smooth and interactive user experience
- **API Integration**
  - A RESTful API built with Express.js for backend functionality
- **Frontend-Backend Integration**
  - Real-time communication between frontend and backend
- **CORS Support**
  - Handles cross-origin requests between frontend and backend

## Tech Stack

### Frontend
- React: Framework for building the user interface
- Vite: For fast development and build tooling
- CSS Modules: Scoped and modular styling

### Backend
- Express.js: Server-side framework for building APIs
- MongoDB: NoSQL database for storing tasks and user data
- Mongoose: ODM library for MongoDB integration

### Additional Tools
- Axios: For making HTTP requests
- Vercel: Hosting platform for both frontend and backend
- bcryptjs: For secure password hashing
- dotenv: For managing environment variables

## Folder Structure

```plaintext
to-do-list
│
├── frontend                # React frontend
│   ├── src                 # Application source files
│   ├── public              # Public static files
│   ├── dist                # Build output (after running Vite)
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
│
├── server                  # Express backend
│   ├── index.js            # Main server file
│   ├── db.js              # Database connection
│   ├── .env               # Environment variables (ignored in Git)
│   └── package.json       # Backend dependencies
│
└── vercel.json            # Vercel configuration for deployment
```

## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /signup  | User signup |
| POST   | /login   | User login  |

### To-Do Management Endpoints

| Method | Endpoint    | Description          |
|--------|------------|---------------------|
| GET    | /tasks     | Fetch all tasks     |
| POST   | /tasks     | Add a new task      |
| PUT    | /tasks/:id | Update a task by ID |
| DELETE | /tasks/:id | Delete a task by ID |

## Installation and Setup

### Prerequisites
- Node.js and npm installed on your machine
- MongoDB installed and running locally or on a cloud provider (e.g., MongoDB Atlas)

### Clone the Repository
```bash
git clone https://github.com/Himalay-NRHS/to-do-list.git
cd to-do-list
```

### Setup Backend
1. Navigate to the server folder:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```

4. Start the server:
```bash
npm start
```

### Setup Frontend
1. Navigate to the frontend folder:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Deployment Instructions

### Frontend
1. Deploy the frontend folder to Vercel
2. During setup, ensure that the root directory points to `frontend`
3. Build command:
```bash
npm run build
```
4. Set up environment variables (if required) in Vercel

### Backend
1. Deploy the server folder to Vercel
2. Ensure that the root directory points to `server`
3. Add required environment variables (e.g., MONGO_URI, JWT_SECRET) in Vercel's dashboard

## Challenges Faced and Learnings

- **Frontend-Backend Communication:**
  - Learned how to set up API routes and connect them to a React frontend
- **State Management:**
  - Gained experience in managing component states with useState for features like task completion
- **Deployment:**
  - Understood the process of deploying full-stack applications on Vercel

## Contributing

Feel free to fork this repository and submit pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License.
