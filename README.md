 💼 KhaataPro — Smart Expense Tracker (Khata Book)

KhaataPro is a full-stack expense tracking web application (Khata Book style) that helps users manage personal expenses, create encrypted hisaabs (password-protected records), scan QR codes for fast entry, and manage shared expense rooms.

It is built with a modern MERN-like stack:
- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB Atlas
- **Auth:** JWT + HttpOnly Cookies

---

## 🚀 Live Demo

- **Frontend (Vercel):** https://<your-vercel-link>
- **Backend (Render):** https://<your-render-link>

---

## ✨ Features

### 🔐 Authentication
- User registration & login
- Secure authentication using JWT stored in **HttpOnly cookies**
- Logout support

### 📒 Hisaab (Khata Book)
- Create new hisaabs with dynamic entries
- View hisaabs in card layout
- Edit and delete hisaabs
- Sort hisaabs by:
  - Date Asc / Desc
  - Title Asc / Desc

### 🔒 Password Protected (Encrypted) Hisaab
- Option to lock (encrypt) any hisaab
- Unlock using password
- Password stored securely using **bcrypt hashing**
- Locked hisaabs cannot be viewed without unlocking

### 🔍 Search & Filter
- Search hisaabs by title (case-insensitive)
- Filter by date
- Apply sorting with search results

### 📊 Dashboard
- Aggregated analytics:
  - Category-wise expense totals
  - Total per hisaab

### 👥 Rooms (Shared Expenses)
- Create rooms
- View all rooms and rooms joined by user
- Room data fetched securely using auth middleware

### 📷 QR Scanner
- Scan QR codes using camera
- Upload QR image for scanning
- Copy scanned result
- Parse JSON QR payload and use data for expense entry

### 💳 Payment App (UPI Integration Page)
- Add payment app details (UI feature)
- Designed for future payment-based enhancements

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB Atlas + Mongoose
- JWT Authentication
- bcrypt password hashing
- cookie-parser
- CORS

### Deployment
- Frontend on **Vercel**
- Backend on **Render**
- MongoDB on **Atlas**

---

## 📁 Project Structure

project-root/
│
├── backend/
│ ├── model/
│ ├── MiddleWare/
│ ├── app.js
│ ├── package.json
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── services/api.js
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── vercel.json
│ ├── package.json
│ └── vite.config.js
│
└── README.md

yaml
Copy code

---

## ⚙️ Environment Variables

Create a `.env` file in the **backend/** folder:

```env
MONGO_URL=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
PORT=3000
🧪 Local Setup (Run on your machine)
1️⃣ Clone Repository
bash
Copy code
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
2️⃣ Backend Setup
bash
Copy code
cd backend
npm install
npm start
Backend runs on:

arduino
Copy code
http://localhost:3000
3️⃣ Frontend Setup
bash
Copy code
cd ../frontend
npm install
npm run dev
Frontend runs on:

arduino
Copy code
http://localhost:5173
🔗 API Routes
Auth
POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout

GET /api/auth/me

Hisaab
GET /api/hisaabs

GET /api/hisaabs/:id

POST /api/hisaabs

PUT /api/hisaabs/:id

DELETE /api/hisaabs/:id

GET /api/hisaabs/search

POST /api/hisaabs/:id/unlock

Rooms
GET /api/rooms

POST /api/rooms

Dashboard
GET /api/dashboard

