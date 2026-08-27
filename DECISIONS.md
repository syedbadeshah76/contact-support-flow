# Architectural Decisions Log — EDVANZ Learning Portal

This document records key technical decisions made during the development of the codebase.

---

## 1. Migration from TanStack Router to React Router v7
- **Decision**: Purged all `@tanstack/*` packages, removed `.tanstack/` build artifacts, and migrated 18 route files from `src/routes/` to standard React components in `src/pages/` using `react-router-dom` v7 (`BrowserRouter`).
- **Reason**: Standardized SPA routing structure, reduced build overhead, and eliminated complex file-based router generation conflicts.
- **Consequence for Developers**: Do NOT re-introduce TanStack Router dependencies or file-based routes in `src/routes/`. All pages live in `src/pages/` and are registered in `src/App.tsx`.

---

## 2. Image Canvas Padding Handling via CSS Container Zoom
- **Decision**: Keep `src/assets/edvanz-logo.png` as its original 81.5KB PNG asset (1920x1080 canvas) and apply CSS container cropping with `scale-[2.5]` inside `AppSidebar.tsx`.
- **Reason**: Direct PNG re-encoding or canvas slicing scripts introduced color channel and pixel distortion artifacts. CSS container zooming crops outer blank padding cleanly without modifying the source image file.
- **Consequence for Developers**: Do NOT attempt to programmatically modify or crop `edvanz-logo.png` binary data.

---

## 3. Client-First State Management with LocalStorage
- **Decision**: Centralized application state inside `AppStateProvider` (`src/lib/app-state.tsx`) backed by `localStorage` key `kidzy-app-state-v1`.
- **Reason**: Enables immediate interactive demonstration of course enrollments, favorites, daily challenge completions, quiz scores, and support tickets without requiring an active backend server during design phase.
- **Consequence for Developers**: Any new global user state property must be added to `Persisted` type and initialized in `defaultState`.
