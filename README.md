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


| Dashboard | Register Page |
|-----------|----------------|
| ![Dashboard](./public/Screenshots/dashboard.jpeg) | ![Register](./public/Screenshots/device.jpeg) |

---

## 🏗️ Technologies Used

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS for building beautiful UIs fast.
- [React Router DOM](https://reactrouter.com/) - A complete routing library for React.
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) - A storage stored on your device
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

🔍 How It Works
Register Gadget
Users can fill in a form with gadget information. On submission, the data is stored in localStorage.

Dashboard
Displays all registered gadgets. Each entry has options to edit or delete.

Edit Gadget
Updates a gadget’s data by pre-filling the form and saving new input.

Export to CSV
Converts gadget list to a .csv file and triggers a download for backup or sharing.