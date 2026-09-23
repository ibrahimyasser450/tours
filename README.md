# 🌍 Tours

A modern **Full Stack Tour Booking Platform** built with **Node.js**, **Express.js**, **MongoDB**, **Pug**, and **Vanilla JavaScript**.

Tours allows users to discover amazing tours, securely book trips, leave reviews, manage their accounts, and provides a complete admin dashboard to manage the entire application.

---

## ✨ Features

### 👤 Authentication & Authorization

- Secure JWT Authentication
- HTTP-Only Cookie Authentication
- Bearer Token Authentication
- Email Verification
- Forgot Password
- Reset Password
- Update Password
- Secure Logout
- Role-Based Authorization

Roles:

- User
- Guide
- Lead Guide
- Admin

---

### 🧑 User Features

- Register new account
- Email confirmation
- Login & Logout
- Update profile
- Upload profile picture
- Change password
- Delete account (Soft Delete)
- Add/Remove favorite tours
- View booked tours
- Create, update and delete reviews

---

### 🏔 Tour Features

- Browse all tours
- View detailed tour information
- Search tours
- Filter tours
- Sort tours
- Pagination
- Top 5 Tours API
- Monthly Tour Plan
- Tour Statistics
- Geospatial Queries
- Tours Within Radius
- Distance Calculation
- Multiple Booking Dates
- Image Upload & Resize

---

### 🎫 Booking System

- Stripe Checkout Integration
- Admin Booking
- Booking Validation
- Automatic Booking Date Management
- Booking History

---

### ⭐ Review System

- One Review Per User Per Tour
- Automatic Rating Calculation
- Average Rating Update
- Review CRUD Operations

---

### ❤️ Favorite Tours

- Add Favorite Tour
- Remove Favorite Tour
- Favorite Tours Page

---

### 🛠 Admin Dashboard

Manage:

- Users
- Tours
- Reviews
- Bookings

Operations:

- Create
- Read
- Update
- Delete

---

## 🔐 Security

The application includes several security layers:

- Helmet
- Express Rate Limit
- Mongo Sanitize
- XSS Protection
- HTTP Parameter Pollution (HPP)
- CORS
- HTTP-Only Cookies
- Password Hashing (bcrypt)

---

## 📧 Email Service

Mailtrap is used for:

- Email Verification
- Password Reset Emails

---

## ⚡ Performance

- Compression Middleware
- Optimized Database Queries
- Image Optimization using Sharp
- Parcel JavaScript Bundling
- Pagination
- Query Filtering

---

## 🛠 Built With

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Stripe
- Multer
- Sharp
- Mailtrap

### Frontend

- Pug
- HTML5
- CSS3
- JavaScript

---

## 🚀 Installation

Clone the repository

```bash
git clone https://github.com/ibrahimyasser450/tours.git
```

Go to the project

```bash
cd tours
```

Install dependencies

```bash
npm install
```

---

## ⚙ Environment Variables

Create a `.env` file in the project root.

```env
NODE_ENV=development

PORT=3000

DATABASE=

DATABASE_PASSWORD=

JWT_SECRET=

JWT_EXPIRES_IN=90d

JWT_COOKIE_EXPIRES_IN=90

EMAIL_HOST=

EMAIL_PORT=

EMAIL_USERNAME=

EMAIL_PASSWORD=

EMAIL_FROM=

STRIPE_SECRET_KEY=

STRIPE_WEBHOOK_SECRET=
```

---

## ▶ Running the Application

### Development

```bash
npm run dev
```

Starts the backend with Nodemon.

---

### Frontend Development

```bash
npm run watch:js
```

Parcel watches your frontend JavaScript files and automatically rebuilds the bundle whenever changes are detected.

---

## 🔑 Authentication

The API supports two authentication methods:

### Cookie Authentication

```
req.cookies.jwt
```

### Bearer Authentication

```
Authorization: Bearer <token>
```

---

## 📌 Important Notes

- JWT expires after **90 days**
- Authentication Cookie expires after **90 days**
- Email Verification expires after **3 days**
- Password Reset Token expires after **10 minutes**

## 👨‍💻 Author

**Ibrahim Yasser**

Software Engineer

GitHub: https://github.com/ibrahimyasser450
