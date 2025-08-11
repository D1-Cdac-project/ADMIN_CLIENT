# BookMyMandap Admin Client

The BookMyMandap Admin Client is the frontend interface for the administrative module of the Mandap Booking Application, built using the **MERN Stack** (MongoDB, ExpressJS, ReactJS, NodeJS). This client enables administrators to manage user accounts, monitor orders, verify providers, and analyze platform performance through a responsive and efficient UI.

---

## 📁 File Structure

The admin client repository follows a modern and modular structure for scalability, maintainability, and performance:

```
src/                  Main source folder containing React components, pages, and utilities
  components/         Reusable React components
  contexts/           Context providers and related logic
  data/               Data files or mock data
  hooks/              Custom React hooks
  pages/              Page-level components
  services/           Service layer for API calls and utilities
  types/              TypeScript type definitions
  utils/              Utility functions and helpers
App.jsx               Main application component
index.css             Global CSS styles
main.jsx              Entry point for the React application
vite-env.d.ts         TypeScript declaration file for Vite
.gitignore            Files and directories to be ignored by Git
Dockerfile            Configuration for Docker containerization
eslintrc.config.js    ESLint configuration file
index.html            HTML template for the app
package-lock.json     Lock file for dependency versions
package.json          Project metadata and dependencies
postcss.config.js     PostCSS configuration
readme.md             Project documentation
tailwind.config.js    Tailwind CSS configuration
tsconfig.app.json     TypeScript configuration for the application
tsconfig.json         TypeScript configuration
tsconfig.node.json    TypeScript configuration for Node.js
vercel.json           Vercel deployment configuration
vite.config.ts        Vite configuration file
```

---

## 🧑‍💻 Tech Stack

- **Framework**: ReactJS, Vite
- **Language**: JavaScript, TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Containerization**: Docker
- **Deployment**: Vercel

---

## 🛠️ Installation Guide

To run the **BookMyMandap Admin Client** on your local system, follow these steps:

### Step-1: Clone the Repository

```bash
git clone https://github.com/D1-Cdac-project/ADMIN_CLIENT.git
cd ADMIN_CLIENT
```

### Step-2: Install Dependencies

```bash
npm install
```

### Step-3: Add Environment Variables

Create a `.env` file in the root directory and add the following variables:

### Environment Variables for Admin Client

```env
VITE_API_URL=http://localhost:4000
```

### Step-4: Start the Development Server

```bash
npm run dev
```

Once the app starts, it will be accessible at:

```
http://localhost:5173
```

Make sure the backend server is running at **`http://localhost:4000`** for full functionality.

---

## 💡 Notes

- Ensure environment-specific variables (like backend URLs) are set in a `.env` file.
- For smooth development, ensure both backend and frontend are running concurrently.
