# 🐾 Beautiful Souls — Frontend

**Beautiful Souls** is a mobile-first web app that connects animal shelters and individual owners with potential adopters through a swipe-based discovery flow, direct chat with pet owners, and a community wall of adoption stories.

Live app: [beautifulsouls.vercel.app](https://beautifulsouls.vercel.app/login)
Backend repo: [Proyect - Beautiful Souls](https://github.com/violetaatkinson/Proyect---Beautiful---Souls)

## ✨ Features

- **Swipe to discover** — Tinder-style card deck (drag gestures + spring animations) to browse adoptable pets near you.
- **Pet profiles** — full detail page with health info, personality traits, compatibility with kids/dogs/cats, adoption requirements, and owner contact.
- **Direct chat with owners** — real-time messaging (Socket.IO) scoped per pet, so a conversation about one pet never mixes with a conversation about another.
- **Matches** — see who's interested in your pets and jump straight into a chat about a specific listing.
- **List a pet** — multi-step wizard (basic info → photos → traits → requirements) with up to 4 photos per pet.
- **My Listings** — manage (edit/delete) the pets you've published.
- **Pet Stories** — a community wall to share a pet you've loved, happy adoption or otherwise.
- **Notifications** — likes, new messages, and publish confirmations, with a clear-all option.
- **Geolocation-aware** — pets can be sorted by distance when the browser shares your location.
- **Shelter accounts** — individual or shelter account types, with a verified badge for shelters.

## 🛠 Tech stack

- [React 18](https://react.dev/) (Create React App / `react-scripts`)
- [React Router v6](https://reactrouter.com/)
- [Axios](https://axios-http.com/) for API calls
- [Socket.IO client](https://socket.io/) for real-time chat
- [@react-spring/web](https://www.react-spring.dev/) + [@use-gesture/react](https://use-gesture.netlify.app/) for the swipe deck
- [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) for auth forms
- [lucide-react](https://lucide.dev/) for icons
- [Bootstrap](https://getbootstrap.com/) (base utility classes) with custom CSS per screen
- `jwt-decode` for reading the access token client-side

## 📁 Project structure

```
src/
├── assets/            Static images
├── components/misc/   Shared UI: Navbar, Dashboard (bottom nav), Search, route guards
├── constants/          App-wide constants
├── contexts/           AuthContext (session/user) and SocketContext (Socket.IO connection)
├── helpers/             Small utility functions (e.g. JWT verification)
├── hooks/               Custom hooks (e.g. useGeolocation)
├── layout/              NavbarLayout (wraps screens with top/bottom nav)
├── screens/              One folder per screen/feature (Adopted, Pets, Profile, Chat, ListUsers, Notifications, Login, Register, Home...)
├── services/            One file per API resource (PetService, UserService, MessageService, AdoptedService, NotificationService, AuthService, BaseService)
├── token/                Access token storage (localStorage) helpers
└── utils/                Presentation helpers (pet badges, age formatting)
```

## 🚀 Getting started

### Prerequisites

- Node.js 16+
- The [backend](https://github.com/violetaatkinson/Proyect---Beautiful---Souls) running locally or deployed

### Install

```bash
npm install
```

### Environment variables

Create a `.env` file in the project root:

```
REACT_APP_API_URL=http://localhost:3001/api
```

Point this at your backend's `/api` base URL (local or deployed).

### Run

```bash
npm start
```

Opens the app at [http://localhost:3000](http://localhost:3000). The app is designed for mobile viewports — on screens wider than 600px it shows a "please open on your phone" message instead of the app UI.

### Other scripts

```bash
npm run build   # production build
npm test        # test runner (react-scripts)
```

## 🔌 Real-time chat

The app connects to the backend's Socket.IO server once the user is authenticated (token sent via the socket handshake). Each user joins a room keyed by their own id, so the server can push:

- `message:new` — a new message in a conversation you're part of
- `typing` — the other person in a conversation is typing

Conversations are scoped by **(user, pet)**, not just by user — so if you're talking to the same person about two different pets, those show up as two separate threads.

## 📱 Note

This is a mobile-only experience by design (see `.desktop-block` in `index.css`). Use your browser's device toolbar / responsive mode to preview it on desktop.
