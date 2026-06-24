# Threads Clone (Next.js 13)

A full-stack Threads-style social app built with the Next.js App Router, Clerk authentication, MongoDB + Mongoose, UploadThing, Tailwind CSS, and shadcn/ui.

## Tech Stack

- Next.js 13 (App Router + Server Actions)
- TypeScript
- Clerk (auth + org switcher)
- MongoDB + Mongoose
- UploadThing (profile image upload)
- Tailwind CSS + shadcn/ui
- React Hook Form + Zod

## Implemented Features

- Clerk sign-in/sign-up flows
- Onboarding form to complete profile
- Create thread
- Home feed with top-level threads
- Thread detail page with nested replies
- Comment on a thread
- Profile page with tabs and user thread list
- Responsive navigation (top, left, bottom bars)

## Project Routes

### Public/Auth

- `/sign-in/[[...sign-in]]`
- `/sign-up/[[...sign-up]]`

### Main App

- `/` home feed
- `/onboarding` complete user profile
- `/create-thread` create a new thread
- `/thread/[id]` thread detail + comments
- `/profile/[id]` user profile
- `/search` page scaffold exists
- `/activity` page scaffold exists
- `/communities` page scaffold exists

### API

- `/api/uploadthing` UploadThing route handler

## Folder Overview

- `app/`: App Router layouts, pages, API routes
- `components/`: shared UI, cards, forms, shadcn primitives
- `lib/actions/`: server actions for users and threads
- `lib/models/`: Mongoose schemas
- `lib/validation/`: Zod schemas
- `constants/`: sidebar and tab configuration

## Environment Variables

Create `.env.local` in the project root.

Required by this codebase:

```env
MONGODB_URL=
```

Required by integrated services:

- Clerk keys and URLs for Next.js (`@clerk/nextjs`)
- UploadThing server/client keys (`uploadthing`, `@uploadthing/react`)

Use your provider dashboard values for these variables.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Add `.env.local` with MongoDB, Clerk, and UploadThing values.

3. Start development server:

```bash
npm run dev
```

4. Open:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Data Model Summary

### User

- `id` (Clerk user id)
- `username`, `name`, `bio`, `image`
- `threads` (references to Thread)
- `onboarded` flag

### Thread

- `text`
- `author` (reference to User)
- `parentId` (string; null/undefined for top-level)
- `children` (references to Thread replies)
- `community` (reserved, currently not implemented)

## Current Status / Limitations

- Community flows are scaffolded but not implemented end-to-end.
- Search, Activity, and Communities pages are currently placeholders.
- Middleware references webhook paths, but no Clerk webhook API route is present in this repository.
- Some small typos/inconsistencies exist in current source (for example: `ref: 'Uesr'` in thread schema, and `webhood` in ignored middleware route).

## Notes for Contributors

- This project uses Next.js Server Actions from `lib/actions`.
- UI styling relies on utility classes in `app/globals.css` and Tailwind theme extensions.
- Image remote patterns are configured in `next.config.mjs` for Clerk, UploadThing, and placeholder hosts.
