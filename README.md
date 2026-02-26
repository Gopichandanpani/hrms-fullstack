# Human Resource Management System (HRMS)

## 📌 Project Overview

The Human Resource Management System (HRMS) is a full-stack web application designed to manage employees and track their attendance efficiently.

This application allows users to:

- Add new employees
- View employee list
- Delete employees
- Mark employee attendance
- View total present days per employee

The project demonstrates end-to-end full-stack development using React (frontend) and Django REST Framework (backend), deployed on Vercel and Render.

---

## 🛠 Tech Stack Used

### 🔹 Frontend
- React.js
- Material UI (MUI)
- Axios
- JavaScript (ES6+)
- Vercel (Deployment)

### 🔹 Backend
- Django
- Django REST Framework
- PostgreSQL (Production Database via Render)
- SQLite (Local Development)
- django-cors-headers
- Gunicorn (Production WSGI Server)
- Render (Backend Deployment)

---

## 🏗 System Architecture

Frontend (React)  
⬇ API calls via Axios  
Backend (Django REST API)  
⬇  
Database (PostgreSQL in production)

The frontend communicates with the backend using REST APIs.  
The backend handles validation, uniqueness constraints, and business logic.

---

## 🚀 Steps to Run the Project Locally

### 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>
cd HRMS
````

---

### 2️⃣ Setup Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Mac/Linux
# venv\Scripts\activate   # Windows

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend runs at:

```
http://127.0.0.1:8000/
```

---

### 3️⃣ Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000/
```

---

### 4️⃣ Environment Variable (Frontend)

Create a `.env` file inside the `frontend` folder:

```
REACT_APP_API_BASE_URL=http://127.0.0.1:8000/api/
```

For production, update it with your deployed backend URL:

```
REACT_APP_API_BASE_URL=https://your-backend-url.onrender.com/api/
```

---

## 🌐 Live Deployment

Frontend (Vercel):
[https://hrms-fullstack-six.vercel.app](https://hrms-fullstack-six.vercel.app)

Backend (Render):
[https://hrms-fullstack-eblo.onrender.com](https://hrms-fullstack-eblo.onrender.com)

---

## ⚠️ Assumptions & Limitations

* Employee ID must be unique.
* No authentication/authorization implemented.
* No role-based access control (Admin/HR).
* Attendance only supports "Present" and "Absent" marking.
* No pagination implemented.
* Basic form validation implemented.
* Free-tier backend hosting may spin down after inactivity (~50 sec delay on first request).

## 👨‍💻 Author

Gopichandan Pani

Full Stack Developer (React + Django)
