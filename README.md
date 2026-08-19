# Threads — Enterprise Full-Stack AI-Powered Social Platform

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-threads--sepia--six.vercel.app-7928CA?style=for-the-badge&logo=vercel&logoColor=white)](https://threads-sepia-six.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/Vercel-Deployment%20Passed-success?style=flat-square&logo=vercel)](https://threads-sepia-six.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-13.4%20(App%20Router)-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Google Gemini AI](https://img.shields.io/badge/Google_Gemini-2.5_Flash_AI-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20%2B%20Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media_Engine-3448C5?style=flat-square&logo=cloudinary&logoColor=white)](https://cloudinary.com/)

> A high-performance, real-time micro-blogging social network application built with **Next.js 13 App Router**, **Server Actions**, **Google Gemini AI Assistant (`@google/genai`)**, **Clerk Multi-Tenant Authentication**, **MongoDB Atlas**, **Cloudinary Media Pipeline**, and a custom **Zero-FOUC design architecture**.

---

### 🌐 Live Production Application

👉 **Experience Live Demo:** **[https://threads-sepia-six.vercel.app/](https://threads-sepia-six.vercel.app/)**  
📦 **GitHub Repository:** **[https://github.com/Neelesh19634/Threads](https://github.com/Neelesh19634/Threads)**

---

## 📋 Table of Contents

- [Overview & Problem Statement](#-overview--problem-statement)
- [Key Features & Technical Highlights](#-key-features--technical-highlights)
- [Google Gemini AI Integration Architecture](#-google-gemini-ai-integration-architecture)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [System Architecture Flow](#-system-architecture-flow)
- [Getting Started / Local Development](#-getting-started--local-development)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
  - [Environment Configuration](#environment-configuration)
  - [Running the Application](#running-the-application)
- [Directory Structure](#-directory-structure)
- [Key Workflows & Usage](#-key-workflows--usage)
- [Roadmap](#-roadmap)
- [Contributing Guidelines](#-contributing-guidelines)
- [License](#-license)

---

## 🎯 Overview & Problem Statement

Modern social platforms require high responsiveness, instant zero-flicker theme adaptability, intelligent authoring assistance, and resilient real-time engagement feeds. Traditional monolithic social apps suffer from slow client hydration, content creation friction, and bloated client bundles.

**Threads** solves these challenges by combining:
- **AI-Powered Content Generation:** Direct server-side integration with **Google Gemini 2.5 Flash & Flash-Lite** via `@google/genai` to draft, enhance, expand, and polish creator posts with intelligent automated fallback resilience.
- **Server-Driven Performance:** Server-rendered React components and Next.js 13 Server Actions minimize client JavaScript payloads while ensuring sub-second response times.
- **Zero-FOUC Theme Architecture:** Synchronous `<head>` runtime evaluation prevents white screen flashes across Dark, Light, and OS System preference modes.
- **Relational Integrity on Document Storage:** Mongoose 8 schema relationships enable recursive multi-tier comment trees and atomic cascade deletion.

---

## ✨ Key Features & Technical Highlights

- 🤖 **Google Gemini AI Content Copilot:**
  - Embedded **AI Content Assistant** on thread creation (`/create-thread`) powered by Google's latest Gemini models (`gemini-2.5-flash`, `gemini-2.5-flash-lite`).
  - **Dynamic AI Actions:** Topic-to-Thread authoring, post polishing, draft enhancement, and intelligent character-length formatting (700–950 chars) tailored for social engagement.
  - **Automated Model Failover:** Multi-tier fallback matrix across Gemini model endpoints to ensure zero downtime during high-traffic or quota throttling.
- 🔐 **Authentication & Onboarding Guard:** Multi-tenant Clerk authentication with full OAuth / credentials workflows, organization switching, and onboarding route protection.
- 🎨 **Zero-FOUC Theme & Accent Personalization:**
  - Synchronous runtime detection for Light, Dark, and OS System modes without page flash.
  - Live 4-color accent selection (**Obsidian Indigo**, **Cyber Emerald**, **Electric Blue**, **Sunset Amber**) persisted to client storage.
- 📸 **Cloudinary Media Pipeline:** Integrated image attachment workflow allowing creators to upload and CDN-optimize media for threads and user avatars.
- 💬 **Interactive Threads & Nested Reply Trees:** Create top-level threads, participate in multi-tiered discussion replies, toggle optimistic likes, repost, and copy share URLs.
- 🗑️ **Author-Scoped Cascade Deletion:** Secure post deletion restricted exclusively to verified post creators on their profile page with recursive database purging of all descendant replies.
- 🔔 **Activity Feed & Unread Badges:** Live notifications tracking community interactions and reply mentions with auto-clearing unread badge counters.
- 🔍 **Debounced Search & Community Hubs:** Real-time debounced creator search and community creation & management modules.
- ⚡ **Global Interaction & State Feedback:** Next.js route loading screens (`loading.tsx`), interactive button spinners, and toast feedback for seamless user transitions.

---

## 🤖 Google Gemini AI Integration Architecture

The application provides a dedicated server-side route handler at [`app/api/ai/generate/route.ts`](app/api/ai/generate/route.ts) utilizing Google's official `@google/genai` SDK:

```text
[ User Prompt / Draft ]
          │
          ▼
[ Next.js API: /api/ai/generate ] ── Server-Side Guard (GEMINI_API_KEY)
          │
          ├── System Prompt Injection (Social Media Hook, Storytelling, Structure)
          │
          ▼
[ Gemini Multi-Model Failover Matrix ]
     ├── 1. gemini-flash-lite-latest
     ├── 2. gemini-2.5-flash-lite
     ├── 3. gemini-flash-latest
     └── 4. gemini-2.5-flash
          │
          ▼
[ Form Auto-Populate & Instant Creator Edit ]
```

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 13.4 (App Router) | Server-side rendering, routing, API routes, and Server Actions |
| **Artificial Intelligence** | Google Gemini AI (`@google/genai`) | AI social writing assistant, topic expansion, and content polishing |
| **Language** | TypeScript 5 | End-to-end static type safety across client, AI routes, and schemas |
| **Authentication** | Clerk (`@clerk/nextjs`) | User management, session handling, and Edge middleware routing |
| **Database** | MongoDB Atlas & Mongoose 8 | Document database with relational schema population & cascading |
| **Media Storage** | Cloudinary (`cloudinary`) | Media asset upload pipeline and CDN delivery |
| **Styling & Design** | Tailwind CSS 3.3 + CSS Variables | Semantic design tokens, glassmorphism, and responsive layout |
| **Component Primitives** | shadcn/ui & Radix UI | Accessible UI primitives and interactive modals |
| **Validation & Forms** | React Hook Form + Zod | Schema-driven form validation and type-safe payloads |
| **Deployment** | Vercel Platform | Global Edge Network, serverless functions, and CI/CD |

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
[ Service & Storage Layer ]
       ├── (5) Google Gemini AI Engine (@google/genai Model Matrix)
       ├── (6) MongoDB Atlas (Mongoose Multi-Level Populate & Cascade Ops)
       └── (7) Cloudinary (Direct Media Asset Storage & CDN)
```

---

## 🚀 Getting Started / Local Development

### Prerequisites

Ensure your development environment meets the following specifications:
- **Node.js:** `v18.17.0` or higher
- **Package Manager:** `npm` (v9+) / `yarn` / `pnpm`
- **Database:** MongoDB Atlas connection string
- **API Keys:** Google Gemini AI API key, Clerk, and Cloudinary developer credentials

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

### Environment Configuration

Create a `.env.local` file in your root project directory:

```env
# Database Connection
MONGODB_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/threads?retryWrites=true&w=majority"

# Google Gemini AI Key
GEMINI_API_KEY="AIzaSy..."

# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Clerk Route Redirection Rules
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/onboarding"

# Cloudinary Media Storage
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

> [!CAUTION]
> Never commit `.env.local` or secret production credentials to public repositories.

### Running the Application

| Action | Command | Purpose |
| :--- | :--- | :--- |
| **Development Server** | `npm run dev` | Starts local Next.js dev server on `http://localhost:3000` |
| **Type Check & Lint** | `npm run lint` | Runs ESLint and TypeScript checks |
| **Production Build** | `npm run build` | Compiles optimized server components and assets |
| **Production Server** | `npm run start` | Serves the production build locally |

---

## 📂 Directory Structure

```text
├── app/
│   ├── (auth)/                # Auth layouts, sign-in, sign-up, onboarding
│   ├── (root)/                # Main application routes
│   │   ├── activity/          # Activity notifications feed
│   │   ├── communities/       # Community discovery & management
│   │   ├── create-thread/     # Thread creation page with AI Copilot
│   │   ├── profile/[id]/      # User profile + Appearance settings & deletion
│   │   ├── search/            # Creator search page
│   │   ├── thread/[id]/       # Thread detail & nested comments
│   │   ├── loading.tsx        # Global route loading UI
│   │   └── page.tsx           # Home feed
│   ├── api/
│   │   └── ai/generate/       # Google Gemini AI route handler
│   ├── globals.css            # CSS custom properties & theme tokens
│   └── icon.svg               # SVG Favicon icon
├── components/
│   ├── cards/                 # ThreadCard, UserCard, CommunityCard
│   ├── forms/                 # PostThreads (with AI Assistant), Comment, AccountProfile
│   └── shared/                # Topbar, LeftSidebar, RightSidebar, ThemeAccentPicker
├── lib/
│   ├── actions/               # Server actions (thread, user, community, upload)
│   ├── models/                # Mongoose schemas (Thread, User, Community)
│   └── validation/            # Zod validation schemas
├── public/assets/             # SVG icons & logo assets
└── middleware.ts              # Clerk authentication middleware
```

---

## 💡 Key Workflows & Usage

### 1. Generating & Polishing Content with Gemini AI
- Navigate to **Create Thread** (`/create-thread`).
- Click **Use Assistance** at the bottom right of the composer.
- Enter a topic (e.g., *"The future of AI agents"* or *"Lessons from building scalable software"*) and click **Write**.
- Or, type a rough draft and click **Polish** to have Gemini refine your tone, hooks, and formatting.

### 2. Publishing Threads with Image Attachments
- Type your post and optionally upload an image attachment via Cloudinary.
- Click **Post Thread** — server actions automatically revalidate the feed and redirect to home.

### 3. Live Theme Switching & Color Accents
- Click the **Sun/Moon** icon in the Topbar for instantaneous Light / Dark / System mode switching.
- Navigate to **Profile → Appearance** to select personalized accent color tokens.

### 4. Cascade Thread Deletion
- Post authors can manage their threads inside their **Profile** view.
- Triggering deletion invokes a recursive database cascade that removes the post and all associated child replies.

---

## 🗺️ Roadmap

- [x] Google Gemini AI social assistant with multi-model failover
- [x] Next.js 13 App Router with Server Actions migration
- [x] Zero-FOUC Theme Engine & Live Accent Picker
- [x] Author-scoped cascade thread deletion
- [x] Unread activity badges and creator search
- [x] Production Vercel deployment with Edge middleware
- [ ] AI-generated smart reply recommendations in threads
- [ ] Direct real-time messaging between creators
- [ ] Push notifications for thread interactions

---

## 🤝 Contributing Guidelines

Contributions are welcome! To contribute:

1. Fork the Project repository.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'feat: add AmazingFeature'`).
4. Push to the Branch (`git checkout -b feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.
