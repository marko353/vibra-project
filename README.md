# VibrA - A Dating Application

VibrA is a modern dating application designed to provide a fast, secure, and intuitive user experience. The frontend is built using **React (Vite) with TypeScript**, while the backend uses **Node.js (Express)** and **MongoDB Atlas** for data management. The application includes advanced features such as real-time chat, JWT token authentication, and user image management.

---

## 📋 Table of Contents
1. [Technologies](#-technologies)
2. [Installation and Setup](#-installation-and-setup)
3. [Authentication and Security](#-authentication-and-security)
4. [Real-Time Chat](#-real-time-chat)
5. [Image Management](#-image-management)
6. [Project Structure](#-project-structure)
7. [Screenshots](#-screenshots)
8. [Contact](#-contact)

---

## 🛠️ Technologies

### Frontend
- **React (Vite)** - Fast and modern frontend platform.
- **TypeScript** - Ensures type safety and reduces errors.
- **SCSS** - Advanced styling for responsive and modern design.
- **React Router** - Handles routing and navigation.
- **Axios** - HTTP communication with the backend.

### Backend
- **Node.js** - JavaScript runtime for building the server.
- **Express** - Framework for handling HTTP requests efficiently.
- **MongoDB Atlas** - Cloud database for scalable data storage.
- **Mongoose** - ODM (Object Data Modeling) for MongoDB.
- **JSON Web Token (JWT)** - Secure user authentication.
- **bcryptjs** - Password encryption for enhanced security.
- **Socket.io** - Real-time communication for chat functionality.

---

## 🚀 Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/vibra.git
cd vibra

### Start the Backend

cd backend
npx nodemon server.js

### Start the Frontend

cd frontend
npm install
npm run dev

## 🔒 Authentication and Security

- **Registration and Login**: Users can register and log in using their email and password.
- **JWT Token**: Tokens are stored in httpOnly cookies for enhanced security.
- **Authorization**: Protected routes are handled using `authMiddleware`.

---

## 💬 Real-Time Chat

- **Socket.io**: Enables real-time communication between users.
- **Message Storage**: All messages are stored in the MongoDB database.
- **Chat Interface**: Clicking on another user opens a chat window.

---

## 📸 Image Management

- **Adding Images**: Users can upload images to their profile.
- **Cloud Storage**: Images are stored on a cloud service, and URLs are saved in the database.
- **Image Display**: The profile page displays up to 9 images per user.

##  Project Structure

vibra/
 ├── backend/
 │   ├── controllers/    # Logic for handling requests
 │   ├── models/         # MongoDB schemas
 │   ├── routes/         # API routes
 │   ├── middleware/     # Middleware functions (e.g., authentication)
 │   ├── config/         # Configuration (e.g., database)
 │   ├── server.js       # Backend entry point
 │   ├── .env            # Environment variables
 │
 ├── frontend/
 │   ├── src/
 │   │   ├── assets/     # Static resources (images, fonts)
 │   │   ├── components/ # Reusable components
 │   │   ├── pages/      # Application pages
 │   │   ├── styles/     # SCSS files
 │   │   ├── App.tsx     # Main React component
 │   │   ├── main.tsx    # Frontend entry point
 │   ├── vite.config.ts  # Vite configuration
 │   ├── tsconfig.json   # TypeScript configuration
 │
 ├── README.md           # Documentation
 ├── package.json        # Dependencies and scripts
 ├── .gitignore          # Files to ignore in Git

🖼️ **Screenshots**

- **Home Page**  
  ![Home Page]((https://github.com/marko353/vibra-project/tree/7e1df8b92b2e02b715a92d7109a8bfad193551d0/screenshots))  
  Description: The home page with basic information about the application.

- **Registration**  
  ![Registration](/registration.png)  
  Description: Form for new user registration.

- **Login**  
 ![image](/login.png)

)  
  Description: Form for existing user login.

- **User Profile**  
  ![Profile](/profilePage.png)  
  Description: User profile page with images and information.

- **Real-Time Chat**  
![Chat Page](/chatPage.png)

)  
  Description: Real-time chat window for user communication.

📩 **Contact**  
For questions, suggestions, or collaborations, feel free to contact us at [markostojanovic353@gmail.com].



