# Loom & Legacy

A full-stack e-commerce web application built with **React, Node.js, Express, and MongoDB**, featuring JWT authentication, secure access and refresh token handling, Product CRUD APIs, request validation, and a React frontend.

---

## 📌 Project Overview

**Loom & Legacy** is an e-commerce platform developed as part of the Sheryians Coding School Authentication & Product CRUD assignment.

The project focuses on building a secure REST API and a frontend application that consumes those APIs.

### Core Features

- User registration and login
- JWT Access Token authentication
- JWT Refresh Token authentication
- Refresh Token rotation
- Secure HTTP-only refresh-token cookies
- Logout and token invalidation
- Current user profile
- Protected routes
- Product CRUD operations
- Request validation using `express-validator`
- Password hashing using `bcrypt`
- React-based frontend
- Authentication state management using Context API

---

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (`jsonwebtoken`)
- bcrypt
- express-validator
- cookie-parser
- dotenv

### Frontend

- React
- React Router
- Axios
- Context API
- CSS / Tailwind CSS

---

## 🔐 Authentication

Loom & Legacy uses JWT-based authentication with two types of tokens.

### Access Token

- Short-lived
- Used to authenticate API requests
- Sent through the `Authorization` header

```http
Authorization: Bearer <access-token>
```

### Refresh Token

- Long-lived
- Stored in an HTTP-only cookie
- Persisted server-side for revocation
- Used to generate a new Access Token

### Authentication Flow

```text
                    LOGIN
                      │
                      ▼
              Verify Credentials
                      │
                      ▼
             Generate Access Token
                      │
                      ├──────────────► JSON Response
                      │
                      ▼
             Generate Refresh Token
                      │
                      ▼
             Store in Database
                      │
                      ▼
             HTTP-only Cookie
```

### Refresh Flow

```text
              Access Token Expires
                      │
                      ▼
              Refresh Token Cookie
                      │
                      ▼
             Verify Refresh Token
                      │
                      ▼
             Check Database Token
                      │
                      ▼
             Generate New Tokens
                      │
                      ▼
             Rotate Refresh Token
```

---

## 👤 Authentication APIs

Base URL:

```text
/api/auth
```

### Register

```http
POST /api/auth/register
```

**Request Body**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "confirmPassword": "Password123"
}
```

**Requirements**

- Validate name
- Validate email format
- Validate password
- Validate confirm password
- Reject duplicate email addresses
- Hash password using bcrypt
- Never store plaintext passwords
- Return created user without password
- Do not return access or refresh tokens during registration

**Response**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

### Login

```http
POST /api/auth/login
```

**Request Body**

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Requirements**

- Verify user credentials
- Compare password using bcrypt
- Return a generic authentication error for invalid credentials
- Generate a short-lived Access Token
- Generate a long-lived Refresh Token
- Store Refresh Token server-side
- Send Refresh Token through an HTTP-only cookie
- Return Access Token in the response body

**Response**

```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "accessToken": "..."
  }
}
```

### Refresh Token

```http
POST /api/auth/refresh-token
```

**Requirements**

- Read Refresh Token from HTTP-only cookie
- Verify Refresh Token
- Check Refresh Token against the database
- Reject expired or invalid Refresh Tokens
- Generate a new Access Token
- Rotate the Refresh Token
- Update the stored Refresh Token
- Update the HTTP-only cookie

### Logout

```http
POST /api/auth/logout
```

**Authentication:** Required

**Requirements**

- Invalidate the stored Refresh Token
- Clear the Refresh Token cookie

### Current User

```http
GET /api/auth/me
```

**Authentication:** Required

**Response:** Returns the profile of the currently authenticated user.

---

## 🛡️ Authentication Middleware

Protected routes use an `authenticate` middleware.

The middleware:

1. Reads the `Authorization` header.
2. Extracts the Bearer Access Token.
3. Verifies the JWT.
4. Decodes the token payload.
5. Attaches the authenticated user information to `req.user`.
6. Calls `next()`.

Example:

```http
Authorization: Bearer <access-token>
```

The middleware is used by protected endpoints such as:

```text
POST   /api/auth/logout
GET    /api/auth/me

POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

---

## 📦 Product APIs

Base URL:

```text
/api/products
```

### Create Product

```http
POST /api/products
```

**Authentication:** Required

Creates a new product.

### Get All Products

```http
GET /api/products
```

**Authentication:** Not required

Returns all products. Pagination can be implemented as an optional enhancement.

### Get Single Product

```http
GET /api/products/:id
```

**Authentication:** Not required

Returns a single product.

### Update Product

```http
PUT /api/products/:id
```

**Authentication:** Required

Updates an existing product. The product ID must be validated before querying the database.

### Delete Product

```http
DELETE /api/products/:id
```

**Authentication:** Required

Deletes an existing product. The product ID must be validated before performing the deletion.

---

## ✅ Request Validation

All routes accepting:

- Request body
- URL parameters
- Query parameters

will use `express-validator`.

Validation occurs before the request reaches the controller.

### Validation Flow

```text
Request
   │
   ▼
Validation Middleware
   │
   ├── Invalid ──► 400 Response
   │
   ▼
Controller
```

### Authentication Validation

The following inputs are validated:

- Name
- Email
- Password
- Confirm Password

### Product Validation

Product validation includes:

- Required fields
- Correct data types
- Price
- Stock
- Product ID

Invalid requests return HTTP `400` responses with field-level validation errors.

Example:

