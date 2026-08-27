# Testing Strategy — EDVANZ Learning Portal

This document defines the testing procedures, build validation requirements, and scenario verifications.

---

## 1. Static Type Checking & Build Validation
Before submitting any pull request or finishing an AI coding task, you MUST run:

```bash
npx tsc --noEmit
```

### Requirement:
- Must finish with **0 errors**.
- Any TypeScript error caused by optional prop types (`exactOptionalPropertyTypes`) or index signature access (`noPropertyAccessFromIndexSignature`) must be resolved explicitly.

---

## 2. Mandatory Verification Scenarios

### Scenario A: Course Enrollment & Checkout Flow
1. Navigate to `/courses/python-quest` (Free course).
2. Verify "Enroll Course For Free" page renders with "Start" button.
3. Click "Start" -> Verify enrollment status updates and lesson player view opens.
4. Navigate to `/courses/algebra-arcade` (Paid course).
5. Verify "Unlock a Course" modal appears with ₹499 price banner.
6. Click "Unlock Now" -> Verify "Secure Checkout" payment selection opens.
7. Click "Unlock Now" -> Verify "Enrollment Successful!" confirmation page opens.

### Scenario B: Contact Support Flow
1. Navigate to `/support`.
2. Click "Raise a ticket" (`/support/new`).
3. Submit empty form -> Verify Zod validation messages appear.
4. Fill valid subject and description -> Submit ticket.
5. Verify redirection to `/support/tickets` with new ticket listed.
6. Navigate to `/support/chat` -> Send a message -> Verify response in chat timeline.

### Scenario C: Gamification & Profile Updates
1. Toggle daily challenges on Dashboard -> Verify XP updates in state.
2. Take a quiz in `/quizzes` -> Verify score saving.
3. Edit profile name in `/profile` or `/settings` -> Verify TopBar and profile hero update instantly.
