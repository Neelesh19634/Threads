# Threads — Enterprise Full-Stack Social Network Platform

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-threads--sepia--six.vercel.app-7928CA?style=for-the-badge&logo=vercel&logoColor=white)](https://threads-sepia-six.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/Vercel-Deployment%20Passed-success?style=flat-square&logo=vercel)](https://threads-sepia-six.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-13.4%20(App%20Router)-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20%2B%20Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

> A high-performance, real-time micro-blogging social network application built with the **Next.js 13 App Router**, **Server Actions**, **Clerk Multi-Tenant Authentication**, **MongoDB**, and a custom **Zero-FOUC design architecture**.

---

### 🌐 Primary Call-to-Action (CTA)

👉 **Experience the Live Application:** **[https://threads-sepia-six.vercel.app/](https://threads-sepia-six.vercel.app/)**

---

## 📋 Table of Contents

- [Executive Overview](#-executive-overview)
- [Key Features & Technical Highlights](#-key-features--technical-highlights)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [System Architecture Flow](#-system-architecture-flow)
- [Quick Start / Local Development](#-quick-start--local-development)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [Environment Variables Template](#-environment-variables-template)
- [Usage & Key Workflows](#-usage--key-workflows)
- [Live Deployment & Production Status](#-live-deployment--production-status)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Executive Overview

**Threads** is an enterprise-grade social networking and community platform designed to demonstrate modern web engineering best practices:
- **Performance-First Architecture:** Leverages Next.js Server Components and Server Actions to minimize client-side JavaScript bundle sizes and maximize Core Web Vitals.
- **Zero-FOUC Theme Resilience:** Eliminates Flash of Unstyled Content (FOUC) across Light, Dark, and System modes via synchronous `<head>` script execution.
- **Data Integrity & Scalable Schemas:** Uses relational-style population with Mongoose over MongoDB, enabling recursive multi-level comment nesting and clean cascade deletion workflows.

---

## ✨ Key Features & Technical Highlights

- 🔐 **Multi-Tenant Authentication & Mandatory Onboarding:** Seamless sign-in, sign-up, session handling, and organization switching powered by Clerk with mandatory profile completion guards.
- 🎨 **Adaptive Zero-FOUC Design System:**
  - Synchronous runtime detection supporting Light, Dark, and OS System preference matching.
  - Live 4-color accent personalization (**Obsidian Indigo**, **Cyber Emerald**, **Electric Blue**, **Sunset Amber**) persisted to client storage.
- 💬 **Interactive Threads & Recursive Reply Trees:** Full micro-blogging engine supporting top-level posts, multi-level threaded replies, optimistic like counts, reposting, and clipboard link sharing.
- 🗑️ **Author-Scoped Cascade Deletion:** Secure post deletion restricted exclusively to verified post creators inside their profile dashboard with recursive database purging of all descendant replies.
- 🔔 **Activity Feed & Unread Badges:** Live notifications tracking community interactions and reply mentions with auto-clearing unread badge counters.
- 🔍 **Debounced Creator Search & Community Management:** Search creators in real-time with debounced database queries and discover/manage interest-based communities.
- ⚡ **Global Interaction & State Feedback:** Next.js route loading screens (`loading.tsx`), interactive button spinners, and toast feedback for seamless user transitions.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 13.4 (App Router) | Server-side rendering, routing, API routes, and Server Actions |
| **Language** | TypeScript 5 | End-to-end type safety across client, server actions, and schemas |
| **Authentication** | Clerk (`@clerk/nextjs`) | User management, session handling, and Edge middleware guards |
| **Database** | MongoDB Atlas & Mongoose | Document database with relational schema references |
| **File Storage** | UploadThing | Secure media upload pipeline and CDN delivery |
| **Styling** | Tailwind CSS + CSS Custom Properties | Semantic design tokens, glassmorphism, and responsive layout |
| **Component Primitives**| shadcn/ui & Radix UI | Accessible, accessible UI primitives and interactive modals |
| **Validation & Forms** | React Hook Form + Zod | Schema-driven form validation and type-safe payloads |
| **Hosting & CI/CD** | Vercel Platform | Edge middleware, serverless functions, and production deployments |

---

## 🏗️ System Architecture Flow

```text
[ Client Browser ]
       │
       ├── (1) Zero-FOUC Theme Init (<head> Synchronous Script)
       ├── (2) Clerk Edge Middleware Validation (middleware.ts)
       │
[ Next.js 13 Server Actions / App Router ]
       │
       ├── (3) Authentication Verification (auth() & currentUser())
       ├── (4) Zod Payload Validation
       │
[ Database & Storage Layer ]
       ├── (5) MongoDB Atlas (Mongoose Multi-Level Populate & Cascade Ops)
       └── (6) UploadThing (Direct Media Asset Storage)
```

---

## 🚀 Quick Start / Local Development

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js:** `v18.17.0` or higher
- **Package Manager:** `npm` (v9+) or `yarn` / `pnpm`
- **Database:** MongoDB Atlas URI or local MongoDB instance
- **API Keys:** Clerk & UploadThing credentials

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
   ```bash
   cp .env.example .env.local
   ```
   *(Populate your `.env.local` with your database and API credentials)*

4. **Launch the development server:**
   ```bash
   npm run dev
   ```

5. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🔑 Environment Variables Template

Create a `.env.local` file in your root project directory:

```env
# Database Connection
MONGODB_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/threads?retryWrites=true&w=majority"

# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Clerk Route Redirection Rules
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/onboarding"

# UploadThing Media Storage
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="your_app_id"
```

> [!CAUTION]
> Never commit `.env.local` or sensitive API keys to public version control.

---

## 💡 Usage & Key Workflows

### 1. Publishing Threads & Nested Replies
- Authenticated users navigate to **Create Thread** to publish rich text content.
- Users can click any thread to view and participate in recursive comment trees.

### 2. Live Theme Customization & Accessibility
- Click the **Sun/Moon** toggle in the header for instantaneous Light / Dark / System mode switching.
- Navigate to **Profile → Appearance** to select personalized accent color tokens.

### 3. Cascade Thread Deletion
- Post authors can manage their threads inside their **Profile** view.
- Triggering deletion invokes a recursive database cascade that removes the post and all associated replies.

---

## 🚀 Live Deployment & Production Status

- **Production URL:** **[https://threads-sepia-six.vercel.app/](https://threads-sepia-six.vercel.app/)**
- **Hosting Provider:** Vercel Global Edge Network
- **Continuous Deployment:** Integrated with GitHub `main` branch

---

## 🗺️ Roadmap

- [x] Next.js 13 App Router with Server Actions migration
- [x] Zero-FOUC Theme Engine & Live Accent Picker
- [x] Author-scoped cascade thread deletion
- [x] Unread activity badges and creator search
- [x] Production Vercel deployment with Edge middleware
- [ ] Direct real-time messaging between creators
- [ ] Push notifications for thread interactions

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the Project repository.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'feat: add AmazingFeature'`).
4. Push to the Branch (`git checkout -b feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.
