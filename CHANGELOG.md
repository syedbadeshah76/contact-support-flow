# Changelog — EDVANZ Learning Portal

All notable changes to this project are documented in this file.

---

## [1.0.0] - 2026-08-27 — Initial Documentation & Figma Feature Baseline

### Added
- Created comprehensive project documentation suite (`AGENTS.md`, `PRD.md`, `ARCHITECTURE.md`, `TECH_STACK.md`, `CODING_STANDARDS.md`, `API_DOCUMENTATION.md`, `UI_UX_GUIDELINES.md`, `TESTING.md`, `DECISIONS.md`, `TASKS.md`, `CHANGELOG.md`).
- Implemented full Figma design layouts for 9 primary views:
  - Dashboard (`/`)
  - Explore Courses (`/explore`)
  - Subjects (`/subjects`)
  - Learning Path (`/learning-path`)
  - Live Classes (`/live-classes`)
  - Quizzes (`/quizzes`)
  - Leaderboard (`/leaderboard`)
  - Certificates (`/certificates`)
  - Profile (`/profile`)
  - Settings (`/settings`)
- Implemented Course Enrollment & Checkout Flow (`/courses/:courseId`) with Free preview, Paid unlock modal, Secure checkout, and Enrollment confirmation screens.
- Added `/settings` route and updated navigation links in `AppSidebar.tsx`.

### Fixed
- Fixed EDVANZ logo rendering in sidebar by restoring original PNG asset and using CSS container zooming (`scale-[2.5]`), eliminating aspect ratio clipping and pixel distortion.
- Replaced TanStack Router with standard `react-router-dom` v7 `BrowserRouter`.
