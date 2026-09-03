# Salon Management API

A RESTful backend API for managing **salons, salon services, and user authentication**. This project is built using **Node.js, Express.js, Supabase, JWT, and bcryptjs**.

The API provides CRUD operations for salons and services, secure user registration and login, JWT-based authentication for protected routes, input validation, request logging, and filtering functionality.

Render Live link : https://salon-management-api-m1lg.onrender.com

---

## 📌 Project Overview

The **Salon Management API** allows users to:

* Register and log in securely.
* Store user information in Supabase.
* Hash passwords using bcrypt.
* Generate JWT tokens after successful login.
* Authenticate protected API routes using JWT.
* Create, read, update, and delete salons.
* Create, read, update, and delete salon services.
* Find the top 5 salons based on rating.
* Filter salons by city.
* View available services.
* Log every incoming request with its method, path, and timestamp.

---

## 🛠️ Technologies Used

* **Node.js** – JavaScript runtime environment
* **Express.js** – Backend web framework
* **Supabase** – PostgreSQL database and backend service
* **@supabase/supabase-js** – Supabase client SDK
* **bcryptjs** – Password hashing
* **jsonwebtoken (JWT)** – User authentication
* **dotenv** – Environment variable management
* **cors** – Cross-Origin Resource Sharing
* **Postman** – API testing
* **Nodemon** – Development server auto-restart

---

## 📂 Project Structure

```text
salon-management-api/
│
├── config/
│   └── supabase.js
│
├── controllers/
│   ├── authController.js
│   ├── salonController.js
│   └── serviceController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── loggerMiddleware.js
│
├── models/
│   ├── userModel.js
│   ├── salonModel.js
│   └── serviceModel.js
│
├── routes/
│   ├── authRoutes.js
│   ├── salonRoutes.js
│   └── serviceRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

---

## 🗄️ Database

Supabase is used as the database for this project.

The application contains three main tables:

### 1. Users

| Field      | Type    | Description            |
| ---------- | ------- | ---------------------- |
| `id`       | UUID    | Unique user ID         |
| `username` | VARCHAR | Username               |
| `email`    | VARCHAR | User email             |
| `password` | TEXT    | Bcrypt hashed password |

---

### 2. Salons

| Field     | Type    | Description              |
| --------- | ------- | ------------------------ |
| `id`      | UUID    | Unique salon ID          |
| `name`    | VARCHAR | Salon name               |
| `city`    | VARCHAR | Salon city               |
| `address` | TEXT    | Salon address            |
| `rating`  | NUMERIC | Salon rating from 0 to 5 |

---

### 3. Services

| Field         | Type    | Description                   |
| ------------- | ------- | ----------------------------- |
| `id`          | UUID    | Unique service ID             |
| `salonId`     | UUID    | Foreign key referencing salon |
| `serviceName` | VARCHAR | Name of service               |
| `price`       | NUMERIC | Service price                 |
| `duration`    | VARCHAR | Service duration              |
| `isAvailable` | BOOLEAN | Service availability          |

### Relationship

```text
Salon
  │
  │ 1
  │
  │
  ▼
Services
  │
  │ many
```

A single salon can have multiple services.

The `salonId` field in the `services` table acts as a foreign key to the `salons` table.

---

## 🔐 Authentication

This API uses **JWT authentication** for protected routes.

### Registration

When a user registers:

```text
User submits username, email and password
                 ↓
         Validate input
                 ↓
       Hash password using bcrypt
                 ↓
         Store user in Supabase
```

Passwords are never stored as plain text.

### Login

When a user logs in:

```text
Email + Password
       ↓
Find user in Supabase
       ↓
Compare password using bcrypt
       ↓
Generate JWT token
       ↓
Return token to client
```

### Protected Routes

Protected routes require:

```text
Authorization: Bearer <JWT_TOKEN>
```

The JWT middleware verifies the token before allowing access.

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory.

```env
PORT=4000

SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_secret_key

JWT_SECRET=your_jwt_secret
```

### Example

```env
PORT=4000

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_secret_key

JWT_SECRET=salon_management_secret_2026
```

> **Important:** Never upload the `.env` file to GitHub.

The `.gitignore` file contains:

```text
node_modules/
.env
```

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Move into the project directory

```bash
cd salon-management-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file and add your:

* Supabase URL
* Supabase secret key
* JWT secret

### 5. Start the development server

```bash
npm run dev
```

