# Auto School Website

A modern, responsive website for an auto school built with React, Vite, and Firebase.

## Features

- Multi-language support (i18n)
- Responsive design with Bootstrap and Tailwind CSS
- Firebase integration
- Modern React with hooks
- Fast development with Vite

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd auto-school
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Firebase configuration:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Development

To start the development server:

```bash
npm run dev
```

## Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

## Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Deployment

The `dist` directory contains the production-ready files that can be deployed to any static hosting service like:
- Vercel
- Netlify
- Firebase Hosting
- GitHub Pages

## Technologies Used

- React 19
- Vite 6
- Firebase
- Bootstrap 5
- Tailwind CSS
- i18next for internationalization
- React Router for navigation

## License

[Your chosen license]
