# Node Application Backend

## 📌 Project Overview

This is a **real-world style Node.js backend application** built to demonstrate modern JavaScript, Express.js, authentication, security best practices, and async programming concepts.

The project covers **core JavaScript fundamentals**, **Node.js backend architecture**, **API security**, and **real production-level practices**.
---
## 🚀 Tech Stack

* **Node.js** – JavaScript runtime
* **Express.js** – Backend framework
* **MongoDB** – Database
* **Mongoose** – ODM
* **JWT (jsonwebtoken)** – Authentication
* **bcryptjs** – Password hashing
* **dotenv** – Environment variables
* **Multer** – File upload
* **Cloudinary** – Cloud storage
* **Helmet** – Security headers
* **CORS** – Cross-origin requests
* **Express-rate-limit** – Rate limiting
* **Express-validator** – Input validation
* **Express-mongo-sanitize** – MongoDB injection protection

---

## 📂 Project Features

* User Authentication (Register / Login)
* JWT-based Stateless Authentication
* Password hashing using bcrypt
* Secure REST APIs
* File upload with Multer + Cloudinary
* API rate limiting
* Input validation & sanitization
* Security headers using Helmet
* Async/Await based API calls

---

## 🧠 JavaScript Concepts Used
### 🔹 var, let, const

* `var` → Function scoped, redeclaration allowed
* `let` → Block scoped, reassignment allowed
* `const` → Block scoped, reassignment NOT allowed
### 🔹 Arrow Functions

```js
const add = (a, b) => a + b;
```
### 🔹 Spread Operator (Copy Objects)

```js
const user = { name: "shubham" };
const newUser = { ...user, age: 29, address: "Garhmukteshwar, Hapur" };
```
### 🔹 Rest Operator

```js
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b);
}
```

---

## 📊 Array Methods

### map() – Transform Array

```js
const double = nums.map(n => n * 2);
```

### filter() – Conditional Array

```js
const even = nums.filter(n => n % 2 === 0);
```

### reduce() – Single Value

```js
const total = nums.reduce((total, n) => total + n, 0);
```

---

## 🔁 Async / Await

```js
const getData = async () => {
  return "Data Received";
};
```

---

## 🔄 Event Loop (Very Important)

### Execution Order:

1. Call Stack (Sync code)
2. Microtask Queue (Promises / async-await)
3. Callback Queue (setTimeout)

```js
setTimeout(() => console.log("callback"), 0);
Promise.resolve().then(() => console.log("resolve"));
```

---

## 🌐 Node.js Explained

Node.js is a **JavaScript runtime built on Chrome V8** that allows JavaScript to run on the server.

### Key Features:

* Non-blocking
* Asynchronous
* Event-driven
* Single-threaded

**In simple words:**

> Node.js helps build fast and scalable backend applications using JavaScript.

---

## 🛣 Express Concepts

### Route Parameters

```js
req.params
```

### Middleware (Very Important)

Middleware is a function that runs **between request and response**.

Flow:

```
Request → Middleware → Controller → Response
```

Error middleware has **4 parameters**, so Express identifies it as an error handler.

---

## 🔐 Authentication & Security

### bcryptjs

* Secure password hashing
* Slow hashing → protects against brute force attacks

### JWT (JSON Web Token)

```js
jwt.sign(payload, secret, options);
```

* Stateless authentication
* Stored in LocalStorage or HttpOnly Cookies

---

## 🛡 API Security Middlewares

### Helmet

Adds security-related HTTP headers

```js
npm install helmet
```

### Rate Limiting

Prevents brute-force & DDoS attacks

```js
npm install express-rate-limit
```

### CORS

Allows frontend-backend communication on different domains

```js
npm install cors
```

> Postman bypasses CORS, browser does not.

---

## ✅ Validation & Sanitization

### express-validator

Validates request body, params & query

### express-mongo-sanitize

Prevents MongoDB injection attacks by removing `$` and `.` operators
---

## 🔒 Additional Security

* Disable Express fingerprinting
```js
app.disable("x-powered-by");
```
* HTTPS encrypts data between client & server
---

## 🌍 Deployment Architecture
```
Client (Browser)
   ↓ HTTPS
Nginx / Cloudflare
   ↓ HTTP
Node.js / Express API
```
---

## 📦 Installation
```bash
git clone https://github.com/shubhamsharma55/Node_Application_backend.git
cd Node_Application_backend
npm install
npm run dev
```
---
## 🧪 API Testing
* Postman
* Thunder Client
---
## 📌 Conclusion
This project demonstrates **real-world backend development practices** using Node.js and Express, focusing on **performance, security, scalability, and clean code**.
---
## 👨‍💻 Author
**Shubham Sharma**
---

⭐ If you like this project, don’t forget to star the repository!