The server will run on:

```text
http://localhost:4000
```

---

## 🚀 API Endpoints

### Welcome Route

#### GET `/`

Returns a welcome message.

**Response:**

```text
Welcome to Salon APIs
```

---

# 👤 Authentication APIs

## Register User

### POST `/register`

Registers a new user.

### Request Body

```json
{
  "username": "Mahek",
  "email": "mahek@gmail.com",
  "password": "123456"
}
```

### Response

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user-uuid",
    "username": "Mahek",
    "email": "mahek@gmail.com"
  }
}
```

**Status Code:** `201 Created`

---

## Login User

### POST `/login`

Authenticates a user and returns a JWT token.

### Request Body

```json
{
  "email": "mahek@gmail.com",
  "password": "123456"
}
```

### Response

```json
{
  "message": "Login successful",
  "token": "your-jwt-token"
}
```

**Status Code:** `200 OK`

---

# 💇 Salon APIs

## Get All Salons

### GET `/salons`

Returns all salons.

**Response:**

```json
[
  {
    "id": "salon-uuid",
    "name": "Looks Salon",
    "city": "Mumbai",
    "address": "Andheri West",
    "rating": 4.5
  }
]
```

---

## Get Salon by ID

### GET `/salons/:id`

Returns a specific salon.

Example:

```text
GET /salons/12345678-1234-1234-1234-123456789abc
```

**Status Code:** `200 OK`

If the salon does not exist:

```json
{
  "message": "Salon not found"
}
```

**Status Code:** `404 Not Found`

---

## Create Salon

### POST `/salons`

Creates a new salon.

🔐 **JWT Required**

### Authorization

```text
Bearer <JWT_TOKEN>
```

### Request Body

```json
{
  "name": "Looks Salon",
  "city": "Mumbai",
  "address": "Andheri West",
  "rating": 4.5
}
```

### Response

```json
{
  "message": "Salon created successfully",
  "salon": {
    "id": "salon-uuid",
    "name": "Looks Salon",
    "city": "Mumbai",
    "address": "Andheri West",
    "rating": 4.5
  }
}
```

**Status Code:** `201 Created`

---

## Update Salon

### PUT `/salons/:id`

Updates an existing salon.

🔐 **JWT Required**

### Request Body

```json
{
  "name": "Looks Premium Salon",
  "city": "Mumbai",
  "address": "Bandra West",
  "rating": 4.8
}
```

**Status Code:** `200 OK`

---

## Delete Salon

### DELETE `/salons/:id`

Deletes a salon.

🔐 **JWT Required**

### Response

```json
{
  "message": "Salon deleted successfully"
}
```

**Status Code:** `200 OK`

---

# ⭐ Additional Salon APIs

## Top 5 Salons

### GET `/salons/top`

Returns the top 5 salons based on rating.

Example:

```json
[
  {
    "name": "Salon A",
    "rating": 4.9
  },
  {
    "name": "Salon B",
    "rating": 4.8
  }
]
```

---

## Filter Salons by City

### GET `/salons/city/:city`

Returns salons located in a particular city.

Example:

```text
GET /salons/city/Mumbai
```

---

# 💆 Service APIs

## Get Services of a Salon

### GET `/salons/:id/services`

Returns all services belonging to a particular salon.

Example:

```text
GET /salons/12345678-1234-1234-1234-123456789abc/services
```

---

## Add Service

### POST `/salons/:id/services`

Adds a service to a salon.

🔐 **JWT Required**

### Request Body

```json
{
  "serviceName": "Haircut",
  "price": 500,
  "duration": "40 min",
  "isAvailable": true
}
```

### Response

```json
{
  "message": "Service created successfully",
  "service": {
    "id": "service-uuid",
    "salonId": "salon-uuid",
    "serviceName": "Haircut",
    "price": 500,
    "duration": "40 min",
    "isAvailable": true
  }
}
```

**Status Code:** `201 Created`

---

## Update Service

### PUT `/services/:id`

Updates service details.

🔐 **JWT Required**

### Request Body

```json
{
  "serviceName": "Premium Haircut",
  "price": 700,
  "duration": "50 min",
  "isAvailable": true
}
```

**Status Code:** `200 OK`

---

## Delete Service

### DELETE `/services/:id`

Deletes a service.

🔐 **JWT Required**

### Response

```json
{
  "message": "Service deleted successfully"
}
```

**Status Code:** `200 OK`

---

## Get Available Services

### GET `/services/available`

Returns all services where:

```text
isAvailable = true
```

Example:

```json
[
  {
    "serviceName": "Haircut",
    "price": 500,
    "duration": "40 min",
    "isAvailable": true
  }
]
```

---

# 📋 API Summary

| Method | Endpoint               | Authentication | Description            |
| ------ | ---------------------- | -------------- | ---------------------- |
| GET    | `/`                    | ❌              | Welcome message        |
| POST   | `/register`            | ❌              | Register user          |
| POST   | `/login`               | ❌              | Login and generate JWT |
| GET    | `/salons`              | ❌              | Get all salons         |
| GET    | `/salons/top`          | ❌              | Get top 5 salons       |
| GET    | `/salons/city/:city`   | ❌              | Filter salons by city  |
| GET    | `/salons/:id`          | ❌              | Get salon by ID        |
| POST   | `/salons`              | ✅              | Create salon           |
| PUT    | `/salons/:id`          | ✅              | Update salon           |
| DELETE | `/salons/:id`          | ✅              | Delete salon           |
| GET    | `/salons/:id/services` | ❌              | Get salon services     |
| POST   | `/salons/:id/services` | ✅              | Add service            |
| GET    | `/services/available`  | ❌              | Get available services |
| PUT    | `/services/:id`        | ✅              | Update service         |
| DELETE | `/services/:id`        | ✅              | Delete service         |

---

# ✅ Validation

The API validates required fields before processing requests.

### User Validation

* Username is required.
* Email is required.
* Email must be valid.
* Password is required.
* Password must contain at least 6 characters.
* Duplicate emails are rejected.

### Salon Validation

* Name is required.
* City is required.
* Address is required.
* Rating is required.
* Rating must be between `0` and `5`.

### Service Validation

* Service name is required.
* Price is required.
* Price cannot be negative.
* Duration is required.
* `isAvailable` must be a boolean.

---

# 🚦 HTTP Status Codes

| Status Code | Meaning                        |
| ----------- | ------------------------------ |
| `200`       | Request successful             |
| `201`       | Resource successfully created  |
| `400`       | Invalid request or input       |
| `401`       | Unauthorized / invalid JWT     |
| `404`       | Resource or route not found    |
| `500`       | Internal server/database error |

---

# 📝 Request Logging

The API includes a custom logging middleware.

Each request is logged with:

* Timestamp
* HTTP method
* Request path

Example:

```text
[2026-08-21T10:30:00.000Z] GET /
[2026-08-21T10:31:00.000Z] POST /register
[2026-08-21T10:32:00.000Z] POST /salons
```

---

# 🧪 Testing with Postman

All API endpoints can be tested using Postman.

Recommended testing order:

```text
1. GET /
2. POST /register
3. POST /login
4. POST /salons without JWT
5. POST /salons with JWT
6. GET /salons
7. GET /salons/:id
8. PUT /salons/:id
9. GET /salons/top
10. GET /salons/city/:city
11. POST /salons/:id/services
12. GET /salons/:id/services
13. GET /services/available
14. PUT /services/:id
15. DELETE /services/:id
16. DELETE /salons/:id
```

For protected routes, use:

```text
Authorization → Bearer Token
```

and provide the JWT token received from `/login`.

---

# 🔒 Security Features

This project implements several security practices:

* Passwords are hashed using `bcryptjs`.
* JWT is used for authentication.
* JWT secret is stored in `.env`.
* Supabase credentials are stored in environment variables.
* `.env` is excluded from Git.
* Protected routes require authentication.
* User input is validated.
* Database errors are handled properly.

---

# 📌 Future Improvements

Possible improvements include:

* Role-based authentication such as admin and customer.
* Pagination for salons and services.
* Search salons by name.
* Price-based service filtering.
* Salon image uploads.
* Appointment/booking management.
* User profile management.
* Reviews and ratings.
* API documentation using Swagger.
* Deployment using Render, Railway, or another hosting platform.

---

# 👩‍💻 Author

**Mahek Yadav**

B.Tech CSE Student

---

# 📄 Assignment

**Assignment 4 – Salon Management API**

This project demonstrates:

* RESTful API development
* Node.js and Express.js
* Supabase database integration
* CRUD operations
* JWT authentication
* Password hashing with bcrypt
* Middleware
* Input validation
* Error handling
* API testing using Postman
