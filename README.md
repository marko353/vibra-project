
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

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/yourusername/vibra.git  
cd vibra

2️⃣ Set up the backend
bash
Copy
Edit
cd backend  
npm install  
npx nodemon server.js  
3️⃣ Set up the frontend
bash
Copy
Edit
cd frontend  
npm install  
npm run dev 
🔒 Authentication & Security
✅ User Registration & Login – Users create an account with email and password
✅ JWT Token – Secure authentication via HTTP-only cookies
✅ Protected Routes – Only authenticated users can access certain features

💬 Real-Time Chat
💡 Powered by Socket.io, enabling real-time conversations between users.

🔹 Instant message delivery
🔹 Message history stored in MongoDB
🔹 Simple and intuitive chat interface

yaml
Copy
Edit

---

### **PART 3: Images, Structure, Screenshots, and Contact**  

```md
---

## 📸 Image Management  
🖼️ Users can **upload profile images**, stored on cloud services like **Cloudinary** or **AWS S3**.  

🔹 Up to **9 images** per profile  
🔹 Displayed in a **responsive grid layout**  

---

## 📂 Project Structure  
vibra/ ├── backend/ │ ├── controllers/ # API request logic │ ├── models/ # MongoDB schemas and models │ ├── routes/ # API endpoints │ ├── middleware/ # Authentication middleware │ ├── config/ # Configuration files │ ├── server.js # Backend entry point │ ├── frontend/ │ ├── src/ │ │ ├── assets/ # Static resources (images, fonts) │ │ ├── components/ # Reusable UI components │ │ ├── pages/ # App pages (Home, Profile, Chat) │ │ ├── styles/ # SCSS files │ │ ├── App.tsx # Main React component │ │ ├── main.tsx # Frontend entry point │ ├── vite.config.ts # Vite configuration │ ├── tsconfig.json # TypeScript configuration │ ├── README.md # Project documentation ├── package.json # Dependencies and scripts ├── .gitignore # Files to be ignored by Git

yaml
Copy
Edit

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

📧 **Email:** [your-email@example.com](mailto:your-email@example.com)  
💻 **GitHub:** [yourusername](https://github.com/yourusername)  
🔗 **LinkedIn:** [Your Name](https://linkedin.com/in/yourprofile)  