```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

---

## 🔒 Security

Loom & Legacy follows these security practices:

- Passwords are hashed using bcrypt.
- Plaintext passwords are never stored.
- Passwords are never returned in API responses.
- JWT secrets are stored in environment variables.
- Access Tokens are short-lived.
- Refresh Tokens are long-lived.
- Refresh Tokens are stored server-side for revocation.
- Refresh Tokens are stored in HTTP-only cookies.
- Protected routes require a valid Access Token.
- Invalid or expired Refresh Tokens require the user to authenticate again.

---

## 🖥️ Frontend

The frontend provides a simple interface for interacting with the backend APIs.

### Authentication Pages

- Register
- Login

### Product Features

- Product listing
- Product details
- Add product
- Edit product
- Delete product

Protected product operations require authentication.

---

## 🧠 Frontend Authentication Architecture

Authentication state is managed using React Context API.

```text
src/
│
├── api/
│   ├── axios.js
│   └── auth.api.js
│
├── context/
│   └── AuthContext.jsx
│
├── hooks/
│   └── useAuth.js
│
├── components/
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Products.jsx
│
└── routes/
    └── ProtectedRoute.jsx
```

### Auth Context

The authentication context manages:

- Current user
- Access Token
- Authentication state
- Loading state
- Login
- Register
- Logout
- Access Token refresh

---

## 🔄 Frontend Authentication Flow

### Login

```text
Login Page
    │
    ▼
Auth Context
    │
    ▼
Login API
    │
    ├── Access Token
    │
    └── HTTP-only Refresh Token Cookie
    │
    ▼
Update Auth State
```

### Page Refresh

```text
Application Starts
        │
        ▼
Refresh Token Cookie
        │
        ▼
Refresh API
        │
        ▼
New Access Token
        │
        ▼
Current User API
        │
        ▼
Restore Authentication State
```

---

## 🗄️ Data Models

### User Model

```text
User
├── name
├── email
├── passwordHash
├── role
└── refreshToken
```

Supported roles:

- `user`
- `seller`

### Product Model

The Product resource contains the required product information, including fields such as:

```text
Product
├── name
├── price
├── stock
└── ...
```

Product fields are validated before database operations.

---

## 🌱 Environment Variables

### Backend

Create a `.env` file inside the `backend` directory:

```env
PORT=3000

MONGODB_URI=mongodb_connection_string

ACCESS_TOKEN_SECRET=access_token_secret
REFRESH_TOKEN_SECRET=refresh_token_secret

ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
```

### Frontend

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:3000/api
```

For production, replace the local URL with the deployed backend URL.

---

## 🛠️ Local Development

### Clone Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### Backend Setup

```bash
cd backend
npm install
```

Create the `.env` file and configure the required environment variables.

Start the backend development server:

```bash
npm run dev
```

### Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Configure the frontend `.env` file:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

---

## 📁 Project Structure

```text
loom-and-legacy/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── validators/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── App.jsx
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## 📋 API Summary

| Method | Endpoint                  | Authentication | Description                |
| ------ | ------------------------- | -------------- | -------------------------- |
| POST   | `/api/auth/register`      | Public         | Register a new user        |
| POST   | `/api/auth/login`         | Public         | Authenticate user          |
| POST   | `/api/auth/refresh-token` | Refresh Token  | Generate new Access Token  |
| POST   | `/api/auth/logout`        | Required       | Logout user                |
| GET    | `/api/auth/me`            | Required       | Get current user           |
| POST   | `/api/products`           | Required       | Create product             |
| GET    | `/api/products`           | Public         | List products              |
| GET    | `/api/products/:id`       | Public         | Get single product         |
| PUT    | `/api/products/:id`       | Required       | Update product             |
| DELETE | `/api/products/:id`       | Required       | Delete product             |

---

## 🚧 Development Status

### Backend

- [ ] User registration
- [ ] Login
- [ ] Access Token generation
- [ ] Refresh Token generation
- [ ] Refresh Token rotation
- [ ] Logout
- [ ] Current user API
- [ ] Authentication middleware
- [ ] Product creation
- [ ] Product listing
- [ ] Product details
- [ ] Product update
- [ ] Product deletion
- [ ] Request validation
- [ ] Error handling

### Frontend

- [ ] Register page
- [ ] Login page
- [ ] Authentication Context
- [ ] Axios API integration
- [ ] Protected routes
- [ ] Session restoration
- [ ] Product listing
- [ ] Add product
- [ ] Edit product
- [ ] Delete product

---

## 🔄 Application Data Flow

```text
                     FRONTEND
                         │
                         ▼
                    React UI
                         │
                         ▼
                    Axios API
                         │
                         ▼
                    EXPRESS API
                         │
              ┌──────────┴──────────┐
              │                     │
        Validation              Authentication
        Middleware                Middleware
              │                     │
              └──────────┬──────────┘
                         │
                         ▼
                     Controller
                         │
                         ▼
                      Mongoose
                         │
                         ▼
                     MongoDB
                         │
                         ▼
                    API Response
                         │
                         ▼
                     React UI
```

---

## 🎯 Project Goal

The primary goal of Loom & Legacy is to demonstrate a complete understanding of:

- REST API development
- Authentication and authorization
- JWT Access and Refresh Tokens
- Secure password handling
- Express middleware
- Request validation
- MongoDB database operations
- CRUD architecture
- React API integration
- Context API state management
- Protected frontend routes
- Frontend-backend communication

The project is designed with an emphasis on understanding the complete request-response lifecycle rather than simply implementing isolated features.

---

## 📦 Submission

The final project will contain:

- GitHub repository
- Backend code
- Frontend code
- README.md
- API documentation
- Environment setup instructions
- Live project link

---

## 👨‍💻 Project

**Loom & Legacy**

Full-stack E-commerce Web Application built with React, Node.js, Express & MongoDB.