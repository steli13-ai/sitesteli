# React

A modern React-based project utilizing the latest frontend technologies and tools for building responsive web applications.

## 🚀 Features

- **React 18** - React version with improved rendering and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **Redux Toolkit** - State management with simplified Redux setup
- **TailwindCSS** - Utility-first CSS framework with extensive customization
- **React Router v6** - Declarative routing for React applications
- **Data Visualization** - Integrated D3.js and Recharts for powerful data visualization
- **Form Management** - React Hook Form for efficient form handling
- **Animation** - Framer Motion for smooth UI animations
- **Testing** - Vitest + React Testing Library setup (Jest-like API, faster)

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

## 🛠️ Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
   
2. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## 📁 Project Structure

```
react_app/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── styles/         # Global styles and Tailwind configuration
│   ├── App.jsx         # Main application component
│   ├── Routes.jsx      # Application routes
│   └── index.jsx       # Application entry point
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
```

## 🧩 Adding Routes

To add new routes to the application, update the `Routes.jsx` file:

```jsx
import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";
import AboutPage from "pages/AboutPage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    // Add more routes as needed
  ]);

  return element;
};
```

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration includes:

- Forms plugin for form styling
- Typography plugin for text styling
- Aspect ratio plugin for responsive elements
- Container queries for component-specific responsive design
- Fluid typography for responsive text
- Animation utilities

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints.


## 🧪 Testing

Run the test suite (watch mode):
```bash
npm test
```

Run once (CI):
```bash
npm run test:run
```

Example adding a smoke test lives in `src/__tests__/AppRoutes.smoke.test.jsx`.

## 📦 Deployment

Build the application for production:

```bash
npm run build
```

Optional: generate a bundle report (stats.html in build/) to inspect chunk sizes:

```bash
# PowerShell
$env:VITE_ANALYZE="1"; npm run build; Remove-Item Env:VITE_ANALYZE
```

Serve with compression (recommended):
- Nginx: enable gzip and brotli (if available) for js, css, html, svg
- Cloudflare/Netlify/Vercel: enable asset compression at the edge

Environment files:
- `.env` for local development (see `.env.example`)
- `.env.production` for production build-time vars (never commit secrets)

PWA:
- The service worker is generated at build time; ensure the site is served over HTTPS and has a valid manifest.

## 🙏 Acknowledgments

- Built with [Rocket.new](https://rocket.new)
- Powered by React and Vite
- Styled with Tailwind CSS

Built with ❤️ on Rocket.new
