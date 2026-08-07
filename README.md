# Threads — Full-Stack Micro-Blogging Platform with Local AI & Cloudinary

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/Vercel-Deployment%20Passed-success?logo=vercel)](https://threads-app-three-liart.vercel.app)
[![Version](https://img.shields.io/badge/version-1.1.0-indigo.svg)](https://github.com/Neelesh19634/Threads)
[![Next.js](https://img.shields.io/badge/Next.js-13.4%20(App%20Router)-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Ollama](https://img.shields.io/badge/AI-Ollama%20(Llama%203.2)-FF6F00?logo=ollama)](https://ollama.com)
[![Cloudinary](https://img.shields.io/badge/Storage-Cloudinary-3448C5?logo=cloudinary)](https://cloudinary.com)

> A production-grade, real-time micro-blogging social media application built with Next.js 13 Server Actions, MongoDB, Clerk Authentication, Cloudinary media pipeline, and an integrated local AI writing assistant powered by Ollama (`llama3.2`).

🌐 **Live Demo:** [threads-app-three-liart.vercel.app](https://threads-app-three-liart.vercel.app)  
📦 **GitHub Repository:** [github.com/Neelesh19634/Threads](https://github.com/Neelesh19634/Threads)

---

## 📋 Table of Contents

- [Overview & Key Highlights](#-overview--key-highlights)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Getting Started & Local Setup](#-getting-started--local-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Ollama Local AI Setup](#ollama-local-ai-setup)
- [Environment Variables](#-environment-variables)
- [Core Engineering Highlights](#-core-engineering-highlights)
- [License](#-license)

---

## 🎯 Overview & Key Highlights

**Threads** is a full-stack, enterprise-ready micro-blogging platform designed for performance, security, and exceptional user experience. Built with modern web architecture principles, it addresses common bottlenecks in traditional social applications—such as slow server roundtrips, flash of unstyled content (FOUC), and cumbersome content creation workflows—by integrating server-side rendering, Server Actions, Cloudinary media optimization, and a local privacy-focused LLM assistant.

### Why This Project Stands Out:
- 🤖 **On-Device Local AI Generation:** Integrates local LLM inference (`llama3.2`) via Ollama directly into the post creation box for instant drafting, polishing, and expansion with zero API cost or privacy leaks.
- 🖼️ **Cloudinary Media Infrastructure:** Cloud-native image uploads for user profiles and thread media with client-side base64 previews and full-screen React Portal lightboxes.
- 🎨 **Zero-FOUC Theme Engine:** Custom CSS variable design system supporting Light, Dark, and System modes with live 4-color accent selection (**Obsidian Indigo**, **Cyber Emerald**, **Electric Blue**, **Sunset Amber**).
- ⚡ **Optimized Server Performance:** Built on Next.js 13 App Router, leveraging Server Components and Server Actions to minimize client JavaScript bundle size and ensure ultra-fast feed rendering.

---

## ✨ Key Features

### 🤖 Local AI Writing Assistant (Ollama)
- **Embedded Assistance Tag:** Click **`Use Assistance`** inside the thread text area to trigger an inline AI prompt bar.
- **Smart Actions:** Generate posts from topics, polish drafts, or adjust content tone using local **Llama 3.2** inference.
- **Offline Resiliency:** Automatic health checking and clear terminal commands if Ollama is offline.

### 🖼️ Media & Image Experience
- **Cloudinary Image Uploads:** Seamless image attachment for threads and profile pictures using Cloudinary Server Actions.
- **Full-Screen Lightbox Modal:** Click any posted thread image to view it in full screen via React Portals (`createPortal`), complete with backdrop blur, `Esc` key listener, and close controls.

### 💬 Micro-Blogging & Social Interactions
- **Nested Thread Conversations:** Infinite multi-level reply trees for deep discussions.
- **Like & Repost System:** Instant like toggling with optimistic UI updates, repost counting, and clipboard share link copying.
- **Author-Scoped Purging:** Global thread deletion reserved for post authors on their profile, executing recursive Mongoose MongoDB cleanup for all descendant comments.

### 👥 User Profiles & Communities
- **Clerk Authentication:** Multi-tenant sign-in, sign-up, and onboarding flows with protected middleware routes.
- **Activity & Search:** Real-time debounced user search, unread activity notification badges, and community management.

---

## 🛠️ Tech Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 13.4 | App Router, Server Actions, Server Components |
| **Language** | TypeScript 5 | End-to-end type safety |
| **AI Model** | Ollama (`llama3.2`) | Local LLM inference engine for content generation |
| **Database & ORM** | MongoDB Atlas + Mongoose | Schema definitions, index optimization, and aggregation |
| **Authentication** | Clerk (`@clerk/nextjs`) | Session management, OAuth, and protected middleware |
| **File & Image Storage**| Cloudinary (`cloudinary`) | Media uploads, CDN delivery, image transformations |
| **Styling & Icons** | Tailwind CSS + Lucide Icons | Responsive layout, theme CSS variables, UI icons |
| **UI Components** | shadcn/ui + Radix UI | Accessible modal dialogs, tabs, and form primitives |
| **Form Management** | React Hook Form + Zod | Type-safe form validation and error handling |
| **Deployment** | Vercel | Global CDN edge deployment |

---

## 🏗️ Architecture Overview

```text
├── app/
│   ├── (auth)/             # Authentication layouts, Sign-in, Sign-up, Onboarding
│   ├── (root)/             # Core application routes (Home, Profile, Thread details, Search, Activity)
│   ├── api/
│   │   └── ollama/         # Local Ollama AI generation API endpoint
│   ├── globals.css         # CSS design tokens, mode-aware focus rules, theme variables
│   └── icon.svg            # Custom SVG tab favicon
├── components/
│   ├── cards/              # ThreadCard (with Lightbox & Modal Portals), UserCard, CommunityCard
│   ├── forms/              # PostThreads (with AI Assistant tag), Comment, AccountProfile
│   ├── shared/             # Topbar, LeftSidebar, RightSidebar, ThemeAccentPicker, ThreadsTab
│   └── ui/                 # Reusable UI primitives (Button, Textarea, Tabs, Input, Form)
├── lib/
│   ├── actions/            # Server Actions (thread.actions, user.actions, upload.action, community.actions)
│   ├── models/             # Mongoose schemas (Thread, User, Community)
│   └── validation/         # Zod schemas (ThreadValidation, UserValidation, CommentValidation)
└── middleware.ts           # Clerk Edge Middleware route protection
```

---

## 🚀 Getting Started & Local Setup

### Prerequisites

Ensure you have the following installed on your environment:
- **Node.js:** v18.17.0 or higher
- **npm:** v9+
- **MongoDB:** A MongoDB Atlas cluster URI or local MongoDB instance
- **Ollama:** *(Optional, for AI Assistant)* Installed on macOS/Linux/Windows

### Installation

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
   Create a `.env.local` file in the root folder (see template below).

4. **Start Development Server:**
   ```bash
   npm run dev
   ```

5. **Open Browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

---

### 🤖 Ollama Local AI Setup (Optional)

To enable the local AI Assistant feature:

1. **Install Ollama on your Mac:**
   ```bash
   brew install ollama
   ```
   *(Or download from [ollama.com](https://ollama.com))*

2. **Download & Run Llama 3.2:**
   ```bash
   ollama run llama3.2
   ```

3. **Test AI Assistant:**
   Open the Thread Creation page (`/create-thread`), click **`✨ Use Assistance`**, and generate thread posts instantly!

---

## 🔑 Environment Variables

Create `.env.local` in your root directory with the following keys:

```env
# MongoDB Connection
MONGODB_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/threads?retryWrites=true&w=majority"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/onboarding"

# Cloudinary Media Storage
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Optional: Custom Ollama Endpoint (Defaults to http://127.0.0.1:11434/api/generate)
OLLAMA_URL="http://127.0.0.1:11434/api/generate"
```

---

## 🧠 Core Engineering Highlights

- **React Portals (`createPortal`)**: Solved CSS backdrop-filter stacking context limitations by rendering custom modal dialogs and full-screen image lightboxes directly onto `document.body`.
- **Mode-Aware Focus Borders**: Developed zero-flash, high-visibility focus borders that dynamically shift to solid black in light mode and solid white in dark mode via CSS variables (`--focus-border`).
- **Server Actions for Data Mutations**: Used Next.js 13 `revalidatePath` to trigger instant re-renders upon creating threads, liking posts, or adding comments without client-side state drift.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more details.
