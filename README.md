# 📱 GadgetStore

**GadgetStore** is a lightweight gadget registration and management system developed using **React**, **Vite**, and **TailwindCSS**. It allows users to register gadgets, view all entries, update or delete them, and export the list in CSV format. Gadget data is stored directly in the browser using `localStorage`, making it fully functional without a backend.

---

## 🧑‍🎓 Project Summary

This project was built as a school-level web application for managing gadgets, such as phones or devices, by collecting relevant data such as brand, model, date of registration, condition, and more. It focuses on a clean UI, fast performance, and persistent storage using modern front-end technologies.

---

## ✨ Features

- ✅ Register gadgets with details like brand, model, and condition
- 🧾 Edit or delete registered gadgets
- 📥 Export gadget list as a downloadable CSV file
- 📦 Data stored locally using `localStorage` (no backend)
- 🎨 Clean and responsive UI using TailwindCSS
- 🚀 Fast navigation with React Router DOM

---

## 📸 Screenshots

> Add your screenshots in the `public/screenshots/` folder and update the image links below.

| Dashboard | Register Page |
|-----------|----------------|
| ![Dashboard](./public/screenshots/dashboard.png) | ![Register](./public/screenshots/register.png) |

---

## 🏗️ Technologies Used

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Router DOM](https://reactrouter.com/)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- CSV generation via plain JavaScript

---

## 📂 Project Structure

GadgetStore/
├── public/
│ └── screenshots/
├── src/
│ ├── components/
│ │ ├── Navbar.jsx
│ │ ├── GadgetForm.jsx
│ │ └── GadgetList.jsx
│ ├── pages/
│ │ ├── Dashboard.jsx
│ │ ├── Register.jsx
│ │ └── Edit.jsx
│ ├── utils/
│ │ └── exportToCSV.js
│ ├── App.jsx
│ └── main.jsx
├── package.json
├── vite.config.js
└── README.md

yaml
Copy
Edit

---

## 🧪 How to Run Locally

1. **Clone the repository**
```bash
git clone https://github.com/Hardelzs/GadgetStore.git
cd GadgetStore
Install dependencies

bash
Copy
Edit
npm install
Start development server

bash
Copy
Edit
npm run dev
Open in browser
Navigate to http://localhost:5173 to use the app.

🔍 How It Works
Register Gadget
Users can fill in a form with gadget information. On submission, the data is stored in localStorage.

Dashboard
Displays all registered gadgets. Each entry has options to edit or delete.

Edit Gadget
Updates a gadget’s data by pre-filling the form and saving new input.

Export to CSV
Converts gadget list to a .csv file and triggers a download for backup or sharing.

🚀 Deployment
Deployed with Vercel
🔗 Live Site

🧑‍💻 Author
Hardelz
🌍 Portfolio
📧 Email

📌 Notes
No backend or authentication required

Works 100% offline after initial load

Built for learning and demonstration purposes

📜 License
This project is open for educational use. You are free to modify or extend it.

vbnet
Copy
Edit

Let me know when you’ve uploaded your screenshots so I can help you link them properly or include a GIF screen recording of the app in action if you want that cinematic presentation 😎






