# Technical Architecture — EDVANZ Learning Portal

## 1. High-Level Architecture
The EDVANZ Learning Portal is a modern Single Page Application (SPA) built using React 19, TypeScript, Vite, and Tailwind CSS v4. State is managed via React Context with LocalStorage persistence.

```
+-------------------------------------------------------------------+
|                        Client Browser                             |
|                                                                   |
|  +-------------------------------------------------------------+  |
|  |                 BrowserRouter (React Router v7)             |  |
|  |                                                             |  |
|  |   +-----------------------------------------------------+   |  |
|  |   |                  AppShell Layout                    |   |  |
|  |   |                                                     |   |  |
|  |   |  +----------------+  +---------------------------+  |   |  |
|  |   |  |   AppSidebar   |  |          TopBar           |  |   |  |
|  |   |  +----------------+  +---------------------------+  |   |  |
|  |   |                      |  <Outlet /> (Page Views)  |  |   |  |
|  |   |                      +---------------------------+  |   |  |
|  |   +-----------------------------------------------------+   |  |
|  +-------------------------------------------------------------+  |
|                                                                   |
|  +-------------------------------------------------------------+  |
|  |             AppStateContext (React Context API)             |  |
|  |   State: favourites, enrolled, quizScores, profile...       |  |
|  |   Syncs with: LocalStorage ("kidzy-app-state-v1")          |  |
|  +-------------------------------------------------------------+  |
+-------------------------------------------------------------------+
```

---

## 2. Directory Structure & Organization

```
contact-support-flow/
├── public/                 # Static assets (favicon, favicon.ico)
├── src/
│   ├── assets/             # Images (edvanz-logo.png, hero/course 3D graphics)
│   ├── components/         # Core application components
│   │   ├── AppSidebar.tsx  # Main collapsible navigation sidebar
│   │   ├── TopBar.tsx      # Header search, XP, streak, notifications, user pill
│   │   ├── CourseCard.tsx  # Reusable course card component
│   │   ├── EdvanzLogo.tsx  # Vector fallback logo component
│   │   ├── PageHeader.tsx  # Reusable page title & eyebrow header
│   │   ├── QuizDialog.tsx  # Interactive quiz modal component
│   │   ├── StatusPill.tsx  # Support ticket status pill
│   │   └── ui/             # Radix UI primitive wrappers & Tailwind components
│   ├── data/               # Static mock data & TypeScript definitions
│   │   ├── portal.ts       # Courses, learner profile, quizzes, badges, subjects
│   │   └── support.ts      # Tickets, chat transcript, support channels, FAQs
│   ├── lib/                # Shared utilities & state hooks
│   │   ├── app-state.tsx   # Global Context Provider & LocalStorage persistence
│   │   ├── meta.ts         # Page title & description hook (useDocumentMeta)
│   │   └── utils.ts        # Tailwind class merge utility (cn)
│   ├── pages/              # 19 Page components (Dashboard, Explore, Support, etc.)
│   ├── App.tsx             # Route registry & AppShell layout
│   ├── main.tsx            # Entry point rendering React DOM root
│   └── styles.css          # CSS theme tokens & Tailwind v4 directives
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 3. Router Architecture
Application routing is handled by `react-router-dom` v7 with standard `BrowserRouter`.

- **Layout Wrapper (`AppShell`)**:
  - `AppStateProvider` (injects global portal state)
  - `SidebarProvider` (manages sidebar expanded/collapsed state)
  - Layout Grid: `<AppSidebar />` + `<TopBar />` + `<main><Outlet /></main>`
  - `<Toaster />` (Sonner toast container)

- **Route Registry (`src/App.tsx`)**:
  - `/` -> `DashboardPage`
  - `/my-learning` -> `MyLearningPage`
  - `/explore` -> `ExplorePage`
  - `/subjects` -> `SubjectsPage`
  - `/learning-path` -> `LearningPathPage`
  - `/live-classes` -> `LiveClassesPage`
  - `/quizzes` -> `QuizzesPage`
  - `/achievements` -> `AchievementsPage`
  - `/leaderboard` -> `LeaderboardPage`
  - `/certificates` -> `CertificatesPage`
  - `/profile` -> `ProfilePage`
  - `/settings` -> `SettingsPage`
  - `/courses/:courseId` -> `CourseDetailPage`
  - `/support` -> `SupportLayout` (nested outlet: home, new ticket, chat, tickets, ticket thread)

---

## 4. State Management Architecture
Global state is managed by `AppStateProvider` in `src/lib/app-state.tsx`.

- **Storage Key**: `kidzy-app-state-v1`
- **Managed Properties**:
  - `favourites: string[]` (array of saved course IDs)
  - `enrolled: string[]` (array of enrolled course IDs)
  - `doneChallenges: string[]` (array of completed challenge tasks)
  - `interests: string[]` (array of selected subject names)
  - `profile: { name, avatar, bio }` (user profile metadata)
  - `quizScores: Record<string, number>` (highest score per quiz title)
  - `reminders: string[]` (array of live class reminder topics)

---

## 5. UI Component Architecture (`@/components/ui`)
UI primitives are built on **Radix UI** primitives and styled using **Tailwind CSS v4** with `class-variance-authority` (cva) and `clsx` / `tailwind-merge` (`cn` helper in `src/lib/utils.ts`).

---

## 6. Asset & Image Strategy
- **Image Assets**: Stored in `src/assets/`.
- **Sidebar Logo Handling**: Pristine `edvanz-logo.png` (1920x1080 canvas) rendered inside a container with `overflow-hidden` and `scale-[2.5]` CSS transformation to crop outer padding cleanly without image file re-encoding or distortion.
