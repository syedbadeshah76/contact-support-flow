# Notification popover with clear controls

## What will change
- Keep the bell in the top bar and refine its popover into a complete notification list.
- Add a working **Clear all** action that removes every notification and updates the unread badge immediately.
- Keep individual notifications clickable so they mark as read and open their related page.
- Show a clear empty state after all notifications are removed.
- Preserve the existing **Mark all read** action and success feedback.

## Verification
- Check unread count, mark-all-read, individual navigation, clear-all, and empty-state behavior.
- Confirm the header remains usable at desktop and mobile widths.
- Run the project’s TypeScript check and record the result in `walkthrough.md`.
