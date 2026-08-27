# Product Requirements Document (PRD) — EDVANZ Learning Portal

## 1. Product Overview
**EDVANZ** ("Beyond Learning.") is an interactive, gamified web-based learning management system designed for young learners aged 12–19. The portal provides structured subject learning tracks (Math, Science, English, Coding, Art, Music, Robotics, Languages, General Knowledge), live classes, timed quizzes, interactive daily challenges, level progress tracking, certificates, and a full contact support ticketing & live chat system.

---

## 2. Product Goals
- Deliver a vibrant, high-engagement learning dashboard with XP, levels, daily streaks, and leaderboard rankings.
- Provide a smooth course discovery, enrollment, and checkout experience for both Free and Premium courses.
- Support real-time interactive learning elements (live class scheduling, quiz retries, interactive video player with lesson notes and course modules).
- Provide a comprehensive customer support flow with live chat, ticket creation, ticket status tracking, and FAQ self-service.

---

## 3. User Personas
1. **Student / Young Learner (Ages 12–19)**:
   - Explores courses, tracks XP, completes daily challenges, joins live classes, takes quizzes, earns badges, and views leaderboard rankings.
2. **Parent / Guardian**:
   - Manages settings (daily screen time limit, PIN for purchases, email reports, language preferences).

---

## 4. Core Features & Functional Requirements

### 4.1 Dashboard (`/`)
- Hero Banner with level info (`Level 12`), XP progress bar (`4820 / 6000 XP`), streak info (`17-day streak`), and quick action buttons.
- 4 Stat Cards: Enrolled Courses, Lessons Done, Weekly Streak, Learning Hours.
- Continue Learning Carousel/Grid with course progress and "Resume" buttons.
- Interactive Daily Challenge checklist (`⚡ XP` badges).
- Upcoming Classes preview cards.
- Popular Right Now course cards.
- Browse Subjects grid.
- Leaderboard status banner.

### 4.2 Explore Courses (`/explore`)
- Search input bar filtering by title, instructor, or subject.
- Filter chips by **Subject** (All, Math, Science, English, Coding, Art, Music, Languages, Robotics, General Knowledge), **Level** (All Levels, Beginner, Intermediate, Advanced), and **Price** (All, Premium, Free).
- Course Cards with favorite toggle (heart icon), ratings, duration, student counts, and "Resume" / "Enroll Now" action buttons.

### 4.3 Course Detail & Enrollment Flow (`/courses/:courseId`)
- **Free Course Preview**: Renders "Enroll Course For Free" page with course metadata, rating banner, learning objectives, and a "Start" button.
- **Paid / Premium Course Flow**:
  1. "Unlock a Course" modal detailing price (`₹ 499`), lifetime access, and learning points.
  2. "Secure Checkout" modal supporting payment method selection (UPI/Google Pay/PhonePe, Credit/Debit card).
  3. "Enrollment Successful!" confirmation screen with piggy bank artwork and access summary.
- **Lesson Player View**:
  - Course completion progress bar (`87%`).
  - Interactive video player controls (Play/Pause, Mute/Unmute, 05:30 / 12:00 duration line, Speed selector: 0.75x–2.0x, Fullscreen).
  - Tabs for `Overview`, `Notes` (editable textarea with local saving), and `Announcement`.
  - Module lesson sidebar with completed (✓), active (▶), and locked (🔒) states.
  - "UP Next" lesson preview card.

### 4.4 Subjects (`/subjects`)
- 9 pastel subject cards with course counts, level tags, 3D icons, and click-through filtering to `/explore`.

### 4.5 Learning Path (`/learning-path`)
- Python Creator track timeline with 5 steps (`01`–`05`).
- Step progress bars (`100%`, `62%`, `0%`) and "Continue Level" CTA for active level.

### 4.6 Live Classes (`/live-classes`)
- 2x2 grid of upcoming live classes (*Fraction Face off*, *Build a Discord Bot*, *Sketching Anime Eyes*, *Story Time: Dragons*).
- Start countdown pills (`⏳ Start in 42 mins`) and "Join Class" buttons opening classroom dialog.

### 4.7 Quizzes (`/quizzes`)
- 6 timed quizzes with subject tags, question count, best score status (`Best Score 92%` vs `Not Attempted Yet`), and "Start Quiz" / "Retry Quiz" buttons.
- Interactive modal quiz player with score calculation and confetti toast notifications.

### 4.8 Leaderboard (`/leaderboard`)
- Weekly XP rankings table showing top learners, avatars, level, "You" highlight tag, and XP values.

### 4.9 Certificates (`/certificates`)
- Proof of completion grid with 3D graduation cap artwork.
- Download SVG certificate generator and share link functions.

### 4.10 Profile (`/profile`)
- User avatar, streak info, XP progress, 4 stat cards, interest pills, recent badges, certificates list, and display name editor modal.

### 4.11 Settings (`/settings`)
- Profile preferences (Display Name, Email).
- Appearance & Language (Dark Mode switch, Language select, Larger text switch).
- Notifications (Live class reminders, Daily challenge nudge, Weekly parent report).
- Privacy (Daily screen time limit slider: 15–180 mins, Classmate messages, Require PIN, Share progress).

### 4.12 Contact Support Flow (`/support/*`)
- **Support Home (`/support`)**: Channel cards (Live Chat, Raise Ticket, My Requests), search topics, FAQ accordions, and helpline contacts.
- **New Ticket (`/support/new`)**: Form with subject, category select, priority select, description textarea, file attachment dropzone, and Zod validation.
- **Support Chat (`/support/chat`)**: Real-time simulated live chat interface with support agent (Riya) and quick reply chips.
- **Ticket List (`/support/tickets`)**: List of submitted support tickets with status filter pills (Open, In progress, Waiting on you, Resolved).
- **Ticket Thread (`/support/tickets/:ticketId`)**: Thread details, message timeline, and reply box.

---

## 5. Non-Functional Requirements
- **Performance**: Instant client-side state updates and zero full-page reloads.
- **Responsiveness**: Fully responsive layout from mobile (320px) to desktop (1920px).
- **Accessibility**: Keyboard focus rings (`focus-visible:ring-2`), semantic HTML5 tags, and aria-pressed attributes.
- **Data Resilience**: Graceful fallbacks when localStorage is clear or corrupted.

---

## 6. Known Limitations
- Current codebase uses mock data (`src/data/portal.ts`, `src/data/support.ts`) and client-side LocalStorage (`kidzy-app-state-v1`).
- Backend REST API integration is pending.
