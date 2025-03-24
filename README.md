
# 🎉 VibrA - Modern Dating Application  

🚀 **VibrA** is a modern dating application designed to provide a fast, secure, and intuitive user experience.  

The application uses:  
✅ **React (Vite) + TypeScript** for the frontend  
✅ **Node.js (Express) + MongoDB Atlas** for the backend  

🔹 Supports **real-time chat** via Socket.io  
🔹 Secure authentication using **JWT tokens**  
🔹 User image management  

---

## 📌 Table of Contents  
- [🛠️ Technologies](#️-technologies)  
- [🚀 Installation and Setup](#-installation-and-setup)  
- [🔒 Authentication & Security](#-authentication--security)  
- [💬 Real-Time Chat](#-real-time-chat)  
- [📸 Image Management](#-image-management)  
- [📂 Project Structure](#-project-structure)  
- [🖼️ Screenshots](#-screenshots)  
- [📩 Contact](#-contact)  

---

## 🛠️ Technologies  

### 📌 **Frontend**  
- **React (Vite)** – Fast and modern frontend framework  
- **TypeScript** – Adds static typing to improve code quality  
- **SCSS** – Powerful CSS preprocessor for cleaner styling  
- **React Router** – Handles client-side navigation  
- **Axios** – HTTP client for API requests  

### 🔧 **Backend**  
- **Node.js (Express)** – Scalable and efficient server framework  
- **MongoDB Atlas** – Cloud database for data storage  
- **Mongoose** – ODM for MongoDB  
- **JWT (JSON Web Token)** – Secure user authentication  
- **bcryptjs** – Hashing passwords for security  
- **Socket.io** – Enables real-time communication

- ---

  ## 🚀 Installation and Setup  

  ### 📌 **Frontend**

Follow these steps to set up and run the project locally.
1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/vibra.git
    cd vibra
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root of the project and add the following variables:

    ```bash
    MONGO_URI=<your_mongodb_atlas_connection_string>
    CLOUD_STORAGE_URL=<your_cloud_storage_url>
    GOOGLE_CLIENT_ID=<your_google_oauth_client_id>
    GOOGLE_CLIENT_SECRET=<your_google_oauth_client_secret>
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

## Backend Setup and Installation

This section covers how to set up and install the backend for the VibrA dating application.

### Prerequisites

Before you begin, make sure you have the following:

- **Node.js** (>=14.x)
- **MongoDB Atlas** account for the database
- **Cloudinary** or another cloud storage service for image hosting
- **Google OAuth credentials** for authentication (Client ID and Secret)

### Installation Steps

1. **Clone the repository:**

    Clone the backend repository to your local machine:

    ```bash
    git clone https://github.com/marko353/vibra-backend
    cd vibra-backend
    ```

2. **Install dependencies:**

    Make sure you have all the necessary dependencies installed by running:

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    In the root of the project, create a `.env` file and add the following variables:

    ```bash
    MONGO_URI=<your_mongodb_atlas_connection_string>
    CLOUD_STORAGE_URL=<your_cloud_storage_url>
    GOOGLE_CLIENT_ID=<your_google_oauth_client_id>
    GOOGLE_CLIENT_SECRET=<your_google_oauth_client_secret>
    JWT_SECRET=<your_jwt_secret_key>
    PORT=5000
    ```

    Make sure to replace the placeholders with your actual values for MongoDB, Cloud storage, and Google OAuth credentials.

4. **Run the server:**

    You can now start the backend server with:

    ```bash
    npx nodemon server.js
    ```

    This will start the server with **Nodemon** for auto-reloading during development.

### Endpoints

Here are the main backend endpoints for the VibrA application:

- **POST /auth/google** - Google OAuth authentication
- **POST /auth/register** - Register a new user
- **POST /auth/login** - Login an existing user
- **GET /profile/:id** - Fetch user profile by ID
- **POST /profile/upload** - Upload images (via Cloud storage)
- **GET /users** - Get a list of all users
- **POST /chat** - Send a message in a chat
- **GET /chat/:userId** - Get chat history with a specific user

## Testiranje

Ovaj projekat koristi [Jest](https://jestjs.io/) kao alat za testiranje. Testovi su napisani u TypeScript-u i pokreću se u okruženju zasnovanom na `jsdom` za simulaciju browser okruženja.

### Pokretanje testova

Da bi pokrenuo testove, koristi sledeću komandu:

```bash
npm run test

  

## 📸 Image Management  
🖼️ Users can **upload profile images**, stored on cloud services like **Cloudinary** or **AWS S3**.  

🔹 Up to **9 images** per profile  
🔹 Displayed in a **responsive grid layout**  

---
## Structure

### 📍  
![Structure](/project.png)  


---

## 🖼️ Screenshots  

### 📍 Home Page  
![Home Page](screenshots/homePage.png)  
*Overview of the application's features.*  

### 🔐 Registration  
![Registration](screenshots/registration.png)  
*Users can create an account quickly and easily.*  

### 🔑 Login  
![Login](screenshots/login.png)  
*Secure login using email and password.*  

### 🏆 User Profile  
![Profile](screenshots/profilePage.png)  
*Displays user information and uploaded images.*  

### 💬 Real-Time Chat  
![Chat Page](screenshots/chatPage.png)  
*Chat with other users in real-time.*  

---

## 📩 Contact  
💡 For questions, suggestions, or collaboration opportunities, feel free to reach out:  

📧 **Email:**[markostojanovic353@gmail.com](markostojanovic353@gmail.com)  
💻 **GitHub:** [https://github.com/marko353](https://github.com/marko353)  
🔗 **LinkedIn:** [https://www.linkedin.com/in/marko-stojanovic-87992b250/](https://www.linkedin.com/in/marko-stojanovic-87992b250/)  
