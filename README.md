# Portfolio - Shogo Hardy

A modern, responsive portfolio website built with React and Vite, showcasing my projects, technical skills, and professional background.

---

## 🌐 Overview

This portfolio serves as a central hub for my software development work. Featuring full-stack web apps, game development projects, and a built-in mini game. Designed with a dark teal glassmorphism aesthetic and fully responsive across all devices.

---

## ✨ Features

- **Responsive Design** — Works seamlessly across desktop, tablet, and mobile
- **Animated Hero** — Typing animation on the home page
- **Project Showcases** — Web dev and game dev project pages with image/video sliders and expandable details
- **Interactive Mini Game** — A browser-based RPG called *Job Hunt* with combat, a shop, and a boss room
- **Contact Form** — Functional email form powered by EmailJS with bot protection and XSS sanitization
- **Resume Viewer** — Embedded PDF viewer with download option
- **Sidebar Navigation** — Animated hamburger menu with glitch effects on special links
- **Photo Gallery** — About page with an auto-advancing image slider

---

## 🛠️ Tech Stack

### Frontend
- **React 19** — UI library
- **Vite 8** — Build tool and dev server
- **Tailwind CSS 4** — Utility-first CSS framework
- **React Router DOM 7** — Client-side routing

### Libraries
- **@iconify/react** — Icon library
- **@emailjs/browser** — Contact form email delivery
- **lucide-react** — Game UI icons

---

## 📁 Project Structure
```
portfolio/
├── public/
│   ├── images/          ← photos, backgrounds, project screenshots
│   └── videos/          ← project demo videos
├── src/
│   ├── components/
│   │   ├── NavBar.jsx   ← top navigation bar
│   │   └── SideNav.jsx  ← hamburger sidebar with routing
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Resume.jsx
│   │   ├── WebDevProjects.jsx
│   │   ├── GameDevProjects.jsx
│   │   ├── GamePage.jsx ← Job Hunt mini game
│   │   └── Contact.jsx
│   ├── Portfolio.jsx    ← Home page
│   └── main.jsx         ← App entry point with routes
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm

### Installation

Clone the repository:
```bash
git clone https://github.com/ShadeKnightly/portfolio.git
cd portfolio
```

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for Production
```bash
npm run build
npm run preview
```

---

## 📱 Pages

| Route | Page |
|---|---|
| `/` | Home — hero, skills, featured projects, contact |
| `/about` | About — bio, photo gallery, currently section |
| `/resume` | Resume — embedded PDF viewer with download |
| `/webdev` | Web Dev Projects — image/video sliders, expandable details |
| `/gamedev` | Game Dev Projects — CodeType & Harrowing WIP showcase |
| `/game` | Job Hunt — browser RPG mini game |
| `/contact` | Contact — EmailJS form with bot protection |

---

## 🌟 Featured Projects

### RespAI Hub
Full-stack CRM platform for fire department outreach, combining FEMA datasets, lead-scoring logic, and a secure dashboard. Built with JavaScript, Angular, React, Node.js, and TypeScript.

### CoursePilot
Full-stack course registration web app with React front-end, Node/Express back-end, and Azure SQL Server. Features RESTful APIs and responsive Figma-designed UI.

### Nest
Desktop day trading application built with C# and .NET Framework. Features real-time market data via EODHD API, portfolio tracking, and Supabase authentication.

### Debugging Ducks
Official website for the student coding club I founded at Bow Valley College. Built from scratch with HTML, CSS, and JavaScript.

---

## 🎮 Job Hunt — Mini Game

A browser-based RPG where you navigate a grid map, fight enemies from the job market, loot chests, and find the boss room to secure the job offer.

- **Move** with WASD or click
- **Fight** enemies in turn-based combat
- **Buy** potions, weapons, armor, and the Boss Room Key from the shop
- **Find** the locked door `[D]` and defeat `THE_FINAL_BOSS_HR` to win

---

## 📄 License

This project is private and proprietary.

---

## 👤 Author

**Shogo Hardy**
- GitHub: [@Shogo24](https://github.com/shogo24)
- Email: shogo.a.hardy@gmail.com

---

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev) + [React](https://react.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Icons by [Iconify](https://iconify.design)
- Email via [EmailJS](https://emailjs.com)
- Game icons by [Lucide](https://lucide.dev)
