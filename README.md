Library Management System - Frontend
This is the frontend of the Library Management System, built using React.js. It provides the user interface for interacting with the backend API to manage books, users, and borrowing operations.

Features:
-User Registration and Login.
-Role-based Access Control: Admin and User views.
-View, Borrow, and Return Books.
-Admin Dashboard for managing users and books.
-View Borrowing History for users and admins.
-Pagination and Filtering of books.

Technologies Used:
-React.js (JavaScript library)
-Axios (for making HTTP requests to the backend)
-Bootstrap (for responsive design)
-JWT for authentication handling

Requirements:
-Node.js and npm installed.
-Backend (Spring Boot) running at http://localhost:8080 (or your backend's URL).
-Clone and set up the backend project first.

Getting Started:
1. Clone the repository
Copy code
git clone https://github.com/erzabytyci/library-management-frontend.git
cd library-management-frontend

3. Install Dependencies
Install the required dependencies by running:

Copy code
npm install

3. Configure the API URL
In the src/axiosConfig.js file (or any file where you're managing API calls), update the base URL to match the backend URL:

javascript
const API_URL = "http://localhost:8080/api"; // Change if backend is hosted elsewhere

4. Run the Application
To start the development server, run:

Copy code
npm start
The application will start on http://localhost:3000.

5. Build the Application for Production
To create a production build:

Copy code
npm run build
This will generate a build/ directory with optimized static files.

Usage
Once the application is running, users can:

Register: Create a new account using the registration form.
Login: Log into the system to access features like borrowing books and viewing their profile.
View Books: Browse through the available books with pagination and filtering options.
Borrow and Return Books: Borrow books and return them via the user's borrowing history.

Admin Functionality:
View all users and delete users.
Add new books, delete existing books.
View all borrowing history (Admin only).

Project Structure:

src
├── api                     # API configuration and service-related files
│   ├── axiosConfig.js      # Axios instance setup for making HTTP requests to the backend
│   |
├── components
│   ├── Admin               # Admin functionalities for managing users and books
│   ├── Auth                # Login and Registration forms
│   ├── Books               # Book list, borrow and return functionality
│   ├── Borrow              # User's borrow history
│   └── Profile             # User profile and edit functionality
|
└── App.js                  # Main application component

API Integration
The frontend interacts with the backend using Axios for HTTP requests.

JWT tokens are stored in localStorage to manage session authentication.

Example API usage:

Copy code
import axios from 'axios';

const API_URL = "http://localhost:8080/api"; // Backend URL

// Example for fetching books
axios.get(`${API_URL}/books`, { headers: { Authorization: `Bearer ${token}` } })
     .then(response => {
        console.log(response.data);
     })
     .catch(error => {
        console.error(error);
     });
     
Authentication
JWT Authentication: The app uses JWT tokens to handle authentication. After login, the JWT token is stored in localStorage, and it is included in the headers of all requests to protected endpoints.

License
This project is licensed under the MIT License - see the LICENSE file for details.
