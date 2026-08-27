# API Documentation — EDVANZ Learning Portal

> [!NOTE]
> **Status**: Pending Backend Integration.
> Currently, the EDVANZ Learning Portal frontend uses client-side state management (`AppStateProvider` in `src/lib/app-state.tsx`) backed by `localStorage` (`kidzy-app-state-v1`) and mock datasets (`src/data/portal.ts`, `src/data/support.ts`).
> 
> This document is prepared as a standard template for the backend development team to populate once REST / GraphQL APIs are released.

---

## Endpoint Specification Template

### 1. Authentication & User Profile

#### `GET /api/v1/profile`
- **Method**: `GET`
- **Purpose**: Fetch authenticated learner profile.
- **Authentication**: `Bearer <JWT_TOKEN>`
- **Response Structure**:
```json
{
  "name": "Emma",
  "avatar": "🦊",
  "level": 12,
  "xp": 4820,
  "xpToNext": 6000,
  "coins": 1340,
  "streak": 17
}
```
- **Frontend Usage**: `src/lib/app-state.tsx` / `src/pages/ProfilePage.tsx`

---

### 2. Courses & Progress

#### `GET /api/v1/courses`
- **Method**: `GET`
- **Purpose**: Retrieve course catalog with filter parameters (`subject`, `level`, `price`, `query`).
- **Response Structure**: Array of `Course` objects (`src/data/portal.ts`).
- **Frontend Usage**: `src/pages/ExplorePage.tsx` / `src/pages/DashboardPage.tsx`

---

### 3. Support Tickets

#### `POST /api/v1/tickets`
- **Method**: `POST`
- **Purpose**: Create a new support ticket.
- **Request Body**:
```json
{
  "subject": "Quiz XP missing",
  "category": "Quizzes & XP",
  "priority": "High",
  "description": "Scored 100 on quiz but XP was not awarded."
}
```
- **Frontend Usage**: `src/pages/NewTicketPage.tsx`
