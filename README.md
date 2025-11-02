# 🛍️ Revalto

Revalto is a modern reselling marketplace that empowers students to buy and sell second-hand products within their college community. Starting with **Ajeenkya DY Patil University (Pune)**, Revalto aims to make reselling simple, transparent, and trustworthy.  

---

## 🚀 Vision

Why let valuable items go to waste? Revalto helps students:  
- Resell their used products at fair value  
- Discover affordable items posted by peers  
- Build trust with verified college communities  
- Expand the marketplace across multiple colleges in the future  

---

## 🏗️ Tech Stack

- **Frontend** → React.js (UI/UX)  
- **Backend** → Node.js + Express (APIs & business logic)  
- **Database** → MySQL (secure + relational data handling, can scale later to Supabase)  
- **Authentication** → JWT-based login system  
- **Hosting/Deployment** → Vercel (Frontend) + Render/Heroku (Backend)  
- **Version Control** → GitHub Collaboration  

---

## ✨ Features

- 📝 User Registration & Login (secure JWT auth)  
- 📦 Post a Product (upload details & images)  
- 🔎 Search & Browse (filter by category/price)  
- 💬 Chat/Connect with buyer & seller inside platform *(future release)*  
- 🛡️ College-domain verified students  
- 🌍 Multi-College Expansion roadmap  

---

## ⚙️ Local Setup Guide

Follow these steps to set up **Revalto** on your local machine 👇

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/revalto.git
cd revalto
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npx prisma generate
```

#### Create a `.env` file in the backend directory:

```bash
PORT=3000
DATABASE_URL="your database url obtained from supabase"
DIRECT_URL="your database direct url obtained from supabase"
JWT_SECRET=your_secret_key
REFRESH_SECRET=your_refresh_key
```

#### Start the backend server:

```bash
npm run dev
```

> Default runs on **[http://localhost:3000](http://localhost:3000)**

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
```

#### Create a `.env` file in the frontend directory:

```bash
REACT_APP_API_URL=http://localhost:3000
```

#### Start the React app:

```bash
npm run dev
```

> Default runs on **[http://localhost:5173](http://localhost:5173)**

---

## 👨‍💻 Team Revalto

We are 4 passionate builders working together:  
- **Rohan** – Backend & Database  
- **Yash Sharma** – UI/UX, Frontend Development & Product Vision 
- **Yashraj** – App Development  
- **Kundan** – Backend, Machine Learning & Data Logic  

---

## 📈 Roadmap

- ✅ MVP for Ajeenkya DY Patil University  
- 🔜 Add payment support for safer transactions  
- 🔜 Multi-college onboarding (Pune → India-wide)  
- 🔜 Mobile App (React Native)  
- 🔜 AI-driven product recommendations  

---

## 🤝 Contribution

1. Fork the repo  
2. Create a feature branch (`git checkout -b feature-name`)  
3. Commit your changes (`git commit -m 'Add some feature'`)  
4. Open a Pull Request  

---

## 📄 License

This project is licensed under the **MIT License** – feel free to use, learn, and build on top of it.  

---

## 🌟 Support

If you like this project, please **star ⭐ the repo** — it motivates us to keep building!
