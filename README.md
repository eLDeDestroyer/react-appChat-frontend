# 📖 App-Chat Frontend (React + Vite + Tailwind)

A modern and responsive frontend for the **AppChat API** built using **React**, **Vite**, and **Tailwind CSS**.  

---

## 🚀 Tech Stack

- **React** — UI library
- **Vite** — Lightning-fast build tool
- **Tailwind CSS** — Utility-first CSS framework
- **Axios** — HTTP client to connect with API
- **React Router DOM** — For routing
- **LocalStorage** — For storing JWT tokens

---

## 📦 Features

- 🔐 JWT-based Login & Register
- 💬 Real-time Chat via WebSocket
- 🧑‍🤝‍🧑 Friend List 
- 🕓 Message Read Receipts & History
- 🔒 Authenticated Protected Routes



---

## 🔗 API Integration

This frontend uses the following API:  
👉 **[App-Chat Golang API](https://github.com/eLDeDestroyer/golang-appChat-api)**

To connect, configure your `.env` file:

```env
Golang_URL=http://localhost:3000
Larevel_URL=http://localhost:8000
