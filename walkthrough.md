# Simplified Achievements screen

- A "Your numbers" strip: lifetime XP, day streak, quizzes passed, live classes and subjects explored — the five stats that drive every badge goal.
- No level display. Each badge is one stat with a goal; earned badges are colorful with an UNLOCKED chip, locked ones are grey with a simple progress bar.
- Removed filters, badge detail popups and the XP activity feed — the logic to explain to the backend is unchanged (XP → level ladder, stat → badge goal).
- Verified on desktop and mobile: renders without console errors; `bunx tsgo --noEmit` clean.

# Playful Neo-Pop quiz

- Active quizzes now open as a bold, spacious challenge screen with a mascot, XP and streak cues, progress, and a 30-second timer.
- Four responsive answer tiles provide immediate correct and incorrect feedback before advancing.
- Timed-out questions advance safely, while scoring, saved best scores, retry, and completion controls remain intact.

## Verification

- Pending final preview, responsive interaction, and type checks.

# Notification popover

- The header bell opens a notification list with an unread count.
- Selecting a notification marks it read and opens its destination.
- Mark all as read updates the count; Clear all removes the list and shows an empty state.
- Read and cleared states persist after a refresh.

## Verification

- Browser checks confirmed the popover opens, all three notifications render, marking all read and clearing the list update the bell, and the cleared empty state survives refresh. Individual notifications navigate to their destination and retain read state after refresh. Desktop and mobile popovers rendered without page errors.
- `bunx tsgo --noEmit` completed with no errors; the latest preview build reported `build OK`.

# Child-friendly Edit Profile

- The Profile page now opens a dedicated editor for avatar, learner name, age, email, interests, favourite subjects, and security preferences.
- Save Changes validates every field, persists the learner's choices in this browser, and returns to the updated Profile page.
- Cancel and the back button discard unsaved changes and return to Profile.

## Verification

- Pending final type, preview, persistence, validation, and responsive browser checks.

# Floating Panda AI assistant

- Pippin now floats at the bottom-right of every portal screen with a custom transparent 3D panda, gentle bounce, glow, and hover feedback.
- Selecting Pippin opens a compact learning chat with quick actions, streamed answers, loading and error states, and a clear-chat control.
- One conversation is saved in this browser and restored after navigation or refresh.

## Verification

- Pending final type, preview, chat, persistence, and responsive browser checks.