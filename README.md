

# 📝 Microservices Blogging Platform (MERN + TypeScript)

A scalable blogging platform built using **MERN stack with TypeScript**, following a **microservices architecture**.

## 🏗️ Services

* 👤 **Author Service** – Author auth & profile management
* 🙋 **User Service** – User auth & profile management
* 📰 **Blog Service** – Create, update, delete & fetch blogs

Each service runs independently and communicates via REST APIs.

---

## 🚀 Tech Stack

* **Frontend:** React + TypeScript
* **Backend:** Node.js, Express, TypeScript
* **Database:** MongoDB + Mongoose
* **Auth:** JWT

---

## 🔐 Authentication

* JWT-based authentication
* Role-based access (Author/User)
* Protected routes via middleware

---

## ⚙️ Setup

### Clone Repository

```bash
git clone https://github.com/your-username/microservices-blogging.git
cd microservices-blogging
```

### Install Dependencies (for each service)

```bash
npm install
```

### Run Services

```bash
npm run dev
```

**Default Ports**

* Author → `5001`
* User → `5002`
* Blog → `5003`

---

## 📌 Sample API Routes

### Author

```
POST /api/authors/register
POST /api/authors/login
GET  /api/authors/profile
```

### User

```
POST /api/users/register
POST /api/users/login
GET  /api/users/profile
```

### Blog

```
POST   /api/blogs
GET    /api/blogs
GET    /api/blogs/:id
PUT    /api/blogs/:id
DELETE /api/blogs/:id
```

---

## 🌟 Features

* Microservices architecture
* TypeScript support
* JWT Authentication
* Clean & scalable structure
