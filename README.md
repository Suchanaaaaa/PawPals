# 🐾 PawPals

**PawPals** is a MERN-stack based pet adoption platform that connects people who want to adopt pets with pet owners. Users can submit pets for adoption, while administrators review submissions and manage adoption requests.

## 🌟 Features

### 👤 User Features

* User registration and login
* JWT-based authentication
* Browse available pets
* View detailed pet information
* Submit a pet for adoption
* Adoption request submission
* View submitted adoption requests
* Users cannot adopt their own pets

### 🛡️ Admin Features

* Secure admin authentication
* Admin dashboard
* Review pending pet submissions
* Approve or reject pet submissions
* View all adoption requests
* Approve or reject adoption requests
* Automatically mark an adopted pet as **Adopted**
* Automatically reject other pending requests when one adoption request is approved

### 🐶 Pet Management

* Pet name
* Category
* Age
* Gender
* Location
* Description
* Image URL
* Pet owner information
* Pet status:

  * `Pending`
  * `Available`
  * `Adopted`
  * `Rejected`

## 🛠️ Technologies Used

### Frontend

* React.js
* React Router
* JavaScript
* HTML
* CSS

### Backend

* Node.js
* Express.js
* REST API
* JWT Authentication
* bcrypt.js

### Database

* MongoDB
* MongoDB Atlas
* Mongoose

### Development Tools

* Git
* GitHub
* VS Code
* npm

## 📁 Project Structure

```text
PawPals/
│
├── backend/
│   ├── middleware/
│   │   ├── adminMiddleware.js
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Pet.js
│   │   └── AdoptionRequest.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── petRoutes.js
│   │   └── adoptionRoutes.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   └── Navbar.jsx
    │   │
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── SubmitPet.jsx
    │   │   ├── PetDetails.jsx
    │   │   └── AdminDashboard.jsx
    │   │
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    │
    └── package.json
```

## 🔐 Authentication

PawPals uses **JWT (JSON Web Token)** for authentication.

The authentication system provides:

* Secure user registration
* Secure login
* Password hashing using bcrypt
* Protected routes
* Admin-only routes
* Token-based authorization

## 🔄 Pet Approval Workflow

```text
User submits pet
       ↓
     Pending
       ↓
Admin reviews submission
       ↓
 ┌───────────────┐
 ↓               ↓
Approve        Reject
 ↓               ↓
Available      Rejected
 ↓
Visible on Home
```

## 🏠 Adoption Workflow

```text
User views Available Pet
          ↓
   Submit Adoption Request
          ↓
        Pending
          ↓
    Admin reviews request
          ↓
   ┌───────────────┐
   ↓               ↓
Approve          Reject
   ↓               ↓
Adopted         Rejected
   ↓
Pet unavailable
```

## 🚀 How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/Suchanaaaaa/PawPals.git
```

```bash
cd PawPals
```

### 2. Backend Setup

Go to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the backend:

```bash
node server.js
```

The backend will run on:

```text
https://paw-pals-backend.vercel.app
```

### 3. Frontend Setup

Open another terminal and go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm start
```

The frontend will run on:

```text
http://localhost:3000
```

## 🔑 Admin Access

Admin users are identified using the `role` field in the database.

Example:

```text
role: "admin"
```

Admin users can access:

```text
/admin
```

and manage:

* Pet submissions
* Adoption requests

## 🔒 Environment Variables

Sensitive information such as MongoDB credentials should **not** be committed to GitHub.

The `.env` file is ignored using `.gitignore`.

Example:

```env
MONGO_URI=your_mongodb_uri
PORT=5000
```

> ⚠️ Never upload your MongoDB username/password or other secrets to GitHub.

## 📌 API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

### Pets

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| GET    | `/api/pets`     | Get available pets |
| GET    | `/api/pets/:id` | Get pet details    |
| POST   | `/api/pets/add` | Submit a new pet   |
| DELETE | `/api/pets/:id` | Delete pet         |

### Adoption

| Method | Endpoint                           | Description             |
| ------ | ---------------------------------- | ----------------------- |
| POST   | `/api/adoptions/request/:petId`    | Submit adoption request |
| GET    | `/api/adoptions/my-requests`       | Get user's requests     |
| GET    | `/api/adoptions/admin/all`         | Get all requests        |
| PUT    | `/api/adoptions/admin/approve/:id` | Approve adoption        |
| PUT    | `/api/adoptions/admin/reject/:id`  | Reject adoption         |

## 🎯 Project Goal

The goal of PawPals is to provide a simple and organized platform for pet adoption where:

* Pet owners can list pets for adoption.
* Administrators can verify pet submissions.
* Potential adopters can apply for pets.
* Administrators can manage adoption applications.
* The adoption process becomes more organized and transparent.

## 🔮 Future Improvements

Possible future improvements include:

* Image upload using Cloudinary
* Search and filter pets
* Pet category filtering
* Location-based search
* Email notifications
* User profile management
* Adoption history
* Admin statistics and analytics
* Responsive mobile UI
* Online chat between adopter and pet owner

## 👩‍💻 Author

**Tasfia Khanam Suchana**

Computer Science & Engineering Student

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

**PawPals — Find a Friend, Give a Home. 🐾**
