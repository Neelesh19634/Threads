# Threads — Enterprise Full-Stack Social Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/Vercel-Deployment%20Passed-success?logo=vercel)](https://threads-app-three-liart.vercel.app)
[![Version](https://img.shields.io/badge/version-1.0.0-indigo.svg)](https://github.com/Neelesh19634/Threads)
[![Next.js](https://img.shields.io/badge/Next.js-13.4%20(App%20Router)-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)

> A high-performance, real-time micro-blogging social platform built with Next.js 13 Server Actions, Clerk authentication, MongoDB, and an adaptive zero-FOUC design system.

🌐 **Live Demo:** [https://threads-app-three-liart.vercel.app](https://threads-app-three-liart.vercel.app)  
📦 **Repository:** [https://github.com/Neelesh19634/Threads](https://github.com/Neelesh19634/Threads)

---

## 📋 Table of Contents

- [Overview / Why This Project Exists](#-overview--why-this-project-exists)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Quick Start / Getting Started](#-quick-start--getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [Environment Variables & Configuration](#-environment-variables--configuration)
- [Usage Examples & Core Workflows](#-usage-examples--core-workflows)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview / Why This Project Exists

**Threads** was designed to solve the need for a modern, scalable, and responsive micro-blogging social media platform. Existing legacy platforms often suffer from slow page transitions, inconsistent theme switching flashes, and complex user onboarding.

This application provides a seamless experience for creators and communities:
- **Instantaneous Rendering:** Leverages Next.js Server Components and Server Actions to minimize client-side bundle size.
- **Zero-FOUC (Flash of Unstyled Content) Engine:** Guarantees dark/light mode switches execute synchronously in the browser `<head>` before initial DOM paint.
- **Comprehensive Community Ecosystem:** Empowers creators to discuss topics, discover peers, create communities, and manage content with granular author permissions.

---

## ✨ Key Features

- 🔑 **Multi-Tenant Auth & Onboarding:** Secure Clerk-powered authentication with custom profile creation and onboarding workflows.
- 🎨 **Adaptive Zero-FOUC Theme Engine:**
  - Synchronous light/dark/system mode toggle with zero initial paint flash.
  - Live 4-color accent selection (**Obsidian Indigo**, **Cyber Emerald**, **Electric Blue**, **Sunset Amber**) persisted in local state.
- 💬 **Interactive Threads & Nested Reply Trees:** Create top-level threads, join nested comment discussions, like posts with optimistic updates, repost, and copy share links.
- 🗑️ **Author-Scoped Recursive Deletion:** Thread deletion available exclusively to authors on their profile page, executing recursive MongoDB database purging for all child replies.
- 🔔 **Activity Feed & Real-Time Badges:** Unread notification indicators in sidebars that automatically clear upon visiting the Activity center.
- 🔍 **Creator Search & Communities:** Real-time debounced user search and community creation & management modules.
- ⚡ **Global Loading & Interaction Feedback:** Custom Next.js route loading screens (`loading.tsx`), button spinner states, and toast notifications.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 13.4 (App Router + Server Actions) |
| **Language** | TypeScript 5 |
| **Database & ORM** | MongoDB Atlas + Mongoose |
| **Authentication** | Clerk (`@clerk/nextjs`) |
| **File Storage** | UploadThing (`@uploadthing/react`) |
| **Styling & Design** | Tailwind CSS + Custom CSS Variables |
| **UI Components** | shadcn/ui + Radix UI Primitives |
| **Forms & Validation** | React Hook Form + Zod |
| **Deployment** | Vercel Serverless Platform |

---

## 🏗️ Architecture Overview

```text
├── app/
│   ├── (auth)/             # Auth layouts, sign-in, sign-up, onboarding routes
│   ├── (root)/             # Core app views (Home, Profile, Search, Activity, Communities)
│   ├── globals.css         # CSS tokens, theme variables, and momentum scroll rules
│   └── icon.svg            # Custom SVG browser tab favicon
├── components/
│   ├── cards/              # ThreadCard, UserCard, CommunityCard
│   ├── forms/              # PostThreads, Comment, AccountProfile forms
│   └── shared/             # Topbar, LeftSidebar, RightSidebar, ThemeAccentPicker
├── lib/
│   ├── actions/            # Server actions (thread.actions, user.actions, community.actions)
│   ├── models/             # Mongoose schemas (Thread, User, Community)
│   └── validation/         # Zod schema definitions
├── public/assets/          # Vector SVG icons & custom logo
└── middleware.ts           # Clerk Edge Middleware & route matching rules
```

---

## 🚀 Quick Start / Getting Started

### Prerequisites

Ensure your environment meets the following requirements before installation:
- **Node.js:** v18.17.0 or higher
- **Package Manager:** `npm` v9+ or `yarn` / `pnpm`
- **Database:** MongoDB Atlas connection string (or local MongoDB instance)
- **Services:** Active accounts on Clerk and UploadThing

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Neelesh19634/Threads.git
   cd Threads
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory (see template below).

4. **Launch Development Server:**
   ```bash
   npm run dev
   ```

5. **Access Application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🔑 Environment Variables & Configuration

Create a `.env.local` file in the project root with the following structure:

```env
# Database Connection
MONGODB_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/threads?retryWrites=true&w=majority"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Clerk Route Redirects
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/onboarding"

# UploadThing Storage
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="your-app-id"
```

> [!IMPORTANT]
> Never commit `.env.local` or secret production credentials to public repositories.

---

## 💡 Usage Examples & Core Workflows

### Creating a Thread
1. Click **Create Thread** in the left navigation sidebar.
2. Enter your content in the form and click **Post Thread**.
3. The server action automatically revalidates the home feed and redirects to `/`.

### Dark / Light / System Mode & Accent Switching
1. Use the **Sun/Moon** icon in the Topbar header to toggle theme modes instantly.
2. Open **Profile → Appearance** to select your preferred accent color (**Obsidian Indigo**, **Cyber Emerald**, **Electric Blue**, or **Sunset Amber**).

### Deleting a Thread (Author Only)
1. Navigate to your **Profile** page (`/profile/[id]`).
2. Locate your thread and click the **Trash icon**.
3. Confirm deletion to recursively remove the thread and all nested replies globally.

---

## 🗺️ Roadmap

- [x] Full Light / Dark / System theme engine with zero FOUC
- [x] Author profile thread deletion & recursive purging
- [x] Live activity notifications with badge counts
- [x] Custom vector logo & SVG favicon system
- [x] Production Vercel deployment with Edge middleware
- [ ] Push notifications for new replies
- [ ] Direct messaging between creators
- [ ] Media attachments in comments

---

## 🤝 Contributing

Contributions make the open-source community an incredible place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add some AmazingFeature'`)
4. Push to the Branch (`git checkout -b feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.
