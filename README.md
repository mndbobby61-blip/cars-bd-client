<div align="center">

# 🚗 CarsBD — Frontend

**A marketplace to buy and sell new and used cars in Bangladesh. Browse listings, search by category, and list your own car in minutes.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://cars-bd-client.vercel.app/)
[![Backend Repo](https://img.shields.io/badge/Backend-Repository-blue?style=for-the-badge)](https://github.com/mndbobby61-blip/cars-bd-server)

![Next.js](https://img.shields.io/badge/Next.js-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)

</div>

---

## 📖 Overview

CarsBD is a full-stack car marketplace for Bangladesh. Buyers can explore verified new and used cars by category, view detailed listings, and contact sellers. Sellers can create an account and list their own cars. This repository contains the **frontend**, built with Next.js. It talks to a separate Express.js REST API.

| Part | Repository |
| --- | --- |
| Frontend (this repo) | [cars-bd-client](https://github.com/mndbobby61-blip/cars-bd-client) |
| Backend API | [cars-bd-server](https://github.com/mndbobby61-blip/cars-bd-server) |

**Live site:** https://cars-bd-client.vercel.app/

---

## ✨ Features

### For everyone
- **Home page** with a hero slider, category shortcuts, featured listings, how-it-works steps, customer testimonials and an FAQ
- **Browse by category:** Sedan, SUV, Hatchback, Electric, Luxury and Pickup
- **Explore Cars page** with search
- **Car details page** with price, location, year, rating and condition (New or Used)
- **About, Contact and Privacy & Terms pages**
- **Responsive design** with a mobile menu

### For signed-in users
- **Authentication:** register and login
- **Sell a car:** a form to add your own listing

---

## 🧰 Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js, React |
| Backend | [Express.js REST API](https://github.com/mndbobby61-blip/cars-bd-server) |
| Deployment | Vercel |

---

## 🏗️ How It Works

```
┌──────────────────────┐   HTTPS / JSON   ┌──────────────────────┐   ┌──────────────┐
│  Next.js Frontend    │ ───────────────▶ │  Express.js REST API │──▶│   MongoDB    │
│  (this repository)   │ ◀─────────────── │  (cars-bd-server)    │   └──────────────┘
└──────────────────────┘                  └──────────────────────┘
```

The frontend fetches car listings and user data from the REST API. Category links use a search query, for example `/cars?search=SUV`, so every category page is shareable.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or newer
- npm
- The [backend server](https://github.com/mndbobby61-blip/cars-bd-server) running locally or deployed

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mndbobby61-blip/cars-bd-client.git
cd cars-bd-client

# 2. Install dependencies
npm install

# 3. Create your environment file
touch .env.local

# 4. Start the development server
npm run dev
```

Open http://localhost:3000 in your browser.

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Base URL of the CarsBD backend API |

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Run the production build |

---

## 🗺️ Pages

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Home page |
| `/cars` | Public | Explore cars, with search and category filters |
| `/cars/[id]` | Public | Car details |
| `/about` | Public | About CarsBD |
| `/contact` | Public | Contact page |
| `/privacy` | Public | Privacy policy and terms |
| `/login`, `/register` | Public | Authentication |
| `/items/add` | 🔒 Signed-in users | Add a car listing |

---

## 🖼️ Screenshots

<!-- Add your screenshots to docs/screenshots/ and update the file names below -->

| Home | Explore Cars |
| --- | --- |
| ![Home](docs/screenshots/home.png) | ![Explore Cars](docs/screenshots/cars.png) |

| Car Details | Sell Your Car |
| --- | --- |
| ![Car Details](docs/screenshots/car-details.png) | ![Sell Your Car](docs/screenshots/add-car.png) |

---

## ☁️ Deployment

The app is deployed on **Vercel**. To deploy your own copy:

1. Push the repository to GitHub.
2. Import it in [Vercel](https://vercel.com/new).
3. Add `NEXT_PUBLIC_API_URL` under **Project Settings → Environment Variables**, pointing to your deployed backend.
4. Deploy.

---

## 👨‍💻 Author

**Md. Rabbi Sarder**
Full Stack Developer

- 🌐 Portfolio: [rabbi-main-portfolio.vercel.app](https://rabbi-main-portfolio.vercel.app)
- 💼 LinkedIn: [md-rabbi-sarder-rabbi](https://www.linkedin.com/in/md-rabbi-sarder-rabbi-3691453b6/)
- 🐙 GitHub: [@mndbobby61-blip](https://github.com/mndbobby61-blip)
- 📧 Email: mdbobby51@gmail.com

---

<div align="center">

⭐ If you like this project, consider giving it a star!

</div>
