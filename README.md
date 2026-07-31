# Threads - Modern Full-Stack Social Platform

A high-performance, full-stack **Threads** social media web application built with **Next.js 13 (App Router)**, **TypeScript**, **Clerk Authentication**, **MongoDB + Mongoose**, **UploadThing**, **Tailwind CSS**, and **shadcn/ui**.

🌐 **Live Demo:** [https://threads-app-three-liart.vercel.app](https://threads-app-three-liart.vercel.app)  
📦 **GitHub Repository:** [https://github.com/Neelesh19634/Threads](https://github.com/Neelesh19634/Threads)

---

## ✨ Features

- 🔐 **Authentication & Onboarding:** Multi-tenant auth via Clerk with full sign-in/sign-up flows, organization switcher, and mandatory profile onboarding.
- 🎨 **Custom Theme Engine:**
  - **Light, Dark & System Modes:** Seamless toggle supporting OS preference auto-detection.
  - **Zero-FOUC (Flash of Unstyled Content):** Synchronous `<head>` blocking script for instantaneous theme rendering on page loads.
  - **Dynamic Theme Accents:** Live accent color picker (**Obsidian Indigo**, **Cyber Emerald**, **Electric Blue**, **Sunset Amber**) persisted in `localStorage`.
- 🧬 **Unique Custom Branding:** Custom vector **Interlocking Quantum Threads** logo and matching browser tab favicon (`app/icon.svg`).
- 🗑️ **Author Thread Deletion:** Global thread deletion available exclusively inside the author's Profile section. Deletes the target thread, recursively purges all nested replies, and updates MongoDB globally.
- 🔔 **Activity & Live Unread Badges:** Live unread notification badges in the navigation sidebars with automatic read-state clearing when visiting `/activity`.
- 🔍 **Search & Creators:** Real-time debounced creator search by name and username.
- 👥 **Communities:** Community discovery, member avatar lists, and community creation workflows.
- ⚡ **Global Loading UI & Instant Feedback:** Next.js route loading screens (`loading.tsx`), delete spinner states, and logout loading feedback.
- 📱 **Responsive Glassmorphism Layout:** Sleek obsidian dark and crisp light layouts with hardware-accelerated momentum scrolling on sidebars.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 13](https://nextjs.org/) (App Router + Server Actions)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) + [Mongoose](https://mongoosejs.com/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Media Uploads:** [UploadThing](https://uploadthing.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + CSS Custom Properties
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) + [Zod Validation](https://zod.dev/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 📂 Project Structure

```text
├── app/
│   ├── (auth)/                # Auth layouts, sign-in, sign-up, onboarding
│   ├── (root)/                # Main application routes
│   │   ├── activity/          # Activity notifications feed
│   │   ├── communities/       # Community discovery & management
│   │   ├── create-thread/     # Thread creation page
│   │   ├── profile/[id]/      # User profile + Appearance settings & Thread Deletion
│   │   ├── search/            # Creator search page
│   │   ├── thread/[id]/       # Thread detail & nested comments
│   │   ├── loading.tsx        # Global route loading UI
│   │   └── page.tsx           # Home feed
│   ├── globals.css            # CSS custom properties & theme tokens
│   └── icon.svg               # SVG Favicon icon
├── components/
│   ├── cards/                 # ThreadCard, UserCard, CommunityCard
│   ├── forms/                 # PostThreads, Comment, AccountProfile
│   └── shared/                # Topbar, LeftSidebar, RightSidebar, Bottombar, ThemeAccentPicker
├── lib/
│   ├── actions/               # Server Actions (thread, user, community)
│   ├── models/                # Mongoose schemas (Thread, User, Community)
│   └── validation/            # Zod validation schemas
├── public/assets/             # SVG icons & logo assets
└── middleware.ts              # Clerk authentication middleware
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas database cluster
- Clerk project API keys
- UploadThing account keys

### 1. Clone the repository

```bash
git clone https://github.com/Neelesh19634/Threads.git
cd Threads
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
MONGODB_URL="your-mongodb-connection-string"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Runs the Next.js development server on port 3000 |
| `npm run build` | Builds the optimized production bundle |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint type checks |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check out the [issues page](https://github.com/Neelesh19634/Threads/issues).

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
