# quick-chat
Quick Chat is a dynamic web-based messaging application built using the MERN stack, complemented by Socket.IO for real-time communication. Material-UI is used for the frontend to ensure a polished and intuitive user experience.
## Live Demo: https://quick-chat-kqjq.onrender.com
## Screenshots
![image](https://github.com/user-attachments/assets/b985c576-6e3d-4fbf-86ec-8a932ea8853e)
![image](https://github.com/user-attachments/assets/bb4dffc4-dede-4f7f-a63a-51353a531e86)
![image](https://github.com/user-attachments/assets/dbabf3b3-94ee-43c5-a28b-fcb727b36cac)
![image](https://github.com/user-attachments/assets/917f8ce2-8177-4b84-93ca-70f837acf9c8)
![image](https://github.com/user-attachments/assets/421956ff-7ef2-461d-95cc-d1e67ee7c0fa)
![image](https://github.com/user-attachments/assets/a4f85ac6-3ce7-4c17-9b70-2900c7045672)
![image](https://github.com/user-attachments/assets/b3883b0d-288f-4910-9a32-6630cd47413d)

![image](https://github.com/user-attachments/assets/5b2c80a0-2d9f-44ca-b764-600b7742915e)
![image](https://github.com/user-attachments/assets/31465a15-0a5d-4599-be80-4ba5bbed4cfa)
![image](https://github.com/user-attachments/assets/af06cb66-759b-4267-8a6a-472f687e1a13)
![image](https://github.com/user-attachments/assets/7459335f-0d6b-4444-a5ef-50c3735eba9b)
![image](https://github.com/user-attachments/assets/cb4cf4a0-9eff-41e1-be11-590b7b7e7a97)
![image](https://github.com/user-attachments/assets/d63e1180-9a71-4af1-b952-907039e19229)
![image](https://github.com/user-attachments/assets/b065c3ab-77c5-4f96-9dad-87a3d05bcf09)

## Overview

Quick Chat is a dynamic web-based messaging application crafted utilizing the MERN stack, complemented by Socket.IO for real-time communication. The stack comprises MongoDB for database management, Express.js for server-side application logic, React.js for constructing interactive user interfaces, and Node.js for backend execution.

Material-UI is employed for frontend development, providing a robust set of React components designed according to Google's Material Design principles. This choice ensures a polished and intuitive user experience, with a consistent design language across the application.

### Technologies and Components

1. **MongoDB**: A NoSQL database system used to store and manage the application's data efficiently. MongoDB's flexible document-oriented structure makes it suitable for handling various types of data, including user profiles, messages, and chat histories.

2. **Express.js**: A web application framework for Node.js, Express.js facilitates the creation of robust and scalable server-side applications. It simplifies routing, middleware integration, and handling HTTP requests/responses, making it an ideal choice for building the backend of Quick Chat.

3. **React.js**: A JavaScript library for building user interfaces, React.js enables the creation of dynamic and interactive frontend components. Its component-based architecture promotes reusability, modularity, and efficiency in UI development, crucial for implementing features like real-time messaging in Quick Chat.

4. **Node.js**: An asynchronous event-driven JavaScript runtime, Node.js powers the backend of Quick Chat, facilitating non-blocking I/O operations and efficient handling of concurrent connections. It serves as the runtime environment for executing JavaScript code on the server-side, seamlessly integrating with other components of the MERN stack.

5. **Socket.IO**: A library that enables real-time, bidirectional communication between web clients and servers, Socket.IO is instrumental in implementing features like instant messaging in Quick Chat. It establishes WebSocket connections to enable low-latency, high-performance data exchange, ensuring seamless communication between users.

6. **Material-UI**: A popular React UI framework, Material-UI provides a comprehensive set of pre-designed components and styles inspired by Google's Material Design guidelines. It offers a wide range of customizable UI elements, including buttons, inputs, dialogs, and icons, allowing developers to create visually appealing and responsive user interfaces with minimal effort.

By leveraging the MERN stack, Socket.IO, and Material-UI, Quick Chat delivers a seamless messaging experience with real-time updates, intuitive user interfaces, and robust backend functionality, catering to the needs of modern web-based communication platforms.

## Features

- **One-to-One Chat**: Engage in private conversations with other users.
- **Group Chat**: Create and participate in group discussions.
- **Search Users**: Find users by their email address or name.
- **View Profile**: Access and view your profile as well as other users' profiles.
- **Change Image**: Update your profile picture easily.
- **Update Profile**: Edit and update your profile details.
- **Update Group Chat Name**: Modify the name of your group chats.
- **Manage Group Users**: Add or remove users from a group if you are the admin.
- **Change Theme**: Toggle between light and dark modes for the chat interface.
- **Typing Indicator**: See when someone is typing a message in real-time.
- **Real-Time Notifications**: Receive instant notifications for new messages.

## Installation

Follow these steps to set up the project locally.

1. **Clone the repository:**

    ```bash
    git clone https://github.com/abhik-develops/quick-chat.git
    cd quick-chat
    ```

2. **Install dependencies for both frontend and backend:**

    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the `root` directory and add your MongoDB connection string, JWT secret, and other necessary environment variables.

    ```env
    PORT=8000
    FRONTEND_URL="http://localhost:5173"
    DB_URL="your-mongodb-url"
    DB_NAME='chatdb'
    JWT_SECRET='your-jwt-secret'
    NODE_ENV='development'
    EMAIL_HOST='smtp.gmail.com'
    EMAIL_PORT=587
    EMAIL_USER='your-email-user'
    EMAIL_PASS='your-email-password'
    EMAIL_FROM='your-email-from'
    VITE_ENDPOINT="http://localhost:8000"
    VITE_IMAGE_UPLOAD_URL="https://api.cloudinary.com"
    ```

4. **Run the application:**

    ```bash
    # Start backend server
    cd backend
    npm start

    # Start frontend server
    cd ../frontend
    npm run dev
    ```

5. **Access the application:**

    Open your browser and go to `http://localhost:5173`.

## Technologies Used

- **Frontend:** React.js, Material-UI
- **Backend:** Node.js, Express.js, MongoDB, Socket.IO

## Contributing

We welcome contributions! To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

